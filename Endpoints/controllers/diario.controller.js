let _diario;

const create = (req, res) => {
    const diario = req.body;
    _diario.find({}).sort({ _id: -1 }).then(regs => {
        diario._id = parseInt((regs.length == 0) ? 0 : (regs[0].id)) + 1;
        diario.ruta = (Math.random() + '').substring(2, 8) + diario._id;
        _diario.create(diario)
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
    _diario.find({}).sort({ _id: -1 })
        .then(diarios => {
            res.status(200);
            res.json({
                code: 200,
                msg: "Consulta exitosa.",
                detail: diarios
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
    _diario.find({ ruta: ruta })
        .then(diario => {
            res.status(200);
            res.json({
                code: 200,
                msg: "Consulta exitosa.",
                detail: diario
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
    const diario = req.body;
    _diario.update({ _id: id }, {
        $set: {
            idPersona: diario.idPersona,
            nombreTema: diario.nombreTema,
            cuerpoTema: diario.cuerpoTema,
            fechaTema: diario.fechaTema,
            categoriaTema: diario.categoriaTema,
            repuestas: diario.repuestas,
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

const agregarResp = (req, res) => {
    const ruta = req.params.ruta;
    const respuestas = req.body.respuestas;
    _diario.update({ ruta: ruta }, {
        $set: {
            respuestas: respuestas
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
    _diario = Comunidad;
    return ({
        getAll, create, getById, update, agregarResp
    });
}