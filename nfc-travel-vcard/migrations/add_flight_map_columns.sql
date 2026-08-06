-- Migration: Airport coordinates + flight map visibility
-- Run once against the MSSQL database.
-- All new columns are nullable (except ShowFlightMap with DEFAULT 0) — safe for existing data.

ALTER TABLE FlightLegs ADD
  DepartureLat          FLOAT         NULL,
  DepartureLon          FLOAT         NULL,
  ArrivalLat            FLOAT         NULL,
  ArrivalLon            FLOAT         NULL,
  DepartureAirportName  NVARCHAR(255) NULL,
  ArrivalAirportName    NVARCHAR(255) NULL;

ALTER TABLE TravelTag ADD
  ShowFlightMap   BIT   NOT NULL DEFAULT 0,
  DestinationLat  FLOAT NULL,
  DestinationLon  FLOAT NULL;
