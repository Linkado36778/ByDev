// src/components/InfluxRealtime.tsx
import { InfluxDB } from '@influxdata/influxdb-client';

const url = "http://bydev.brazilsouth.cloudapp.azure.com:8086/";
const token = "7KNJhRMcOnOjSnFgQ8bxHkA-bsSW7_fsBJdLxH773tHEDIeh18TS1rhXiC_I5z2OQyl__xUsZLbXmtsl7fyOQg==";
const org = "ByDev";
const bucket = "Bydev_2";

const queryApi = new InfluxDB({ url, token }).getQueryApi(org);

type PayloadData = {
  time: string;
  value1: number;
  value2: number;
  value3: number; 
};

const listeners: ((data: PayloadData) => void)[] = [];

export function subscribeToPayload(listener: (data: PayloadData) => void) {
  listeners.push(listener);
}

function emitPayload(data: PayloadData) {
  console.log('📦 Status recebido:', data);
  listeners.forEach((listener) => listener(data));
}

function startPolling() {
  console.log('⏱️ Lendo valores do InfluxDB...');

  setInterval(() => {
    const fluxQuery = `
      import "influxdata/influxdb/schema"

      from(bucket: "${bucket}")
        |> range(start: -1m)
        |> filter(fn: (r) => r._measurement == "mqtt_consumer")
        |> filter(fn: (r) =>
          r._field == "uplink_message_decoded_payload_valor1" or
          r._field == "uplink_message_decoded_payload_valor2" or
          r._field == "uplink_message_decoded_payload_caractere"
        )
        |> last()
        |> group(columns: ["_time"])
    `;

    const values: Record<string, number | undefined> = {};

    queryApi.queryRows(fluxQuery, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row);
        const field = o._field;
        const value = parseFloat(o._value);

        if (!isNaN(value)) {
          values[field] = value;
        }

        // Quando os 3 campos estiverem presentes, emitimos o payload
        if (
          values["uplink_message_decoded_payload_valor1"] !== undefined &&
          values["uplink_message_decoded_payload_valor2"] !== undefined &&
          values["uplink_message_decoded_payload_caractere"] !== undefined
        ) {
          emitPayload({
            time: o._time,
            value1: values["uplink_message_decoded_payload_valor1"],
            value2: values["uplink_message_decoded_payload_valor2"],
            value3: values["uplink_message_decoded_payload_caractere"]
          });

          // Limpa para evitar múltiplas emissões com dados antigos
          values["uplink_message_decoded_payload_valor1"] = undefined;
          values["uplink_message_decoded_payload_valor2"] = undefined;
          values["uplink_message_decoded_payload_caractere"] = undefined;
        }
      },
      error(error) {
        console.error('❌ Erro na consulta ao InfluxDB:', error);
      },
      complete() {}
    });
  }, 3000);
}

startPolling();
