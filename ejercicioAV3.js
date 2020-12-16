window.onload = () => {
    let formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", comprobarUsuarios , false)
}

function comprobarUsuarios(event) {
    event.preventDefault();
    fetch("http://localhost:3000/usuarios")
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(datos => {
            let usuarios = [];
            let contraseñas = [];
            datos.forEach(element => {
                usuarios.push(element.usuario);
                contraseñas.push(element.contraseña);
            });
            console.log(usuarios);
            console.log(contraseñas);
            if (usuarios.includes(document.getElementById("usuario").value)) {
                let nomUsuario = document.getElementById("usuario").value;
                let indiceUsuario = usuarios.indexOf(nomUsuario);
                if (contraseñas[indiceUsuario] == document.getElementById("contraseña").value) {
                    document.getElementById("formulario2").removeAttribute("hidden");
                    document.getElementById("formulario2").addEventListener("submit",buscarLibros,false)

                } else {
                    alert("Contraseña Invalida");
                }
            } else {
                if (confirm("El usuario no existe ¿Quieres registrarte?")) {
                    let url = "http://localhost:3000/usuarios";
                    let cliente = {
                        usuario: document.getElementById("usuario").value,
                        contraseña: document.getElementById("contraseña").value
                    };
                    let init = {
                        method: 'POST',
                        body: JSON.stringify(cliente),
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
                }else{
                    document.body.innerHTML="";
                }
            }
        });
}

function buscarLibros(event){
    event.preventDefault();
    let tabla=document.getElementById("tabla");
    let palabraClave = document.getElementById("busqueda").value;
    fetch("https://www.etnassoft.com/api/v1/get/?keyword=" + palabraClave)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
    })
    .then(datos=>{
        datos.forEach(element => {
            tabla.innerHTML+="<tr>"
            + "<td>" + element.author + "</td>" 
            + "<td><a href= " + element.url_details + " target='blank' >" + element.url_details + "</a></td>"
            + "</tr>"
        });
    })
}
