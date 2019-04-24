const cursoRouter = require('express').Router();

module.exports = (wagner) => {
    const cursoCtrl = wagner.invoke((Curso)=>
    require('../controllers/curso.controller')(Curso));
    //Definir endPoints
    //CRUD CURSO
    cursoRouter.get("/",(req,res)=>{
        cursoCtrl.getAll(req,res);
    });

    cursoRouter.get("/:id",(req,res)=>{
        cursoCtrl.getById(req,res);
    });

    cursoRouter.delete("/:id", (req,res)=>{
        cursoCtrl.deleteCurso(req,res);
    });

    cursoRouter.put("/:id",(req,res)=>{
       cursoCtrl.update(req,res);
    });
    
    cursoRouter.post("/",(req,res)=>{
        cursoCtrl.create(req,res);
    });
    
    return cursoRouter;
}
