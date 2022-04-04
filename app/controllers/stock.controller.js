const Stock = require("../models/stock.model.js");

exports.findAllLogById =async (req, res) => {
  var err,data
  var arr = []
  await Stock.getLogs(req.params.id)
  .then((dataItem)=>{
    data = dataItem
  })
  .catch((errItem)=>{
    err=errItem
  });

  if (err) {
    if (err.kind === "not_found") {
      arr.push({
        message: `Not found Log with id ${req.params.id}.`
      })
    } else {
      arr.push({
        message: "Error retrieving Log with id " + req.params.id
      })
    }
  } else{
    arr.push({
      "status_code" : 200,
        "status": data!=null ?"Success, logs found": "No log found",
        "location_id": req.params.id,
        "location_name": data.location_name,
        "product": data.product_name,
        "current_qty": data.current_qty,
        "logs": data
    })
  }
  res.send(arr)
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
        
        var err="",data=""
        await Stock.update(
          new Stock(req.body[i]) 
        ).then((dataItem)=>{
          data=dataItem
        })
        .catch((errItem)=>{
          err=errItem
        });
            if (err) {
              if (err.kind == "not_found") {
                arrRes.push({
                  "status": "Failed",
                  "error_message": "Product not found",
                  "updated_at": dateTime,
                  "location_id": req.body[i].location_id
                })
                adj--
              } else {
                arrRes.push({
                  "status": "Failed",
                  "error_message": "Invalid product",
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