const compraRouter = require('express').Router();

module.exports = (wagner) => {
    const compraCtrl = wagner.invoke((Compra)=>
    require('../controllers/compra.controller')(Compra));
    //Definir endPoints
    //CRUD CURSO
    compraRouter.get("/",(req,res)=>{
        compraCtrl.getAll(req,res);
    });

    compraRouter.get("/:id",(req,res)=>{
        compraCtrl.getById(req,res);
    });

    compraRouter.delete("/:id", (req,res)=>{
        compraCtrl.deleteCompra(req,res);
    });

    compraRouter.put("/:id",(req,res)=>{
       compraCtrl.update(req,res);
    });
    
    compraRouter.post("/",(req,res)=>{
        compraCtrl.create(req,res);
    });
    
    return compraRouter;
}
