
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

//Inicializa el app
admin.initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original

//req = lo que llega por la petición HTTP.
//res = lo que voy a devolver cuando me hagan la petición.
//promesa: operación asincrona = espera a que se haga toda la operación.

//Función addMessage = Hacer peticiones HTTP
exports.addMessage = functions.https.onRequest((req:any, res:any) => {

    //Retorna la colección del proyecto 
    return admin.firestore().collection('shoes').add({
        //.add = Agrega un nuevo documento con parámetros como el nombre y el correo
        nombre: req.query.nombre,
        correo: req.query.correo
        //Ejecutar promesa que espera a que se haga la conexión y si todo estuvo bien, mostrara en consola - ('Todo correcto') = 200 sino devolvera ('Error')
    }).then((r:any) => {
        console.log("Todo correcto");
        //Devolverle algo al usuario
        res.send(r)
        //Se se genera algún error, realizar lo siguiente
    }).catch((err:any) => {
        console.log("Error");
        res.send(err);
    });
  });

  exports.sendMessage = functions.firestore // Listen for changes in all documents in the 'users' collection and all subcollections
      .document('shoes/{userId}')
      .onWrite((change:any, context:any) => {
        console.log("documento agregado");
        // If we set `/users/marie/incoming_messages/134` to {body: "Hello"} then
        // context.params.userId == "marie";
        // context.params.messageCollectionId == "incoming_messages";
        // context.params.messageId == "134";
        // ... and ...
        // change.after.data() == {body: "Hello"}
      });