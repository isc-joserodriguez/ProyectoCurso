const codigoRouter = require('express').Router();

module.exports = (wagner) => {
    const codigoCtrl = wagner.invoke((Codigo)=>
    require('../controllers/codigo.controller')(Codigo));
    //Definir endPoints
    //CRUD CURSO
    codigoRouter.get("/",(req,res)=>{
        codigoCtrl.getAll(req,res);
    });

    codigoRouter.get("/:id",(req,res)=>{
        codigoCtrl.getById(req,res);
    });

    codigoRouter.delete("/:id", (req,res)=>{
        codigoCtrl.deleteCodigo(req,res);
    });

    codigoRouter.put("/:id",(req,res)=>{
       codigoCtrl.update(req,res);
    });
    
    codigoRouter.post("/",(req,res)=>{
        codigoCtrl.create(req,res);
    });
    
    return codigoRouter;
}
