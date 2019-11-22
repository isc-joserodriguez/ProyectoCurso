const promoRouter = require('express').Router();

module.exports = (wagner) => {
    const promoCtrl = wagner.invoke((Promo) =>
        require('../controllers/promo.controller')(Promo));
    //Definir endPoints
    //CRUD CURSO
    promoRouter.get("/getPromos", (req, res) => {
        promoCtrl.getAll(req, res);
    });

    promoRouter.get("/getPromo/:id", (req, res) => {
        promoCtrl.getByCode(req, res);
    });

    promoRouter.get("/getPromoById/:id", (req, res) => {
        promoCtrl.getPromoById(req, res);
    });

    promoRouter.delete("/:id", (req, res) => {
        promoCtrl.deletePromo(req, res);
    });

    promoRouter.put("/updatePromo/:id", (req, res) => {
        promoCtrl.update(req, res);
    });

    promoRouter.put("/updateUsos/:id", (req, res) => {
        promoCtrl.updateUsos(req, res);
    });

    promoRouter.post("/addPromo", (req, res) => {
        promoCtrl.create(req, res);
    });

    return promoRouter;
}
