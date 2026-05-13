alert("JS conectado");
const menu = [
    { nombre: "Lomo Saltado", precio: 28 },
    { nombre: "Ají de Gallina", precio: 22 },
    { nombre: "Ceviche Clásico", precio: 32 },
    { nombre: "Arroz con Mariscos", precio: 35 }
];


// =========================
// ARRAY DE PEDIDOS
// =========================

let pedidos = [];
let detallePedido = [];

// =========================
// MATRIZ DE VENTAS
// =========================
// [cliente, plato, total]

let ventas = [
    ["Carlos", "Lomo Saltado", 56],
    ["Ana", "Ceviche Clásico", 32]
];


function mostrarMenu() {

    console.log("===== MENÚ =====");


    // =========================
    // FOR
    // =========================

    for (let i = 0; i < menu.length; i++) {

        console.log(
            menu[i].nombre + " - S/ " + menu[i].precio
        );

    }

}

mostrarMenu();

function registrarPedido(cliente, mesa, tipoConsumo) {

    let total = 0;

    detallePedido.forEach(item => {

        total += item.importe;

    });

    let pedido = {
        cliente,
        mesa,
        detalle: [...detallePedido],
        tipoConsumo,
        total
    };

    pedidos.push(pedido);

    // Limpiar detalle después de guardar
    detallePedido = [];

    actualizarDetalle();

    console.log("Pedido registrado correctamente");

}


// registrarPedido("David", "Lomo Saltado", 2, "Mesa");
// registrarPedido("Carlos", "Ceviche Clásico", 1, "Delivery");


function mostrarPedidos() {

    console.log("===== PEDIDOS =====");


    // =========================
    // FOREACH
    // =========================

    pedidos.forEach(pedido => {

        console.log(
            pedido.cliente +
            " - Mesa: " +
            pedido.mesa +
            " - Total: S/ " +
            pedido.total
        );

    });

}

mostrarPedidos();

function calcularIGV(subtotal) {

    return subtotal * 0.18;

}


// =========================
// CALCULAR DESCUENTO
// =========================

function calcularDescuento(total) {

    let descuento = 0;


    // =========================
    // IF / ELSE
    // =========================

    if (total >= 100) {

        descuento = total * 0.10;

    }
    else {

        descuento = 0;

    }


    return descuento;

}


// =========================
// CALCULAR TOTAL FINAL
// =========================

function calcularTotal(subtotal) {

    let igv = calcularIGV(subtotal);

    let totalConIGV = subtotal + igv;

    let descuento = calcularDescuento(totalConIGV);

    let totalFinal = totalConIGV - descuento;


    return totalFinal;

}


console.log(calcularTotal(120));


function buscarPedido(nombreCliente) {

    let encontrado = false;


    // =========================
    // FOR
    // =========================

    for (let i = 0; i < pedidos.length; i++) {

        if (pedidos[i].cliente === nombreCliente) {

            console.log("Pedido encontrado:");
            console.log(pedidos[i]);

            encontrado = true;

        }

    }


    if (!encontrado) {

        console.log("No existe el pedido");

    }

}


buscarPedido("David");


function totalDelDia() {

    let total = 0;


    pedidos.forEach(pedido => {

        total += pedido.total;

    });


    console.log("Total del día: S/ " + total);

}


totalDelDia();


function platoMasVendido() {

    let contador = {};

    pedidos.forEach(pedido => {

        pedido.detalle.forEach(item => {

            if (contador[item.plato]) {

                contador[item.plato] += item.cantidad;

            }
            else {

                contador[item.plato] = item.cantidad;

            }

        });

    });

    let maximo = 0;
    let platoTop = "";

    for (let plato in contador) {

        if (contador[plato] > maximo) {

            maximo = contador[plato];
            platoTop = plato;

        }

    }

    console.log("Plato más vendido: " + platoTop);

}


platoMasVendido();

let numero = 1;

while (numero <= 5) {

    console.log("Mesa número: " + numero);

    numero++;

}

// =========================
// MOSTRAR PEDIDOS EN HTML
// =========================

function actualizarTabla() {

    let tabla = document.getElementById("tablaPedidos");

    tabla.innerHTML = "";

    // =========================
    // FOREACH
    // =========================

    pedidos.forEach((pedido, index) => {

        tabla.innerHTML += `
        <tr>
            <td>P-00${index + 1}</td>
            <td>${pedido.cliente}</td>
            <td>${pedido.mesa}</td>
            <td>
                ${pedido.detalle.map(item =>
            item.plato + " x" + item.cantidad
        ).join("<br>")}
            </td>
            <td class="text-end">S/ ${pedido.total}</td>
            <td class="text-center">
                <span class="badge bg-success">
                    Pagado
                </span>
            </td>
        </tr>
    `;

    });
}

// =========================
// EVENTO BOTÓN AGREGAR
// =========================

document.getElementById("btnAgregar").addEventListener("click", function () {

    let plato = document.getElementById("plato").value;

    let cantidad = parseInt(document.getElementById("cantidad").value);

    if (cantidad <= 0 || isNaN(cantidad)) {

        alert("Ingrese una cantidad válida");
        return;

    }

    let platoEncontrado = menu.find(p => p.nombre === plato);

    if (!platoEncontrado) {

        alert("Plato no encontrado");
        return;

    }

    let importe = platoEncontrado.precio * cantidad;

    let item = {
        plato,
        cantidad,
        importe
    };

    detallePedido.push(item);

    actualizarDetalle();

});

// =========================
// EVENTO BOTÓN AGREGAR
// =========================

