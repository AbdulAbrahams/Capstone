const database = require("../config");
let { hash, compare, hashSync } = require("bcrypt");
let { createToken, verifyToken } = require("../middleware/AuthenticatedUser");
const jwToken = require('jsonwebtoken');


class User {
  login(req, res) {
    const { userEmail, userPass } = req.body;

    database.query(`SELECT * FROM users WHERE userEmail = '${userEmail}';`, async (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.status(401).json({ err: "You entered an incorrect password or not registered. Please try again" });
      } else {
        const passMatch = await compare(req.body.userPass, result[0].userPass);
        if (!passMatch) {
          res.status(401).json({err: "You entered an incorrect password or not registered. Please try again"});
        } else {
          const data = {
            user: {
              userID:result[0].userID,
              firstName: result[0].firstName,
              lastName: result[0].lastName,
              userEmail:result[0].userEmail,
              userProfile:result[0].userProfile,
              userRole:result[0].userRole,
              userPass:result[0].userPass,
              cart:result[0].cart,
              msg:result[0].msg,
            },
          };

          jwToken.sign(
            data, process.env.SECRET_KEY,
            {expiresIn: "1 year"},
            (err, token) => {
              if (err) throw err;
              res.status(201).cookie(token).json({ token, data });
            }
          );
        }
      }
    });
  } catch (error) {
    console.log(error);
  }


  fetchUsers(req, res) {

    database.query(`SELECT * FROM users;`, (err, data) => {
      if (err) throw err;
      else res.status(200).json({ results: data });
    });
  }
  fetchUser(req, res) {

    database.query(`SELECT * FROM users WHERE userID = ?;`, [req.params.id], (err, data) => {
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
        res.status(401).json({err: "Email already in use"});
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
    let userID = req.params.id;
        let data = req.body;
    if (data.userPass != null || data.userPass != undefined)
      data.userPass = hashSync(data.userPass, 15);

    database.query(`UPDATE users SET ? WHERE userID = '${userID}';`, [data, userID], (err) => {
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
      if (err) throw err, console.log(err);;
      res.status(200).json({ results: results });
    });
  }
  addProduct(req, res) {

    database.query(`INSERT INTO products SET ?;`, [req.body], (err) => {
      if (err) {
        res.status(400).json({ err: "Adding new product was unsuccessful" });
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
        database.query(`SELECT cart FROM users WHERE userID = ${req.params.id}`, req.params.id, (err, result) => {
          if (err) throw err;
          (function Check(A, B) {
            A = parseInt(req.params.id);
            B = parseInt(req.params.id);
            if (A === B) {
              res.send(result[0].cart);
            } else {
              res.json({msg: "Please Login"});
            }
          })();
        });
      }
  
  addToCart(req, res) {
        database.query(` SELECT cart FROM users WHERE userID = ${req.params.id};`, req.params.id, (err, results) => {
          if (err) throw err;
          let cart;
          if (results.length > 0) {
            if (results[0].cart === null) {
              cart = [];
            } else {
              cart = JSON.parse(results[0].cart);
            }
          }
          let id = req.body.id
          database.query(`SELECT * FROM products WHERE id = ${id};`, async (err, results) => {
            if (err) throw err;
            let item = {
              id: results[0].id,
              prodName: results[0].prodName,
              imgURL: results[0].imgURL,
              brand: results[0].brand,
              price: results[0].price,
              prodQuantity: results[0].prodQuantity,
              userID: results[0].userID,
            };
            cart.push(item);
            database.query(`UPDATE users SET cart = ? WHERE (userID = ${req.params.id})`,JSON.stringify(cart), (err) => {
              if (err) throw err;
              res.json({ results, msg: "Item added to Cart"});
            });
          });
        });
      } catch (error) {
        console.log(error.message);
      }

  deleteFromCart(req, res) {
    database.query(`SELECT cart FROM users WHERE userID = ${req.params.id}`, req.params.id, (err, results) => {
      if (err) throw err;
      let item = JSON.parse(results[0].cart).filter((x) => {
        return x.id != req.params.id;
      });
      database.query(`UPDATE users SET cart = ? WHERE userID= ${req.params.cartID};`,[JSON.stringify(item), req.params.id], (err) => {
          if (err) throw err;
          res.json({
            msg: "Item Deleted from Cart",
          });
        }
      );
    });
  };
  }

module.exports = { User, Product, Cart };