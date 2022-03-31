const Stock = require("../models/stock.model.js");
// Retrieve all stocks from the database (with condition).
exports.findAll = (req, res) => {
  //const title = req.query.title;
  Stock.getAll((err, data) => {
    if (err)
      res.status(200).send({
        message:
          err.message || "Some error occurred while retrieving Items."
      });
    else res.send({
    "status_code": 200,
    "status_message": "Success",
    "stocks": data});
  });
};
// Update a stock identified by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        res.status(200).send({
          message: "Content can not be empty!"
        });
      }
      var adj = req.body.length;
      //console.log(req.body.length)
      //for(var i = 0; i < req.body.length; i++){
        Stock.update(
          // req.params.id,
          new Stock(req.body),
          (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(200).send({
                  message: `Not found Item with id ${req.body.location_id}.`
                });
                adj--
              } else {
                res.status(200).send({
                  message: "Error updating Item with id " + req.body.location_id
                });
                adj--
              }
            } else res.send({
              "status": "Success",
              "updated_at": Date.now(),
              // "location_id": data[i].location_id,
              // "product" : data[i].product,
              "result" :data
            });
          }
        );
      //}
};