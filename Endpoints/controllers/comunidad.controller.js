let _comunidad;

const create = (req, res) => {
    const comunidad = req.body;
    _comunidad.find({}).sort({ _id: -1 }).then(regs => {
        comunidad._id = parseInt((regs.length == 0) ? 0 : (regs[0].id)) + 1;
        comunidad.ruta = (Math.random() + '').substring(2, 8) + comunidad._id;
        _comunidad.create(comunidad)
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

const getAll = (req, res) => {
    _comunidad.find({})
        .then(comunidades => {
            res.status(200);
            res.json({
                code: 200,
                msg: "Consulta exitosa.",
                detail: comunidades
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

const getById = (req, res) => {
    const ruta = req.params.ruta;
    _comunidad.find({ ruta: ruta })
        .then(comunidad => {
            res.status(200);
            res.json({
                code: 200,
                msg: "Consulta exitosa.",
                detail: comunidad
            });
        }).catch(error => {
            res.status(400);
            res.json({
                code: 400,
                msg: "Error.",
                detail: error
            });
        });
}

const update = (req, res) => {
    const { id } = req.params;
    const comunidad = req.body;
    _comunidad.update({ _id: id }, {
        $set: {
            idPersona: comunidad.idPersona,
            nombreTema: comunidad.nombreTema,
            cuerpoTema: comunidad.cuerpoTema,
            fechaTema: comunidad.fechaTema,
            categoriaTema: comunidad.categoriaTema,
            repuestas: comunidad.repuestas,
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
}

const cambiaCat = (req, res) => {
    const ruta = req.params.ruta;
    const categoria = req.body.categoria;
    _comunidad.update({ ruta: ruta }, {
        $set: {
            categoria: categoria
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
}

const agregarAct = (req, res) => {
    const ruta = req.params.ruta;
    const actualizaciones = req.body.actualizaciones;
    _comunidad.update({ ruta: ruta }, {
        $set: {
            actualizaciones: actualizaciones
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
}

module.exports = (Comunidad) => {
    _comunidad = Comunidad;
    return ({
        getAll, create, getById, update, cambiaCat, agregarAct
    });
}