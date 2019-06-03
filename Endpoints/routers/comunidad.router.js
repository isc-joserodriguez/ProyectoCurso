const comunidadRouter = require('express').Router();

module.exports = (wagner) => {
    const comunidadCtrl = wagner.invoke((Comunidad)=>
    require('../controllers/comunidad.controller')(Comunidad));
    //Definir endPoints
    //CRUD CURSO
    comunidadRouter.get("/",(req,res)=>{
        comunidadCtrl.getAll(req,res);
    });

    comunidadRouter.get("/:id",(req,res)=>{
        comunidadCtrl.getById(req,res);
    });

    comunidadRouter.delete("/:id", (req,res)=>{
        comunidadCtrl.deteleComunidad(req,res);
    });

    comunidadRouter.put("/:id",(req,res)=>{
       comunidadCtrl.update(req,res);
    });
    
    comunidadRouter.post("/",(req,res)=>{
        comunidadCtrl.create(req,res);
    });
    
    return comunidadRouter;
}
