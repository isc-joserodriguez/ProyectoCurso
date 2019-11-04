const compraRouter = require('express').Router();

module.exports = (wagner) => {
    const compraCtrl = wagner.invoke((Compra) =>
        require('../controllers/compra.controller')(Compra));
    //Definir endPoints
    //CRUD CURSO
    compraRouter.get("/getAll", (req, res) => {
        compraCtrl.getAll(req, res);
    });

    compraRouter.get("/getCompra/:id", (req, res) => {
        compraCtrl.getById(req, res);
    });

    compraRouter.put("/update/:id", (req, res) => {
        compraCtrl.update(req, res);
    });

    compraRouter.put("/guardarAbono/:id", (req, res) => {
        compraCtrl.guardarAbono(req, res);
    });

    compraRouter.post("/addCompra", (req, res) => {
        compraCtrl.create(req, res);
    });

    return compraRouter;
}
