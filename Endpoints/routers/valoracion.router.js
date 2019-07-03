const valoracionRouter = require('express').Router();

module.exports = (wagner) => {
    const valoracionCtrl = wagner.invoke((Valoracion)=>
    require('../controllers/valoracion.controller')(Valoracion));
    //Definir endPoints
    //CRUD CURSO
    valoracionRouter.get("/",(req,res)=>{
        valoracionCtrl.getAll(req,res);
    });

    valoracionRouter.get("/:id",(req,res)=>{
        valoracionCtrl.getById(req,res);
    });

    valoracionRouter.delete("/:id", (req,res)=>{
        valoracionCtrl.deleteValoracion(req,res);
    });

    valoracionRouter.put("/:id",(req,res)=>{
       valoracionCtrl.update(req,res);
    });
    
    valoracionRouter.post("/",(req,res)=>{
        valoracionCtrl.create(req,res);
    });
    
    return valoracionRouter;
}
