module.exports = app => {
    const stocks = require("../controllers/stock.controller.js");
    var router = require("express").Router();
    // Retrieve all stocks
    router.get("/stocks", stocks.findAll);
    // // Retrieve all published stocks
    // router.get("/:id", stocks.findOne);
    // Update stock
    router.put("/adjustment", stocks.update);
    app.use('/klikdaily', router);
  };
