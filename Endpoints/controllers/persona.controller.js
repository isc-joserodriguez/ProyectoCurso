let _persona;
const hash = require('../middlewares/password');
const tkn = require('../middlewares/token');

const getAll = (req, res) => {
    _persona.find({}, { foto: 1, nombre: 1, apPaterno: 1, apMaterno: 1, estatus: 1, tipo: 1 })
        .then(personas => {
            res.status(200);
            res.json({
                code: 200,
                msg: "Consulta exitosa.",
                detail: personas
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
    const persona = req.body;
    _persona.find({}).sort({ _id: -1 }).then(regs => {
        persona._id = parseInt((regs.length == 0) ? 0 : (regs[0].id)) + 1;
        if (!persona.credencial.correo || !persona.credencial.contraseña) {
            res.status(400).json({
                code: 400,
                msg: "Debe de ingresar correo y contraseña para registrarse.",
                detail: []
            });
        } else if (regs.filter(u => u.credencial.correo === persona.credencial.correo).length > 0) {
            res.status(400).json({
                code: 400,
                msg: "Ya existe ese correo.",
                detail: []
            });
        } else {
            hash.hashPassword(req.body.credencial.contraseña).then(contraseña => {
                persona.credencial.contraseña = contraseña;
                _persona.create(persona)
                    .then(data => {
                        res.status(200).json({
                            code: 200, msg: "Saved!!!",
                            detail: data
                        });
                    }).catch(error => {
                        res.status(400).json({
                            code: 400,
                            msg: "No se pudo insertar!!!",
                            detail: error
                        });
                    });
            });
        }
    });
}

const login = (req, res) => {
    correo = req.body.credencial.correo;
    contraseña = req.body.credencial.contraseña;
    _persona.find({})
        .then(personas => {
            usuario = personas.filter(u => (u.credencial.correo == correo))[0];
            if (!usuario) {
                res.status(400).json({
                    code: 400,
                    msg: "Error: El correo es incorrecto",
                    data: []
                });
            } else {
                hash.comparePassword(contraseña, usuario.credencial.contraseña).then(contraseñaCorrecta => {
                    if (!contraseñaCorrecta) {
                        res.status(400).json({
                            code: 400,
                            msg: "Error: La contraseña es incorrecta",
                            data: []
                        });
                    } else {
                        const tokenTTL = `${1000 * 60 * 60 * 24 * 30}ms`; // ms * s * m * h * d
                        console.log(usuario);
                        const payload = {
                            id: usuario._id,
                            tipo: usuario.tipo,
                            nombre: usuario.nombre,
                            foto: usuario.foto,
                            sexo: usuario.sexo
                        };
                        const token = tkn.generateJWT(payload, tokenTTL);
                        res.status(200).json({
                            code: 200,
                            msg: "Consulta exitosa.",
                            detail: token
                        });

                    }

                })
            }
        }).catch(error => {
            res.status(400).json({
                code: 400,
                msg: "No se pudo insertar!!!",
                detail: error
            });
        });
}

const info = (req, res) => {
    res.status(200).json({
        code: 200,
        msg: "Entraste correctamente!",
        data: req.decoded
    })

}

const deletePersona = (req, res) => {
    const { id } = req.params;
    _persona.remove({ _id: id })
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
}

const getById = (req, res) => {
    const id = req.params.id;
    _persona.find({ _id: id })
        .then(persona => {
            res.status(200);
            res.json({
                code: 200,
                msg: "Consulta exitosa.",
                detail: persona
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

const updateTipo = (req, res) => {
    const { id } = req.params;
    const tipo = req.body.tipo;
    const credencial=req.body.credencial;
    _persona.update({ _id: id }, {
        $set: {
            tipo: tipo,
            credencial: credencial
        }
    })
        .then(data => {
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

const update = (req, res) => {
    const { id } = req.params;
    const persona = req.body;
    _persona.update({ _id: id }, {
        $set: {
            nombre: persona.nombre,
            apPaterno: persona.apPaterno,
            apMaterno: persona.apMaterno,
            fechaNac: persona.fechaNac,
            foto: persona.foto,
            paginaWeb: persona.paginaWeb,
        }
    })
        .then(data => {
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

module.exports = (Persona) => {
    _persona = Persona;
    return ({
        getAll, create, deletePersona, getById, update, info, login, updateTipo
    });
}