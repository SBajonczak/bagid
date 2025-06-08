// Add tagName to the TravelData interface
export interface TravelData {
  // ...existing fields...
  tagName: string; // Required tag name field
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
  // ...any other fields...
}
