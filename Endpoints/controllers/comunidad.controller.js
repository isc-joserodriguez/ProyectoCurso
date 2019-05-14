let _comunidad;

const getAll = (req,res)=>{
    _comunidad.find({})
    .then(comunidades=>{
        res.status(200);
        res.json({
            code:200,
            msg:"Consulta exitosa.",
            detail:comunidades
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
/*    {
        _id:"n",
        idPersona:"n",
        nombreTema:"Ayuda",
        cuerpoTema:"Contenido",
        fechaTema:"03-06-16",
        categoriaTema:"Tecnología",
        repuestas:[{_id:"n",idPersona:"n",comentario:"Muy bonito!",fecha:"Hoy"}]
    }
*/
    const comunidad = req.body;
    _comunidad.create(comunidad)
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

const deleteComunidad = (req,res) =>{
    const {id}= req.params;
    _comunidad.remove({_id:id})
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
    _comunidad.find({_id:id})
    .then(comunidad=>{
        res.status(200);
        res.json({
            code:200,
            msg:"Consulta exitosa.",
            detail:comunidad
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
    const comunidad=req.body;
    _comunidad.update({_id:id},{$set:{
        idPersona:comunidad.idPersona,
        nombreTema:comunidad.nombreTema,
        cuerpoTema:comunidad.cuerpoTema,
        fechaTema:comunidad.fechaTema,
        categoriaTema:comunidad.categoriaTema,
        repuestas:comunidad.repuestas,
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

module.exports = (Curso)=>{
    _comunidad = Curso;
    return ({
        getAll, create, deleteComunidad, getById,update
    });
}