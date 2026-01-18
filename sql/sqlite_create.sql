-- Create Tables for SQLite / Turso

-- TravelTag Table
CREATE TABLE IF NOT EXISTS TravelTag (
    TagID TEXT PRIMARY KEY,
    tagName TEXT,
    OwnerFirstName TEXT,
    OwnerLastName TEXT,
    OwnerAddress TEXT,
    OwnerEmail TEXT,
    OwnerMobile TEXT,
    OwnerLandline TEXT,
    OwnerOther TEXT,
    GuideFirstName TEXT,
    GuideLastName TEXT,
    GuideEmail TEXT,
    GuideMobile TEXT,
    GuideLandline TEXT,
    DestinationAccommodation TEXT,
    DestinationAddress TEXT,
    Transportation TEXT,
    TransportationNumber TEXT,
    TransportationDate TEXT,
    isRegistered INTEGER DEFAULT 0,
    hasData INTEGER DEFAULT 0
);

-- TagOwners Table (Mapping User <-> Tag)
CREATE TABLE IF NOT EXISTS TagOwners (
    TagID TEXT,
    UserID TEXT,
    UserEmail TEXT,
    RegisteredAt TEXT,
    PRIMARY KEY (TagID, UserID),
    FOREIGN KEY (TagID) REFERENCES TravelTag(TagID)
);

-- Index for faster lookup by UserID
CREATE INDEX IF NOT EXISTS idx_tagowners_userid ON TagOwners(UserID);
