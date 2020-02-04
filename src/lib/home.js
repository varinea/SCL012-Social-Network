// Función que muestra el muro
function showHome(user) {
  if (user.emailVerified) {
    window.location.hash = '/home';
    // eslint-disable-next-line no-undef
    root.innerHTML = `
      <div class="sparrowContainer">
      <img src="../img/logode.png" class="img.full " alt="Logotipo">
      <!-------------- POST Usuario -------------->
      <h1>Cuentanos que quieres jugar</h1>
  
      <!-------------- Titulo POST -------------->
      <input type="text" class="input-home" Id="postTittle" size="15" maxlength="20" placeholder="Titulo">
  
      <!-------------- Comentario POST -------------->
      <input type="text" class="input-home"  Id="postText" rows="10" cols="40" placeholder="Escribe aquí tu comentario">
  
      <!-------------- Boton Publicar POST -------------->
      <button id="postbutton"class="sparrowContainer">Publicar</button>
      <div id="postUsuario"></div>
      
      <!-------------- Cerrar Sesión -------------->
      <button id="btnSignOff" class="sparrowContainer">Cerrar Sesión</button>  
      </div>
      `;

    document.getElementById('btnSignOff').addEventListener('click', () => {
      firebase.auth().signOut()
        .then(() => {
          document.location.href = "/";
        })
        .catch((error) => {
          console.log('error')
        });
    });

    // ___________________CREAR POST___________________

    const db = firebase.firestore();
    document.getElementById('postbutton').addEventListener('click', () => {
      const postTittle2 = document.getElementById('postTittle').value;
      const postText2 = document.getElementById('postText').value;
      db.collection('users').add({
        Titulo: postTittle2,
        Texto: postText2,
      })
        .then(() => {
          // console.log("Document written with ID: ", docRef.id);
          document.getElementById('postTittle').value = ''; // Una vez se haya generado el dato se dara un string limpio (reseteara la pag)
          document.getElementById('postText').value = '';
        })
        .catch(() => {
          // console.error("Error adding document: ", error);
        });
    });

    // ___________________Like Post___________________

    function likePost(id) {
      const user = firebase.auth().currentUser;
      db.collection('users').doc(id).get().then((resultado) => {
        let post = resultado.data();
        if (post.like == null || post.like == '') {
          post.like = [];
          console.log("entro al like vacio");
        }
        if (post.like.includes(user.uid)) {
          for (let i = 0; i < post.like.length; i++) {
            if (post.like[i] === user.uid) { //verifica si ya el usuario está en el array
              post.like.splice(i, 1); // sentencia para eliminar un elemento de un array
              db.collection('users').doc(id).update({ // para actualizar el array
                like: post.like              
              });
            }
          }
        } else {
          post.like.push(user.uid);
          db.collection('users').doc(id).update({
            like: post.like
          });
        }
        document.getElementById(`numero-${doc.id}`).value = post.like.length;
      })
        .catch(function (error) {
        });
    }

    // ___________________IMPRIMIR POST CREADO___________________

    db.collection('users').onSnapshot((querySnapshot) => {
      postUsuario.innerHTML = '';
      querySnapshot.forEach((doc) => {

        postUsuario.innerHTML

          += ` 
        <div class="sparrowContainer">
        <h2 id="tittle" class="input-h2" >${doc.data().Titulo} </h2> 
        <textarea id="text" class="input-home" >${doc.data().Texto}</textarea>
        <button id="postDeleted"${doc.id} class="sparrowContainer"> Borrar </button>
        <button id="likePost" class="sparrowContainer">Me gusta</i></button>
        </div>
        `;
        document.getElementById('postDeleted').addEventListener('click', () => {
          postDeleted(doc.id);
        });


        document.getElementById('likePost').addEventListener('click', () => {
          likePost(doc.id);
        });

        // ___________________Eliminar Post___________________
        const postPt = postDeleted;
        document.getElementById('postDeleted').addEventListener('click', () => {
          postPt(doc.id);
        })

        function postDeleted(id) {
          if (confirm('¿Realmente deseas eliminar la publicación?')) {
            db.collection('users').doc(id).delete().then();
          } else {
            alert('Post rescatado');
          }
        }
      });
    });
  }
}


export { showHome }