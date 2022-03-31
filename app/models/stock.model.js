const sql = require("./db.js");
// constructor
const Stock = function(stock) {
  this.location_id = stock.location_id
  this.adjustment = stock.adjustment
  this.product = stock.product
};

Stock.getAll = (result) => {
  let query = "SELECT * FROM stocks";
  // if (title) {
  //   query += ` WHERE title LIKE '%${title}%'`;
  // }
  sql.query(query, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(null, err);
      return;
    }
    //console.log("stocks: ", res);
    result(null, res);
  });
};
Stock.update = (stock, result) => {
  console.log(stock)
    sql.query(
      "UPDATE stocks SET quantity = quantity + ? WHERE product = ? AND id = ? ",
      [stock.adjustment, stock.product, stock.location_id],
      (err, res) => {
        if (err) {
          //console.log("error: ", stock);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // not found stock with the id
          result({ kind: "not_found" }, null);
          return;
        }
        //console.log("results: ", { ...stock });
        result(null, { ...stock });
      }
    );
  
};
module.exports = Stock;