const todoRouter = require('express').Router();

module.exports = (wagner) => {
    const todoCtrl = wagner.invoke((Todo)=>
    require('../controllers/todo.controller')(Todo));
    //Definir endPoints
    //CRUD CURSO
    todoRouter.get("/",(req,res)=>{
        todoCtrl.getAll(req,res);
    });

    todoRouter.get("/:id",(req,res)=>{
        todoCtrl.getById(req,res);
    });

    todoRouter.delete("/:id", (req,res)=>{
        todoCtrl.deleteTodo(req,res);
    });

    todoRouter.put("/:id",(req,res)=>{
       todoCtrl.update(req,res);
    });

    todoRouter.put("/estado/:id",(req,res)=>{
        todoCtrl.updateEstado(req,res);
     });
    
    todoRouter.post("/",(req,res)=>{
        todoCtrl.create(req,res);
    });
    
    return todoRouter;
}
