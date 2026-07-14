import React, { createContext, useState, useEffect } from 'react';

export const MascotasContext = createContext();

const MASCOTAS_SEMILLA = [
    {
        id: 1,
        nombre: "Kaiser",
        especie: "Perro",
        raza: "Mestizo",
        edad: 5,
        peso: 32.8,
        esterilizado: true,
        vacunas: ["Antirrábica", "Séxtuple", "Coronavirus"],
        propietario: {
            rut: "14567890-2",
            nombre: "Pedro Ruminot",
            telefono: "998877665"
        },
        ultimaAtencion: {
            fecha: "2026-05-18",
            veterinario: "Dra. Ana Maria",
            diagnostico: "Otitis leve"
        }
    }
];

export function MascotasProvider({ children }) {
    const [mascotas, setMascotas] = useState(() => {
        const localData = localStorage.getItem('vets_mascotas');
        return localData ? JSON.parse(localData) : MASCOTAS_SEMILLA;
    });

    useEffect(() => {
        localStorage.setItem('vets_mascotas', JSON.stringify(mascotas));
    }, [mascotas]);

    const agregarMascota = (nuevaMascota) => {
        setMascotas((prev) => [...prev, { ...nuevaMascota, id: Date.now() }]);
    };

    const actualizarMascota = (id, mascotaActualizada) => {
        setMascotas((prev) =>
            prev.map((m) => (m.id === id ? { ...mascotaActualizada, id } : m))
        );
    };

    const eliminarMascota = (id) => {
        setMascotas((prev) => prev.filter((m) => m.id !== id));
    };

    return (
        <MascotasContext.Provider value={{ mascotas, agregarMascota, actualizarMascota, eliminarMascota }}>
            {children}
        </MascotasContext.Provider>
    );
}