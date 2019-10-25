let _persona;
const hash = require('../middlewares/password');
const tkn = require('../middlewares/token');

const getAll = (req, res) => {
    _persona.find({}, { foto: 1, nombre: 1, apPaterno: 1, apMaterno: 1, estatus: 1, tipo: 1, credencial: 1, cursoAlumno: 1, puntaje: 1 })
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
        persona.ruta = (persona.nombre + '-' + persona.apPaterno + '-' + persona.apMaterno).toLowerCase().replace(/ /g, "-").replace(/á/g, "a").replace(/é/g, "e").replace(/í/g, "i").replace(/ó/g, "o").replace(/ú/g, "u").replace(/ü/g, "u") + "-" + persona._id;
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
                _persona.create(persona).then(data => {
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
                    detail: []
                });
            } else {
                hash.comparePassword(contraseña, usuario.credencial.contraseña).then(contraseñaCorrecta => {
                    if (!contraseñaCorrecta) {
                        res.status(400).json({
                            code: 400,
                            msg: "Error: La contraseña es incorrecta",
                            detail: []
                        });
                    } else {
                        const tokenTTL = `${1000 * 60 * 60 * 24 * 30}ms`; // ms * s * m * h * d
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
    var datos = {
        id: 0,
        tipo: [],
        nombre: '',
        foto: '',
        sexo: '',
        iat: req.decoded.iat,
        exp: req.decoded.exp
    }
    _persona.find({ _id: req.decoded.id })
        .then(persona => {
            datos.id = persona[0]._id;
            datos.tipo = persona[0].tipo;
            datos.nombre = persona[0].nombre;
            datos.foto = persona[0].foto;
            datos.sexo = persona[0].sexo;
            res.status(200);
            res.json({
                code: 200,
                msg: "Consulta exitosa.",
                detail: datos
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

const updateAvance = (req, res) => {
    const id = req.params.id;
    cursoAlumno = req.body
    _persona.update({ _id: id }, {
        $set: {
            cursoAlumno: cursoAlumno
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

const inscribirAlumno = (req, res) => {
    const id = req.params.id;
    cursoAlumno = req.body.cursoAlumno;
    puntaje = req.body.puntaje;
    console.log(cursoAlumno);
    console.log(puntaje);
    _persona.update({ _id: id }, {
        $set: {
            cursoAlumno: cursoAlumno,
            puntaje: puntaje
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


const updateTipo = (req, res) => {
    const { id } = req.params;
    const nuevo = (req.body.credencialNuevo != undefined) ? {
        tipo: req.body.tipoNuevo,
        credencial: req.body.credencialNuevo
    } : { tipo: req.body.tipoNuevo }


    _persona.update({ _id: id }, {
        $set: nuevo
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

const updateCredencial = (req, res) => {
    const id = req.params.id;
    const credencial = req.body.credencial;
    hash.comparePassword(req.body.confirm, req.body.contra).then(contraseñaCorrecta => {
        if (!contraseñaCorrecta) {
            res.status(200).json({
                code: 400,
                msg: "Error: La contraseña es incorrecta",
                detail: []
            });
        } else {
            if (req.body.op == 1) {
                hash.hashPassword(req.body.credencial.contraseña).then(contraseña => {
                    credencial.contraseña = contraseña;
                    _persona.update({ _id: id }, { $set: { credencial: credencial } }).then(data => {
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
                });
            } else {
                _persona.update({ _id: id }, { $set: { credencial: credencial } }).then(data => {
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

        }

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
            sexo: persona.sexo,
            fechaNac: persona.fechaNac,
            foto: persona.foto,
            web: persona.web,
            fb: persona.fb,
            yt: persona.yt,
            in: persona.in,
            resumen: persona.resumen
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
        getAll, create, deletePersona, getById, update, info, login, updateTipo, updateCredencial, inscribirAlumno, updateAvance
    });
}