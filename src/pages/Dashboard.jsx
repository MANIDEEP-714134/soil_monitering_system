
import {
  Droplets,
  FlaskConical,
  Leaf,
  Radio,
  Thermometer,
  Zap,
} from "lucide-react";

import SensorCard from "../components/SensorCard";
import LiveChart from "../components/LiveChart";
import StatusPanel from "../components/StatusPanel";
import { useSoilData } from "../hooks/useSoilData";
import { isSensorValid } from "../utils/formatData";
import "../assets/dashboard.css";

export default function Dashboard() {
  const { connection, latest, history, lastReceived } = useSoilData();

  const sensors = [
    {
      title: "Soil pH",
      value: latest?.ph,
      unit: "pH",
      icon: FlaskConical,
      valid: isSensorValid(latest, "ph"),
      digits: 2,
    },
    {
      title: "Soil Moisture",
      value: latest?.analogMoisturePercent,
      unit: "%",
      icon: Droplets,
      valid: latest?.analogMoisturePercent != null &&
        Number.isFinite(Number(latest.analogMoisturePercent)),
      digits: 1,
    },
    {
      title: "Nitrogen",
      value: latest?.nitrogenMgKg,
      unit: "mg/kg",
      icon: Leaf,
      valid: isSensorValid(latest, "nitrogen"),
      digits: 0,
    },
    {
      title: "Phosphorus",
      value: latest?.phosphorusMgKg,
      unit: "mg/kg",
      icon: Zap,
      valid: isSensorValid(latest, "phosphorus"),
      digits: 0,
    },
    {
      title: "Potassium",
      value: latest?.potassiumMgKg,
      unit: "mg/kg",
      icon: Radio,
      valid: isSensorValid(latest, "potassium"),
      digits: 0,
    },
  ];

  const chartDefinitions = [
    {
      title: "Soil pH trend",
      unit: "pH",
      series: [
        { key: "ph", name: "pH", color: "#16a34a" },
      ],
    },
    {
      title: "Moisture trend",
      unit: "%",
      series: [
        { key: "moisture", name: "Moisture", color: "#0284c7" },
      ],
    },
    {
      title: "NPK nutrient trends",
      unit: "mg/kg",
      series: [
        { key: "nitrogen", name: "Nitrogen", color: "#16a34a" },
        { key: "phosphorus", name: "Phosphorus", color: "#d97706" },
        { key: "potassium", name: "Potassium", color: "#7c3aed" },
      ],
    },
  ];

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div className="brand">
          <div className="brand-icon">
            <Leaf size={26} />
          </div>
          <div>
            <p className="eyebrow">SMART AGRICULTURE / IOT</p>
            <h1>Soil Monitoring</h1>
            <p className="subtitle">
              Live soil measurements from your ESP32
            </p>
          </div>
        </div>

        <div className={`connection-badge ${connection}`}>
          <span className="status-dot" />
          {connection === "connected"
            ? "Live connection"
            : connection === "connecting"
              ? "Connecting..."
              : connection === "error"
                ? "Connection error"
                : "Disconnected"}
        </div>
      </header>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <h2>Live measurements</h2>
            <p>Latest values received through MQTT</p>
          </div>
          <span className="sample-count">
            {history.length} samples
          </span>
        </div>

        <div className="sensor-grid">
          {sensors.map((sensor) => (
            <SensorCard key={sensor.title} {...sensor} />
          ))}
        </div>
      </section>

      <section className="dashboard-lower">
        <div className="charts-section">
          <div className="section-heading">
            <div>
              <h2>Live analytics</h2>
              <p>Trends from recent MQTT messages</p>
            </div>
          </div>

          <div className="chart-grid">
            {chartDefinitions.map((chart) => (
              <LiveChart
                key={chart.title}
                title={chart.title}
                unit={chart.unit}
                data={history}
                series={chart.series}
              />
            ))}
          </div>
        </div>

        <StatusPanel
          connection={connection}
          latest={latest}
          lastReceived={lastReceived}
        />
      </section>

      <footer className="dashboard-footer">
        <Thermometer size={15} />
        <span>
          Device: {latest?.deviceId || "ESP32_SOIL_01"}
        </span>
        <span>•</span>
        <span>MQTT topic: esp32/data</span>
      </footer>
    </main>
  );
}