document.getElementById("btnGuardar").addEventListener("click", function () {

    let cliente = document.getElementById("cliente").value;

    let mesa = document.getElementById("mesa").value;

    if (cliente === "") {

        alert("Complete todos los campos");
        return;

    }

    if (detallePedido.length === 0) {

        alert("Agregue al menos un plato");
        return;

    }

    registrarPedido(cliente, mesa, "Mesa");

    actualizarTabla();
    actualizarReportes();

});
// =========================
// ACTUALIZAR DETALLE
// =========================

function actualizarDetalle() {

    let tabla = document.getElementById("detallePedido");

    tabla.innerHTML = "";

    let subtotal = 0;

    detallePedido.forEach(item => {

        subtotal += item.importe;

        tabla.innerHTML += `
            <tr>
                <td>${item.plato}</td>
                <td class="text-center">${item.cantidad}</td>
                <td class="text-end">S/ ${item.importe}</td>
            </tr>
        `;

    });

    document.getElementById("subtotalDetalle").textContent =
        "S/ " + subtotal.toFixed(2);

}




////////////////////////////////////////////////////////////////////CALCULAR CUENTA/////////////////////////////////////////////////////////////////////
// =========================
// CALCULAR CUENTA
// =========================

document.getElementById("btnCalcular")
.addEventListener("click", function () {

    let subtotal =
        parseFloat(
            document.getElementById("subtotalInput").value
        );

    if (isNaN(subtotal) || subtotal <= 0) {

        alert("Ingrese un subtotal válido");
        return;

    }

    // IGV
    let igv = subtotal * 0.18;

    // Total con IGV
    let totalConIGV = subtotal + igv;

    // Descuento
    let descuento = 0;

    if (totalConIGV >= 100) {

        descuento = totalConIGV * 0.10;

    }

    // Total final
    let totalFinal = totalConIGV - descuento;

    // Mostrar resultados
    document.getElementById("resultadoSubtotal").textContent =
        "S/ " + subtotal.toFixed(2);

    document.getElementById("resultadoIGV").textContent =
        "S/ " + igv.toFixed(2);

    document.getElementById("resultadoDescuento").textContent =
        "- S/ " + descuento.toFixed(2);

    document.getElementById("resultadoTotal").textContent =
        "S/ " + totalFinal.toFixed(2);

});

// =========================
// BUSCAR PEDIDOS
// =========================

document.getElementById("btnBuscar")
.addEventListener("click", function () {

    let tipoBusqueda =
        document.getElementById("tipoBusqueda").value;

    let textoBusqueda =
        document.getElementById("inputBuscar")
        .value
        .toLowerCase();

    if (textoBusqueda === "") {

        alert("Ingrese un dato para buscar");
        return;

    }

    let resultados = [];

    // =========================
    // BUSCAR POR CLIENTE
    // =========================

    if (tipoBusqueda === "Cliente") {

        resultados = pedidos.filter(pedido =>

            pedido.cliente
            .toLowerCase()
            .includes(textoBusqueda)

        );

    }

    // =========================
    // BUSCAR POR PLATO
    // =========================

    else if (tipoBusqueda === "Plato") {

        resultados = pedidos.filter(pedido =>

            pedido.detalle.some(item =>

                item.plato
                .toLowerCase()
                .includes(textoBusqueda)

            )

        );

    }

    // =========================
    // BUSCAR POR PEDIDO
    // =========================

    else if (tipoBusqueda === "Pedido") {

        resultados = pedidos.filter((pedido, index) =>

            ("P-00" + (index + 1))
            .toLowerCase()
            .includes(textoBusqueda)

        );

    }

    // =========================
    // RESULTADOS
    // =========================

    if (resultados.length === 0) {

        alert("No se encontraron resultados");

    }
    else {

        console.log("RESULTADOS:");

        resultados.forEach((pedido, index) => {

            console.log(
                "Pedido: P-00" + (index + 1)
            );

            console.log(
                "Cliente: " + pedido.cliente
            );

            console.log(
                "Mesa: " + pedido.mesa
            );

            console.log(
                "Total: S/ " + pedido.total
            );

            console.log("------------------");

        });

        alert(
            "Se encontraron " +
            resultados.length +
            " resultado(s). Ver consola."
        );

    }

});

// =========================
// ACTUALIZAR REPORTES
// =========================

function actualizarReportes() {

    // =========================
    // TOTAL DEL DÍA
    // =========================

    let totalDia = 0;

    pedidos.forEach(pedido => {

        totalDia += pedido.total;

    });

    document.getElementById("totalDia").textContent =
        "S/ " + totalDia.toFixed(2);

    // =========================
    // CANTIDAD DE PEDIDOS
    // =========================

    document.getElementById("cantidadPedidos").textContent =
        pedidos.length;

    // =========================
    // PLATO MÁS VENDIDO
    // =========================

    let contador = {};

    pedidos.forEach(pedido => {

        pedido.detalle.forEach(item => {

            if (contador[item.plato]) {

                contador[item.plato] += item.cantidad;

            }
            else {

                contador[item.plato] = item.cantidad;

            }

        });

    });

    let platoMasVendido = "Ninguno";

    let maximo = 0;

    for (let plato in contador) {

        if (contador[plato] > maximo) {

            maximo = contador[plato];

            platoMasVendido = plato;

        }

    }

    document.getElementById("platoTop").textContent =
        platoMasVendido;

    document.getElementById("cantidadTop").textContent =
        maximo + " unidades vendidas hoy";

}
