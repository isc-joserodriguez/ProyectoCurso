const comunidadRouter = require('express').Router();

module.exports = (wagner) => {
    const comunidadCtrl = wagner.invoke((Comunidad)=>
    require('../controllers/comunidad.controller')(Comunidad));
    //Definir endPoints
    //CRUD CURSO
    comunidadRouter.post("/nuevaPregunta",(req,res)=>{
        comunidadCtrl.create(req,res);
    });

    comunidadRouter.get("/getPreguntas",(req,res)=>{
        comunidadCtrl.getAll(req,res);
    });

    comunidadRouter.get("/getPregunta/:ruta",(req,res)=>{
        comunidadCtrl.getById(req,res);
    });

    comunidadRouter.put("/:id",(req,res)=>{
       comunidadCtrl.update(req,res);
    });

    comunidadRouter.put("/cambiaCat/:ruta",(req,res)=>{
        comunidadCtrl.cambiaCat(req,res);
     });

     comunidadRouter.put("/agregarAct/:ruta",(req,res)=>{
        comunidadCtrl.agregarAct(req,res);
     });

     comunidadRouter.put("/agregarResp/:ruta",(req,res)=>{
        comunidadCtrl.agregarResp(req,res);
     });
     
    
    return comunidadRouter;
}
