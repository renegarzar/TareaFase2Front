import React, { useState, useEffect } from "react";
import Comentario from "./Comentario";

const Hilo = ({ hilo, volver }) => {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");

  // Cargar los comentarios al montar el componente
  useEffect(() => {
    const fetchComentarios = async () => {
      const response = await fetch('http://localhost:5000/comentarios');
      const data = await response.json();
      setComentarios(data);
    };

    fetchComentarios();
  }, []);

  const addComment = async () => {
    const comentario = {
      contenido: nuevoComentario,
      autor: "René",
      fecha: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    const response = await fetch('http://localhost:5000/comentario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comentario)
    });

    if (response.ok) {
      setComentarios([...comentarios, comentario]);
      setNuevoComentario("");
    }
  };

  // Función para eliminar un comentario con confirmación
  const deleteComment = async (id) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este comentario?");
    
    if (confirmed) {
      const response = await fetch(`http://localhost:5000/comentario/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Filtrar el comentario eliminado
        setComentarios(comentarios.filter((comentario) => comentario.id !== id));
      }
    }
  };

  return (
    <div>
      <div className="header">
        <h4 className="titulo">{hilo.titulo}</h4>
        <p>{hilo.contenido}</p> {/* Aquí se muestra el contenido del hilo */}
        <div className="fondo">
          <p className="fecha">{new Date(hilo.fecha).toLocaleString()}</p>
          <p className="contador-comentarios">{comentarios.length} comentarios</p>
        </div>
      </div>
      <textarea
        value={nuevoComentario}
        onChange={(e) => setNuevoComentario(e.target.value)}
      ></textarea>
      <button onClick={addComment}>Añadir comentario</button>
      <div className="comentarios">
        {comentarios.map((comentario) => (
          <Comentario key={comentario.id} comentario={comentario} onDelete={deleteComment} />
        ))}
      </div>
      <button onClick={volver}>Volver</button>
    </div>
  );
};

export default Hilo;
