let _cobro;

const getAll = (req,res)=>{
    _cobro.find({})
    .then(cobros=>{
        res.status(200);
        res.json({
            code:200,
            msg:"Consulta exitosa.",
            detail:cobros
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
    const cobro = req.body;
    _cobro.create(cobro)
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

const deleteCobro = (req,res) =>{
    const {id}= req.params;
    _cobro.remove({_id:id})
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
    _cobro.find({_id:id})
    .then(cobro=>{
        res.status(200);
        res.json({
            code:200,
            msg:"Consulta exitosa.",
            detail:cobro
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
    const cobro=req.body;
    _cobro.update({_id:id},{$set:{
        idPersona:cobro.idPersona,
        nombreTema:cobro.nombreTema,
        cuerpoTema:cobro.cuerpoTema,
        fechaTema:cobro.fechaTema,
        categoriaTema:cobro.categoriaTema,
        repuestas:cobro.repuestas
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

module.exports = (Cobro)=>{
    _cobro = Cobro;
    return ({
        getAll, create, deleteCobro, getById,update
    });
}