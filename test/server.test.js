import chai from "chai";
import chaiHttp from "chai-http";
import productClass from "../src/class/classProduct.js";
import fs from "fs";
chai.use(chaiHttp);

describe("Test chaiHTTP ", () => {
  before(() => {
    console.log("before: Se inicia el test chaiHttp");
  });

  beforeEach(() => {
    console.log("beforeEach: Se inicia el test por método");
  });
  afterEach(() => {
    console.log("afterEach: Se finaliza el test por método");
  });

  it("Test getAllProducts", async () => {
    try {
      chai
        .request("http://localhost:8080")
        .get("/api/productos")
        .end((err, res) => {
          console.log("Se obtienen productos");
        });
    } catch (err) {
      console.log("Error al obtener productos");
      throw err;
    }
  });
  it("Test getProductById", async () => {
    try {
      chai
        .request("http://localhost:8080")
        .get("/api/productos/1")
        .end((err, res) => {
          console.log("Se obtiene producto");
        });
    } catch (err) {
      console.log("Error al obtener producto");
      throw err;
    }
  });
  it("Test createProduct", async () => {
    try {
      chai
        .request("http://localhost:8080")
        .post("/api/productos")
        .send({
          id: "2",
          name: "Producto 2",
          description: "Descripcion 2",
          price: "200",
          stock: "20",
        })
        .end((err, res) => {
          console.log("Se crea producto");
        });
    } catch (err) {
      console.log("Error al crear producto");
      throw err;
    }
  });
  it("Test updateProduct", async () => {
    try {
      chai
        .request("http://localhost:8080")
        .put("/api/productos/2")
        .send({
          id: "2",
          name: "Producto 2",
          description: "Descripcion 2 updated",
          price: "250",
          stock: "10",
        })
        .end((err, res) => {
          console.log("Se actualiza producto");
        });
    } catch (err) {
      console.log("Error al actualizar producto");
      throw err;
    }
  });
  it("Test deleteProduct", async () => {
    try {
      chai
        .request("http://localhost:8080")
        .delete("/api/productos/1")
        .end((err, res) => {
          console.log("Se elimina producto");
        });
    } catch (err) {
      console.log("Error al eliminar producto");
      throw err;
    }
  });
  after(() => {
    console.log("after: Se finaliza el test chaiHttp");
  });
});
