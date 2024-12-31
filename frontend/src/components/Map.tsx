import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

const Map = () => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  const defaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView(
        [25.492757, 81.866856],
        100
      );

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 100,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      let marker, circle;

      const success = (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const accuracy = pos.coords.accuracy;

        // Remove previous marker and circle
        if (marker) mapRef.current.removeLayer(marker);
        if (circle) mapRef.current.removeLayer(circle);

        // Create marker with default icon
        marker = L.marker([lat, lng], { icon: defaultIcon }).addTo(mapRef.current);
        circle = L.circle([lat, lng], { radius: accuracy }).addTo(mapRef.current);

        mapRef.current.fitBounds(circle.getBounds());
      };

      const error = (err) => {
        console.error("Geolocation error:", err);
        alert("An error occurred while accessing geolocation.");
      };

      if ("geolocation" in navigator) {
        const watchId = navigator.geolocation.watchPosition(success, error, {
          enableHighAccuracy: true,
          timeout: 2000,
          maximumAge: 0,
        });

        return () => {
          navigator.geolocation.clearWatch(watchId);
        };
      } else {
        alert("Geolocation is not supported by your browser.");
      }
    }
  }, []);

  return (
    <div>
      <h1 className="relative text-2xl items-center justify-center flex">
        Hunt Page
      </h1>
      <div
        ref={mapContainerRef}
        id="map"
        style={{ height: "1000px", width: "100%" }}
      ></div>
    </div>
  );
};

export default Map;
