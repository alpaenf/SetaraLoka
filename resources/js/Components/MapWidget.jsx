import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/build/assets/marker-icon-hN30_KVU.png',
  iconUrl: '/build/assets/marker-icon-hN30_KVU.png',
  shadowUrl: '/build/assets/marker-shadow.png',
});

// Simple accessible map widget centered on Indonesia
export default function MapWidget({ height = 320, points = [] }) {
  const mapRef = useRef(null);
  const instanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (mapRef.current && !instanceRef.current) {
      const map = L.map(mapRef.current, { zoomControl: true, attributionControl: true });
      instanceRef.current = map;
      map.setView([-2.5489, 118.0149], 5); // Center of Indonesia
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> kontributor'
      }).addTo(map);
    }
    
    return () => {
      // cleanup map on unmount
      if (instanceRef.current) {
        instanceRef.current.remove();
        instanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (instanceRef.current) {
      // Clear existing markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      // Add dynamic points if provided
      if (points.length > 0) {
        points.forEach(pt => {
          if (pt.latitude && pt.longitude) {
            // Create custom icon based on type
            const iconColor = pt.type === 'event' ? '#f59e0b' : '#06b6d4'; // amber for events, cyan for jobs
            const customIcon = L.divIcon({
              className: 'custom-marker',
              html: `<div style="background-color: ${iconColor}; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 3px 10px rgba(0,0,0,0.3);"></div>`,
              iconSize: [30, 30],
              iconAnchor: [15, 30],
            });

            const m = L.marker([pt.latitude, pt.longitude], { 
              icon: customIcon,
              title: pt.title 
            });
            m.addTo(instanceRef.current);
            
            const badge = pt.type === 'event' ? 'Event' : pt.type === 'job' ? 'Lowongan' : 'Lokasi';
            const badgeColor = pt.type === 'event' ? 'bg-amber-500' : 'bg-cyan-500';
            m.bindPopup(`
              <div class="p-2">
                <strong class="text-sm">${pt.title}</strong><br/>
                <span class="inline-block px-2 py-1 mt-1 text-xs text-white ${badgeColor} rounded-full">${badge}</span>
              </div>
            `);
            
            markersRef.current.push(m);
          }
        });

        // Fit bounds to show all markers
        if (markersRef.current.length > 0) {
          const group = L.featureGroup(markersRef.current);
          instanceRef.current.fitBounds(group.getBounds().pad(0.1));
        }
      } else {
        // Default marker (Jakarta) if no points
        const marker = L.marker([-6.2088, 106.8456]);
        marker.addTo(instanceRef.current);
        marker.bindPopup('<strong>Contoh Lokasi:</strong><br/>Jakarta').openPopup();
        markersRef.current.push(marker);
      }
    }
  }, [points]);

  return (
    <div className="w-full rounded-xl overflow-hidden border bg-white dark:bg-slate-800 shadow-sm hc-surface" aria-label="Peta lokasi peluang inklusif" role="region">
      <div className="p-3 flex flex-wrap items-center gap-3 justify-between border-b bg-gray-50 dark:bg-slate-700/50">
        <h3 className="font-semibold text-lg" id="map-heading">Peta Inklusif</h3>
        <span className="text-xs text-gray-500 dark:text-gray-300">{points.length ? `${points.length} lokasi` : 'Data contoh'}</span>
      </div>
      <div ref={mapRef} style={{ height }} className="w-full" aria-describedby="map-desc" />
      <p id="map-desc" className="sr-only">Peta interaktif menampilkan lokasi contoh. Gunakan tombol +/- untuk zoom.</p>
    </div>
  );
}
