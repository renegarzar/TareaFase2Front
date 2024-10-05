import React from 'react';

const HiloList = ({ hilos, onSelectHilo, onDeleteHilo }) => {
  if (!hilos || hilos.length === 0) {
    return <p>No hay hilos disponibles.</p>; // Manejo cuando no hay hilos
  }
  const eliminarHilo = async (id) => {
    const confirm = window.confirm('¿Estás seguro de que quieres eliminar este hilo?');
    if (!confirm) return;

    const response = await fetch(`http://localhost:5000/hilo/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Elimina el hilo a nivel front
      onDeleteHilo(id);
    } else {
      console.error('Error al eliminar hilo');
    }
  };

  return (
    <div>
      <h2>Hilos</h2>
      <ul>
        {hilos.map((hilo) => (
          <li key={hilo.id}>
            <span>{hilo.titulo}</span>
            <button onClick={() => onSelectHilo(hilo)}>Ver Hilo</button>
            <button onClick={() => eliminarHilo(hilo.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HiloList;


