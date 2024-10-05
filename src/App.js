import React, { useState, useEffect } from "react";
import './App.css';
import HiloList from "./componentes/HiloList";
import Hilo from "./componentes/Hilo";
import NuevoHilo from "./componentes/NuevoHilo";

const App = () => {
  const [hilos, setHilos] = useState([]);
  const [hiloSeleccionado, setHiloSeleccionado] = useState(null);
  const [creandoHilo, setCreandoHilo] = useState(false);

  // Obtener los hilos del backend al montar el componente
  useEffect(() => {
    fetch("http://localhost:5000/hilos")
      .then((response) => response.json())
      .then((data) => setHilos(data))
      .catch((error) => console.error("Error al cargar los hilos:", error));
  }, []);

  const eliminarHilo = async (id) => {
    const response = await fetch(`http://localhost:5000/hilo/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setHilos((prevHilos) => prevHilos.filter((hilo) => hilo.id !== id));
      setHiloSeleccionado(null); // Resetear el hilo seleccionado si es necesario
    } else {
      console.error("Error al eliminar el hilo");
    }
  };

  return (
    <div>
      <div className="barra-superior">
        <h1>Mi Foro</h1>
      </div>
      <div className="main">
        {creandoHilo ? (
          <NuevoHilo setCreandoHilo={setCreandoHilo} setHilos={setHilos} />
        ) : hiloSeleccionado ? (
          <Hilo hilo={hiloSeleccionado} volver={() => setHiloSeleccionado(null)} />
        ) : (
          <>
            <HiloList hilos={hilos} onSelectHilo={setHiloSeleccionado} onDeleteHilo={eliminarHilo} />
            <button onClick={() => setCreandoHilo(true)}>Crear Nuevo Hilo</button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;


