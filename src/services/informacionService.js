const URL = "https://6aa6bcf8d7765db9850792ec.mockapi.io/information";

export const obtenerInformacion = async () => {
  const response = await fetch(URL);

  if (!response.ok) {
    throw new Error("No se pudo obtener la información de la empresa");
  }

  return await response.json();
};