window.onload = function () {
    document.getElementById("formulario").addEventListener("submit", manejarEventoSubmit, false)
}
function manejarEventoSubmit(event) {
    event.preventDefault();
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return "Error HTTP :" + respuesta.status + "(" + respuesta.statusText + ")";
            }
        })
        .then(datos => {
            datos.forEach(element => {
                console.log(element.name);
            });
        }
        )
        .catch(error => console.error(error))
}
