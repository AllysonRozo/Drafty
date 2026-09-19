export const crearOrder = async (orden) => {
  const response = await fetch(
    "https://6aa6bcf8d7765db9850792ec.mockapi.io/orden",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orden),
    }
  );

  if (!response.ok) {
    throw new Error("Error al crear la orden");
  }

  const data = await response.json();

  console.log("ORDEN CREADA:", data);

  return data;
};