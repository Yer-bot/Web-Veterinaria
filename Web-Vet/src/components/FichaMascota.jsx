import React from 'react';

function FichaMascota({ mascota, alEditar, alEliminar }) {
    if (!mascota) {
        return (
            <div className="ficha-vacia">
                <p>Selecciona un paciente de la lista para ver su expediente clínico.</p>
            </div>
        );
    }
    // Renderizado de la ficha de la mascota
    return (
        <div className="ficha-expediente">
            <div className="ficha-header">
                <h1>🏥 Expediente: {mascota.nombre}</h1>
                <div className="ficha-buttons">
                    <button className="btn-edit" onClick={() => alEditar(mascota)}>Editar Datos</button>
                    <button className="btn-delete" onClick={() => alEliminar(mascota.id)}>Dar de Alta</button>
                </div>
            </div>

            <div className="ficha-grid">
                <div className="ficha-card">
                    <h3>Información Médica</h3>
                    <p><strong>Especie:</strong> {mascota.especie}</p>
                    <p><strong>Raza:</strong> {mascota.raza}</p>
                    <p><strong>Edad:</strong> {mascota.edad} años</p>
                    <p><strong>Peso:</strong> {mascota.peso} Kg</p>
                    <p><strong>Esterilizado:</strong> {mascota.esterilizado ? '✅ Sí' : '❌ No'}</p>
                </div>

                <div className="ficha-card">
                    <h3>Responsable Legal</h3>
                    <p><strong>Dueño:</strong> {mascota.propietario.nombre}</p>
                    <p><strong>RUT:</strong> {mascota.propietario.rut}</p>
                    <p><strong>Teléfono:</strong> {mascota.propietario.telefono}</p>
                </div>

                <div className="ficha-card full-width">
                    <h3>Historial Clínico</h3>
                    <p><strong>Última Consulta:</strong> {mascota.ultimaAtencion.fecha || 'Sin registros'}</p>
                    <p><strong>Médico Veterinario:</strong> {mascota.ultimaAtencion.veterinario || 'Sin registros'}</p>
                    <p><strong>Diagnóstico:</strong> {mascota.ultimaAtencion.diagnostico || 'Sin registros'}</p>
                </div>

                <div className="ficha-card full-width">
                    <h3>Esquema de Vacunación</h3>
                    <div className="tags-container">
                        {mascota.vacunas.length > 0 ? (
                            mascota.vacunas.map((vac, i) => (
                                <span key={i} className="vacuna-tag">💉 {vac}</span>
                            ))
                        ) : (
                            <span className="no-tags">Sin vacunas registradas</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FichaMascota;