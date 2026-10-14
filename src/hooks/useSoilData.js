
import { useEffect, useState } from "react";
import { connectSoilMqtt } from "../services/mqttService";

const MAX_HISTORY = 30;

export function useSoilData() {
  const [connection, setConnection] = useState("connecting");
  const [latest, setLatest] = useState(null);
  const [history, setHistory] = useState([]);
  const [lastReceived, setLastReceived] = useState(null);

  useEffect(() => {
    const disconnect = connectSoilMqtt({
      onStatus: setConnection,

      onMessage: (data) => {
        setLatest(data);
        setLastReceived(new Date());

        const point = {
          time: new Date().toLocaleTimeString(),
          receivedAt: Date.now(),
          ph: data.phValid ? Number(data.ph) : null,
          moisture: data.analogMoisturePercentValid === false
            ? null
            : Number(data.analogMoisturePercent),
          nitrogen: data.nitrogenValid
            ? Number(data.nitrogenMgKg)
            : null,
          phosphorus: data.phosphorusValid
            ? Number(data.phosphorusMgKg)
            : null,
          potassium: data.potassiumValid
            ? Number(data.potassiumMgKg)
            : null,
        };

        setHistory((previous) =>
          [...previous, point].slice(-MAX_HISTORY)
        );
      },
    });

    return disconnect;
  }, []);

  return { connection, latest, history, lastReceived };
}
