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


document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const cargo = document.getElementById('cargo').value;
    const password = document.getElementById('password').value;
    const mensajeError = document.getElementById('mensajeError');
    const passInput = document.getElementById('password');

    // Limpiar estados de error previos
    mensajeError.classList.add('d-none');
    passInput.classList.remove('is-invalid');

    // VALIDACIÓN PARA ADMINISTRADOR
    // Cargo: Administrador | Pass: 12345678
    if (cargo === "Administrador" && password === "12345678") {
        alert("Acceso concedido como Administrador");
        window.location.href = "admin.html"; // Cambia por tu página real
    } 
    // VALIDACIÓN PARA MOZO
    // Cargo: Mozo | Pass: 87654321
    else if (cargo === "Mozo" && password === "87654321") {
        alert("Acceso concedido como Mozo");
        window.location.href = "mozo.html"; // Cambia por tu página real
    } 
    // SI NADA COINCIDE
    else {
        mensajeError.classList.remove('d-none');
        passInput.classList.add('is-invalid');
        // Opcional: un mensaje más específico
        mensajeError.innerHTML = '<small><i class="bi bi-exclamation-circle me-1"></i> Credenciales incorrectas para el cargo seleccionado</small>';
    }
});

