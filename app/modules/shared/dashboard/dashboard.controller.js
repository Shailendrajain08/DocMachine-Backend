
const piPoModel = require("../PI_PO/pi_po.model");
const irAdviceModel = require("../irAdvice/irAdvice.model");
const masterFileModel = require("../masterFile/master.model");
const blModel = require("../blCopyrefno/blcopy.model");
const edpmsModel = require("../edpms/edpms.model");



const getDashboardData = async (req, res) => {
    let result =  {}

    let pipo = await piPoModel.getPipobasedOnNumberAndcurrency(req, res)
    result.pipo = pipo
    let ShippingBill = await masterFileModel.getSBbasedOnNumberAndcurrency(req, res)
    result.ShippingBill = ShippingBill
    let inwardData = await irAdviceModel.getInwardbasedOnNumberAndcurrency(req, res)
    result.inward = inwardData

    let sbPendingData = await masterFileModel.getSBPendingSubmission(req, res)
    result.sbPendingData = sbPendingData

    let docSubmitedAndNoAwaitedData = await blModel.getDocSubmitedNoAwaited(req, res)
    result.docSubmitedAndNoAwaitedData = docSubmitedAndNoAwaitedData

    let inwardRemittances = await irAdviceModel.getTotalInwardRemitances(req, res)
    result.inwardRemittances = inwardRemittances

    let EDPMSData = await edpmsModel.getEDPMSData(req, res)
    result.EDPMSData = EDPMSData

    // console.log("api called")

    let orderShipMentData = await piPoModel.getOrderPendingforShipment(req, res)
    result.orderShipMentData = orderShipMentData

    let billLoedgment = await blModel.getTotalBillLogdement(req, res)
    result.billLoedgment = billLoedgment
    

   res.send(result)


   
};





module.exports = {
    getDashboardData,
};
