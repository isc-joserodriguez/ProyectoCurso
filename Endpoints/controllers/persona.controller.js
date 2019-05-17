let _persona;

const getAll = (req,res)=>{
    _persona.find({})
    .then(personas=>{
        res.status(200);
        res.json({
            code:200,
            msg:"Consulta exitosa.",
            detail:personas
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
    /*
    {
        "credencial":{
            "correo":"nemo@hotmail.com",
            "contraseña":"123456"
        },
        "tipo":[4],
        "nombre":"Jaime",
        "apPaterno":"Lopez",
        "apMaterno":"Martinez",
        "fechaNac":"03-03-1995",
        "foto":"foto.png",
        "paginaWeb":"google.com",
        "redSocial":[{"red":"Facebook","url":"fb.com"}],
        "cursoMaestro":[{"_id":"id1"}],
        "cursoAlumno":[{"_id":"id2"}]
    }*/
    const persona = req.body;
    _persona.create(persona)
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

const deletePersona = (req,res) =>{
    const {id}= req.params;
    _persona.remove({_id:id})
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
    _persona.find({_id:id})
    .then(persona=>{
        res.status(200);
        res.json({
            code:200,
            msg:"Consulta exitosa.",
            detail:persona
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
    const persona=req.body;
    _persona.update({_id:id},{$set:{
        nombre:persona.nombre,
        apPaterno:persona.apPaterno,
        apMaterno:persona.apMaterno,
        fechaNac:persona.fechaNac,
        foto:persona.foto,
        paginaWeb:persona.paginaWeb,
    }})
    .then(data=>{
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

module.exports = (Persona)=>{
    _persona = Persona;
    return ({
        getAll, create, deletePersona, getById,update
    });
}