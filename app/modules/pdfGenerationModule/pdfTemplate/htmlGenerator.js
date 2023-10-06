var ejs = require('ejs');

function htmlGenerator(templateFile, data) {

  return new Promise(function (resolve, reject) {
    ejs.renderFile(templateFile, data, function (err, html) {
      if (err) {
        console.log("error",err);
        reject(err);
      } else {
        //console.log("error1",html)
        resolve(html);
      }
    });
  })
}

module.exports = htmlGenerator;
