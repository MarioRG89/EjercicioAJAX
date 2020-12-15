window.onload = function () {
    var select = document.getElementById("pais");
    var select2 = document.getElementById("ciudad");
    var formulario = document.getElementById("formulario");
    var formulario2 = document.getElementById("formulario2");
    mostrarPais(select);
    mostrarCiudad(select2);
    select.addEventListener("change", function () {
        cambiarOpciones(select2, select);
    }, false)
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();
        let tabla = document.getElementById("tabla");
        tabla.innerHTML = "";
        fetch("http://localhost:3000/monumentos")
            .then(respuesta => {
                if (respuesta.ok) {
                    return respuesta.json();
                } else {
                    return "error";
                }
            })
            .then((datos) => {
                datos.forEach(element => {
                    if (element.ciudad == select2.value) {
                        document.getElementById("tabla").innerHTML += "<td>" + element.nombre + "</td>";
                    }
                })
            })
    }, false)
    formulario2.addEventListener("submit", function (event) {
        event.preventDefault()
        fetch("http://localhost:3000/paises")
            .then(response => response.json())
            .then(datos => {
                let pais = [];
                datos.forEach(element =>
                    pais.push(element.nombre)
                )
                if (!pais.includes(document.getElementById("Pais").value)) {
                    enviarPais();
                } else {
                    console.log("existe el pais");
                }
            });
        fetch("http://localhost:3000/ciudades")
            .then(response=> response.json())
            .then(datos=>{
                let ciudades=[];
                datos.forEach(element=>
                    ciudades.push(element.nombre)    
                )
                if (!ciudades.includes(document.getElementById("Ciudad").value)) {
                    enviarCiudad();
                } else {
                    console.log("existe la ciudad");
                }
            })
        fetch("http://localhost:3000/monumentos")
        .then(response=> response.json())
            .then(datos=>{
                let monumentos=[];
                datos.forEach(element=>
                    monumentos.push(element.nombre)  
                )
                if (!monumentos.includes(document.getElementById("Monumento").value)) {
                    enviarMonumento();
                } else {
                    console.log("existe el monumento");
                }
            })
    }, false)
}
function enviarPais() {
    let url = "http://localhost:3000/paises";
    let pais = {
        Nombre: document.getElementById("Pais").value
    };
    let init = {
        method: 'POST',
        body: JSON.stringify(pais),
        headers: { 'Content-Type': 'application/json' }
    };
    fetch(url, init)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(datosEnviados => console.log(datosEnviados))
        .catch(error => console.error(error));
}
function enviarCiudad() {
    let url = "http://localhost:3000/ciudades";
    let ciudad = {
        Pais:document.getElementById("Pais").value,
        Nombre: document.getElementById("Ciudad").value
    };
    let init = {
        method: 'POST',
        body: JSON.stringify(ciudad),
        headers: { 'Content-Type': 'application/json' }
    };
    fetch(url, init)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(datosEnviados => console.log(datosEnviados))
        .catch(error => console.error(error));
}
function enviarMonumento() {
    let url = "http://localhost:3000/monumentos";
    let monumento = {
        Ciudad: document.getElementById("Ciudad").value,
        Nombre: document.getElementById("Monumento").value   
    };
    let init = {
        method: 'POST',
        body: JSON.stringify(monumento),
        headers: { 'Content-Type': 'application/json' }
    };
    fetch(url, init)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(datosEnviados => console.log(datosEnviados))
        .catch(error => console.error(error));
}


function cambiarOpciones(select2, select) {
    select2.innerHTML = "";
    fetch("http://localhost:3000/ciudades")
        .then(respuesta => {
            if (respuesta.ok) {
                return respuesta.json();
            } else {
                return "error";
            }
        })
        .then((datos) => {
            datos.forEach(element => {
                if (element.pais == select.value) {
                    select2.innerHTML += "<option> " + element.nombre + "</option>";
                }
            });
        });
}
function mostrarPais(select) {
    fetch("http://localhost:3000/paises")
        .then(respuesta => {
            if (respuesta.ok) {
                return respuesta.json();
            } else {
                return "error";
            }
        })
        .then((datos) => {
            datos.forEach(element => {
                select.innerHTML += "<option > " + element.nombre + "</option>";
            });

        })
        .catch(error => console.error(error));
}
function mostrarCiudad(select2) {
    fetch("http://localhost:3000/ciudades")
        .then(respuesta => {
            if (respuesta.ok) {
                return respuesta.json();
            } else {
                return "error";
            }
        })
        .then((datos) => {
            datos.forEach(element => {
                select2.innerHTML += "<option> " + element.nombre + "</option>";
            });
        })
        .catch(error => console.error(error));
}

