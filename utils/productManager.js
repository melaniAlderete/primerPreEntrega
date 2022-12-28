import fs from "fs";

class ProductManager {
  constructor(fileName) {
    this.path = fileName;
  }

  async addProduct(title, description, price, thumbnail, status, category, code, stock) {
    try {
      if (
        title != "" ||
        description != "" ||
        price != null ||
        category != "" ||
        code != ""||
        stock != null
      ) {
        let product = {
          title,
          description,
          price,
          thumbnail,
          status,
          category,
          code,
          stock,
        };
        let products = await this.getProducts();
        let codeValues = products.find((product) => product["code"] === code);
        if (!codeValues) {
          if (products.length === 0) {
            product["id"] = 1;
          } else {
            product["id"] = products[products.length - 1]["id"] + 1;
          }
          products.push(product);
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(products, null, "\t")
          );
          return products;
        } else {
          console.log("El producto ya es parte de la lista");
        }
      } else {
        console.log("Falta información para añadir el producto");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        let products = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(products);
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      let products = await this.getProducts();
      let myProduct = products.find((product) => product.id === id);
      if (myProduct != null) {
        return myProduct;
      } else {
        console.log("Product not found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(title, description, price, thumbnail, status, category, code, stock) {
    try {
      let products = await this.getProducts();
      let myProduct = products.find((product) => product["id"] === id);
      if (myProduct != null) {
        myProduct.title = title;
        myProduct.description = description;
        myProduct.price = price;
        myProduct.thumbnail = thumbnail;
        myProduct.status = status;
        myProduct.category = category; 
        myProduct.code = code;
        myProduct.stock = stock;
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, "\t")
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      let products = await this.getProducts();
      let myProduct = products.find((product) => product["id"] === id);
      if (myProduct != null) {
        products.splice(products.indexOf(myProduct), 1);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, "\t")
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ProductManager("./Products.json");
