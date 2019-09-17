let _curso;

const getAll = (req, res) => {
    _curso.find({})
        .then(cursos => {
            res.status(200);
            res.json({
                code: 200,
                msg: "Consulta exitosa.",
                detail: cursos
            });
        }).catch(error => {
            res.status(400);
            res.json({
                code: 400,
                msg: "Error.",
                detail: error
            });
        });
};

const getCursosMaestro = (req, res) => {
    const id = req.params.id;
    _curso.find({ idMaestro: id })
        .then(cursos => {
            res.status(200);
            res.json({
                code: 200,
                msg: "Consulta exitosa.",
                detail: cursos
            });
        }).catch(error => {
            res.status(400);
            res.json({
                code: 400,
                msg: "Error.",
                detail: error
            });
        });
};

const getCursosSolicitudes = (req, res) => {
    _curso.find({ estado: 1 })
        .then(cursos => {
            res.status(200);
            res.json({
                code: 200,
                msg: "Consulta exitosa.",
                detail: cursos
            });
        }).catch(error => {
            res.status(400);
            res.json({
                code: 400,
                msg: "Error.",
                detail: error
            });
        });
};

const getCursosAprobados = (req, res) => {
    _curso.find({ estado: 2 })
        .then(cursos => {
            res.status(200);
            res.json({
                code: 200,
                msg: "Consulta exitosa.",
                detail: cursos
            });
        }).catch(error => {
            res.status(400);
            res.json({
                code: 400,
                msg: "Error.",
                detail: error
            });
        });
};

const getCursosRechazados = (req, res) => {
    _curso.find({ estado: 3 })
        .then(cursos => {
            res.status(200);
            res.json({
                code: 200,
                msg: "Consulta exitosa.",
                detail: cursos
            });
        }).catch(error => {
            res.status(400);
            res.json({
                code: 400,
                msg: "Error.",
                detail: error
            });
        });
};

const getSubcategorias = (req, res) => {
    _curso.find({}, { subcategoria: 1, categoria: 1 }).sort({ subcategoria: 1 })
        .then(cursos => {
            res.status(200);
            res.json({
                code: 200,
                msg: "Consulta exitosa.",
                detail: cursos
            });
        }).catch(error => {
            res.status(400);
            res.json({
                code: 400,
                msg: "Error.",
                detail: error
            });
        });
};

const create = (req, res) => {
    const curso = req.body;
    _curso.find({}).sort({ _id: -1 }).then(regs => {
        curso._id = parseInt((regs.length == 0) ? 0 : (regs[0].id)) + 1;
        curso.ruta = curso.nombreCompleto.toLowerCase().replace(/ /g, "-").replace(/á/g, "a").replace(/é/g, "e").replace(/í/g, "i").replace(/ó/g, "o").replace(/ú/g, "u").replace(/ü/g, "u") + "-" + curso._id;
        console.log(curso);
        _curso.create(curso)
            .then(data => {
                res.status(200);
                res.json({
                    code: 200, msg: "Guardado.",
                    detail: data
                });
            }).catch(error => {
                res.status(400);
                res.json({
                    code: 400,
                    msg: "Error al insertar.",
                    detail: error
                });
            });
    });
};

const deleteCurso = (req, res) => {
    const { id } = req.params;
    _curso.remove({ _id: id })
        .then(data => {
            res.status(200);
            res.json({
                code: 200,
                msg: "Eliminado.",
                detail: data
            });
        }).catch(error => {
            res.status(400);
            res.json({
                code: 400,
                msg: "Error al eliminar.",
                detail: error
            });
        });
};

const getById = (req, res) => {
    const id = req.params.id;
    _curso.find({ ruta: id })
        .then(curso => {
            res.status(200);
            res.json({
                code: 200,
                msg: "Consulta exitosa.",
                detail: curso
            });
        }).catch(error => {
            res.status(400);
            res.json({
                code: 400,
                msg: "Error.",
                detail: error
            });
        });
};

const updateEstado = (req, res) => {
    
    const ruta = req.params.id;
    const notas = req.body.notas;
    const estado = req.body.estado;
    const precio = req.body.precio;
    _curso.update({ ruta: ruta }, {
        $set: {
            notas:notas,
            estado:estado,
            precio:precio
        }
    }).then(data => {
        res.status(200);
        res.json({
            code: 200,
            mgs: "Se editó con éxito",
            detail: data
        });

    }).catch(error => {
        res.status(400);
        res.json({
            code: 400,
            msg: "Error.",
            detail: error
        });
    });
};

const update = (req, res) => {
    const { id } = req.params;
    const curso = req.body;
    _curso.update({ _id: id }, {
        $set: {
            maestro: curso.maestro,
            nombreCurso: curso.nombreCurso,
            descripcionCurso: curso.descripcionCurso,
            contenidoCurso: curso.contenidoCurso
        }
    }).then(data => {
        res.status(200);
        res.json({
            code: 200,
            mgs: "Se editó con éxito",
            detail: data
        });

    }).catch(error => {
        res.status(400);
        res.json({
            code: 400,
            msg: "Error.",
            detail: error
        });
    });
};

module.exports = (Curso) => {
    _curso = Curso;
    return ({
        getAll, create, deleteCurso, getById, update, getCursosMaestro, getSubcategorias, getCursosSolicitudes, getCursosAprobados, getCursosRechazados, updateEstado
    });
}