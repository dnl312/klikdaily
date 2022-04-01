const Stock = require("../models/stock.model.js");

exports.findAllLogById = (req, res) => {
  Stock.getLogs(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Log with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Log with id " + req.params.id
        });
      }
    } else{
      res.send(
        {
        "status_code" : 200,
        "status": data.length >0 ?"Success, logs found": "No log found",
        "location_id": req.params.id,
        // "location_name": res[0].location,
        // "product": res[0].product,
        // "current_qty": res[0].quantity,
        "logs": data
      });
    } 
  });
};

exports.findAll = (req, res) => {
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
exports.update =async (req, res) => {
    if (!req.body) {
        res.status(200).send({
          message: "Content can not be empty!"
        });
      }
      var dateTime = new Date().toISOString().replace('T', ' ').substring(0, 19)

      var adj = req.body.length;
      var arr=[]
      var arrRes= []
      for(var i = 0; i < req.body.length; i++){
        
        var err,data
        await Stock.update(
          new Stock(req.body[i]) 
        ).then((dataItem)=>{
          data = dataItem
        })
        .catch((errItem)=>{
          err=errItem
        });
            if (err) {
              if (err.kind === "not_found") {
                await arrRes.push({
                  "status": "Failed",
                  "error_message": "Invalid Product",
                  "updated_at": dateTime,
                  "location_id": req.body[i].location_id
                })
                adj--
              } else {
                arrRes.push({
                  "status": "Failed",
                  "error_message": "Invalid Product",
                  "updated_at": dateTime,
                  "location_id": req.body[i].location_id
                })
                adj--
              }
            } else{
              arrRes.push({
                "status": "Success",
                "updated_at": dateTime,
                "location_id": req.body[i].location_id,
                "location_name": data.location,
                "product" : req.body[i].product,
                "adjustment" : req.body[i].adjustment,
                "quantity" : data.quantity
              })
            }
      }
      arr.push({
        "status_code": 200,
        "requests": req.body.length,
        "adjusted": adj,
        "results" : arrRes
      })
      res.send(arr)
};