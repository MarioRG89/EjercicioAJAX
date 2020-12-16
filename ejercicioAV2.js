window.onload = () => {
    document.getElementById("formulario").addEventListener("submit", function (event) {
        event.preventDefault();
        let url = "http://localhost:3000/compras"
        let compras = {
            descripcion: document.getElementById("descripcion").value,
            preciototal: document.getElementById("precioTotal").value,
            fechaCompra: document.getElementById("fechaCompra").value
        }
        let init = {
            method: 'POST',
            body: JSON.stringify(compras),
            headers: { 'Content-Type': 'application/json' }
        }
        fetch(url, init)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(datosEnviados => console.log(datosEnviados))
            .catch(error => console.error(error));
    }, false)
    document.getElementById("fecha").addEventListener("change",function(){
        let tabla=document.getElementById("tabla");
        let fechaEl=document.getElementById("fecha").value;
        tabla.innerHTML=" <tr> "
        + "<td>Id</td>"
        + "<td>Descripcion</td>"
        + "<td>Precio</td>"
        + "<td>Fecha</td>"
        + "</tr>";
        fetch("http://localhost:3000/compras")
        .then(response=>{
            if (response.ok) {
                return response.json();
            }
        })
        .then(datos=>{
            datos.sort((a,b)=>a.preciototal > b.preciototal);
            datos.forEach(element => {
                if(fechaEl==element.fechaCompra){
                tabla.innerHTML += "<tr>" 
                + "<td>" + element.id + "</td>"
                + "<td>" + element.descripcion + "</td>"
                + "<td>" + element.preciototal + "</td>"
                + "<td>" + element.fechaCompra + "</td>"
                "</tr>"
                }
            });
        })
        .catch(error => console.error(error));

    },false)

}