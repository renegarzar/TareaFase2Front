import React, { useState } from "react";

const NuevoHilo = ({ setCreandoHilo, setHilos }) => {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [contenido, setContenido] = useState("");

  const handleCrearHilo = () => {
    const nuevoHilo = {
      titulo,
      autor,
      fecha: new Date().toISOString(),
      contenido,
    };

    // Enviar el nuevo hilo al backend
    fetch("http://localhost:5000/hilo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoHilo),
    })
      .then((response) => response.json())
      .then((data) => {
        // Actualizar la lista de hilos en el estado
        setHilos((prevHilos) => [...prevHilos, data]);
        // Volver a la lista de hilos
        setCreandoHilo(false);
      })
      .catch((error) => console.error("Error al crear el hilo:", error));
  };

  return (
    <div>
      <h2>Crear Nuevo Hilo</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCrearHilo();
        }}
      >
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Autor:</label>
          <input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contenido:</label>
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            required
          />
        </div>
        <button type="submit">Crear Hilo</button>
        <button type="button" onClick={() => setCreandoHilo(false)}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default NuevoHilo;
