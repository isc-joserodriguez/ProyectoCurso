let _todo;

const getAll = (req,res)=>{
    _todo.find({}).then(todo=>{
        res.status(200);
        res.json({
            code:200,
            msg:"Consulta exitosa.",
            detail:todo
        });        
    }).catch(error=>{
        res.status(400);
        res.json({
            code:400,
            msg:"Error.",
            detail:error
        });
    });
};

const create = (req,res)=>{
    const todo = req.body;
    _todo.create(todo)
    .then(data=>{
        res.status(200);
        res.json({
            code:200,msg:"Guardado.",
            detail:data
        });
    }).catch(error => {
        res.status(400);
        res.json({
            code: 400,
            msg: "Error al insertar.",
            detail:error
        });
    });
}

const deleteTodo = (req,res) =>{
    const {id}= req.params;
    _todo.remove({_id:id})
    .then(data=>{
        res.status(200);
        res.json({
            code:200,
            msg:"Eliminado.",
            detail:data
        });
    }).catch(error=>{
        res.status(400);
        res.json({
            code:400,
            msg:"Error al eliminar.",
            detail:error
        });
    });
}

const getById = (req,res)=>{
    const id= req.params.id;
    _todo.find({_id:id})
    .then(todo=>{
        res.status(200);
        res.json({
            code:200,
            msg:"Consulta exitosa.",
            detail:todo
        });
    }).catch(error=>{
        res.status(400);
        res.json({
            code:400,
            msg:"Error.",
            detail:error
        });
    });
}

const update = (req,res)=>{
    const {id}= req.params;
    const todo=req.body;
    _todo.update({_id:id},{$set:{
        nombreTarea:todo.nombreTarea,
        descripcionTarea:todo.descripcionTarea
    }}).then(data=>{
        res.status(200);
        res.json({
            code:200,
            mgs:"Se editó con éxito",
            detail:data
        });
        
    }).catch(error=>{
        res.status(400);
        res.json({
            code:400,
            msg:"Error.",
            detail:error
        });
    });
}

const updateEstado = (req,res)=>{
    const {id}= req.params;
    const todo=req.body;
    _todo.update({_id:id},{$set:{
        estadoTarea:!todo.estadoTarea,
        fechaCompletadaTarea: Date.now()
    }}).then(data=>{
        res.status(200);
        res.json({
            code:200,
            mgs:"Se editó con éxito",
            detail:data
        });
        
    }).catch(error=>{
        res.status(400);
        res.json({
            code:400,
            msg:"Error.",
            detail:error
        });
    });
}

module.exports = (Todo)=>{
    _todo = Todo;
    return ({
        getAll, create, deleteTodo, getById,update,updateEstado
    });
}