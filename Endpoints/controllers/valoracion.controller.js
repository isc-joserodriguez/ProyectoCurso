let _valoracion;

const getAll = (req,res)=>{
    _valoracion.find({})
    .then(valoraciones=>{
        res.status(200);
        res.json({
            code:200,
            msg:"Consulta exitosa.",
            detail:valoraciones
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
    const valoracion = req.body;
    _valoracion.create(valoracion)
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

const deleteValoracion = (req,res) =>{
    const {id}= req.params;
    _valoracion.remove({_id:id})
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
    _valoracion.find({_id:id})
    .then(valoracion=>{
        res.status(200);
        res.json({
            code:200,
            msg:"Consulta exitosa.",
            detail:valoracion
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
    const valoracion=req.body;
    _valoracion.update({_id:id},{$set:{
        idPersona:valoracion.idPersona,
        nombreTema:valoracion.nombreTema,
        cuerpoTema:valoracion.cuerpoTema,
        fechaTema:valoracion.fechaTema,
        categoriaTema:valoracion.categoriaTema,
        repuestas:valoracion.repuestas
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

module.exports = (Valoracion)=>{
    _valoracion = Valoracion;
    return ({
        getAll, create, deleteValoracion, getById,update
    });
}