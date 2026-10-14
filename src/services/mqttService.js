
import mqtt from "mqtt";

const MQTT_URL = "wss://broker.emqx.io:8084/mqtt";
const MQTT_TOPIC = "esp32/data";

export function connectSoilMqtt({ onMessage, onStatus }) {
  const client = mqtt.connect(MQTT_URL, {
    clientId: `soil_dashboard_${Math.random().toString(16).slice(2, 10)}`,
    clean: true,
    connectTimeout: 10000,
    reconnectPeriod: 3000,
  });

  client.on("connect", () => {
    onStatus?.("connected");

    client.subscribe(MQTT_TOPIC, { qos: 0 }, (error) => {
      if (error) {
        onStatus?.("error");
        console.error("MQTT subscription failed:", error);
      }
    });
  });

  client.on("reconnect", () => onStatus?.("connecting"));
  client.on("offline", () => onStatus?.("offline"));
  client.on("close", () => onStatus?.("offline"));
  client.on("error", (error) => {
    console.error("MQTT error:", error);
    onStatus?.("error");
  });

  client.on("message", (topic, message) => {
    if (topic !== MQTT_TOPIC) return;

    try {
      const data = JSON.parse(message.toString());
      onMessage?.(data);
    } catch (error) {
      console.error("Invalid MQTT JSON:", error);
    }
  });

  return () => {
    client.end(true);
  };
}
