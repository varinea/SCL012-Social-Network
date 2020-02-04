import * as auth from '/lib/loginGmail.js'
//  Función que crea la pagina de inicio
function showLogIn() {
    window.location.hash = '/login';
    root.innerHTML = `
  <section>
  <div class="box-flex">
      <div class="col-login">
          <div class="fila">
              <img src="../img/logode.png" class="full" alt="">
          </div>
          <div class="fila">
              <input id="email" type="email" class="input-blanco" placeholder="ingresa tu Email" required>
          </div>
          <div class="fila">
              <input id="password" type="password" class="input-blanco" placeholder="Ingresa tu contraseña" required>
          </div>
          <div class="fila">
              <button id="logIn" class="btn-naranjo">INICIAR SESIÓN</button>
              
          </div>
          <div>
              <p class="center-text">
                  <a href="" id="recoverBtn" class="recordar-pass">¿Olvidaste tu contraseña?</a>
              </p>
          </div>
          </div>
                    <div class="fila">
                        <img src="../img/brujo.png" alt="" class="fullwidth">
                    </div>
                    
                    
                    <div class="fila">
                        <ul class="inicio-icons">
                            <li>
                                Iniciar sesión con:
                            </li>
                            <li>
                                <a href="" id="btnGmail" ><img src="../img/icon-gmail.png" class="small-icon" alt=""></a>
                            </li>
                            <li>
                                <a href="" id="btnFace"><img src="../img/icon-fb.png" class="small-icon" alt=""></a>
                            </li>
                        </ul>
                    </div>
                    <div class="fila">

                         <button id="registerMe" class="btn-naranjo">REGISTRATE</button>

            
                    </div>
                </div>
            </div>
        </section>`

    document.getElementById('btnGmail').addEventListener('click', () => {
        console.log('click');
        auth.authFire();
    });
    document.getElementById('btnFace').addEventListener('click', () => {
        auth.authFacebook();
    });
}
// función que realiza el incio de sesión en firebase
function logIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)

        .catch(function (error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            alert('Debe Ingresar su correo electrónico y Contraseña')
            // ...
            console.log(errorCode);
            console.log(errorMessage); s
        });

}


// Recuperación de contraseña
let recoverPass = function () { // para invocar a la funcion de firebase
    let auth = firebase.auth();
    let emailAddress = document.getElementById('email').value; //para recuperar valor email
    console.log("EMAIL:", emailAddress);
    auth.sendPasswordResetEmail(emailAddress)//metodo para recuperacion de correo
        .then(function () { //notificar cuando se envio el correo
            alert('Se ha enviado un correo a tu cuenta. Porfavor sigue las intrucciones')

        }, function (error) { // funcion anonima para manejar errores
            console.log(error)
        })
}


export { showLogIn, logIn, recoverPass }