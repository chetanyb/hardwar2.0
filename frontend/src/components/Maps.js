import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from "@turf/turf";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2hldGhhY2siLCJhIjoiY2xrMHE2N3FoMG5zMzNwcWx3MGMxaWs2ZCJ9.vOhk3R7yY9s6_hscXFfh6w";

const Map = () => {
  const map = useRef(null);
  const mapContainer = useRef(null);
  const [area, setArea] = useState(0);

  const lng = 78.0322;
  const lat = 30.3165;
  const zoom = 8.51;

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current || "",
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [lng, lat],
      zoom: zoom,
      attributionControl: false,
    });

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
      defaultMode: "draw_polygon",
    });

    function updateArea(e) {
      const data = draw.getAll();
      if (data.features.length > 0) {
        const areaValue = turf.area(data);
        const rounded_area = Math.round(areaValue * 100) / 100;
        setArea(rounded_area);
      } else {
        if (e.type !== "draw.delete") alert("Click the map to draw a polygon.");
      }
    }

    map.current.addControl(draw);

    map.current.on("draw.create", updateArea);
    map.current.on("draw.delete", updateArea);
    map.current.on("draw.update", updateArea);
  });

  return (
    <div>
      <div
        style={{
          width: "40%",
          height: "50vh",
        }}
        className="map-container"
        ref={mapContainer}
      />
      <div
        style={{
          width: "40%",
        }}
      >
        Area: {area} square meters
      </div>{" "}
      {}
    </div>
  );
};

export default Map;
