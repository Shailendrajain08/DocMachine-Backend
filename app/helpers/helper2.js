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
        split = split.filter(function (el) {
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
    //for shipping bill
    function generatePdfJson() {


      // var removeEmpty = ['',]
      split = split.filter(function (el) {
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
      var iecCodeLine = split[2].toLocaleLowerCase().includes("central") ? getAllIndexes("EC/ Br") : getAllIndexes("hhhhggh");
      // console.log('wwjjw', iecCodeLine.length)
      if (iecCodeLine.length > 0) {
        //console.log('sjsjsj')
        var iecCode = getValuesFromPdf(iecCodeLine, " ", 9, null);
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
      var iecNameLine = getAllIndexes("PKG");
      if (iecNameLine.length > 0) {
        var iecNameCode = getValuesFromPdf(iecNameLine, " ", 0, null) + " " + getValuesFromPdf(iecNameLine, " ", 1, null) + " " + getValuesFromPdf(iecNameLine, " ", 2, null) + " " + getValuesFromPdf(iecNameLine, " ", 3, null);
        console.log(iecNameCode, "hello");
        output["iecName"] = iecNameCode;
      } else if (iecNameLine.length == 0) {
        output["iecName"] = "";
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
      var invoiceLine = getAllIndexes("2.INV NO");
      console.log(invoiceLine, "hehfaf");
      if (invoiceLine.length == 0) {
        invoiceLine = getAllIndexes("2.lNV No");
        console.log(invoiceLine, "hehfaf");
        if (invoiceLine.length > 0) {
          var invoiceValue = findInvoices(invoiceLine, "2.lNV No");
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
        var invValue = getValuesFromPdf(parseInt(invoiceLine) + 1, " ", 0, null);
        var invCheckValue = /^[+-]?\d+(\.\d+)?$/.test(invValue);
        output["invoices"] = invCheckValue ? invValue : getValuesFromPdf(parseInt(invoiceLine) + 1, " ", 6, null)
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

    function findInvoices(line, str) {
      var invoices = [];
      var firstInvoiceNo = str == "a" ?
        (/^[+-]?\d+(\.\d+)?$/.test(getValuesFromPdf(parseInt(line) + 1, " ", 4, getValuesFromPdf(parseInt(line) + 1, "|", 1, null))) ? getValuesFromPdf(parseInt(line) + 1, " ", 4, getValuesFromPdf(parseInt(line) + 1, "|", 1, null)) :
          getValuesFromPdf(parseInt(line) + 1, " ", 2, getValuesFromPdf(parseInt(line) + 1, "|", 1, null))) : getValuesFromPdf(parseInt(line) + 1, "~", 1, getValuesFromPdf(parseInt(line) + 1, " ", 9, null));

      var firstInvoiceAmount = str == "a" ?
        (/^[+-]?\d+(\.\d+)?$/.test(getValuesFromPdf(parseInt(line) + 1, " ", 4, getValuesFromPdf(parseInt(line) + 1, "|", 1, null))) ? getValuesFromPdf(parseInt(line) + 1, " ", 4, getValuesFromPdf(parseInt(line) + 1, "|", 1, null)) :
          getValuesFromPdf((parseInt(getAllIndexes("INVOICE VALUE")) + 1), " ", 0, null)) :
        /^[+-]?\d+(\.\d+)?$/.test(getValuesFromPdf(parseInt(line) + 1, " ", 9, null)) ? getValuesFromPdf(parseInt(line) + 1, " ", 9, null) : getValuesFromPdf(parseInt(line) + 1, " ", 11, null);

      var firstInvoiceCurrency = str == "a" ?
        ((/^[+-]?\d+(\.\d+)?$/.test(getValuesFromPdf(parseInt(line) + 1, " ", 4, getValuesFromPdf(parseInt(line) + 1, "|", 1, null))) ? getValuesFromPdf(parseInt(line) + 1, "__", 1, getValuesFromPdf(parseInt(line) + 1, "|", 1, null)) :
          getValuesFromPdf(parseInt(line) + 1, "-", 1, getValuesFromPdf(parseInt(line) + 1, " ", 4, getValuesFromPdf(parseInt(line) + 1, "|", 1, null))))) :
        /^[+-]?\d+(\.\d+)?$/.test(getValuesFromPdf(parseInt(line) + 1, " ", 9, null)) ? getValuesFromPdf(parseInt(line) + 1, " ", 10, null) : getValuesFromPdf(parseInt(line) + 1, " ", 12, null);
      invoices.push({
        "sno": "1",
        "invoiceno": firstInvoiceNo == undefined ? "" : firstInvoiceNo,
        "amount": firstInvoiceAmount == undefined ? "" : firstInvoiceAmount,
        "currency": firstInvoiceCurrency == undefined ? "" : firstInvoiceCurrency
      });
      var secondSNo = getValuesFromPdf(parseInt(line) + 1, " ", 5, null);
      var secondInvoiceNo = str == "a" ? getValuesFromPdf(parseInt(line) + 1, " ", 5, null) : getValuesFromPdf(parseInt(line) + 1, " ", 6, null);
      var secondInvoiceAmount = getValuesFromPdf(parseInt(line) + 1, " ", 7, null);
      var secondInvoiceCurrency = getValuesFromPdf(parseInt(line) + 1, " ", 8, null);
      if (secondInvoiceAmount != undefined && secondInvoiceCurrency != undefined) {
        invoices.push({
          "sno": secondSNo == undefined ? "" : secondSNo,
          "invoiceno": secondInvoiceNo == undefined ? "" : secondInvoiceNo,
          "amount": secondInvoiceAmount == undefined ? "" : secondInvoiceAmount,
          "currency": secondInvoiceCurrency == undefined ? "" : secondInvoiceCurrency
        })
      }

      return invoices;

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
      output["iecCode"] = iecCode;

      //IEC NAME
      var iecName = split[parseInt(iecLine) + 2];
      output["iecName"] = iecName;

      //AD CODE
      var adCodeLine = getAllIndexes("AD Code");
      var adCode = getValuesFromPdf(adCodeLine, ":", 3, null);
      output["adCode"] = adCode;

      //Inv No
      var invoiceNumberLine = getAllIndexes("Inv No");
      var invoiceNumber1 = getValuesFromPdf(invoiceNumberLine, ":", 1, null);
      var invoiceNumber = getValuesFromPdf(invoiceNumberLine, " ", 1, invoiceNumber1).split('=-').join('-');
      output["invoiceNumber"] = invoiceNumber;

            //Invoice Amount
            var invoiceAmountLine = getAllIndexes("Inv Val");
            console.log(invoiceAmountLine);
            if (invoiceAmountLine.length === 0) {
                invoiceAmountLine = getAllIndexes("Inv Pal");
                console.log(invoiceAmountLine, " First ");
                if (invoiceAmountLine.length === 0) {
                    output["invoiceAmount"] = " ";
                } else {
                    var invoiceAmount1 = getValuesFromPdf(invoiceAmountLine, ":", 1, null);
                    console.log("Invoice Amount", invoiceAmount1);
                    var invoiceAmount = getValuesFromPdf(invoiceAmountLine, " ", 1, invoiceAmount1);
                    // console.log("third", typeof invoiceAmount)
                    var invoiceAmount2 = parseFloat(invoiceAmount)
                    console.log(invoiceAmount, " Second ");
                    output["invoiceAmount"] = invoiceAmount2;
                }
            } else {
                var invoiceAmount1 = getValuesFromPdf(invoiceAmountLine, ":", 1, null);
                console.log("Invoice Amount");
                var invoiceAmount = getValuesFromPdf(invoiceAmountLine, " ", 1, invoiceAmount1);
                console.log("typeof invoice", typeof invoiceAmount)
                var invoiceAmount3 = parseFloat(invoiceAmount)
                console.log(typeof invoiceAmount3)
                output["invoiceAmount"] = invoiceAmount3;
            }




      //currency
      output["currency"] = getValuesFromPdf(invoiceAmountLine, " ", 2, invoiceAmount1);

      //Settled Amount
      // var settleNumberLine = getAllIndexes("Set Val");

      output["settledAmount"] = "";

      //Status
      output["status"] = "";

            //Freight Amount
            var freightAmountLine = getAllIndexes("Freight");
            var freightAmount1 = getValuesFromPdf(freightAmountLine, ":", 1, null);
            var freightAmount = getValuesFromPdf(freightAmountLine, " ", 1, freightAmount1);
            var freightAmount2 = parseFloat(freightAmount)
            console.log(typeof freightAmount2, freightAmount2)
            output["freightAmount"] = freightAmount2;

      //Freight currency
      var freightCurrency = getValuesFromPdf(freightAmountLine, " ", 2, freightAmount1);
      output["freightCurrency"] = freightCurrency;

            //Insurance amount
            var insuranceAmountLine = getAllIndexes("Insurance");
            var insuranceAmount1 = getValuesFromPdf(insuranceAmountLine, ":", 1, null);
            var insuranceAmount = getValuesFromPdf(insuranceAmountLine, " ", 1, insuranceAmount1);
            var insuranceAmount2 = parseFloat(insuranceAmount)
            console.log(typeof insuranceAmount2, insuranceAmount2)
            output["insuranceAmount"] = insuranceAmount2;

      //Insurance currency
      var insuranceCurrency = getValuesFromPdf(insuranceAmountLine, " ", 2, insuranceAmount1);
      output["insuranceCurrency"] = insuranceCurrency;

            //Discount Amount
            var discountAmountLine = getAllIndexes("Discount Amount");
            var discountAmount = getValuesFromPdf(discountAmountLine, ":", 2, null);
            var discountAmount2 = parseFloat(discountAmount)
            console.log(typeof discountAmount2, discountAmount2)
            output["discountAmount"] = discountAmount2;

      //Discount Currency
      var discountCurrency = getValuesFromPdf(discountAmountLine, " ", 2, discountAmount);
      if (discountCurrency === undefined) {
        output["discountCurrency"] = "";
      } else {
        output["discountCurrency"] = discountCurrency;
      }


            //Miscellaneous Amount
            var misAmountLine = getAllIndexes("Misc");
            var miscAmount1 = getValuesFromPdf(misAmountLine, ":", 1, null);
            var miscAmount = getValuesFromPdf(misAmountLine, " ", 2, miscAmount1);
            var miscAmount2 = parseFloat(miscAmount)
            console.log(typeof miscAmount2, miscAmount2)
            output["miscellaneousAmount"] = miscAmount2;

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
      (async () => {
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

  blobStream.on('finish', async (success) => {
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
  console.log("hshshmamamma");
  const { originalname, buffer } = file;

  const blob = bucket.file(originalname.replace(/ /g, "_"));
  const blobStream = blob.createWriteStream({
    resumable: false
  });

  blobStream.on('finish', async (success) => {

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