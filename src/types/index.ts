export interface GeoCoordinate {
  latitude: number;
  longitude: number;
}

export interface Location {
  locationCode: string;
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  geoCoordinate?: GeoCoordinate;
}

export interface DateRange {
  early: Date;
  late: Date;
}

export interface Shipment {
  id: string;
  shipmentNumber: string;
  orderNumber: string;
  origin: Location;
  destination: Location;
  shipDates: DateRange;
  deliveryDates: DateRange;
  totalWeight: number;
  totalCube: number;
  totalItems: number;
  temperature: {
    low: number;
    high: number;
  };
  service: string;
  equipment: string;
  reference1?: string;
  reference2?: string;
}

export type RatingMethod = 'D' | 'W' | 'Q';
export type Mode = 'T' | 'L' | 'P' | 'F';
export type RateLaneType = 'CTRY-CTRY' | 'SC-SC' | 'ZC-ZC' | 'LOC-LOC' | 'CSC-CSC';
export type DurationFactor = 'H' | 'M' | 'D';
export type RatePer = 'Miles' | 'Flat' | 'Weight' | 'Quantity';

export interface CarrierRate {
  id: string;
  carrierName: string;
  carrierCode: string;
  rateSet: string;
  effectiveDate: Date;
  endDate: Date;
  ratingMethod: RatingMethod;
  mode: Mode;
  rateLaneType: RateLaneType;
  origin: Location;
  destination: Location;
  rate: number;
  ratePer: RatePer;
  minimumCharge: number;
  reference1?: string;
  reference2?: string;
  maximumStops: number;
  maximumDistance: number;
  stopCharge: number;
  durationFactor: DurationFactor;
  durationMultiplier: number;
}

export interface Load extends Shipment {
  carrierRate: CarrierRate;
  totalCost: number;
  route: GeoCoordinate[];
}