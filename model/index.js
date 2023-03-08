const database = require("../config");
let { hash, compare, hashSync } = require("bcrypt");
let { createToken } = require("../middleware/AuthenticatedUser");
const jwToken = require('jsonwebtoken');


class User {
  login(req, res) {
    const { userEmail, userPass } = req.body;

    database.query(`SELECT userID, firstName, lastName, userEmail, userPass, userRole
    FROM users 
    WHERE userEmail = '${userEmail}';`, async (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.send("Email not found please register");
      } else {
        const isMatch = await compare(req.body.userPass, result[0].userPass);
        if (!isMatch) {
          res.send("Password is incorrect");
        } else {
          const data = {
            user: {
              id:result[0].id,
              firstName: result[0].firstName,
              lastName: result[0].lastName,
              userEmail:result[0].userEmail,
            },
          };

          jwToken.sign(
            data, process.env.SECRET_KEY,
            {
              expiresIn: "365 days",
            },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
        }
      }
    });
  } catch (error) {
    console.log(error);
  }


  fetchUsers(req, res) {
    const strQry = `
            SELECT userID, firstName, lastName, userEmail, userRole FROM users;
            `;

    database.query(strQry, (err, data) => {
      if (err) throw err;
      else res.status(200).json({ results: data });
    });
  }
  fetchUser(req, res) {
    const strQry = `
            SELECT userID, firstName, lastName, userEmail, userRole FROM users
            WHERE userID = ?;
            `;

    database.query(strQry, [req.params.id], (err, data) => {
      if (err) throw err;
      else res.status(200).json({ result: data });
    });
  }
  async createUser(req, res) {
    // Payload
    let detail = req.body;
    // Hashing user password
    detail.userPass = await hash(detail.userPass, 15);
    let user = {
      userEmail: detail.userEmail,
      userPass: detail.userPass,
    };
    const strQry = `INSERT INTO users SET ?;`;
    database.query(strQry, [detail], (err) => {
      if (err) {
        res.status(401).json({ err });
      } else {
        // Create a token
        const jwToken = createToken(user);
        res.cookie("LegitUser", jwToken, {
          maxAge: 3600000,
          httpOnly: true,
        });
        res.status(200).json({ msg: "A user record was saved." });
      }
    });
  }
  updateUser(req, res) {
    let data = req.body;
    if (data.userPass != null || data.userPass != undefined)
      data.userPass = hashSync(data.userPass, 15);
    const strQry = `
            UPDATE users
            SET ?
            WHERE userID = ?;
            `;
    //db
    database.query(strQry, [data, req.params.id], (err) => {
      if (err) throw err;
      res.status(200).json({ msg: "A row was affected successfully" });
    });
  }
  forgotPassword(req, res) {
    let data = req.body;
    if (data.userPass != null || data.userPass != undefined)
      data.userPass = hashSync(data.userPass, 15);
    const strQry = `
      UPDATE users
            SET ?
            WHERE userID = ?;
      `;
    //db
    database.query(strQry, [data, req.params.id], (err) => {
      if (err) throw err;
      res.status(200).json({ msg: "Password successfully updated" });
    });
  }
  deleteUser(req, res) {
    const strQry = `
            DELETE FROM users
            WHERE userID = ?;
            `;
    //db
    database.query(strQry, [req.params.id], (err) => {
      if (err) throw err;
      res.status(200).json({ msg: "A record was removed from a database" });
    });
  }
}
//PRODUCTS CLASS
class Product {
  fetchProducts(req, res) {
    const strQry = `SELECT id, prodName, prodDescription, brand, price, prodQuantity, imgURL
                FROM products;`;
    database.query(strQry, (err, results) => {
      if (err) throw err;
      res.status(200).json({ results: results });
    });
  }
  fetchProduct(req, res) {
    const strQry = `SELECT id, prodName, prodDescription, brand, price, prodQuantity, imgURL
                FROM products
                WHERE id = ?;`;
    database.query(strQry, [req.params.id], (err, results) => {
      if (err) throw err;
      res.status(200).json({ results: results });
    });
  }
  addProduct(req, res) {
    const strQry = `
                INSERT INTO products
                SET ?;
                `;
    database.query(strQry, [req.body], (err) => {
      if (err) {
        res
          .status(400)
          .json({ err: "inserting a new record was unsuccessful" });
      } else {
        res.status(200).json({ msg: "Product saved" });
      }
    });
  }
  updateProduct(req, res) {
    const strQry = `
                UPDATE products
                SET ?
                WHERE id = ?
                `;
    database.query(strQry, [req.body, req.params.id], (err) => {
      if (err) {
        res
          .status(400)
          .json({ err: "Updating product was unsuccessful" });
      } else {
        res.status(200).json({ msg: "Product updated" });
      }
    });
  }
  deleteProduct(req, res) {
    const strQry = `
                DELETE FROM products
                WHERE id = ?;
                `;
    database.query(strQry, [req.params.id], (err) => {
      if (err) res.status(400).json({ err: "The record was not found." });
      res.status(200).json({ msg: "A product was deleted." });
    });
  }
}

class Cart{
    fetchCart(req, res) {
      const strQry = `SELECT cart FROM users WHERE id = ${req.params.id};`;

      db.query(strQry, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            let cart;
            if (results[0].cart == null) {
                cart = [];
            } else {
                cart = JSON.parse(results[0].cart);
            }
            let { id } = req.body;

            let product = `Select * FROM products WHERE id = ?`;

            db.query(product, id, (err, productData) => {
                if (err) res.send(`${err}`);
                let data = {
                    cart_id: cart.length + 1,
                    productData,
                };
                cart.push(data);
                console.log(cart);
                let updateCart = `UPDATE users SET cart = ? WHERE id = ${req.params.id}`;
                db.query(updateCart, JSON.stringify(cart), (err, results) => {
                    if (err) throw err;
                    res.json({
                        status: 200,
                        cart: results,
                    });
                });
            });
        }
    });
  }

    addCart(req, res) {

      // const strQry = `SELECT * FROM users WHERE id = ${req.params.id};`;
  db.query(`SELECT * FROM users WHERE id = ${req.params.id};`, [req.params.id], (err, results) => {
      if (results.length < 1) {
          res.json({
              status: 400,
              msg: `Failed to view cart item`
          });
      }
      let cartResults = JSON.parse(results[0].cart);
      res.json({
          status: 200,
          results: cartResults.filter((item) => {
              return item.cart_id == req.params.cartID;
          }),
      });
  });
    }

    deleteCart(req, res) {

      // const delCart = `SELECT cart FROM users WHERE id = ${req.params.id}`;
    db.query(`SELECT cart FROM users WHERE id = ${req.params.id}`, (err, results) => {
        if (err) {
            res.json({
                status: 400,
                msg: `Failed to delete cart item`
            });
        }
        if (results.length > 0) {
            if (results[0].cart != null) {
                const result = JSON.parse(results[0].cart).filter((cart) => {
                    return cart.cart_id != req.params.cartID;
                });
                result.forEach((cart, i) => {
                    cart.cart_id = i + 1;
                });

                // const query = ` UPDATE users SET cart = ? WHERE id = ${req.params.id}`;
                db.query(`UPDATE users SET cart = ? WHERE id = ${req.params.id}`, [JSON.stringify(result)], (err, results) => {
                    if (err) {
                        res.json({
                            status: 400,
                            msg: `Failed to delete cart item`
                        });
                    } else {
                      res.json({
                        status: 200,
                        results: "Item deleted from cart",
                    });
                    }
                    
                });
            }
          }
    });
    }
}

module.exports = { User, Product, Cart };