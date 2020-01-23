// // Este es el punto de entrada de tu aplicacion

// import { myFunction } from './lib/index.js';

// myFunction();

const btnRegister= document.getElementById('registerMe').addEventListener('click', registerMe)
const btnLogIn = document.getElementById('logIn').addEventListener('click', logIn)
 

// REGISTRAR USUARIO
function registerMe() {
  const root = document.getElementById('root')
    root.innerHTML=  `<h4>Registro de Usuarios</h4>
  <input id="registerEmail" type="email" placeholder="ingresa tu Email">
  <input id="registerPassword" type="password" placeholder="Ingresa tu contraseña">`
}

function register() {
    const registerEmail = document.getElementById('registerEmail').value;
    const registerPassword = document.getElementById('registerPassword').value;
    
    firebase.auth().createUserWithEmailAndPassword(registerEmail, registerPassword)
    .catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
      });    
};

// LOGEARSE Y CERRAR SESIÓN
function logIn() { /* VARINEA meti mano*/
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    root.innerHTML = `

    <h1>DP</h1>
    <br>
    <button id="homeMuro">HOME</button>
    <button id="perfilUsuario">fotoUsuario</button>
    <br>
    <!-- Buscador -->
    <input type="text" id="searchMuro" class="searchClass" placeholder="Buscador de DovePLayer"></input>

    <!-- Cerrar sesión -->
    <button id="btnSignOff">Cerrar Sesión</button>
    `  
   
   document.getElementById('btnSignOff').addEventListener('click', signOff)
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);s
      });

}

// funcion CERRAR SESIÓN
function signOff() {
  
  firebase.auth().signOut()
  .then(function(){
    document.location.href="/";
    //console.log('saliendo....')
  })
  .catch(function(error){
    console.log('error')
  });
}


 function observer() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      let displayName = user.displayName;
      let email = user.email;
      let emailVerified = user.emailVerified;
      let photoURL = user.photoURL;
      let isAnonymous = user.isAnonymous;
      let uid = user.uid;
      let providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      // ...
    }

  });

 }
 observer();

 // recuperacion de clave
 const recoverBtn = document.getElementById("recoverBtn");
 recoverBtn.addEventListener('click', () => {  //llamando al boton

// function recoverPassword(){
const contentRecover = document.getElementById('contentRecover');//llamando divcontenedor en html
    console.log('recuperar contraseña')
    const inputRecover = document.createElement("input");//creando input
    inputRecover.setAttribute('id','inputRecover'); 
    contentRecover.appendChild(inputRecover);
 
  inputRecover.type = 'text'; //indicando que tipo de input es
  inputRecover.id="inputRecover";//crear id de input
  const writeEmail = inputRecover.value;//declarando constante para que tome valor del input 
  contentRecover.appendChild(inputRecover);//hacendo hijo al input del div contenedor
 

let recoverPass = function(){// para invocar a la funcion de firebase
  let auth = firebase.auth();
  let emailAddress = document.getElementById('inputRecover').value; //para recuperar valor email
  auth.sendPasswordResetEmail(emailAddress)//metodo para recuperacion de correo
  .then(function(){ //notificar cuando se envio el correo
    alert('Se ha enviado un correo a tu cuenta. Porfavor sigue las intrucciones')

  },function(error){ // funcion anonima para manejar errores
    console.log(error)
  })
}
recoverPass(writeEmail);//indicando que al hacer click aplique esta funcion 

})

  