import fs from "fs";

class CartManager {
  constructor(path) {
    this.path = path;
    fs.existsSync(this.path)
      ? (this.cart = JSON.parse(fs.readFileSync(this.path, "utf-8")))
      : (this.cart = []);
  }

  async createCart() {
    let cart = {
      products: [],
    };

    this.cart.length === 0
      ? (cart["id"] = 1)
      : (cart["id"] = this.cart[this.cart.length - 1]["id"] + 1);
    this.cart.push(cart);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.cart, null, "\t")
    );
  }

  async addToCart(CartId, ProductId, quantity) {
    let i = this.cart.findi((cart) => cart.id === CartId);
    if (i === -1 || this.cart[i]["products"] === undefined)
      return false;
    let iProducto = this.cart[i]["products"].findi(
      (pid) => pid.productId === ProductId
    );
    let exists = this.cart[i]["products"].some(
      (pid) => pid.productId === ProductId
    );

    if (exists) {
      this.cart[i]["products"][iProducto]["quantity"] += quantity;
    } else {
      this.cart[i]["products"].push({
        productId: ProductId,
        quantity: quantity,
      });
    }

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.cart, null, "\t")
    );
    return true;
  }

  getCart = (id) => {
    let cart = this.cart.find((el) => el.id === id);
    return cart || false;
  };
}

export default new CartManager("./cart.json");
