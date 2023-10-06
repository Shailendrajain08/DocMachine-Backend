const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

// configuration constants
let config = {
    localConfig: {
        mongodb: {
            url: process.env.DB_URL
        }
    },
    betaConfig: {
        mongodb: {
            url: process.env.BETA_URL
        }
    },
    devConfig: {
        mongodb: {
            url: process.env.DEV_URL
        }
    },
    prodConfig: {
        mongodb: {
            url: process.env.PROD_URL
        }
    }
};



//app configuration usage
let appConfig = {};
console.log('environment variables passed', process.env.deployment);
switch (process.env.deployment) {
    case 'local':
        appConfig = config.localConfig
        break;
    case 'beta':
        appConfig = config.betaConfig
        break;
    case 'dev':
        appConfig = config.devConfig
        break;
    case 'prod':
        appConfig = config.prodConfig
        break;
    default:
        console.log('loading local environment 111');
        appConfig = config.localConfig
}

//db configuration here
mongoose.connect(appConfig.mongodb.url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, function (err, result) {
    if (err) {
        console.log('Error while connecting to DB:', err);
    } else {
        console.log('The DB Connected');
    }
});


// mongoose.connect('mongodb://localhost:27017/docMachine', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
//     if (!err) {
//         console.log("working")
//     }
//     else {
//         console.log("Error in db connection :" + JSON.stringify(err, undefined, 2))
//     }
// });

module.exports = mongoose;