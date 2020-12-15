window.onload = function () {
    document.getElementsByName("putosBotonesRadioAsco")[0].addEventListener("change", function () {
        fetch("http://localhost:3000/animales")
            .then(respuesta =>{ 
                if(respuesta.ok){
                return respuesta.json();
            }else{
                return "Error HTTP :" + respuesta.status + "(" + respuesta.statusText + ")";
            }})
            .then((datos) => {
                console.log(datos);
                datos.forEach(dato => {
                    console.log(dato.Nombre);
                });
            })
            .catch(error => console.error(error));
    }, false)
    document.getElementsByName("putosBotonesRadioAsco")[1].addEventListener("change", function () {
        let url = "http://localhost:3000/animales";
        let nuevoAnimal = {
            Nombre: "PedroPo",
            Observacion: "Disfuncional",
            Rasgos: "pelo  castaño",
            Tipo: "perro",
            Ubicacion: "Salamanca",
        };
        let init = {
            method: 'POST',
            body: JSON.stringify(nuevoAnimal),
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(url,init)
            .then(response=>{
                if(response.ok){
                return response.json();
            }else{
                return "Error HTTP :" + response.status + "(" + response.statusText + ")";
            }})
            .then(datosEnviados=> console.log(datosEnviados))
            .catch(error => console.error(error));
    }, false)

}