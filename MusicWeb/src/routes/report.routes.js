    const { getAllReport ,getOneReport , createOneReport, deleteOneReport} = require("../app/controllers/report.controller.js");
    const {verifyToken} = require("../app/middlewares/verifyToken.js");
    const router = require("express").Router();
  
    // Create a new report
    router.post("/",verifyToken ,createOneReport);
  
    // Retrieve all report
    router.get("/",verifyToken ,getAllReport);

    // Retrieve a single report with id
    router.get("/:id",verifyToken ,getOneReport);
    
    // Delete a report with id
    router.delete("/:id",verifyToken ,deleteOneReport);
  
    module.exports = router;

