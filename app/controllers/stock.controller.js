const Stock = require("../models/stock.model.js");
// Retrieve all stocks from the database (with condition).

// exports.createLog = (req, res) => {
//   // Validate request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }
//   // Create a Tutorial
//   const tutorial = new Tutorial({
//     title: req.body.title,
//     description: req.body.description,
//     published: req.body.published || false
//   });
//   // Save Tutorial in the database
//   Tutorial.create(tutorial, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Tutorial."
//       });
//     else res.send(data);
//   });
// };
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
      // res.setHeader({
      //   "status_code": 200,
      //   "requests": req.body.length,
      //   "adjusted": adj,
      // },'application/json')
      //console.log(req.body.length)
      // res.setHeader({
      //   "status_code": 200,
      //   "requests": req.body.length,
      //   "adjusted": adj,
      // })
      var arrRes= [];
      console.log(req.body)
      for(var i = 0; i < req.body.length; i++){
        
        var a
        await Stock.update(
          // req.params.id,
          
          new Stock(req.body[0]),
          (err, data) => {
            console.log("1")
            a="test1"
            
            if (err) {
              if (err.kind === "not_found") {
                
                arrRes = new Array({
                  "status": "Failed"
                  //"updated_at": Date.now(),
                  // "location_id": data[i].location_id,
                  // "product" : data[i].product,
                  //"result" :data
                })
                // arrRes.push()
                // res.send({
                //   message: `Not found Item with id ${req.body.location_id}.`
                // });
                adj--
              } else {
                // arrRes.push("test2")
                // // arrRes = new Array({
                // //   "status": "Failed"
                // //   //"updated_at": Date.now(),
                // //   // "location_id": data[i].location_id,
                // //   // "product" : data[i].product,
                // //   //"result" :data
                // // })
                // // res.send({
                // //   message: "Error updating Item with id " + req.body.location_id
                // // });
                adj--
              }
            } 
            a="testSucess"
            arrRes.push("testSucess")
            // arrRes.Push({
            //   "status": "Success"
            //   //"updated_at": Date.now(),
            //   // "location_id": data[i].location_id,
            //   // "product" : data[i].product,
            //   //"result" :data
            // })
            //else 
            // arrRes.push(
            //   data
              
            // );
            // res.send({
            //   "status": "Success",
            //   //"updated_at": Date.now(),
            //   // "location_id": data[i].location_id,
            //   // "product" : data[i].product,
            //   "result" :data
            // });
          }
        );
        console.log(a)
                res.send()
        console.log("2")
        // arrRes.push("PING!!")
        console.log(arrRes)
        //res.send()
        
      }

      
};