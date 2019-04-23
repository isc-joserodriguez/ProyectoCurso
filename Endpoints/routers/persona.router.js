const personaRouter = require('express').Router();

module.exports = (wagner) => {
    const personaCtrl = wagner.invoke((Persona)=>
    require('../controllers/persona.controller')(Persona));
    //Definir endPoints
    //CRUD PERSONAS
    personaRouter.get("/",(req,res)=>{
        personaCtrl.getAll(req,res);
    });

    personaRouter.get("/:id",(req,res)=>{
        personaCtrl.getById(req,res);
    });

    personaRouter.delete("/:id", (req,res)=>{
        personaCtrl.deletePersona(req,res);
    });

    personaRouter.put("/:id",(req,res)=>{
       personaCtrl.update(req,res);
    });
    
    personaRouter.post("/",(req,res)=>{
        personaCtrl.create(req,res);
    });
    
    return personaRouter;
}
