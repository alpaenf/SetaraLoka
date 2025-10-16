import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map({ events = [], jobs = [] }) {
  const center = [ -6.2, 106.816666 ];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Peta Inklusif</h1>
      <div className="h-[70vh] mt-4">
        <MapContainer center={center} zoom={11} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {events.filter(e=>e.latitude && e.longitude).map(e => (
            <Marker key={`e-${e.id}`} position={[e.latitude, e.longitude]}>
              <Popup>
                <div className="font-semibold">{e.title}</div>
                <div className="text-sm">{e.location_name}</div>
              </Popup>
            </Marker>
          ))}
          {jobs.filter(j=>j.latitude && j.longitude).map(j => (
            <Marker key={`j-${j.id}`} position={[j.latitude, j.longitude]}>
              <Popup>
                <div className="font-semibold">{j.title}</div>
                <div className="text-sm">{j.company}</div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
