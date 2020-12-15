window.onload = function () {
    document.getElementById("boton1").addEventListener("click", function () {
        alert("hola");
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(respuesta =>{
                if(respuesta.ok){
                    return respuesta.json();
                }else{
                    return "Error HTTP :" + respuesta.status + "(" + respuesta.statusText + ")";
                }
            })
            .then( (datos) => {
                let tabla = document.getElementById("tabla");
                console.log(datos);
                datos.forEach(dato => {
                    console.log("hola");
                    tabla.innerHTML += "<tr> <td>" + dato.name + "</td>" + "<td>" + dato.email + "/<td> </tr>";
                }); 
            })
            .catch(error => console.error(error))
    }, false);
}
