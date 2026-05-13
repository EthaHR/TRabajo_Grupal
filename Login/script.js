const togglePassword = document.querySelector('#togglePassword');
const passwordField = document.querySelector('#password');

togglePassword.addEventListener('click', function () {
    // Cambia el tipo: si es password lo pasa a text y viceversa
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);

    // Cambia el icono: de ojo abierto a ojo tachado
    this.querySelector('i').classList.toggle('bi-eye');
    this.querySelector('i').classList.toggle('bi-eye-slash');
});


document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const cargo = document.getElementById('cargo').value;
    const password = document.getElementById('password').value;
    const mensajeError = document.getElementById('mensajeError');
    const passInput = document.getElementById('password');

    if (
        (cargo === "Administrador" && password === "admin123") ||
        (cargo === "Gerente" && password === "gerente123") ||
        (cargo === "Operador" && password === "operador123")
    ) {

        mensajeError.classList.add('d-none');
        passInput.classList.remove('is-invalid');

        alert("Acceso concedido para: " + cargo);

        setTimeout(() => {
            window.location.href = "../MainMenu/mainMenu.html";
        }, 1500);

    } else {

        mensajeError.classList.remove('d-none');
        passInput.classList.add('is-invalid');

    }
});



