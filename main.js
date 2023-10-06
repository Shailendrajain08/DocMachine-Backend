const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
require("dotenv").config({ path: ".env" });
const multer = require("multer");
const passport = require("passport");

const { mongoose } = require("./db.js");

const Auth = require("./app/modules/authentication/authentication.routes");
const User = require("./app/modules/user/user.routes");
const Document = require("./app/modules/shared/documents/document.routes");
const Master = require("./app/modules/shared/masterFile/master.routes");
const Boe = require("./app/modules/shared/boeFile/boe.routes");
const Team = require("./app/modules/shared/teams/team.routes");
const Bene = require("./app/modules/shared/beneFile/bene.routes");
const Buyer = require("./app/modules/shared/buyerFile/buyer.routes");
const Member = require("./app/modules/shared/member/member.routes");
const PiPo = require("./app/modules/shared/PI_PO/pi_po.routes");
const pdf = require("./app/modules/pdfGenerationModule/pdfGeneratorService");
const Task = require("./app/modules/shared/task/task.routes");
const Third = require("./app/modules/shared/thirdParty/thirdParty.routes");
const Credit = require("./app/modules/shared/creditNote/creditNote.routes");
const Debit = require("./app/modules/shared/debitNote/debitNote.routes");
const Swift = require("./app/modules/shared/swiftcopy/swift.routes");
const Ebrc = require("./app/modules/shared/EBRC/ebrc.routes");
const Blcopy = require("./app/modules/shared/blCopyrefno/blcopy.routes");
const Insurance = require("./app/modules/shared/insuranceDoc/insurance.routes");
const LetterLC = require("./app/modules/shared/LetterLC/letterLC.routes");
const MasterService = require("./app/modules/shared/masterService/masterService.routes");
const OpinionReport = require("./app/modules/shared/opinionReport/opinionReport.routes");
const ExportTask = require("./app/modules/shared/exportTask/exportTask.routes");
const otp = require("./app/modules/shared/otp/otp.routes");
const irAdvice = require("./app/modules/shared/irAdvice/irAdvice.routes");
const AirwayBlCopy = require("./app/modules/shared/airwayBLCopy/airwayBlCopy.routes");
const Commercial = require("./app/modules/shared/commercial/commercial.routes");
const BillOfExchange = require("./app/modules/shared/BillOfExchange/billOfExchange.routes");
const Destruction = require("./app/modules/shared/destruction/destruction.routes");
const OtherDoc = require("./app/modules/shared/otherDoc/otherDoc.routes");
const EDPMS = require("./app/modules/shared/edpms/edpms.routes");
const PackingList = require("./app/modules/shared/packingList/packingList.routes");

var app1 = express();
app1.use(cors({ origin: "*" }));
app1.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app1.use(bodyParser.json({ limit: "50mb" }));
app1.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

app1.disable("x-powered-by");
app1.use(multerMid.single("file"));
app1.use(bodyParser.json());
app1.use(bodyParser.urlencoded({ extended: false }));

app1.use(passport.initialize());
app1.use(passport.session());
require("./app/config/passport")(passport);

app1.listen(3000, () => console.log("Server started at port number: 3000"));
app1.get('/', (req, res) => {
    res.send('server is ready')
});

app1.use("/v1/authenticate", Auth);
app1.options("/v1/authenticate/login", cors(), Auth);
app1.use("/v1/authenticate", Auth);
app1.use(
    "/v1/otp",
    passport.authenticate("jwt", { session: false }),
    otp
);
app1.use(
    "/v1/documents",
    passport.authenticate("jwt", { session: false }),
    Document
);
app1.use("/v1/user", passport.authenticate("jwt", { session: false }), User);
app1.use(
    "/v1/master",
    passport.authenticate("jwt", { session: false }),
    Master
);
app1.use("/v1/boe", passport.authenticate("jwt", { session: false }), Boe);
app1.use("/v1/team", passport.authenticate("jwt", { session: false }), Team);
app1.use("/v1/bene", passport.authenticate("jwt", { session: false }), Bene);
app1.use("/v1/buyer", passport.authenticate("jwt", { session: false }), Buyer);
app1.use("/v1/pipo", passport.authenticate("jwt", { session: false }), PiPo);
app1.use("/v1/task", passport.authenticate("jwt", { session: false }), Task);
app1.use("/v1/third", passport.authenticate("jwt", { session: false }), Third);
app1.use("/v1/exportTask", passport.authenticate("jwt", { session: false }), ExportTask);
app1.use("/v1/member", passport.authenticate("jwt", { session: false }), Member);
app1.use("/v1/pdf", passport.authenticate("jwt", { session: false }), pdf);
app1.use("/v1/credit", passport.authenticate("jwt", { session: false }), Credit);
app1.use("/v1/debit", passport.authenticate("jwt", { session: false }), Debit);
app1.use("/v1/insurance", passport.authenticate("jwt", { session: false }), Insurance);
app1.use("/v1/letterLC", passport.authenticate("jwt", { session: false }), LetterLC);
app1.use("/v1/masterService", passport.authenticate("jwt", { session: false }), MasterService);
app1.use("/v1/opinionReport", passport.authenticate("jwt", { session: false }), OpinionReport);
app1.use("/v1/swift", passport.authenticate("jwt", { session: false }), Swift);
app1.use("/v1/ebrc", passport.authenticate("jwt", { session: false }), Ebrc);
app1.use("/v1/blcopy", passport.authenticate("jwt", { session: false }), Blcopy);
app1.use("/v1/irAdvice", passport.authenticate("jwt", { session: false }), irAdvice);
app1.use("/v1/airwayblcopy", passport.authenticate("jwt", { session: false }), AirwayBlCopy);
app1.use("/v1/commercial", passport.authenticate("jwt", { session: false }), Commercial);
app1.use("/v1/billOfExchange", passport.authenticate("jwt", { session: false }), BillOfExchange);
app1.use("/v1/destruction", passport.authenticate("jwt", { session: false }), Destruction);
// app1.use("/v1/otherDoc", passport.authenticate("jwt", { session: false }), OtherDoc);
app1.use("/v1/packingList", passport.authenticate("jwt", { session: false }), PackingList);
// app1.use("/v1/otherDoc", passport.authenticate("jwt", { session: false }), OtherDoc);
app1.use("/v1/edpms", passport.authenticate("jwt", { session: false }), EDPMS);
process.on("uncaughtException", function(err) {
    console.log("Caught exception: " + err);
});