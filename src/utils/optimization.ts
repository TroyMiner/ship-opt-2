import { Shipment, CarrierRate, Load, GeoCoordinate } from '../types';

interface OptimizationSettings {
  maxStops: number;
  consolidateLoads: boolean;
  preferredCarriers: string[];
  maxDistance: number;
}

function calculateDistance(coord1: GeoCoordinate, coord2: GeoCoordinate): number {
  const R = 3959; // Earth's radius in miles
  const lat1 = coord1.latitude * Math.PI / 180;
  const lat2 = coord2.latitude * Math.PI / 180;
  const dLat = (coord2.latitude - coord1.latitude) * Math.PI / 180;
  const dLon = (coord2.longitude - coord1.longitude) * Math.PI / 180;

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function findBestRate(shipment: Shipment, rates: CarrierRate[], settings: OptimizationSettings): CarrierRate | null {
  return rates
    .filter(rate => {
      // Filter by preferred carriers if specified
      if (settings.preferredCarriers.length > 0 && !settings.preferredCarriers.includes(rate.carrierName)) {
        return false;
      }

      // Basic compatibility checks
      const serviceMatch = rate.mode === shipment.service;
      const originMatch = rate.origin.state === shipment.origin.state;
      const destMatch = rate.destination.state === shipment.destination.state;

      return serviceMatch && originMatch && destMatch;
    })
    .sort((a, b) => a.rate - b.rate)[0] || null;
}

function calculateLoadCost(shipment: Shipment, rate: CarrierRate): number {
  switch (rate.ratePer) {
    case 'Miles':
      return rate.rate * 100; // Simplified distance calculation
    case 'Weight':
      return rate.rate * shipment.totalWeight;
    case 'Quantity':
      return rate.rate * shipment.totalItems;
    case 'Flat':
      return rate.rate;
    default:
      return 0;
  }
}

export async function optimizeLoads(
  shipments: Shipment[],
  rates: CarrierRate[],
  settings: OptimizationSettings
): Promise<Load[]> {
  const loads: Load[] = [];
  const unassignedShipments = [...shipments];

  while (unassignedShipments.length > 0) {
    const currentShipment = unassignedShipments.shift()!;
    const bestRate = findBestRate(currentShipment, rates, settings);

    if (!bestRate) continue;

    const load: Load = {
      ...currentShipment,
      carrierRate: bestRate,
      totalCost: calculateLoadCost(currentShipment, bestRate),
      route: [
        currentShipment.origin.geoCoordinate!,
        currentShipment.destination.geoCoordinate!
      ]
    };

    // If consolidation is enabled, try to combine compatible shipments
    if (settings.consolidateLoads) {
      let stopCount = 1;
      let currentLocation = currentShipment.destination.geoCoordinate!;

      while (stopCount < settings.maxStops && unassignedShipments.length > 0) {
        const nextShipmentIndex = unassignedShipments.findIndex(shipment => {
          if (!shipment.origin.geoCoordinate || !shipment.destination.geoCoordinate) return false;

          const distance = calculateDistance(currentLocation, shipment.origin.geoCoordinate);
          return distance <= settings.maxDistance &&
            shipment.service === currentShipment.service;
        });

        if (nextShipmentIndex === -1) break;

        const nextShipment = unassignedShipments.splice(nextShipmentIndex, 1)[0];
        load.route.push(
          nextShipment.origin.geoCoordinate!,
          nextShipment.destination.geoCoordinate!
        );
        currentLocation = nextShipment.destination.geoCoordinate!;
        stopCount++;

        // Add additional cost for the consolidated shipment
        load.totalCost += calculateLoadCost(nextShipment, bestRate);
      }
    }

    loads.push(load);
  }

  return loads;
}