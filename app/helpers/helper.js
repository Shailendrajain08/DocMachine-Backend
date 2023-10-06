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
const PDFDocument = require('pdf-lib').PDFDocument;
const fs = require('fs');

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
            // for (let i = 0; i < temp.length; i++) {
            //     val = val.concat(temp[i])
            // }

            val = temp;

            console.log('line no. 42', temp);
            try {

                //console.log('shsshs')
                split = val.split("\n");
                console.log(split);
                split = split.filter(function(el) {
                    return el.trim() != '';
                });
                console.log(split);

                var boeNumberLine = getAllIndexes("BE No");
                var sbno = getAllIndexes("SB");
                // getJson()
                generatePdfJson()
            } catch {
                console.log('dghdghdghdgh');
                let res = [output, publicUrl];
                resolve(res);
                console.log(res)
            }
        }

        function generatePdfJson() {


            // var removeEmpty = ['',]
            split = split.filter(function(el) {
                return el.trim() != '';
            });

            //AD BILL NO
            output["adBillNo"] = "";

            // SHIPPING BILL NO
            var sbno = getAllIndexes("SB");
            var sbDate;
            var sbDateTpggle = false;
            // console.log(sbno)
            if (sbno.length > 0) {

                var sbNoValue = split[0].toLocaleLowerCase().includes("port") ? getValuesFromPdf(parseInt(sbno) + 1, " ", 5, null) :
                    split[1].toLocaleLowerCase().includes("status") ? getValuesFromPdf(parseInt(sbno) + 1, " ", 1, getValuesFromPdf(parseInt(sbno) + 1, "|", 1, null)) :
                    getValuesFromPdf(parseInt(sbno) + 1, " ", 1, null);
                output["sbno"] = sbNoValue;
                if (sbNoValue.length < 2) {
                    sbNoValue = split[0].toLocaleLowerCase().includes("port") ? getValuesFromPdf(parseInt(sbno) + 1, " ", 6, null) :
                        split[1].toLocaleLowerCase().includes("status") ? getValuesFromPdf(parseInt(sbno) + 1, " ", 1, getValuesFromPdf(parseInt(sbno) + 1, "|", 1, null)) :
                        getValuesFromPdf(parseInt(sbno) + 1, " ", 1, null);
                    output["sbno"] = sbNoValue;
                    if (sbNoValue.length == 0) {
                        output["sbno"] = "";
                    }
                    sbDate = split[0].toLocaleLowerCase().includes("port") ?
                        (split[parseInt(sbno) + 1].toLocaleLowerCase().includes("|") ? getValuesFromPdf(parseInt(sbno) + 1, "_", 1, getValuesFromPdf(parseInt(sbno) + 1, "|", 1, null)) : getValuesFromPdf(parseInt(sbno) + 1, " ", 7, null) + "-" + getValuesFromPdf(parseInt(sbno) + 1, " ", 8, null) + "-" + getValuesFromPdf(parseInt(sbno) + 1, " ", 9, null)) :
                        split[1].toLocaleLowerCase().includes("status") ? getValuesFromPdf(parseInt(sbno) + 2, "|", 1, null) : getValuesFromPdf(parseInt(sbno) + 1, " ", 2, null);

                    sbDateTpggle = true;
                    output["sbdate"] = sbDate;
                    if (sbDate.length == 0) {
                        output["sbdate"] = "";
                    }

                }
            } else if (sbno.length == 0) {
                output["sbno"] = "";
            }

            // // SHIPPING BILL DATE
            if (!sbDateTpggle) {
                if (sbno.length > 0) {
                    sbDate = split[0].toLocaleLowerCase().includes("port") ?
                        (split[parseInt(sbno) + 1].toLocaleLowerCase().includes("|") ? getValuesFromPdf(parseInt(sbno) + 1, "_", 1, getValuesFromPdf(parseInt(sbno) + 1, "|", 1, null)) : getValuesFromPdf(parseInt(sbno) + 1, " ", 6, null)) :
                        split[1].toLocaleLowerCase().includes("status") ? getValuesFromPdf(parseInt(sbno) + 2, "|", 1, null) : getValuesFromPdf(parseInt(sbno) + 1, " ", 2, null);

                    console.log('sjhssjhjsh', sbDate);
                    if (sbDate.length < 2) {
                        sbDate = split[0].toLocaleLowerCase().includes("port") ?
                            (split[parseInt(sbno) + 1].toLocaleLowerCase().includes("|") ? getValuesFromPdf(parseInt(sbno) + 1, "_", 1, getValuesFromPdf(parseInt(sbno) + 1, "|", 1, null)) : getValuesFromPdf(parseInt(sbno) + 1, " ", 7, null)) :
                            split[1].toLocaleLowerCase().includes("status") ? getValuesFromPdf(parseInt(sbno) + 2, "|", 1, null) : getValuesFromPdf(parseInt(sbno) + 1, " ", 2, null);
                        console.log('sjhssjhjsh', sbDate)
                    }
                    output["sbdate"] = sbDate;
                } else if (sbno.length == 0) {
                    output["sbdate"] = "";
                }
            }



            //PORT CODE
            var portCode = getValuesFromPdf(parseInt(sbno) + 1, " ", 4, null);
            output["portCode"] = portCode;
            if (portCode == undefined) {
                portCode = getValuesFromPdf(parseInt(sbno) + 1, " ", 0, null);
                output["portCode"] = portCode;
            }


            //IEC Code
            var iecCodeLine = split[2].toLocaleLowerCase().includes("central") ? getAllIndexes("Br") : getAllIndexes("IEC/");
            // var iecCodeLine = getAllIndexes("Br")
            console.log('wwjjw', iecCodeLine.length);
            if (iecCodeLine.length > 0) {
                console.log('sjsjsj');
                var iecCode = getValuesFromPdf(parseInt(iecCodeLine) + 0, " ", 9, null) + getValuesFromPdf(parseInt(iecCodeLine) + 0, " ", 10, null);
                console.log("hello World");
                console.log('ieccode', iecCode);
                output["ieccode"] = iecCode;
                console.log('ieccode', iecCode.length);
                if (iecCode.length < 5) {
                    iecCode = getValuesFromPdf(iecCodeLine, " ", 9, null) + getValuesFromPdf(iecCodeLine, " ", 10, null);
                    console.log('ieccode', iecCode);
                    output["ieccode"] = iecCode;
                }
                // if (iecCode == "BOARD") {
                //     //console.log('sjsjsj1')
                //     var iecCode1 = getValuesFromPdf(iecCodeLine, "|", 1, null);
                //     var iecCode = getValuesFromPdf(iecCodeLine, " ", 1, iecCode1);
                //     output["ieccode"] = iecCode;
                // } else {
                //     //console.log('sjsjsj1')
                //     //console.log(iecCode)
                //     output["ieccode"] = iecCode;
                // }
            } else if (iecCodeLine.length == 0) {
                console.log('9990909909');
                iecCodeLine = getAllIndexes("EClBr");
                console.log(iecCodeLine);
                if (iecCodeLine.length > 0) {
                    iecCode = getValuesFromPdf(iecCodeLine, " ", 2, null);
                    console.log('ieccode', iecCode);
                    output["ieccode"] = iecCode;
                    console.log('ieccode', iecCode.length)
                } else {
                    iecCode = getValuesFromPdf([2], " ", 9, null);
                    output["ieccode"] = iecCode;
                    if (iecCode == undefined) {
                        output["ieccode"] = ""
                    }
                }
            }

            //IEC Name
            // var iecNameLine = getValuesFromPdf(iecCodeLine, " ", IEC)
            // var iecName = split[parseInt(iecCodeLine) + 4]
            // console.log(iecName, "hello")
            //IEC Name
            // var iecNameLine = getValuesFromPdf(iecCodeLine, " ", IEC)
            // var iecName = split[parseInt(iecCodeLine) + 4]
            // console.log(iecName, "hello")
            var iecNameLine = getAllIndexes("1.EXPORTER'S");
            var iecNameLine1 = [iecNameLine[0] + 1];
            console.log(iecNameLine1);
            if (iecNameLine.length > 0) {
                var iecNameCode = getValuesFromPdf(iecNameLine1, " ", 1, null) + " " + getValuesFromPdf(iecNameLine1, " ", 2, null) + " " + getValuesFromPdf(iecNameLine1, " ", 3, null) + " " + getValuesFromPdf(iecNameLine1, " ", 4, null) + " " + getValuesFromPdf(iecNameLine1, " ", 5, null);
                // console.log(iecNameCode, "hello")
                output["iecName"] = iecNameCode;
            } else if (iecNameLine.length == 0) {
                output["iecName"] = "";
            }

            // EXPORTER'S Location
            var exporterLocationLine = getAllIndexes("6'");
            if (exporterLocationLine > 0) {
                var exporterLocationCode = getValuesFromPdf(exporterLocationLine, " ", 2, null) + " " + getValuesFromPdf(exporterLocationLine, " ", 3, null);
                output["exporterLocationCode"] = exporterLocationCode;
            } else {
                output["exporterLocationCode"] = "";
            }

            // COUNTRY OF FINALDESTINATION
            var finalDestinationLine = getAllIndexes("17.COUNTRY");
            if (finalDestinationLine.length > 0) {
                var finalDestinationCode = getValuesFromPdf(finalDestinationLine, " ", 10, null);
                if (finalDestinationCode == "KUWAIT") {
                    output["countryOfFinaldestination"] = finalDestinationCode;
                } else if (finalDestinationCode != "KUWAIT") {
                    var finalDestinationCode1 = getValuesFromPdf(finalDestinationLine, " ", 7, null);
                    output["countryOfFinaldestination"] = finalDestinationCode1;
                } else {
                    output["countryOfFinaldestination"] = " ";
                }
            } else if (finalDestinationLine.length == 0) {
                output["countryOfFinaldestination"] = "";
            }

            // CONSIGNEE NAME
            if (iecNameLine1.length > 0) {
                var consignNameCode = getValuesFromPdf(iecNameLine1, " ", 6, null) + " " + getValuesFromPdf(iecNameLine1, " ", 7, null) + " " + getValuesFromPdf(iecNameLine1, " ", 8, null) + " " + getValuesFromPdf(iecNameLine1, " ", 9, null);
                output["consigneeName"] = consignNameCode;
            } else if (iecNameLine1.length == 0) {
                output["consigneeName"] = "";
            }


            //AD Code
            var adCodeLine = getAllIndexes("AD CODE");
            if (adCodeLine.length > 0) {
                var adCode1 = getValuesFromPdf(adCodeLine, ":", 1, null);
                var adCode = getValuesFromPdf(adCodeLine, " ", 1, adCode1);
                output["adCode"] = adCode;
                if (adCode.length < 3) {
                    adCode = getValuesFromPdf(adCodeLine, " ", 8, adCode1);
                    output["adCode"] = adCode;
                }

            } else if (adCodeLine == 0) {
                output["adCode"] = "";
            }

            //LEO Date
            var leoDateLine = getAllIndexes("LEO Date");
            if (leoDateLine.length == 0) leoDateLine = getAllIndexes("LEo Date");

            if (leoDateLine.length == 0) leoDateLine = getAllIndexes("LEODate");
            if (leoDateLine.length > 0) {
                console.log('sshjsjsjsjhsjhshjsjhsjhshj');
                console.log(leoDateLine[0] - 1);
                var n = split[leoDateLine].split(" ");
                console.log(n[n.length - 1]);
                var leoDate = n[n.length - 1];
                //return n[n.length - 1];
                //var leoDate = split[leoDateLine].split(" ")[leoDateLine[0] - 1];
                if (leoDate == undefined) {
                    output["leodate"] = "dd-mm-yyyy";
                } else {
                    output["leodate"] = leoDate;
                }

            } else if (leoDateLine.length == 0) {
                output["leodate"] = "dd-mm-yyyy";
            } else {
                output["leodate"] = "dd-mm-yyyy";
            }

            //Processing Status
            output["processingStaus"] = "";

            //Invoices
            var invoiceLine = getAllIndexes("NV NO");
            console.log(invoiceLine, "hehfaf");
            if (invoiceLine.length == 0) {
                invoiceLine = getAllIndexes("NV No");
                console.log(invoiceLine, "hehfaf");
                if (invoiceLine.length > 0) {
                    var invoiceValue = findInvoices(invoiceLine, "NV No");
                    output["invoices"] = invoiceValue;
                    // console.log(invoiceValue)
                    // var invoiceValue = getValuesFromPdf(parseInt(invoiceLine) + 1, " ", 0, null)
                    // var invCheckValue = /^[+-]?\d+(\.\d+)?$/.test(invValue)
                    // output["invoices"] = invCheckValue ? invoiceValue : getValuesFromPdf(parseInt(invoiceLine) + 1, " ", 6, null)

                } else if (invoiceLine.length == 0) {
                    output["invoices"] = [{
                        "sno": "1",
                        "invoiceno": "",
                        "amount": "",
                        "currency": ""
                    }]
                }

            } else if (invoiceLine.length > 0) {
                var invoiceValue = findInvoices(invoiceLine, "NV NO");
                output["invoices"] = invoiceValue;
                // var invValue = getValuesFromPdf(parseInt(invoiceLine) + 1, " ", 0, null)
                // var invCheckValue = /^[+-]?\d+(\.\d+)?$/.test(invValue)
                // output["invoices"] = invCheckValue ? invValue : getValuesFromPdf(parseInt(invoiceLine) + 1, " ", 6, null)
            }

            //FOB Currency
            currencyLine = getAllIndexes("USD");
            if (currencyLine.length == 0) {
                currencyLine = getAllIndexes("INR");
                if (currencyLine.length > 0) {
                    output["fobCurrency"] = 'INR'
                } else if (currencyLine.length == 0) {
                    output["fobCurrency"] = ''
                }
            } else if (currencyLine.length > 0) {
                output["fobCurrency"] = 'USD'
            }

            //FOB Value
            var fobValueLine = getAllIndexes("FOB ");
            if (fobValueLine.length > 0) {
                var fobValue = getValuesFromPdf(parseInt(fobValueLine) + 1, " ", 0, null);
                var checkValue = /^[+-]?\d+(\.\d+)?$/.test(fobValue);
                var fobValue2 = checkValue ? fobValue : getValuesFromPdf(parseInt(fobValueLine) + 1, " ", 1, null)
                var fobValue3 = parseFloat(fobValue2)
                console.log("my fobValue", typeof fobValue3)
                output["fobValue"] = fobValue3
            } else if (fobValueLine.length == 0) {
                output["fobValue"] = "";
            }

            //REALIZED FOB
            currencyLine = getAllIndexes("USD");
            if (currencyLine.length == 0) {
                currencyLine = getAllIndexes("INR");
                if (currencyLine.length > 0) {
                    output["realizedFobCurrency"] = 'INR'
                } else if (currencyLine.length == 0) {
                    output["realizedFobCurrency"] = ''
                }
            } else if (currencyLine.length > 0) {
                output["realizedFobCurrency"] = 'USD'
            }


            //CURRENCY
            currencyLine = getAllIndexes("USD");
            if (currencyLine.length == 0) {
                currencyLine = getAllIndexes("INR");
                if (currencyLine.length > 0) {
                    output["currency"] = 'INR'
                } else if (currencyLine.length == 0) {
                    output["currency"] = ''
                }
            } else if (currencyLine.length > 0) {
                output["currency"] = 'USD'
            }


            //REALIZED FOB VALUE
            output["realizedFobValue"] = "";

            //EQUIVALENT FOB VALUE
            output["equivalentFobValue"] = "";

            //FREIGHT CURRENCY
            currencyLine = getAllIndexes("USD");
            if (currencyLine.length == 0) {
                currencyLine = getAllIndexes("INR");
                if (currencyLine.length > 0) {
                    output["freightCurrency"] = 'INR'
                } else if (currencyLine.length == 0) {
                    output["freightCurrency"] = ''
                }
            } else if (currencyLine.length > 0) {
                output["freightCurrency"] = 'USD'
            }

            //FREIGHT VALUE REALIZED
            // var freightLine = getAllIndexes("FREIGHT")
            // console.log(freightLine)
            // if (freightLine.length > 0) {
            //     var freightValue = getValuesFromPdf(parseInt(freightLine) + 1, " ", 0, null)
            //     var freightCheckValue = /^[+-]?\d+(\.\d+)?$/.test(freightValue)
            //     output["freightValueRealized"] = freightCheckValue ? freightValue : getValuesFromPdf(parseInt(freightLine) + 1, " ", 2, null)
            // } else if (freightLine.length == 0) {
            //     output["freightValueRealized"] = "";
            // }

            output["freightValueRealized"] = "";

            //Realized FREIGHT CURRENCY
            currencyLine = getAllIndexes("USD");
            if (currencyLine.length == 0) {
                currencyLine = getAllIndexes("INR");
                if (currencyLine.length > 0) {
                    output["realizedFreightCurrency"] = 'INR'
                } else if (currencyLine.length == 0) {
                    output["realizedFreightCurrency"] = ''
                }
            } else if (currencyLine.length > 0) {
                output["realizedFreightCurrency"] = 'USD'
            }

            //REALIZED FREIGHT VALUE
            // var freightLine = getAllIndexes("FREIGHT")
            // console.log(freightLine)
            // if (freightLine.length > 0) {
            //     var freightValue = getValuesFromPdf(parseInt(freightLine) + 1, " ", 0, null)
            //     var freightCheckValue = /^[+-]?\d+(\.\d+)?$/.test(freightValue)
            //     output["realizedFreightValue"] = freightCheckValue ? freightValue : getValuesFromPdf(parseInt(freightLine) + 1, " ", 2, null)
            // } else if (freightLine.length == 0) {
            output["realizedFreightValue"] = "";
            // }

            //INSURANCE CURRENCY
            currencyLine = getAllIndexes("USD");
            if (currencyLine.length == 0) {
                currencyLine = getAllIndexes("INR");
                if (currencyLine.length > 0) {
                    output["insuranceCurrency"] = 'INR'
                } else if (currencyLine.length == 0) {
                    output["insuranceCurrency"] = ''
                }
            } else if (currencyLine.length > 0) {
                output["insuranceCurrency"] = 'USD'
            }

            //INSURANCE VALUE
            var insurancLine = getAllIndexes("INSURANc");
            if (insurancLine.length > 0) {
                var insurancValue = getValuesFromPdf(parseInt(insurancLine) + 1, " ", 0, null);
                var insurancCheckValue = /^[+-]?\d+(\.\d+)?$/.test(insurancValue);
                output["insuranceValue"] = insurancCheckValue ? insurancValue : getValuesFromPdf(parseInt(insurancLine) + 1, " ", 3, null)
            } else if (insurancLine.length == 0) {
                var insurancLine = getAllIndexes("INSURANC");
                if (insurancLine.length > 0) {
                    var insurancValue = getValuesFromPdf(parseInt(insurancLine) + 1, " ", 0, null);
                    var insurancCheckValue = /^[+-]?\d+(\.\d+)?$/.test(insurancValue);
                    output["insuranceValue"] = insurancCheckValue ? insurancValue : getValuesFromPdf(parseInt(insurancLine) + 1, " ", 3, null)
                } else if (insurancLine.length == 0) {
                    output["insuranceValue"] = "";
                }
            } else {
                output["insuranceValue"] = "";
            }

            //REALIZED INSURANCE VALUE
            output["realizedInsuranceValue"] = "";

            //BANKING CHARGES
            output["bankingCharges"] = "";

            //EXPECTED PAYMENT LAST DATE
            output["expectedPaymentlastdate"] = "";

            //ADDED DATE
            output["AddedDate"] = "";

            //MODIFIED DATE
            output["modifiedDate"] = "";



            console.log(output);
            //console.log(publicUrl)
            //let res = [output]
            let res = [output, publicUrl];
            resolve(res);
            console.log(res)

        }

        function findInvoices(line, str) {
            var invoices = [];

            var secondSNo = '1';
            var secondInvoiceNo = str == "a" ? getValuesFromPdf(parseInt(line) + 1, " ", 5, null) : getValuesFromPdf(parseInt(line) + 1, " ", 6, null);
            console.log(getValuesFromPdf(parseInt(line) + 1, " ", 6, null));
            console.log(getValuesFromPdf(parseInt(line) + 1, " ", 5, null));
            console.log(getValuesFromPdf(parseInt(line) + 1, " ", 4, null));
            console.log(getValuesFromPdf(parseInt(line) + 1, " ", 5, null));
            console.log(secondInvoiceNo.length);
            console.log("my invoice", secondInvoiceNo)
            if (secondInvoiceNo.length < 9) {
                console.log(getValuesFromPdf(parseInt(line) + 1, " ", 6, null));
                console.log(getValuesFromPdf(parseInt(line) + 1, " ", 5, null));
                secondInvoiceNo = getValuesFromPdf(parseInt(line) + 1, " ", 5, null)
            }
            var secondInvoiceAmount = getValuesFromPdf(parseInt(line) + 1, " ", 7, null);
            var secondInvoiceCurrency = getValuesFromPdf(parseInt(line) + 1, " ", 8, null);
            console.log("my invoice Amount", secondSNo, secondInvoiceNo, secondInvoiceAmount, secondInvoiceCurrency);
            var secondInvoiceAmount2 = secondInvoiceAmount ? parseFloat(secondInvoiceAmount) : null;

            if (secondInvoiceCurrency == undefined) {
                secondInvoiceCurrency = 'USD'
            }
            if (secondInvoiceAmount == 'USD') {
                secondInvoiceAmount = getValuesFromPdf(parseInt(line) + 1, " ", 6, null)
                secondInvoiceAmount2 = parseFloat(secondInvoiceAmount)
            }
            if (secondInvoiceAmount2 != undefined && secondInvoiceCurrency != undefined) {
                console.log("my invoice amount", secondInvoiceAmount2)
                invoices.push({
                    "sno": secondSNo == undefined ? "" : secondSNo,
                    "invoiceno": secondInvoiceNo == undefined ? "" : secondInvoiceNo,
                    "amount": secondInvoiceAmount2 == undefined ? "" : secondInvoiceAmount2,
                    "currency": secondInvoiceCurrency == undefined ? "" : secondInvoiceCurrency
                })
            }

            return invoices;

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
            // console.log("line", line);
            // console.log("separator", separator)
            // console.log("index", index)
            // console.log("str2", str2)
            // console.log(line)
            // console.log(split[line].split(separator))
            if (str2 == null) {
                return split[line].split(separator)[index];
            } else if (str2 != null) {
                return str2.split(separator)[index];
            }


        }



        //for Boe

        function getJson() {


            // Discharge port
            var dischargePotLine = getAllIndexes("Port");
            var dischargePort = getValuesFromPdf(dischargePotLine, ":", 2, null);
            output["dischargePort"] = dischargePort;

            //BOE number
            var boeNumberLine = getAllIndexes("BE No");
            var boeNumber = getValuesFromPdf(boeNumberLine, ":", "1", null);
            output['boeNumber'] = boeNumber.split("/")[0];

            //BOE date
            var boeDate = getValuesFromPdf(boeNumberLine, ":", "1", null);
            output['boeDate'] = [boeDate.split("/")[1], boeDate.split("/")[2], boeDate.split("/")[3]].join("/");

            //IEC
            var iecLine = getAllIndexes("Code");
            var iecCode = getValuesFromPdf(iecLine, ":", "3", null);
            output["adCode"] = iecCode;

            //IEC NAME
            var iecName = split[parseInt(iecLine) + 2];
            output["iecName"] = "";

            //AD CODE
            var adCodeLine = getAllIndexes("AD Code");
            var adCode = getValuesFromPdf(adCodeLine, ":", 3, null);
            output["iecCode"] = "";

            //Inv No
            var invoiceNumberLine = getAllIndexes("Inv No");
            var invoiceNumber1 = getValuesFromPdf(invoiceNumberLine, ":", 1, null);
            var invoiceNumber = getValuesFromPdf(invoiceNumberLine, " ", 1, invoiceNumber1).split('=-').join('-');
            output["invoiceNumber"] = invoiceNumber;

            //Invoice Amount
            var invoiceAmountLine = getAllIndexes("Inv Val");
            var invoiceAmount1 = getValuesFromPdf(invoiceAmountLine, ":", 1, null);
            var invoiceAmount = getValuesFromPdf(invoiceAmountLine, " ", 1, invoiceAmount1);
            output["invoiceAmount"] = invoiceAmount;

            //currency
            output["currency"] = getValuesFromPdf(invoiceAmountLine, " ", 2, invoiceAmount1);

            //Settled Amount
            output["settledAmount"] = "";

            //Status
            output["status"] = "";

            //Freight Amount
            var freightAmountLine = getAllIndexes("Freight");
            var freightAmount1 = getValuesFromPdf(freightAmountLine, ":", 1, null);
            var freightAmount = getValuesFromPdf(freightAmountLine, " ", 1, freightAmount1);
            output["freightAmount"] = freightAmount;

            //Freight currency
            var freightCurrency = getValuesFromPdf(freightAmountLine, " ", 2, freightAmount1);
            output["freightCurrency"] = freightCurrency;

            //Insurance amount
            var insuranceAmountLine = getAllIndexes("Insurance");
            var insuranceAmount1 = getValuesFromPdf(insuranceAmountLine, ":", 1, null);
            var insuranceAmount = getValuesFromPdf(insuranceAmountLine, " ", 2, insuranceAmount1);
            output["insuranceAmount"] = insuranceAmount;

            //Insurance currency
            var insuranceCurrency = getValuesFromPdf(insuranceAmountLine, " ", 3, insuranceAmount1);
            output["insuranceCurrency"] = insuranceCurrency;

            //Discount Amount
            var discountAmountLine = getAllIndexes("Discount Amount");
            var discountAmount = getValuesFromPdf(discountAmountLine, ":", 2, null);
            output["discountAmount"] = discountAmount;

            //Discount Currency
            output["discountCurrency"] = "";


            //Miscellaneous Amount
            var misAmountLine = getAllIndexes("Misc");
            var miscAmount1 = getValuesFromPdf(misAmountLine, ":", 1, null);
            var miscAmount = getValuesFromPdf(misAmountLine, " ", 2, miscAmount1);
            output["miscellaneousAmount"] = miscAmount;

            //Miscellaneous currency
            var miscCurrency = getValuesFromPdf(misAmountLine, " ", 3, miscAmount1);
            output["miscellaneousCurrency"] = miscCurrency;

            //Commission amount
            output["commissionAmount"] = "";

            //Commision Currency
            output["commissionCurrency"] = "";

            console.log(output);
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


            async function splitPdf(pathToPdf) {
                console.log('1');
                const docmentAsBytes = await fs.promises.readFile(pathToPdf);

                // Load your PDFDocument
                const pdfDoc = await PDFDocument.load(docmentAsBytes);

                const numberOfPages = pdfDoc.getPages().length;


                console.log('jjsjsj');
                // Create a new "sub" document
                const subDocument = await PDFDocument.create();
                // copy the page at current index
                const [copiedPage] = await subDocument.copyPages(pdfDoc, [0]);
                subDocument.addPage(copiedPage);
                const pdfBytes = await subDocument.save();
                await writePdfBytesToFile(`./app/tempFolder/${fileName}`, pdfBytes);


            }

            async function writePdfBytesToFile(fileName, pdfBytes) {
                console.log('xxx');
                return fs.promises.writeFile(fileName, pdfBytes);


            }

            (async() => {
                console.log('000');
                await splitPdf(`./app/tempFolder/${fileName}`);
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
                    error ? console.error(error) : console.error(data.text_pages[0]);
                    identifyPdf(data.text_pages[0])
                }


            })();





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

const uploadImage1 = (file) => new Promise((resolve, reject) => {
    console.log("hshshmamamma", file);
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
    uploadImage1: uploadImage1
};