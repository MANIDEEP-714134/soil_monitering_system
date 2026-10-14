
export function formatValue(value, digits = 1) {
  if (value === null || value === undefined || value === "") {
    return "--";
  }

  const number = Number(value);

  return Number.isFinite(number) ? number.toFixed(digits) : "--";
}

export function isSensorValid(data, field) {
  if (!data) return false;

  const validField = `${field}Valid`;

  if (typeof data[validField] === "boolean") {
    return data[validField];
  }

  return data[field] !== null &&
    data[field] !== undefined &&
    Number.isFinite(Number(data[field]));
}

export function formatTimestamp(value) {
  if (!value) return "Waiting for data";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return String(value);

  return date.toLocaleString();
}
