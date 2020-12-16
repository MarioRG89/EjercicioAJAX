window.onload = function () {
    var select = document.getElementById("pais");
    var select2 = document.getElementById("ciudad");
    var formulario = document.getElementById("formulario");
    var formulario2 = document.getElementById("formulario2");
    var modificar= document.getElementById("modificar");
    var borrar= document.getElementById("borrar");
    mostrarPais(select);
    mostrarCiudad(select2);
    select.addEventListener("change", function () {
        cambiarOpciones(select2, select);
    }, false)
    //Mostrar monumentos en la tabla
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
                //Muestra los monumentos correspondiente de la ciudad
                datos.forEach(element => {
                    if (element.ciudad == select2.value) {
                        document.getElementById("tabla").innerHTML += "<td>" + element.nombre + "</td>";
                    }
                })
            })
    }, false)
    //Comprobaciones de si esta ya el pais ciudad o monumento
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
            .then(response => response.json())
            .then(datos => {
                let ciudad = document.getElementById("nomCiudad").value;
                let ciudades = [];
                datos.forEach(element =>
                    ciudades.push(element.nombre)
                )
                console.log(ciudades);
                if (!ciudades.includes(ciudad)) {
                    console.log("entre");
                    enviarCiudad();
                } else {
                    console.log("existe la ciudad");
                }
            })
        fetch("http://localhost:3000/monumentos")
            .then(response => response.json())
            .then(datos => {
                let monumentos = [];
                datos.forEach(element =>
                    monumentos.push(element.nombre)
                )
                console.log(monumentos);
                if (!monumentos.includes(document.getElementById("nomMonumento").value)) {
                    enviarMonumento();
                } else {
                    console.log("existe el monumento");
                }
            })
    }, false)
    modificar.addEventListener("click",modificarEngeneral,false)
    borrar.addEventListener("click",borrarEngeneral,false)
}
//POST de pais
function enviarPais() {
    let url = "http://localhost:3000/paises";
    let pais = {
        nombre: document.getElementById("Pais").value
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
//POST de ciudad
function enviarCiudad() {
    let url = "http://localhost:3000/ciudades";
    let ciudad = {
        pais: document.getElementById("Pais").value,
        nombre: document.getElementById("nomCiudad").value
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
//POST de monumento
function enviarMonumento() {
    let url = "http://localhost:3000/monumentos";
    let monumento = {
        ciudad: document.getElementById("nomCiudad").value,
        nombre: document.getElementById("nomMonumento").value
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

//Select anidados pais con sus ciudades
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
//Mostrar pais en el select
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
//Mostrar ciudades en el select
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
// modificar pais
function modificarEngeneral() {
    fetch("http://localhost:3000/paises")
        .then(respuesta => {
            if (respuesta.ok) {
                return respuesta.json();
            } else {
                return "error";
            }
        })
        .then((datos) => {
            let nombre = [];
            datos.forEach(element => {
                nombre.push(element.nombre);
            });
            console.log(nombre);
            let idMod = nombre.indexOf(document.getElementById("pais").value);
            console.log(idMod);
            let url = "http://localhost:3000/paises/" + (idMod + 1);
            let pais = {
                nombre: document.getElementById("Pais").value
            };
            let init = {
                method: 'PUT',
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

        })
        .catch(error => console.error(error));
}
//borrar pais
function borrarEngeneral() {
    fetch("http://localhost:3000/paises")
        .then(respuesta => {
            if (respuesta.ok) {
                return respuesta.json();
            } else {
                return "error";
            }
        })
        .then((datos) => {
            let nombre = [];
            datos.forEach(element => {
                nombre.push(element.nombre);
            });
            console.log(nombre);
            let idMod = nombre.indexOf(document.getElementById("pais").value);
            console.log(idMod);
            let url = "http://localhost:3000/paises/" + (idMod + 1);
            let init = {
                method: 'DELETE',
                body: '',
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

        })
        .catch(error => console.error(error));
}