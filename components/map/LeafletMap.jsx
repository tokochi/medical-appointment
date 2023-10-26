"use client";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerMap from "@components/map/MarkerMap";
import { useStore } from "@context/store";
import "leaflet/dist/leaflet.css";

function LeafletMap() {
  const doctorInfo = useStore((state) => state.doctorInfo);
  
  return (
    <MapContainer
      center={{
        lat: doctorInfo?.googleMap?.lat,
        lng: doctorInfo?.googleMap?.lng,
      }}
      zoom={13}
      style={{ width: "100%", height: "100%" }}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MarkerMap />
    </MapContainer>
  );
}

export default LeafletMap;
