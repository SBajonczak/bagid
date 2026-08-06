'use client';

import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's broken default icons in webpack environments
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const destinationIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export interface MapPoint {
  lat: number;
  lon: number;
  label: string;
}

export interface MapLeg {
  from: MapPoint;
  to: MapPoint;
  color: string;
  tooltip?: string;
}

interface FlightRouteMapProps {
  legs: MapLeg[];
  destinationPoint?: MapPoint | null;
}

function AutoFitBounds({ legs, destinationPoint }: FlightRouteMapProps) {
  const map = useMap();
  const fitted = useRef(false);
  useEffect(() => {
    if (fitted.current) return;
    const points: [number, number][] = [];
    legs.forEach(l => {
      points.push([l.from.lat, l.from.lon]);
      points.push([l.to.lat, l.to.lon]);
    });
    if (destinationPoint) points.push([destinationPoint.lat, destinationPoint.lon]);
    if (points.length > 0) {
      map.fitBounds(L.latLngBounds(points), { padding: [40, 40] });
      fitted.current = true;
    }
  }, [map, legs, destinationPoint]);
  return null;
}

const FlightRouteMap: React.FC<FlightRouteMapProps> = ({ legs, destinationPoint }) => {
  const uniquePoints = new Map<string, MapPoint>();
  legs.forEach(l => {
    uniquePoints.set(`${l.from.lat},${l.from.lon}`, l.from);
    uniquePoints.set(`${l.to.lat},${l.to.lon}`, l.to);
  });

  const center: [number, number] = legs.length > 0
    ? [legs[0].from.lat, legs[0].from.lon]
    : [51, 10];

  return (
    <MapContainer
      center={center}
      zoom={4}
      scrollWheelZoom={false}
      style={{ height: '400px', width: '100%', borderRadius: '0.75rem' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <AutoFitBounds legs={legs} destinationPoint={destinationPoint} />
      {legs.map((leg, idx) => (
        <Polyline
          key={idx}
          positions={[[leg.from.lat, leg.from.lon], [leg.to.lat, leg.to.lon]]}
          color={leg.color}
          weight={3}
        >
          {leg.tooltip && (
            <Tooltip sticky direction="top" offset={[0, -4]}>
              <span style={{ whiteSpace: 'pre-line', fontSize: '13px' }}>{leg.tooltip}</span>
            </Tooltip>
          )}
        </Polyline>
      ))}
      {Array.from(uniquePoints.values()).map(pt => (
        <Marker key={`${pt.lat},${pt.lon}`} position={[pt.lat, pt.lon]}>
          <Popup>{pt.label}</Popup>
        </Marker>
      ))}
      {destinationPoint && (
        <Marker position={[destinationPoint.lat, destinationPoint.lon]} icon={destinationIcon}>
          <Popup>{destinationPoint.label}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default FlightRouteMap;
