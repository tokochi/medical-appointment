"use client";
import React from "react";
import { useMap, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import { useStore } from "@context/store";
import {  useEffect } from "react";

function MarkerMap() {
  const wilaya = useStore((state) => state.wilaya);
  const doctorInfo = useStore((state) => state.doctorInfo);
  const map = useMap();
  useEffect(() => {
    const coordinate = wilaya.find((wilaya) => wilaya.text === doctorInfo.address?.wilaya?.text);
    useStore.setState((state) => ({
      doctorInfo: {
        ...state.doctorInfo,
        googleMap: { lat: coordinate.longitude, lng: coordinate.latitude },
      },
    }));
    map.panTo({ lat: coordinate.longitude, lng: coordinate.latitude });
  }, [doctorInfo.address?.wilaya?.text]);

  return (
    <div>
      <Marker
        icon={
          new Icon({
            iconUrl: "/images/location-maker.webp",
            iconSize: [50, 45],
            iconAnchor: [12, 41],
          })
        }
        position={{ lat: doctorInfo?.googleMap.lat, lng: doctorInfo?.googleMap.lng }}
        eventHandlers={{
          dragend: (e) => {
            useStore.setState((state) => ({
              doctorInfo: {
                ...state.doctorInfo,
                googleMap: e.target._latlng,
              },
            }));
          },
        }}
        draggable={true}></Marker>
    </div>
  );
}

export default MarkerMap;
