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
                let usuarios=[];
                let contraseña=[];
                datos.forEach(element => {
                    usuarios.push(element.usuario);
                    contraseña.push(element.contraseña)
                });
                if(usuarios.includes(document.getElementById("usuario"))){
                    console.log("usuario existe");
                    
                }
            })
           
    }, false)
}