// CAMBIO DE TABS

const btnRegistro = document.getElementById("btnRegistro");
const btnLogin = document.getElementById("btnLogin");
const formRegistro = document.getElementById("formRegistro");
const formLogin = document.getElementById("formLogin");
const slider = document.querySelector(".switch-slider");

btnRegistro.addEventListener("click", () => {
    slider.style.transform = "translateX(0%)";
    btnRegistro.classList.add("active");
    btnLogin.classList.remove("active");
    formRegistro.classList.add("active");
    formLogin.classList.remove("active");
});

btnLogin.addEventListener("click", () => {
    slider.style.transform = "translateX(100%)";
    btnLogin.classList.add("active");
    btnRegistro.classList.remove("active");
    formLogin.classList.add("active");
    formRegistro.classList.remove("active");
});


// VER CONTRASEÑA

document.querySelectorAll(".toggle-password").forEach(icon => {
    icon.addEventListener("click", () => {
        const input = document.getElementById(icon.dataset.target);
        input.type = input.type === "password" ? "text" : "password";
    });
});


// MEDIDOR SEGURIDAD

const regPassword = document.getElementById("regPassword");
const nivelSeguridad = document.getElementById("nivelSeguridad");

regPassword.addEventListener("input", () => {
    let fuerza = 0;
    const valor = regPassword.value;

    if (valor.length >= 8) fuerza += 30;
    if (/[A-Z]/.test(valor)) fuerza += 30;
    if (/[0-9]/.test(valor)) fuerza += 40;

    nivelSeguridad.style.width = fuerza + "%";

    if (fuerza < 40) nivelSeguridad.style.background = "#ef4444";
    else if (fuerza < 70) nivelSeguridad.style.background = "#f59e0b";
    else nivelSeguridad.style.background = "#22c55e";
});


// REGISTRO

formRegistro.addEventListener("submit", e => {
    e.preventDefault();

    const usuario = document.getElementById("regUsuario").value;
    const correo = document.getElementById("regCorreo").value;
    const password = regPassword.value;
    const confirmPassword = document.getElementById("regConfirmPassword").value;

    if (password !== confirmPassword) {
        alert("❌ Las contraseñas no coinciden");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.find(u => u.correo === correo);

    if (existe) {
        alert("❌ El correo ya está registrado");
        return;
    }

    usuarios.push({
        usuario,
        correo,
        password
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("✅ Usuario registrado correctamente");

    formRegistro.reset();
    nivelSeguridad.style.width = "0%";
});


// LOGIN

formLogin.addEventListener("submit", e => {
    e.preventDefault();

    const correo = document.getElementById("loginCorreo").value;
    const password = document.getElementById("loginPassword").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioValido = usuarios.find(
        u => u.correo === correo && u.password === password
    );

    if (usuarioValido) {
        alert("🎉 Bienvenido " + usuarioValido.usuario);
    } else {
        alert("❌ Credenciales incorrectas");
    }

    formLogin.reset();
});