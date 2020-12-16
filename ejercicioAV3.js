window.onload = () => {
    let formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", function (event) {
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
                    contraseñas.push(element.contraseña)
                });
                console.log(usuarios);
                console.log(contraseñas);
                
                if (usuarios.includes(document.getElementById("usuario"))) {
                    console.log("usuario existe");
                    let indiceUsuario = usuarios.indexOf(document.getElementById("usuario"));
                    if (contraseña[indiceUsuario] == document.getElementById("contraseña")) {
                        alert("Esta to correcto");
                    } else {
                        alert("Contraseña Invalida");
                    }
                } else {
                    alert("Usuario no existe");
                }
            })

    }, false)
}