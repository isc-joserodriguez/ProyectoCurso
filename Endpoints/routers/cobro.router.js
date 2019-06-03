const cobroRouter = require('express').Router();

module.exports = (wagner) => {
    const cobroCtrl = wagner.invoke((Cobro)=>
    require('../controllers/cobro.controller')(Cobro));
    //Definir endPoints
    //CRUD CURSO
    cobroRouter.get("/",(req,res)=>{
        cobroCtrl.getAll(req,res);
    });

    cobroRouter.get("/:id",(req,res)=>{
        cobroCtrl.getById(req,res);
    });

    cobroRouter.delete("/:id", (req,res)=>{
        cobroCtrl.deleteCobro(req,res);
    });

    cobroRouter.put("/:id",(req,res)=>{
       cobroCtrl.update(req,res);
    });
    
    cobroRouter.post("/",(req,res)=>{
        cobroCtrl.create(req,res);
    });
    
    return cobroRouter;
}
