import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

function ForecastCard({ data }) {
  const dateObj = new Date(data.date);

  const day = dateObj.toLocaleDateString("en-US", {
    weekday: "short",
  });

  const getWeatherIcon = (desc, temp) => {
    desc = desc.toLowerCase();

    const color =
      temp < 10
        ? "#3b82f6"      // blue (cold)
        : temp > 30
        ? "#f97316"      // orange (hot)
        : "#facc15";     // yellow (normal)

    if (desc.includes("clear"))
      return <WiDaySunny size={42} color={color} />;
    if (desc.includes("cloud"))
      return <WiCloud size={42} color={color} />;
    if (desc.includes("rain"))
      return <WiRain size={42} color={color} />;
    if (desc.includes("snow"))
      return <WiSnow size={42} color={color} />;
    if (desc.includes("thunder"))
      return <WiThunderstorm size={42} color={color} />;

    return <WiCloud size={42} color={color} />;
  };

  return (
    <div className="forecast-card">
      <span className="forecast-day">{day}</span>

      {getWeatherIcon(data.description, data.temperature)}

      <span className="forecast-temp">
        {Math.round(data.temperature)}°
      </span>

      <span className="forecast-desc">
        {data.description}
      </span>
    </div>
  );
}

export default ForecastCard;