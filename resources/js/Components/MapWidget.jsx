import { useEffect, useRef } from 'react';
import L from 'leaflet';

// Simple accessible map widget centered on Indonesia
export default function MapWidget({ height = 320, points = [] }) {
  const mapRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && !instanceRef.current) {
      const map = L.map(mapRef.current, { zoomControl: true, attributionControl: true });
      instanceRef.current = map;
      map.setView([-2.5489, 118.0149], 5); // Center of Indonesia
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> kontributor'
      }).addTo(map);

      // Example placeholder marker (Jakarta)
      // Add dynamic points if provided
      points.forEach(pt => {
        if (pt.latitude && pt.longitude) {
          const m = L.marker([pt.latitude, pt.longitude], { title: pt.title });
          m.addTo(map);
          const badge = pt.type === 'event' ? 'Event' : pt.type === 'job' ? 'Lowongan' : 'Lokasi';
          m.bindPopup(`<strong>${pt.title}</strong><br/><span style="font-size:12px;opacity:0.8">${badge}</span>`);
        }
      });
      if (!points.length) {
        const marker = L.marker([-6.2088, 106.8456]).addTo(map);
        marker.bindPopup('<strong>Contoh Lokasi:</strong><br/>Jakarta').openPopup();
      }
    }
    return () => {
      // cleanup map on unmount
      if (instanceRef.current) {
        instanceRef.current.remove();
        instanceRef.current = null;
      }
    };
  }, []);

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
