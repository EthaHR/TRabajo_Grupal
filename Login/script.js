const togglePassword = document.querySelector('#togglePassword');
const passwordField = document.querySelector('#password');
const loginForm = document.getElementById('loginForm');
const submitBtn = loginForm.querySelector('button[type="submit"]');

// --- NUEVAS VARIABLES DE VALIDACIÓN ---
let intentosFallidos = 0;
const MAX_INTENTOS = 3;

// Mostrar y ocultar la contraseña
togglePassword.addEventListener('click', function () {
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.querySelector('i').classList.toggle('bi-eye');
    this.querySelector('i').classList.toggle('bi-eye-slash');
});

// Procesos del Login (Captura y verificación de credenciales)
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const cargo = document.getElementById('cargo').value;
    const password = document.getElementById('password').value;
    const mensajeError = document.getElementById('mensajeError');
    const passInput = document.getElementById('password');

    // Limpiar estados de error previos
    mensajeError.classList.add('d-none');
    passInput.classList.remove('is-invalid');

    // VALIDACIÓN PARA ADMINISTRADOR
    if (cargo === "Administrador" && password === "12345678") {
        alert("Acceso concedido como Administrador");
        window.location.href = "admin.html";
    } 
    // VALIDACIÓN PARA MOZO
    else if (cargo === "Mozo" && password === "87654321") {
        alert("Acceso concedido como Mozo");
        window.location.href = "mozo.html";
    } 
    // SI NADA COINCIDE
    else {
        intentosFallidos++;
        const intentosRestantes = MAX_INTENTOS - intentosFallidos;

        mensajeError.classList.remove('d-none');
        passInput.classList.add('is-invalid');

        if (intentosFallidos >= MAX_INTENTOS) {
            // BLOQUEO DEL SISTEMA
            mensajeError.innerHTML = `
                <div class="alert alert-danger p-2">
                    <i class="bi bi-x-circle-fill me-1"></i> 
                    Acceso bloqueado. Demasiados intentos fallidos.
                </div>`;
            submitBtn.disabled = true;
            passInput.disabled = true;
            document.getElementById('cargo').disabled = true;
        } else {
            // MENSAJE DE INTENTOS RESTANTES
            mensajeError.innerHTML = `
                <small>
                    <i class="bi bi-exclamation-circle me-1"></i> 
                    Credenciales incorrectas. Te quedan <b>${intentosRestantes}</b> intentos.
                </small>`;
        }
    }
});