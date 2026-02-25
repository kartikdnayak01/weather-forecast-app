import { useState } from "react";
import SearchBar from "./components/SearchBar";
import ForecastCard from "./components/ForecastCard";
import { fetchCurrentWeather, fetchForecast } from "./api";
import WeatherCard from "./components/WeatherCard";
import Loader from "./components/Loader";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [forecast, setForecast] = useState([]);

  const handleSearch = async (city) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetchCurrentWeather(city);
      setWeather(response.data);

      const forecastResponse = await fetchForecast(city);
      setForecast(forecastResponse.data);
    } catch (err) {
      setError("City not found.");
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <h1>🌤 Weather Forecast</h1>
      <SearchBar onSearch={handleSearch} />

      {loading && <Loader />}
      {error && <p className="error">{error}</p>}

      {weather && <WeatherCard data={weather} />}

      {forecast.length > 0 && (
        <div className="forecast-section">
          <h2>5 Day Forecast</h2>
          <div className="forecast-row">
            {forecast.map((day, index) => (
              <ForecastCard key={index} data={day} />
            ))}
          </div>
        </div>
      )}
    </div>
    
  );
}

export default App;
