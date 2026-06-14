
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Coordinates for AKE Corporate Office in Islamabad
const position: [number, number] = [33.7294, 73.0931];

// Custom HTML Marker using the exact AKE design
const customIcon = L.divIcon({
  className: 'custom-ake-marker',
  html: `
    <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%); width: 48px;">
      <div style="width: 48px; height: 48px; background-color: white; border: 2px solid #a37f00; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); position: relative; z-index: 10;">
        <span class="material-symbols-outlined" style="color: #a37f00;">domain</span>
      </div>
      <div style="width: 1px; height: 64px; background-color: #a37f00; position: relative; z-index: 0; margin-top: -8px;"></div>
      <div style="width: 16px; height: 16px; border-radius: 50%; background-color: #a37f00; box-shadow: 0 0 15px rgba(115,92,0,0.8); animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;"></div>
    </div>
  `,
  iconSize: [0, 0],
  iconAnchor: [0, 0],
});

const Map = () => {
  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={position} 
        zoom={13} 
        scrollWheelZoom={true}
        className="w-full h-full grayscale-[0.3] contrast-[1.1]"
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon} />
      </MapContainer>
      
      <style>{`
        .leaflet-container {
          z-index: 0 !important;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
      `}</style>
    </div>
  );
};

export default Map;
