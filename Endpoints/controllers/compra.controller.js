let _compra;

const getAll = (req,res)=>{
    _compra.find({})
    .then(compras=>{
        res.status(200);
        res.json({
            code:200,
            msg:"Consulta exitosa.",
            detail:compras
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
    const compra = req.body;
    _compra.create(compra)
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

const deleteCompra = (req,res) =>{
    const {id}= req.params;
    _compra.remove({_id:id})
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
    _compra.find({_id:id})
    .then(compra=>{
        res.status(200);
        res.json({
            code:200,
            msg:"Consulta exitosa.",
            detail:compra
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
    const compra=req.body;
    _compra.update({_id:id},{$set:{
        idPersona:compra.idPersona,
        nombreTema:compra.nombreTema,
        cuerpoTema:compra.cuerpoTema,
        fechaTema:compra.fechaTema,
        categoriaTema:compra.categoriaTema,
        repuestas:compra.repuestas,
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

module.exports = (Compra)=>{
    _compra = Compra;
    return ({
        getAll, create, deleteCompra, getById,update
    });
}