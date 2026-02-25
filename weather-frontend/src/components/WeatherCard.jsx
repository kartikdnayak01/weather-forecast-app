import {
  WiThermometer,
  WiHumidity,
  WiStrongWind,
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

function WeatherCard({ data }) {

  const getWeatherIcon = (desc, temp) => {
    desc = desc.toLowerCase();

    const color =
      temp < 10
        ? "#3b82f6"   // blue (cold)
        : temp > 30
        ? "#f97316"   // orange (hot)
        : "#facc15";  // yellow (normal)

    if (desc.includes("clear"))
      return <WiDaySunny size={90} color={color} />;
    if (desc.includes("cloud"))
      return <WiCloud size={90} color={color} />;
    if (desc.includes("rain"))
      return <WiRain size={90} color={color} />;
    if (desc.includes("snow"))
      return <WiSnow size={90} color={color} />;
    if (desc.includes("thunder"))
      return <WiThunderstorm size={90} color={color} />;

    return <WiCloud size={90} color={color} />;
  };

  return (
    <div className="card">
      <h2>{data.city}</h2>

      {getWeatherIcon(data.description, data.temperature)}

      <p>
        <WiThermometer className="info-icon" />
        Temperature: <strong>{data.temperature} °C</strong>
      </p>

      <p>
        <WiHumidity className="info-icon" />
        Humidity: <strong>{data.humidity}%</strong>
      </p>

      <p>
        <WiStrongWind className="info-icon" />
        Wind: <strong>{data.windSpeed} m/s</strong>
      </p>

      <p>
        <WiCloud className="info-icon" />
        Condition: <strong>{data.description}</strong>
      </p>
    </div>
  );
}

export default WeatherCard;