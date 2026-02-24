const API_BASE_URL = import.meta.env.VITE_API_URL as string;
const API_TOKEN = import.meta.env.VITE_API_TOKEN as string;

export interface EventPayload {
  title: string;
  start: string;
  end: string;
  employee: string;
  payrollValue: string;
  servicesValue: string;
  done: number;
}

export const agendarCita = async (data: EventPayload) => {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_URL no está definida");
  }

  if (!API_TOKEN) {
    throw new Error("VITE_API_TOKEN no está definido");
  }

  const response = await fetch(`${API_BASE_URL}/api/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-TOKEN": API_TOKEN,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(JSON.stringify(error));
  }

  return await response.json();
};

export const obtenerEventosPorFecha = async () => {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_URL no está definida");
  }

  if (!API_TOKEN) {
    throw new Error("VITE_API_TOKEN no está definido");
  }

  const response = await fetch(`${API_BASE_URL}/api/events`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-API-TOKEN": API_TOKEN,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(JSON.stringify(error));
  }

  return await response.json();
};