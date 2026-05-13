
// 1. CONFIGURACIÓN INMUTABLE
const CONFIG_BANQUETE = Object.freeze({
    COSTO_DELIVERY: 7.00,
    TIPO_DELIVERY: 'delivery',
    TIPO_MESA: 'mesa',
    IGV_FACTOR: 0.18
});

// 2. MATRIZ DE PROMOCIONES
const PROMOCIONES_DISPONIBLES = [
    { codigo: "BANQUETE10", porcentaje: 0.10, descripcion: "10% de descuento por apertura" },
    { codigo: "BIENVENIDA", montoFijo: 5.00, descripcion: "S/ 5.00 de descuento inicial" },
    { codigo: "PROMOVIP", porcentaje: 0.20, descripcion: "20% de descuento especial" }
];

// 3. FUNCIONES LÓGICAS (Capa de Negocio)

const calcularRecargoServicio = (tipo) => {
    return (tipo === CONFIG_BANQUETE.TIPO_DELIVERY) ? CONFIG_BANQUETE.COSTO_DELIVERY : 0;
};

const buscarCupon = (codigo) => {
    if (!codigo || typeof codigo !== 'string') return null;
    const codigoLimpio = codigo.trim().toUpperCase();
    return PROMOCIONES_DISPONIBLES.find(p => p.codigo === codigoLimpio) || null;
};

const calcularMontoDescuento = (subtotal, promo) => {
    if (!promo || subtotal <= 0) return 0;
    const descuento = promo.porcentaje 
        ? (subtotal * promo.porcentaje) 
        : (promo.montoFijo || 0);
    return Math.min(descuento, subtotal);
};

// 4. CONTROLADOR DE LA INTERFAZ (DOM)

function procesarVenta() {
    // A. CAPTURA DEL MONTO DINÁMICO
    // Obtenemos el valor del nuevo input que pusimos en el HTML
    const inputMonto = document.getElementById('inputSubtotal').value;
    const subtotalCarrito = parseFloat(inputMonto) || 0; 

    // B. Captura de servicios y cupones
    const inputServicio = document.querySelector('input[name="tipoServicio"]:checked').value;
    const inputCupon = document.getElementById('inputCupon').value;

    // C. Ejecución de lógica de negocio
    const promoActiva = buscarCupon(inputCupon);
    const montoDescuento = calcularMontoDescuento(subtotalCarrito, promoActiva);
    const montoRecargo = calcularRecargoServicio(inputServicio);
    
    const baseConDescuento = subtotalCarrito - montoDescuento;
    const montoIGV = baseConDescuento * CONFIG_BANQUETE.IGV_FACTOR;
    const totalFinal = baseConDescuento + montoIGV + montoRecargo;

    // D. Renderizado de resultados
    document.getElementById('resSubtotal').innerText = `S/ ${subtotalCarrito.toFixed(2)}`;
    document.getElementById('resDescuento').innerText = `- S/ ${montoDescuento.toFixed(2)}`;
    document.getElementById('resRecargo').innerText = `S/ ${montoRecargo.toFixed(2)}`;
    document.getElementById('resIGV').innerText = `S/ ${montoIGV.toFixed(2)}`;
    document.getElementById('resTotal').innerText = `S/ ${totalFinal.toFixed(2)}`;
    
    // Feedback visual del cupón
    const mensajeElemento = document.getElementById('mensajePromo');
    if (promoActiva) {
        mensajeElemento.innerText = `✅ Aplicado: ${promoActiva.descripcion}`;
        mensajeElemento.style.color = "#27ae60";
    } else if (inputCupon !== "") {
        mensajeElemento.innerText = "❌ El código ingresado no existe.";
        mensajeElemento.style.color = "#e74c3c";
    } else {
        mensajeElemento.innerText = "Ingresa un cupón para validar beneficios.";
        mensajeElemento.style.color = "#666";
    }
}

// 5. ESCUCHADORES DE EVENTOS (Listeners)

// Escuchar cuando escriben el monto (se actualiza en tiempo real)
document.getElementById('inputSubtotal').addEventListener('input', procesarVenta);

// Botón de cupón
document.getElementById('btnAplicar').addEventListener('click', procesarVenta);

// Radio buttons de servicio
document.querySelectorAll('input[name="tipoServicio"]').forEach(opcion => {
    opcion.addEventListener('change', procesarVenta);
});

// Inicializar con el valor por defecto del HTML
window.onload = procesarVenta;