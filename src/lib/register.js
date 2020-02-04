// ___________________REGISTRARSE___________________
// Función que muestra formulario de registro
function registerMe() {
  window.location.hash = '/register';
  const root = document.getElementById('root');
  root.innerHTML = `
  <div class="sparrowContainer">
    <h1>Crear Cuenta</h1>
    <input class="input-home" id="name" placeholder="Nombre y Apellido">
    <input class="input-home" id="date" type="date" placeholder="Fecha de Nacimiento">
    <form>
    <input class="input-home" type="radio" name="gender" value="male" > Masculino
    <input class="input-home" type="radio" name="gender" value="female"> Femenino
    <input class="input-home" type="radio" name="gender" value="other"> Otro
    </form>
    <input class="input-home" id="registerEmail" type="email" placeholder="Ingresa tu Email">
    <h2>Tu contraseña debe tener un mínimo de 6 caracteres númericos</h2>
    <input class="input-home" id="registerPassword" type="password" placeholder="Ingresa tu contraseña">
    <button class="sparrowContainer" id="btnRegisterMe">Registrarme</button>
    </div> 
  `;
  document.getElementById('btnRegisterMe').addEventListener('click', register);
}

//  Función para registro con Firebase
function register() {
  const registerEmail = document.getElementById('registerEmail').value;
  const registerPassword = document.getElementById('registerPassword').value;
  firebase.auth().createUserWithEmailAndPassword(registerEmail, registerPassword)
    .then(() => {
      check(alert('La cuenta se ha creado exitosamente'))
    })
    .catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('Debe completar todos los campos');
      // ...
      console.log(errorCode);
      console.log(errorMessage);
});
}

// ___________________CERRAR SESIÓN___________________

function check() {
  const user = firebase.auth().currentUser;
  user.sendEmailVerification().then(() => {
    console.log('enviando correo...');
})
    .catch((error) => {
      console.log(error);
});
}
export { registerMe, register, check }