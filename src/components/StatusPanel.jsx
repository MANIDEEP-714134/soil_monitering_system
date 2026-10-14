
import { Wifi, WifiOff, Activity, Clock } from "lucide-react";
import { formatTimestamp } from "../utils/formatData";

export default function StatusPanel({
  connection,
  latest,
  lastReceived,
}) {
  const connected = connection === "connected";
  const threshold = String(latest?.thresholdStatus ?? "UNKNOWN").toUpperCase();

  const thresholdClass =
    threshold === "GOOD" || threshold === "OK"
      ? "good"
      : threshold === "BAD" || threshold === "ALERT"
        ? "bad"
        : "unknown";

  return (
    <section className="status-panel">
      <div className="panel-heading">
        <h2>System status</h2>
        <Activity size={19} />
      </div>

      <div className="status-row">
        <div className="status-description">
          {connected ? <Wifi size={19} /> : <WifiOff size={19} />}
          <div>
            <strong>MQTT connection</strong>
            <small>broker.emqx.io</small>
          </div>
        </div>

        <span className={`status-pill ${connected ? "good" : "bad"}`}>
          {connection}
        </span>
      </div>

      <div className="status-row">
        <div className="status-description">
          <Activity size={19} />
          <div>
            <strong>Threshold status</strong>
            <small>Reported by ESP32</small>
          </div>
        </div>

        <span className={`status-pill ${thresholdClass}`}>
          {threshold}
        </span>
      </div>

      <div className="status-row">
        <div className="status-description">
          <Clock size={19} />
          <div>
            <strong>Last message received</strong>
            <small>
              {lastReceived
                ? lastReceived.toLocaleTimeString()
                : "Waiting for ESP32"}
            </small>
          </div>
        </div>
      </div>

      {latest?.deviceId && (
        <div className="device-id">
          Device ID: <strong>{latest.deviceId}</strong>
        </div>
      )}

      {latest?.timestamp && (
        <div className="device-id">
          Device timestamp: {formatTimestamp(latest.timestamp)}
        </div>
      )}
    </section>
  );
}
