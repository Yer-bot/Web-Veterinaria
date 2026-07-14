import React, { useState, useEffect } from 'react';
import { validarRut, validarTelefono, formatearRut } from '../utils/validaciones';

const FORM_INICIAL = {
    nombre: '', especie: 'Perro', raza: '', edad: '', peso: '', esterilizado: false,
    vacunasInput: '', vacunas: [],
    propietario: { rut: '', nombre: '', telefono: '' },
    ultimaAtencion: { fecha: '', veterinario: '', diagnostico: '' }
};
// FormularioMascota.jsx
function FormularioMascota({ mascotaEditar, alCerrar, alGuardar }) {
    const [form, setForm] = useState(FORM_INICIAL);
    const [errores, setErrores] = useState({});

    // useEffect para cargar datos si se está editando una mascota
    useEffect(() => {
        if (mascotaEditar) {
            setForm({
                ...mascotaEditar,
                vacunasInput: mascotaEditar.vacunas.join(', '),
            });
        } else {
            setForm(FORM_INICIAL);
        }
    }, [mascotaEditar]);

    // Funciones para manejar cambios en los inputs y validaciones
    const manejarCambioSimple = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Función para manejar cambios en campos anidados (propietario y última atención)
    const manejarCambioAnidado = (e, seccion) => {
        const { name, value } = e.target;
        let valorFinal = value;
        if (name === 'rut') valorFinal = formatearRut(value);
        // Actualizar el estado del formulario para la sección anidada
        setForm((prev) => ({
            ...prev,
            [seccion]: { ...prev[seccion], [name]: valorFinal }
        }));
    };

    // Función para validar el formulario antes de enviar
    const validarFormulario = () => {
        const nuevosErrores = {};
        if (!form.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio';
        if (!form.raza.trim()) nuevosErrores.raza = 'La raza es obligatoria';
        if (form.edad === '' || Number(form.edad) < 0) nuevosErrores.edad = 'Edad inválida';
        if (form.peso === '' || Number(form.peso) <= 0) nuevosErrores.peso = 'Peso inválido';
        // Validaciones para los campos del propietario
        if (!form.propietario.nombre.trim()) nuevosErrores.propNombre = 'Nombre del dueño requerido';
        if (!validarRut(form.propietario.rut)) nuevosErrores.propRut = 'RUT inválido (Módulo 11)';
        if (!validarTelefono(form.propietario.telefono)) nuevosErrores.propTel = 'Teléfono inválido (9 dígitos)';

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    // Función para manejar el envío del formulario
    const manejarSubmit = (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;

        // Convertir la lista de vacunas de string a array y limpiar espacios
        const listaVacunas = form.vacunasInput
            ? form.vacunasInput.split(',').map((v) => v.trim()).filter(Boolean)
            : [];

        const datosFinales = {
            ...form,
            edad: Number(form.edad),
            peso: Number(form.peso),
            vacunas: listaVacunas
        };
        delete datosFinales.vacunasInput;

        alGuardar(datosFinales);
        alCerrar();
    };

    // Renderizado del formulario
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{mascotaEditar ? 'Editar Paciente' : 'Registrar Nuevo Paciente'}</h2>
                <form onSubmit={manejarSubmit}>
                    <div className="form-grid">
            // Sección Mascota
                        <div className="form-section">
                            <h3>Datos del Paciente</h3>
                            <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={manejarCambioSimple} />
                            {errores.nombre && <span className="error">{errores.nombre}</span>}

                            <select name="especie" value={form.especie} onChange={manejarCambioSimple}>
                                <option value="Perro">Perro</option>
                                <option value="Gato">Gato</option>
                                <option value="Ave">Ave</option>
                                <option value="Exótico">Exótico</option>
                            </select>

                // Sección Raza, Edad, Peso, Esterilizado y Vacunas
                            <input type="text" name="raza" placeholder="Raza" value={form.raza} onChange={manejarCambioSimple} />
                            {errores.raza && <span className="error">{errores.raza}</span>}

                            <input type="number" step="1" name="edad" placeholder="Edad (Años)" value={form.edad} onChange={manejarCambioSimple} />
                            {errores.edad && <span className="error">{errores.edad}</span>}

                            <input type="number" step="0.1" name="peso" placeholder="Peso (Kg)" value={form.peso} onChange={manejarCambioSimple} />
                            {errores.peso && <span className="error">{errores.peso}</span>}

                            <label className="checkbox-label">
                                <input type="checkbox" name="esterilizado" checked={form.esterilizado} onChange={manejarCambioSimple} />
                                ¿Esterilizado?
                            </label>

                            <input type="text" name="vacunasInput" placeholder="Vacunas (separadas por comas)" value={form.vacunasInput} onChange={manejarCambioSimple} />
                        </div>

            // Sección Propietario (Sensible)
                        <div className="form-section">
                            <h3>Propietario</h3>
                            <input type="text" name="nombre" placeholder="Nombre Dueño" value={form.propietario.nombre} onChange={(e) => manejarCambioAnidado(e, 'propietario')} />
                            {errores.propNombre && <span className="error">{errores.propNombre}</span>}

                            <input type="text" name="rut" placeholder="RUT (ej: 12345678-9)" value={form.propietario.rut} onChange={(e) => manejarCambioAnidado(e, 'propietario')} />
                            {errores.propRut && <span className="error">{errores.propRut}</span>}

                            <input type="text" name="telefono" placeholder="Teléfono (9 dígitos)" value={form.propietario.telefono} onChange={(e) => manejarCambioAnidado(e, 'propietario')} />
                            {errores.propTel && <span className="error">{errores.propTel}</span>}
                        </div>

            // Ficha Atención
                        <div className="form-section full-width">
                            <h3>Última Atención</h3>
                            <div className="atencion-fields">
                                <input type="date" name="fecha" value={form.ultimaAtencion.fecha} onChange={(e) => manejarCambioAnidado(e, 'ultimaAtencion')} />
                                <input type="text" name="veterinario" placeholder="Veterinario Tratante" value={form.ultimaAtencion.veterinario} onChange={(e) => manejarCambioAnidado(e, 'ultimaAtencion')} />
                                <input type="text" name="diagnostico" placeholder="Diagnóstico" value={form.ultimaAtencion.diagnostico} onChange={(e) => manejarCambioAnidado(e, 'ultimaAtencion')} />
                            </div>
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-secondary" onClick={alCerrar}>Cancelar</button>
                        <button type="submit" className="btn-primary">Guardar Ficha</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormularioMascota;