module.exports = app => {
    const stocks = require("../controllers/stock.controller.js");
    var router = require("express").Router();
    router.get("/logs/:id", stocks.findAllLogById)
    router.get("/stocks", stocks.findAll);
    router.put("/adjustment", stocks.update);
    app.use('/klikdaily', router);
  };
