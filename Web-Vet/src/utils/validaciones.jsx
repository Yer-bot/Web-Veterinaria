export function validarRut(rut) {
    if (!rut || typeof rut !== 'string') return false;

    const rutLimpio = rut.replace(/[^0-9kK]/g, '');
    if (rutLimpio.length < 8) return false;

    const cuerpo = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1).toLowerCase();

    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i], 10) * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    const dvEsperado = 11 - (suma % 11);
    let dvCalculado = '0';
    if (dvEsperado === 11) dvCalculado = '0';
    else if (dvEsperado === 10) dvCalculado = 'k';
    else dvCalculado = dvEsperado.toString();

    return dv === dvCalculado;
}

export function formatearRut(rut) {
    let value = rut.replace(/[^0-9kK]/g, '');
    if (value.length > 1) {
        const cuerpo = value.slice(0, -1);
        const dv = value.slice(-1).toLowerCase();
        return `${cuerpo}-${dv}`;
    }
    return value;
}

export function validarTelefono(tel) {
    const regexTel = /^[0-9]{9}$/;
    return regexTel.test(tel.replace(/\s+/g, ''));
}