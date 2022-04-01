const sql = require("./db.js");

const Stock = function(stock) {
  this.location_id = stock.location_id
  this.adjustment = stock.adjustment
  this.product = stock.product
};

Stock.getAll = (result) => {
  let query = "SELECT * FROM stocks";
  sql.query(query, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Stock.update = (stock)=> {
  return new Promise((resolve, reject) => {
    var dateTime = new Date();
    sql.query(
      "UPDATE stocks SET quantity = quantity + ? WHERE product = ? AND id = ? ",
      [stock.adjustment, stock.product, stock.location_id],
      (err, res) => {
        if (err) {
          reject(err);
        }
        if (res.affectedRows == 0) {
          reject({ kind: "not_found" });
        }else{
          sql.query(
           "SELECT * FROM stocks Where id=? limit 1",
           [stock.location_id],
           (err, res) => {
            Stock.createLog({
              "location_id": stock.location_id,
              "type": stock.adjustment<0 ? "Outbound":"Inbound",
              "created_at": dateTime,
              "adjustment": stock.adjustment,
              "quantity": res[0].quantity
            })
            stock.location = res[0].location 
            stock.quantity = res[0].quantity
            resolve(stock);
           }
           )
        }
      }
    );
})
};

Stock.createLog = (newLog) => {
  sql.query("INSERT INTO logs SET ?", newLog);
};

Stock.getLogs = (id) => {
  return new Promise((resolve, reject) => {
  sql.query(`SELECT * FROM logs WHERE location_id = ${id}`, (err, res) => {
    if (err) {
      resolve(err);
      return;
    }
    if (res.length) {
      sql.query(
        "SELECT * FROM stocks Where id=? limit 1",
        [id],
        (err, loc) => {
          res.location_name = loc[0].location
          res.product_name = loc[0].product
          res.current_qty = loc[0].quantity
          resolve(res);
        })
    } else reject({ kind: "not_found" });
  });
  })
};

module.exports = Stock;