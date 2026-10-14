
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function LiveChart({
  title,
  data,
  series,
  unit,
}) {
  return (
    <section className="chart-card">
      <div className="chart-heading">
        <div>
          <h3>{title}</h3>
          <p>Recent sensor readings</p>
        </div>
        <span className="chart-unit">{unit}</span>
      </div>

      <div className="chart-area">
        {data.length === 0 ? (
          <div className="chart-empty">
            Waiting for MQTT readings...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 12, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 11 }}
                minTickGap={25}
              />
              <YAxis
                tick={{ fontSize: 11 }}
                width={45}
                domain={["auto", "auto"]}
              />
              <Tooltip />
              <Legend />

              {series.map((item) => (
                <Line
                  key={item.key}
                  type="monotone"
                  dataKey={item.key}
                  name={item.name}
                  stroke={item.color}
                  strokeWidth={2}
                  dot={false}
                  connectNulls={false}
                  isAnimationActive={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
