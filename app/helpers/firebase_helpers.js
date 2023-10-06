// var FCM = require('fcm-node');
// // export GCLOUD_PROJECT=''
// var serverKey = require('../model_helpers/fir-project-279d6-firebase-adminsdk-nx1o5-277329802e.json') //put the generated private key path here    
// var fcm = new FCM('AAAAdodD4Mg:APA91bF68I_5bGyJQ3nEV7rXSnhCdcomlf3N0gUZq5B7BYCFxkPxSZeoGn-l8EgAImdFjfh7eEKUVdQnDcHG6CxWSp3DfliFfxjTWV6XEkHh4pZfrOb54sSuzYVnfEvaEk70e9jPHpaQ');
// var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
//     to: 'registration_token', 
//     collapse_key: 'green',
    
//     notification: {
//         title: 'Title of your push notification', 
//         body: 'Body of your push notification' 
//     },
    
//     data: {  //you can send only notification or only data(or include both)
//         my_key: 'my value',
//         my_another_key: 'my another value'
//     }
// }

// fcm.send(message, function(err, response){
//     if (err) {
//         console.log("Something has gone wrong!")
//     } else {
//         console.log("Successfully sent with response: ", response)
//     }
// })

// var admin = require('firebase-admin');
// var admin = require('firebase-admin');
// var app = admin.initializeApp();
// // import  GCLOUD_PROJECT='my-project-id'
// // Get the Messaging service for the default app
// var defaultMessaging = admin.messaging();
// // Get the Messaging service for a given app
// var otherMessaging = admin.messaging(otherApp);