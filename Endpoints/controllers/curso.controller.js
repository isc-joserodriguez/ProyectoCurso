let _curso;

const getAll = (req,res)=>{
    _curso.find({})
    .then(cursos=>{
        res.status(200);
        res.json({
            code:200,
            msg:"Consulta exitosa.",
            detail:cursos
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
    "maestro":{
        "_id":"a19p1"
    },
    "nombreCurso":"Angular",
    "descripcionCurso":"Aprende Angular",
    "contenidoCurso":{
        "introduccion":"Video introductorio",
        "unidadCurso":[
            {
                "nombreUnidad":"Aspectos básicos",
                leccion:[
                    {
                        "nombreLeccion":"Instalación",
                        "recursos":"Video y texto",
                        "tarea":"Doc"
                    },
                    {
                        "nombreLeccion":"U2",
                        "recursos":"Video y texto",
                        "tarea":"Doc"
                    },
                ],
            "evaluacion":"PDF"
            },
            {
                "nombreUnidad":"Aspectos avanzados",
                leccion:[
                    {
                        "nombreLeccion":"Modulos",
                        "recursos":"Video y texto",
                        "tarea":"Doc"
                    },
                    {
                        "nombreLeccion":"Modulos avanzados",
                        "recursos":"Video y texto",
                        "tarea":"Doc"
                    },
                ],
            "evaluacion":"PDF"
            }
        ]
    },
    "insignias":[
        {
            "nombreInsignia":"Iniciando","descripcionInsignia":"Termina tu primera leccion"
        },
        {
            "nombreInsignia":"Terminado","descripcionInsignia":"Termina el curso"
        }
    ]
    }    
    */
    const curso = req.body;
    _curso.create(curso)
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

const deleteCurso = (req,res) =>{
    const {id}= req.params;
    _curso.remove({_id:id})
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
    _curso.find({_id:id})
    .then(curso=>{
        res.status(200);
        res.json({
            code:200,
            msg:"Consulta exitosa.",
            detail:curso
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
    const curso=req.body;
    _curso.update({_id:id},{$set:{
        maestro:curso.maestro,
        nombreCurso:curso.nombreCurso,
        descripcionCurso:curso.descripcionCurso,
        contenidoCurso:curso.contenidoCurso
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
    _curso = Curso;
    return ({
        getAll, create, deleteCurso, getById,update
    });
}