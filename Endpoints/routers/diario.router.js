const diarioRouter = require('express').Router();

module.exports = (wagner) => {
    const diarioCtrl = wagner.invoke((Diario) =>
        require('../controllers/diario.controller')(Diario));
    //Definir endPoints
    //CRUD CURSO
    diarioRouter.post("/nuevaEntrada", (req, res) => {
        diarioCtrl.create(req, res);
    });

    diarioRouter.get("/getEntradas", (req, res) => {
        diarioCtrl.getAll(req, res);
    });

    diarioRouter.get("/getEntrada/:ruta", (req, res) => {
        diarioCtrl.getById(req, res);
    });

    diarioRouter.put("/agregarResp/:ruta", (req, res) => {
        diarioCtrl.agregarResp(req, res);
    });

    diarioRouter.put("/agregarReporte/:ruta", (req, res) => {
        diarioCtrl.agregarReporte(req, res);
    });


    return diarioRouter;
}
