let _promo;

const getAll = (req,res)=>{
    _promo.find({})
    .then(promos=>{
        res.status(200);
        res.json({
            code:200,
            msg:"Consulta exitosa.",
            detail:promos
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
    const promo = req.body;
    _promo.create(promo)
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

const deletepromo = (req,res) =>{
    const {id}= req.params;
    _promo.remove({_id:id})
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
    _promo.find({_id:id})
    .then(promo=>{
        res.status(200);
        res.json({
            code:200,
            msg:"Consulta exitosa.",
            detail:promo
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
    const promo=req.body;
    _promo.update({_id:id},{$set:{
        idPersona:promo.idPersona,
        nombreTema:promo.nombreTema,
        cuerpoTema:promo.cuerpoTema,
        fechaTema:promo.fechaTema,
        categoriaTema:promo.categoriaTema,
        repuestas:promo.repuestas,
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

module.exports = (Promo)=>{
    _promo = Promo;
    return ({
        getAll, create, deletepromo, getById,update
    });
}