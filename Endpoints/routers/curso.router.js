const cursoRouter = require('express').Router();

module.exports = (wagner) => {
    const cursoCtrl = wagner.invoke((Curso)=>
    require('../controllers/curso.controller')(Curso));
    //Definir endPoints
    //CRUD CURSO
    cursoRouter.get("/getAll",(req,res)=>{
        cursoCtrl.getAll(req,res);
    });

    cursoRouter.get("/getCursoInfo/:id",(req,res)=>{
        cursoCtrl.getById(req,res);
    });

    cursoRouter.get("/getCursosMaestro/:id",(req,res)=>{
        cursoCtrl.getCursosMaestro(req,res);
    });

    cursoRouter.get("/getCursosSolicitudes",(req,res)=>{
        cursoCtrl.getCursosSolicitudes(req,res);
    });

    cursoRouter.get("/getSubcategorias",(req,res)=>{
        cursoCtrl.getSubcategorias(req,res);
    });

    cursoRouter.delete("/:id", (req,res)=>{
        cursoCtrl.deleteCurso(req,res);
    });

    cursoRouter.put("/:id",(req,res)=>{
       cursoCtrl.update(req,res);
    });
    
    cursoRouter.post("/nuevoCurso",(req,res)=>{
        cursoCtrl.create(req,res);
    });
    
    return cursoRouter;
}
