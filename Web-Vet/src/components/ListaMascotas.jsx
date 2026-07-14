import React, { useState } from 'react';

const EMOJIS = { Perro: '🐶', Gato: '🐱', Ave: '🐦', Exótico: '🦎' };

function ListaMascotas({ mascotas, alSeleccionar, idActivo }) {
    const [busqueda, setBusqueda] = useState('');

    // Filtrado de mascotas según el término de búsqueda
    const mascotasFiltradas = mascotas.filter((m) => {
        const termino = busqueda.toLowerCase();
        return (
            m.nombre.toLowerCase().includes(termino) ||
            m.propietario.rut.toLowerCase().includes(termino)
        );
    });

    // Renderizado de la lista de mascotas
    return (
        <div className="sidebar-lista">
            <div className="search-box">
                <input
                    type="text"
                    placeholder="🔍 Buscar por nombre o RUT..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </div>
            <ul className="pacientes-list">
                {mascotasFiltradas.map((m) => (
                    <li key={m.id} className={`paciente-item ${m.id === idActivo ? 'activo' : ''}`} onClick={() => alSeleccionar(m)}>
                        <span className="especie-emoji">{EMOJIS[m.especie] || '🐾'}</span>
                        <div className="paciente-info-mini">
                            <h4>{m.nombre}</h4>
                            <p>{m.raza} • Propietario: {m.propietario.nombre}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaMascotas;