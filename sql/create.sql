CREATE TABLE TravelTag (
    tagId uniqueidentifier PRIMARY KEY,
    hasData bit NOT NULL,
    isRegistered bit default(0),
    -- Owner/Kontakt
    ownerFirstName VARCHAR(100) NOT NULL,
    ownerLastName VARCHAR(100) NOT NULL,
    ownerAddress TEXT NOT NULL,
    ownerEmail VARCHAR(255) NOT NULL,
    ownerMobile VARCHAR(50) NOT NULL,
    ownerLandline VARCHAR(50) NOT NULL,
    ownerOther TEXT,

    -- Guide
    guideFirstName VARCHAR(100) NOT NULL,
    guideLastName VARCHAR(100) NOT NULL,
    guideEmail VARCHAR(255) NOT NULL,
    guideMobile VARCHAR(50) NOT NULL,
    guideLandline VARCHAR(50) NOT NULL,

    -- Zieladresse / Unterkunft
    destinationAccommodation TEXT NOT NULL,
    destinationAddress TEXT NOT NULL,
    transportation VARCHAR(100) NOT NULL,
    transportationNumber VARCHAR(100) NOT NULL,
    transportationDate DATE
);

CREATE TABLE [dbo].[TagOwners] (
    [TagID] UNIQUEIDENTIFIER NOT NULL, 
    [UserID] NVARCHAR(255) NOT NULL, 
    [UserEmail] NVARCHAR(255) NOT NULL, 
    [RegisteredAt] DATETIME NOT NULL, 
    CONSTRAINT [PK_TagOwners] PRIMARY KEY ([TagID], [UserID]),
    CONSTRAINT [FK_TagOwners_TravelTags] FOREIGN KEY ([TagID]) REFERENCES [TravelTags]([TagID])
);

CREATE INDEX [IX_TagOwners_UserID] ON [dbo].[TagOwners] ([UserID]);

IF COL_LENGTH('TravelTag', 'tagName') IS NULL
BEGIN
    ALTER TABLE TravelTag ADD tagName VARCHAR(500) NULL;
END