const promoRouter = require('express').Router();

module.exports = (wagner) => {
    const promoCtrl = wagner.invoke((Promo)=>
    require('../controllers/promo.controller')(Promo));
    //Definir endPoints
    //CRUD CURSO
    promoRouter.get("/",(req,res)=>{
        promoCtrl.getAll(req,res);
    });

    promoRouter.get("/:id",(req,res)=>{
        promoCtrl.getById(req,res);
    });

    promoRouter.delete("/:id", (req,res)=>{
        promoCtrl.deletePromo(req,res);
    });

    promoRouter.put("/:id",(req,res)=>{
       promoCtrl.update(req,res);
    });
    
    promoRouter.post("/",(req,res)=>{
        promoCtrl.create(req,res);
    });
    
    return promoRouter;
}
