
import { formatValue } from "../utils/formatData";

export default function SensorCard({
  title,
  value,
  unit,
  icon: Icon,
  valid = true,
  digits = 1,
}) {
  return (
    <article className="sensor-card">
      <div className="sensor-card-top">
        <span className="sensor-label">{title}</span>
        {Icon && (
          <span className="sensor-icon">
            <Icon size={20} />
          </span>
        )}
      </div>

      <div className="sensor-reading">
        <strong>
          {valid ? formatValue(value, digits) : "--"}
        </strong>
        <span className="sensor-unit">{unit}</span>
      </div>

      <div className={`sensor-validity ${valid ? "valid" : "invalid"}`}>
        <span className="status-dot" />
        {valid ? "Sensor data valid" : "Invalid / unavailable"}
      </div>
    </article>
  );
}
