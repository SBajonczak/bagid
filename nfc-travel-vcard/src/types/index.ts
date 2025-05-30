// This file exports TypeScript interfaces and types used throughout the application.

export interface User {
    email: string;
    name: string;
    provider: string;
}

export interface TravelData {
    tagId:string; //Contains a guid from the tag itself
    hasData:boolean;
    // Kontakt/Owner
    ownerFirstName: string;
    ownerLastName: string;
    ownerAddress: string;
    ownerEmail: string;
    ownerMobile: string;
    ownerLandline: string;
    ownerOther?: string;

    // Guide
    guideFirstName: string;
    guideLastName: string;
    guideEmail: string;
    guideMobile: string;
    guideLandline: string;

    // Zieladresse/Unterkunft
    destinationAccommodation: string;
    destinationAddress: string;
    transportation: string;
    transportationNumber: string;
    transportationDate: Date | null;
}

export interface TagData {
    [tagId: string]: TravelData;
}

export interface TagOwners {
    [tagId: string]: string; // Maps tag ID to user email
}