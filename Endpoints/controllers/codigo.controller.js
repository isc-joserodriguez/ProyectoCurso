let _codigo;

const getAll = (req,res)=>{
    _codigo.find({})
    .then(codigos=>{
        res.status(200);
        res.json({
            code:200,
            msg:"Consulta exitosa.",
            detail:codigos
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
    const codigo = req.body;
    _codigo.create(codigo)
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

const deletecodigo = (req,res) =>{
    const {id}= req.params;
    _codigo.remove({_id:id})
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
    _codigo.find({_id:id})
    .then(codigo=>{
        res.status(200);
        res.json({
            code:200,
            msg:"Consulta exitosa.",
            detail:codigo
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
    const codigo=req.body;
    _codigo.update({_id:id},{$set:{
        idPersona:codigo.idPersona,
        nombreTema:codigo.nombreTema,
        cuerpoTema:codigo.cuerpoTema,
        fechaTema:codigo.fechaTema,
        categoriaTema:codigo.categoriaTema,
        repuestas:codigo.repuestas,
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

module.exports = (Codigo)=>{
    _codigo = Codigo;
    return ({
        getAll, create, deletecodigo, getById,update
    });
}