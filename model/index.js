const database = require("../config");
let { hash, compare, hashSync } = require("bcrypt");
let { createToken } = require("../middleware/AuthenticatedUser");
const jwToken = require('jsonwebtoken');


class User {
  login(req, res) {
    const { userEmail, userPass } = req.body;

    database.query(`SELECT userID, firstName, lastName, userEmail, userPass, userRole, userProfile
    FROM users 
    WHERE userEmail = '${userEmail}';`, async (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.send("Email not found please register");
      } else {
        const passMatch = await compare(req.body.userPass, result[0].userPass);
        if (!passMatch) {
          res.send("Password is incorrect");
        } else {
          const data = {
            user: {
              id:result[0].id,
              firstName: result[0].firstName,
              lastName: result[0].lastName,
              userEmail:result[0].userEmail,
              userProfile:result[0].userProfile,
              userPass:result[0].userPass,
            },
          };

          jwToken.sign(
            data, process.env.SECRET_KEY,
            {
              expiresIn: "1 year",
            },
            (err, token) => {
              if (err) throw err;
              res.json({ token, data });
            }
          );
        }
      }
    });
  } catch (error) {
    console.log(error);
  }


  fetchUsers(req, res) {

    database.query(`SELECT userID, firstName, lastName, userEmail, userRole, userProfile FROM users;`, (err, data) => {
      if (err) throw err;
      else res.status(200).json({ results: data });
    });
  }
  fetchUser(req, res) {

    database.query(`SELECT userID, firstName, lastName, userEmail, userRole, userProfile FROM users WHERE userID = ?;`, [req.params.id], (err, data) => {
      if (err) throw err;
      else res.status(200).json({ result: data });
    });
  }
  async createUser(req, res) {
    let detail = req.body;
    detail.userPass = await hash(detail.userPass, 15);
    let user = {
      userEmail: detail.userEmail,
      userPass: detail.userPass,
    };

    database.query(`INSERT INTO users SET ?;`, [detail], (err) => {
      if (err) {
        res.status(401).json({ err });
      } else {
        const jwToken = createToken(user);
        res.cookie("LegitUser", jwToken, {
          maxAge: 3600000,
          httpOnly: true,
        });
        res.status(200).json({ msg: "User has been registered" });
      }
    });
  }
  updateUser(req, res) {
    let data = req.body;
    if (data.userPass != null || data.userPass != undefined)
      data.userPass = hashSync(data.userPass, 15);

    database.query(`UPDATE users SET ? WHERE userID = ?;`, [data, req.params.id], (err) => {
      if (err) throw err;
      res.status(200).json({ msg: "A row was affected successfully" });
    });
  }
  forgotPassword(req, res) {
    let data = req.body;
    if (data.userPass != null || data.userPass != undefined)
      data.userPass = hashSync(data.userPass, 15);

    database.query(`UPDATE users SET ? WHERE userID = ?;`, [data, req.params.id], (err) => {
      if (err) throw err;
      res.status(200).json({ msg: "Password successfully updated" });
    });
  }
  deleteUser(req, res) {

    database.query(`DELETE FROM users WHERE userID = ?;`, [req.params.id], (err) => {
      if (err) throw err;
      res.status(200).json({ msg: "User has been deleted" });
    });
  }
}

class Product {
  fetchProducts(req, res) {

    database.query(`SELECT id, prodName, prodDescription, brand, price, prodQuantity, imgURL FROM products;`, (err, results) => {
      if (err) throw err;
      res.status(200).json({ results: results });
    });
  }
  fetchProduct(req, res) {

    database.query(`SELECT id, prodName, prodDescription, brand, price, prodQuantity, imgURL FROM products WHERE id = ?;`, [req.params.id], (err, results) => {
      if (err) throw err;
      res.status(200).json({ results: results });
    });
  }
  addProduct(req, res) {

    database.query(`INSERT INTO products SET ?;`, [req.body], (err) => {
      if (err) {
        res
          .status(400)
          .json({ err: "Adding new product was unsuccessful" });
      } else {
        res.status(200).json({ msg: "Product successfully added" });
      }
    });
  }
  updateProduct(req, res) {

    database.query(`UPDATE products SET ? WHERE id = ?`, [req.body, req.params.id], (err) => {
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

    database.query(`DELETE FROM products WHERE id = ?;`, [req.params.id], (err) => {
      if (err) res.status(400).json({ err: "The record was not found." });
      res.status(200).json({ msg: "A product was deleted." });
    });
  }
}

class Cart{
    fetchCart(req, res) {

      db.query(`SELECT cart FROM users WHERE id = ${req.params.id};`, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            let cart;
            if (results[0].cart == null) {
                cart = [];
            } else {
                cart = JSON.parse(results[0].cart);
            }
            let { id } = req.body;

            db.query(`Select * FROM products WHERE id = ?`, id, (err, productData) => {
                if (err) res.send(`${err}`);
                let data = {
                    cart_id: cart.length + 1,
                    productData,
                };
                cart.push(data);
                console.log(cart);

                db.query(`UPDATE users SET cart = ? WHERE id = ${req.params.id}`, JSON.stringify(cart), (err, results) => {
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