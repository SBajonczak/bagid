export interface FlightLeg {
  id?: number;
  tagId?: string;
  journeyType: 'outbound' | 'return';
  sequence: number;
  carrier: string;
  flightNumber: string;
  departureAirport: string;
  departureDatetime: string;
  arrivalAirport: string;
  arrivalDatetime: string;
  departureLat?: number | null;
  departureLon?: number | null;
  arrivalLat?: number | null;
  arrivalLon?: number | null;
  departureAirportName?: string | null;
  arrivalAirportName?: string | null;
}

export interface TravelData {
  tagName: string;
  ownerFirstName: string;
  ownerLastName: string;
  ownerAddress: string;
  ownerEmail: string;
  ownerMobile: string;
  ownerLandline: string;
  ownerOther?: string;
  guideFirstName: string;
  guideLastName: string;
  guideEmail: string;
  guideMobile: string;
  guideLandline: string;
  destinationAccommodation: string;
  destinationAddress: string;
  transportation: string;
  transportationNumber: string;
  transportationDate?: Date;
  transportationProvider?: string;
  transportationDetails?: string;
  showFlightMap?: boolean;
  destinationLat?: number | null;
  destinationLon?: number | null;
}
