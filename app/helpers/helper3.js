const { format } = require('util');
const gc = require('../config/index');
const bucket = gc.bucket('bharathexim-files'); // should be your bucket name
const { createWorker } = require('tesseract.js');
var pdfUtil = require('pdf-to-text');
var inspect = require('eyes').inspector({ maxLength: 20000 });
var pdf_extract = require('pdf-extract');
var PDFImage = require("pdf-image").PDFImage;
const path = require("path");
const { CostExplorer } = require('aws-sdk');



const worker = createWorker();
/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

const uploadImage = (file) => new Promise((resolve, reject) => {
    async function downloadFile(bucketName, fileName) {
        // console.log("hello")
        // console.log(bucketName,fileName)

        var split = '';
        var val = '';
        var output = {};


        function identifyPdf(temp) {
            //console.log(temp)
            for (let i = 0; i < temp.length; i++) {
                val = val.concat(temp[i])
            }
            try {
                console.log('shsshs1');
                split = val.split("\n");
                console.log('shsshs1');
                split = split.filter(function(el) {
                    return el.trim() != '';
                });
                console.log(split);

                var boeNumberLine = getAllIndexes("BE No");
                var sbno = getAllIndexes("SB");
                getJson()
            } catch {
                console.log('dghdghdghdgh')
            }

            // split = val.split("\n");
            // // var removeEmpty = ['',]
            // split = split.filter(function (el) {
            //   return el.trim() != '';
            // });
            // //console.log(split)

            // var boeNumberLine = getAllIndexes("BE No")
            // var sbno = getAllIndexes("SB")
            // getJson()
            // if (boeNumberLine.length != 0) {
            //     getJson()
            // } else if (sbno.length != 0) {
            //     generatePdfJson()
            // }
            console.log(boeNumberLine.length != 0);
            console.log(sbno.length != 0)
        }
        // generatePdfJson(temp)

        //function to get all indexes of string
        function getAllIndexes(val) {
            var indexes = [],
                i = -1;
            var line;
            for (var m = 0; m < split.length; m++) {
                // console.log(split[m].indexOf(val, i+1))
                while ((i = split[m].indexOf(val, i + 1)) != -1) {
                    if (line != m) indexes.push(m);
                    line = m;
                }
            }
            return indexes;
        }

        function getValuesFromPdf(line, separator, index, str2) {
            // console.log(line)
            // console.log(split[line].split(separator))
            if (str2 == null) {
                return split[line].split(separator)[index];
            } else if (str2 != null) {
                return str2.split(separator)[index];
            }


        }




        //for FirexAdvice

        function getJson() {

            var billNo = getAllIndexes("Bill");
            if (billNo.length > 0) {
                var billNo2 = getValuesFromPdf(parseInt(billNo) + 0, " ", 3, null);
                output["billNo"] = billNo2;

                if (billNo2 == undefined || billNo2 == "") {
                    var billNo3 = getAllIndexes("BiII");
                    console.log(billNo3);
                    if (billNo3.length > 0) {
                        var billNo4 = getValuesFromPdf(parseInt(billNo3) + 0, " ", 3, null);
                        output["billNo"] = billNo4
                    }
                }
            } else {
                output["billNo"] = ""
            }


            // Date of Bill
            var date = getAllIndexes("Customer");
            console.log(date);
            if (date.length > 0) {
                var date2 = getValuesFromPdf(parseInt(date) + 1, " ", 2, null);
                if (getValuesFromPdf(parseInt(date) + 1, " ", 3, null) == undefined) {
                    output["date"] = date2
                }
                if (getValuesFromPdf(parseInt(date) + 1, " ", 3, null) != undefined) {
                    date2 = date2 + getValuesFromPdf(parseInt(date) + 1, " ", 3, null);
                    output["date"] = date2
                }
            } else {
                output["date"] = ""
            }


            // Customer Name

            var customer = getAllIndexes("Customer");
            console.log(customer);
            if (customer.length > 0) {
                var customer2 = getValuesFromPdf(parseInt(customer) + 0, " ", 2, null) + " " + getValuesFromPdf(parseInt(customer) + 0, " ", 3, null);
                if (getValuesFromPdf(parseInt(customer) + 0, " ", 4, null) == undefined) {
                    output["customer"] = customer2
                }
                if (getValuesFromPdf(parseInt(customer) + 0, " ", 4, null) != undefined) {
                    customer2 = customer2 + " " + getValuesFromPdf(parseInt(customer) + 0, " ", 4, null);

                    if (getValuesFromPdf(parseInt(customer) + 0, " ", 5, null) == undefined) {
                        output["customer"] = customer2
                    }

                    if (getValuesFromPdf(parseInt(customer) + 0, " ", 5, null) != undefined) {
                        customer2 = customer2 + " " + getValuesFromPdf(parseInt(customer) + 0, " ", 5, null);

                        if (getValuesFromPdf(parseInt(customer) + 0, " ", 6, null) == undefined) {
                            output["customer"] = customer2
                        }
                        if (getValuesFromPdf(parseInt(customer) + 0, " ", 6, null) != undefined) {
                            customer2 = customer2 + " " + getValuesFromPdf(parseInt(customer) + 0, " ", 6, null);

                            if (getValuesFromPdf(parseInt(customer) + 0, " ", 7, null) == undefined) {
                                output["customer"] = customer2
                            }
                            if (getValuesFromPdf(parseInt(customer) + 0, " ", 7, null) != undefined) {
                                customer2 = customer2 + " " + getValuesFromPdf(parseInt(customer) + 0, " ", 7, null);
                                output["customer"] = customer2
                            }
                        }

                    }
                }

            } else {
                output["customer"] = ""
            }

            // Party Name

            var partyName = getAllIndexes("Other");
            console.log(partyName);
            if (partyName.length > 0) {
                var partyName2 = getValuesFromPdf(parseInt(partyName) + 1, " ", 1, null) + " " + getValuesFromPdf(parseInt(partyName) + 1, " ", 2, null);
                if (getValuesFromPdf(parseInt(partyName) + 1, " ", 3, null) == undefined) {
                    output["partyName"] = partyName2
                }
                if (getValuesFromPdf(parseInt(partyName) + 1, " ", 3, null) != undefined) {
                    partyName2 = partyName2 + ' ' + getValuesFromPdf(parseInt(partyName) + 1, " ", 3, null);

                    if (getValuesFromPdf(parseInt(partyName) + 1, " ", 4, null) == undefined) {
                        output["partyName"] = partyName2
                    }
                    if (getValuesFromPdf(parseInt(partyName) + 1, " ", 4, null) != undefined) {
                        partyName2 = partyName2 + ' ' + getValuesFromPdf(parseInt(partyName) + 1, " ", 4, null);
                        output["partyName"] = partyName2
                    }
                }
            } else {
                output["partyName"] = ""
            }

            // Exchange Rate

            var exchangeRate = getAllIndexes("Other");
            console.log(exchangeRate);
            if (exchangeRate.length > 0) {
                var exchangeRate2 = getValuesFromPdf(parseInt(exchangeRate) + 1, " ", 0, null);
                output["exchangeRate"] = exchangeRate2;
            } else {
                output["exchangeRate"] = ""
            }

            // Currency
            var Currency = getAllIndexes("Charge");
            console.log(Currency);
            if (Currency.length > 0) {
                var Currency2 = getValuesFromPdf(parseInt(Currency) + 1, " ", 0, null);
                output["currency"] = Currency2;
            } else {
                output["currency"] = ""
            }

            // Amount
            var amountforex = getAllIndexes("Currency");
            let amount = amountforex
            console.log("my amount", amount);
            if (amount.length > 0) {
                var amount2 = getValuesFromPdf(parseInt(amount) + 1, " ", 1, null);
                var amount3 = parseFloat(amount2.replace(/,/g, ''));
                console.log(typeof amount3)
                output["amount"] = amount3

            } else {
                output["amount"] = ""
            }

            // Commission Amount
            var commision = getAllIndexes("Commission");
            console.log(commision);
            if (commision.length > 0) {
                var commision2 = getValuesFromPdf(parseInt(commision) + 0, " ", 11, null);
                output["commision"] = commision2;

                if (commision2 == undefined) {
                    var commision3 = getValuesFromPdf(parseInt(commision) + 0, " ", 10, null);
                    output["commision"] = commision3
                }

            } else {
                output["commision"] = ""
            }

            // Recieved Date
            var recievedDate = getAllIndexes("Customer");
            console.log(recievedDate);
            if (recievedDate.length > 0) {
                var recievedDate2 = getValuesFromPdf(parseInt(recievedDate) + 1, " ", 2, null);
                if (getValuesFromPdf(parseInt(recievedDate) + 1, " ", 3, null) == undefined) {
                    output["recievedDate"] = recievedDate2

                }
                if (getValuesFromPdf(parseInt(recievedDate) + 1, " ", 3, null) != undefined) {
                    recievedDate2 = recievedDate2 + getValuesFromPdf(parseInt(recievedDate) + 1, " ", 3, null);
                    output["recievedDate"] = recievedDate2
                }

            } else {
                output["recievedDate"] = ""
            }

            // Conversion Date
            var conversionDate = getAllIndexes("Customer");
            console.log(conversionDate);
            if (conversionDate.length > 0) {
                var conversionDate2 = getValuesFromPdf(parseInt(conversionDate) + 1, " ", 2, null);
                if (getValuesFromPdf(parseInt(conversionDate) + 1, " ", 3, null) == undefined) {
                    output["conversionDate"] = conversionDate2

                }
                if (getValuesFromPdf(parseInt(conversionDate) + 1, " ", 3, null) != undefined) {
                    conversionDate2 = conversionDate2 + getValuesFromPdf(parseInt(conversionDate) + 1, " ", 3, null);
                    output["conversionDate"] = conversionDate2
                }
            } else {
                output["conversionDate"] = ""
            }


            console.log(output);
            // console.log(publicUrl)
            console.log(publicUrl);
            let res = [output, publicUrl];
            resolve(res)

        }



        //getJson(temp)

        function getAllIndexes(val) {
            var indexes = [],
                i = -1;
            var line;
            for (var m = 0; m < split.length; m++) {
                while ((i = split[m].indexOf(val, i + 1)) != -1) {
                    if (line != m) indexes.push(m);
                    line = m;
                }
            }
            return indexes;
        }

        function getValuesFromPdf(line, separator, index, str2) {
            if (str2 == null) {
                return split[line].split(separator)[index];
            } else if (str2 != null) {
                return str2.split(separator)[index];
            }


        }
        const options = {
            // The path to which the file should be downloaded, e.g. "./file.txt"
            destination: `./app/tempFolder/${fileName}`,
        };

        // console.log(bucketName,fileName)
        // Downloads the file
        await gc.bucket(bucketName).file(fileName).download(options);
        console.log(bucketName, fileName);
        console.log("helper");
        var publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

        if (fileName.includes(".jpeg") || fileName.includes(".jpg") || fileName.includes(".png")) {
            console.log("inside");
            (async() => {
                console.log("inside1");
                await worker.load();
                console.log("inside2");
                await worker.loadLanguage('eng');
                console.log("inside33");
                await worker.initialize('eng');
                console.log("inside1");
                resolve(publicUrl);
                const { data: { text } } = await worker.recognize(`./app/tempFolder/${fileName}`);
                console.log("inside1");
                console.log(text);

                await worker.terminate();
                resolve(publicUrl)
            })();
        } else if (fileName.includes("pdf")) {

            console.log("Usage: node thisfile.js the/path/tothe.pdf");

            const absolute_path_to_pdf = `./app/tempFolder/${fileName}`;
            if (absolute_path_to_pdf.includes(" ")) throw new Error("will fail for paths w spaces like " + absolute_path_to_pdf);

            const options = {
                type: 'ocr', // perform ocr to get the text within the scanned image
                ocr_flags: ['--psm 1'], // automatically detect page orientation
                clean: false
            };
            const processor = pdf_extract(absolute_path_to_pdf, options, () => console.log("Starting…"));
            processor.on('complete', data => callback(null, data));
            processor.on('error', callback);
            var i = 0;
            // setInterval(() => {
            //     console.log(i++)
            // }, 1000);
            function callback(error, data) {
                error ? console.error(error) : console.error(data.text_pages);
                identifyPdf(data.text_pages)
            }




            // resolve(publicUrl)

        }




        console.log(
            `gs://${bucketName}/${fileName} downloaded to ./app/tempFolder/${fileName}.`
        );
    }


    // console.log(file)
    // console.log(file.mimetype)
    const { originalname, buffer } = file;

    const blob = bucket.file(originalname.replace(/ /g, "_"));
    const blobStream = blob.createWriteStream({
        resumable: false
    });

    blobStream.on('finish', async(success) => {
            await downloadFile(bucket.name, blob.name).catch(console.error)


            // resolve(publicUrl,file)
        })
        .on('error', (err) => {
            console.log(err);
            reject(`Unable to upload image, something went wrong`)
        })
        .end(buffer)
});

const uploadImage2 = (file) => new Promise((resolve, reject) => {
    console.log("hshshmamamma");
    const { originalname, buffer } = file;

    const blob = bucket.file(originalname.replace(/ /g, "_"));
    const blobStream = blob.createWriteStream({
        resumable: false
    });

    blobStream.on('finish', async(success) => {

        var publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        console.log(publicUrl);
        resolve(publicUrl, file)
    })
        .on('error', (err) => {
            console.log(err);
            reject(`Unable to upload image, something went wrong`)
        })
        .end(buffer)

});

module.exports = {
    uploadImage: uploadImage,
    uploadImage2: uploadImage2
};