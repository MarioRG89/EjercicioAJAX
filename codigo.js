window.onload = function () {
    document.getElementById("formulario").addEventListener("submit", function (event) {
        event.preventDefault();
        pedroPO()
            .then((p) => {
                let tabla = document.getElementById("tabla");
                tabla.innerHTML += "<td> " + p.nombre + "</td>" + "<td>" + p.apellidos + "</td>" + "<td>" + p.dni + "</td>" + "<td>" + p.fecha + "</td>" + "<td>" + p.sexo + "</td>" + "<td>" + p.preferencias + "</td>";
            })
            .catch();
    }, false)
    document.getElementById("boton1").addEventListener("click", function () {
        borrarCliente()
            .then((datos) => {
                for (i = 0; i < datos.length; i++) {
                    if (datos[i].dni == document.getElementById("dni").value) {
                        let indiceCliente = datos[i].id;
                        newFunction2(indiceCliente)
                            .then((mensaje) => {
                                console.log(mensaje + " error");
                            })
                            .catch();
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, false);
    document.getElementById("boton2").addEventListener("click", function () {
        modificarCliente()
            .then((datos) => {
                for (i = 0; i < datos.length; i++) {
                    if (datos[i].dni == document.getElementById("dni").value) {
                        let indiceCliente = datos[i].id;
                        newFunction(indiceCliente)
                            .then((mensaje) => {
                                console.log(mensaje);
                            })
                            .catch();
                    }
                }
            })
    }, false);
}

function pedroPO() {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        var Cliente = {
            nombre: document.getElementById("nombre").value,
            apellidos: document.getElementById("apellidos").value,
            dni: document.getElementById("dni").value,
            fecha: document.getElementById("fecha").value,
            sexo: radioButton(),
            preferencias: checkBoxes()
        };
        let datos = JSON.stringify(Cliente);
        request.open("POST", "http://localhost:3000/clientes", true);
        request.setRequestHeader("Content-type", "application/JSON");
        request.send(datos);
        request.addEventListener('load', () => {
            if (request.status === 201) {
                resolve(JSON.parse(request.responseText));
            } else {
                reject("Error " + request.status + " (" + request.statusText + ") en la petición");
            }
        });
    });
}
function modificarCliente() {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("GET", "http://localhost:3000/clientes", true);
        request.send();
        request.addEventListener('load', () => {
            if (request.status === 200) {
                resolve(JSON.parse(request.responseText));
            } else {
                reject("Error " + request.status + " (" + request.statusText + ") en la petición");
            }
        })
    });
}
function radioButton() {
    if (document.getElementById("radio1").checked) {
        return document.getElementById("radio1").value;
    } else {
        return document.getElementById("radio2").value;
    }
}
function checkBoxes() {
    console.log("ha entrado");
    let checkB = document.querySelectorAll("input[type = checkbox]");
    let texto = "";
    for (let i = 0; i < checkB.length; i++) {
        if (checkB[i].checked) {
            console.log("ha entrado al if");
            texto += checkB[i].value + "_";
        }
    }
    return texto;
}
function borrarCliente() {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("GET", "http://localhost:3000/clientes", true);
        request.send();
        request.addEventListener('load', () => {
            if (request.status === 200) {
                resolve(JSON.parse(request.responseText));
            } else {
                reject("Error " + request.status + " (" + request.statusText + ") en la petición");
            }
        })
    });
}
function newFunction2(indiceCliente) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        let url = "http://localhost:3000/clientes/" + indiceCliente;
        request.open("DELETE", url, true);
        request.send();
        request.addEventListener('load', () => {
            if (request.status === 200) {
                resolve(" Los datos se han borrado");
            } else {
                reject("Error " + request.status + " (" + request.statusText + ") en la petición");
            }
        })
    });
}
function newFunction(indiceCliente) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        var Data = {
            nombre: document.getElementById("nombre").value,
            apellidos: document.getElementById("apellidos").value,
            dni: document.getElementById("dni").value,
            fecha: document.getElementById("fecha").value,
            sexo: radioButton(),
            preferencias: checkBoxes()
        };
        let datos = JSON.stringify(Data);
        let url = "http://localhost:3000/clientes/" + indiceCliente;
        request.open("PUT", url, true);
        request.setRequestHeader("Content-type", "application/JSON");
        request.send(datos);
        request.addEventListener('load', () => {
            if (request.status === 200) {
                resolve(" Los datos se han actualizado");
            } else {
                reject("Error " + request.status + " (" + request.statusText + ") en la petición");
            }

        })
    });
}
