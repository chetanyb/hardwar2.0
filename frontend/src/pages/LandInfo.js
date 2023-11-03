import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Map from "../components/Maps";
import { AuthContext } from "../AuthProvider";

function LandInfo() {
  const [area, setArea] = useState(0);
  const [country, setCountry] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [polygonId, setPolygonId] = useState("");
  const { isAuthenticated, token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user_id = user.id;

    const response = await fetch("http://localhost:5000/api/land/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        area,
        country,
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        polygonCoordinates,
        id: user_id,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setPolygonId(data.polygonId);
      navigate("/dashboard");
    } else {
      console.error("Failed to submit data:", await response.text());
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-200">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <form
          className="flex flex-col items-stretch justify-between rounded-md p-4 w-full md:w-1/2 lg:w-1/3 bg-white h-4/5"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-center mb-4 font-merriweather">
            SELECT YOUR LAND HOLDING
          </h2>
          <div className="flex-grow relative">
            <Map
              onAreaUpdate={(area, pointGeo, country, polygonCoordinates) => {
                setArea(area);
                setCountry(country);
                setCoordinates({
                  lat: pointGeo.geometry.coordinates[1],
                  lng: pointGeo.geometry.coordinates[0],
                });
                setPolygonCoordinates(polygonCoordinates);
              }}
            />
          </div>
          <div className="text-center font-roboto mt-4">
            Area: {area} square meters
          </div>
          <button
            className="btn btn-primary p-2 bg-brand_orange hover:bg-brand_orange_darker text-white rounded mt-4"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default LandInfo;
