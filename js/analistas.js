document.addEventListener("DOMContentLoaded", () => {
    cargarOrdenes();
});

function cargarOrdenes() {
    fetch("http://74.207.237.111:8000/api/ordenes")
        .then(response => response.json())
        .then(data => {
            const tablaCuerpo = document.getElementById("tablaOrdenes").querySelector("tbody");
            data.forEach(orden => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${orden.id}</td>
                    <td>${orden.fecha_vencimiento}</td>
                    <td>${orden.fecha_factura}</td>
                    <td>${orden.estado}</td>
                    <td>
                        <button onclick="devolverOrden(${orden.id})">Devolver</button>
                        <button onclick="marcarComoPagada(${orden.id})">Marcar como Pagada</button>
                    </td>
                `;
                tablaCuerpo.appendChild(fila);
            });
        })
        .catch(error => console.error("Error al cargar órdenes:", error));
}

function devolverOrden(id) {
    fetch(`http://74.207.237.111:8000/api/ordenes/${id}/devolver`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ estado: 'creada' })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Orden devuelta a estado 'creada'.");
            cargarOrdenes(); 
        } else {
            alert("Error al devolver la orden.");
        }
    })
    .catch(error => console.error("Error:", error));
}

function marcarComoPagada(id) {
    const fechaPago = new Date().toISOString().slice(0, 10); 
    fetch(`http://74.207.237.111:8000/api/ordenes/${id}/pagar`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ estado: 'pagada', fecha_pago: fechaPago })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Orden marcada como pagada.");
            cargarOrdenes(); 
        } else {
            alert("Error al marcar la orden como pagada.");
        }
    })
    .catch(error => console.error("Error:", error));
}
