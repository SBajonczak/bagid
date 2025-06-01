INSERT INTO TravelTag (
    tagId,
    hasData,

    ownerFirstName,
    ownerLastName,
    ownerAddress,
    ownerEmail,
    ownerMobile,
    ownerLandline,
    ownerOther,

    guideFirstName,
    guideLastName,
    guideEmail,
    guideMobile,
    guideLandline,

    destinationAccommodation,
    destinationAddress,
    transportation,
    transportationNumber,
    transportationDate
) VALUES (
    '5ea2a017-8976-4d28-a2c0-6c80395858a6',
    1,

    'Max',
    'Mustermann',
    'Musterstraße 1, 12345 Musterstadt, Deutschland',
    'max.mustermann@example.com',
    '+4915112345678',
    '+492312345678',
    'Nur erreichbar zwischen 18–20 Uhr',

    'Lisa',
    'Leitner',
    'lisa.leitner@example.com',
    '+4917612345678',
    '+498912345678',

    'Hotel Paradies',
    'Urlaubsstraße 7, 54321 Ferienort, Spanien',
    'Flug',
    'LH1234',
    '2025-08-15'
);
INSERT INTO TravelTag (
    tagId
) VALUES (
    '63d26f3a-cb90-4e9a-bd60-68dd923efa4c',
)


 INSERT INTO [dbo].[TagOwners] (
        [TagID], [UserID], [UserEmail], [RegisteredAt]
    ) VALUES
    (
        (SELECT TOP 1 tagId FROM TravelTag), 'user1', 'user1@email.com', GETDATE()
    ),