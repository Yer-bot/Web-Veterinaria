import React, { useState, useContext } from "react";
import { MascotasProvider, MascotasContext } from "./context/MascotasContext";
import ListaMascotas from "./components/ListaMascotas";
import FichaMascota from "./components/FichaMascota";
import FormularioMascota from "./components/FormularioMascota";
import './App.css';

function MainDashboard() {
  const { mascotas, agregarMascota, actualizarMascota, eliminarMascota } = useContext(MascotasContext);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editando, setEditando] = useState(null);

  // Mantener actualizada la selección después de editar
  const datosMascotaActiva = mascotas.find((m) => m.id === mascotaSeleccionada?.id) || null;

  // Funciones para abrir el modal de registro o edición
  const abrirRegistro = () => {
    setEditando(null);
    setModalAbierto(true);
  };

  // Función para abrir el modal de edición con los datos de la mascota seleccionada
  const abrirEdicion = (mascota) => {
    setEditando(mascota);
    setModalAbierto(true);
  };

  // Función para guardar los datos de la mascota, ya sea agregando o actualizando
  const guardarDatos = (datos) => {
    if (editando) {
      actualizarMascota(editando.id, datos);
    } else {
      agregarMascota(datos);
    }
  };

  // Función para manejar la eliminación de la mascota (dar de alta)
  const manejarAlta = (id) => {
    if (window.confirm('¿Desea dar de alta médica a esta mascota? Su expediente se removerá de los registros.')) {
      eliminarMascota(id);
      setMascotaSeleccionada(null);
    }
  };

  // Renderizado del dashboard principal
  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <div className="logo-brand">🐾 ClinicVet Calama</div>
        <button className="btn-add-paciente" onClick={abrirRegistro}>+ Nuevo Paciente</button>
      </header>

      <div className="dashboard-body">
        <ListaMascotas
          mascotas={mascotas}
          alSeleccionar={setMascotaSeleccionada}
          idActivo={datosMascotaActiva?.id}
        />
        <main className="dashboard-content">
          <FichaMascota
            mascota={datosMascotaActiva}
            alEditar={abrirEdicion}
            alEliminar={manejarAlta}
          />
        </main>
      </div>

      {modalAbierto && (
        <FormularioMascota
          mascotaEditar={editando}
          alCerrar={() => setModalAbierto(false)}
          alGuardar={guardarDatos}
        />
      )}
    </div>
  );
}

// Componente principal de la aplicación que envuelve el dashboard con el proveedor de contexto
function App() {
  return (
    <MascotasProvider>
      <MainDashboard />
    </MascotasProvider>
  );
}

export default App;