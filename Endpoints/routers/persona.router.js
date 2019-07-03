const personaRouter = require('express').Router();
const token=require('../middlewares/token');

module.exports = (wagner) => {
    const personaCtrl = wagner.invoke((Persona) =>
        require('../controllers/persona.controller')(Persona));
    //Definir endPoints
    //CRUD PERSONAS
    personaRouter.get("/getAll", (req, res) => {
        personaCtrl.getAll(req, res);
    });

    personaRouter.get("/get/:id", (req, res) => {
        personaCtrl.getById(req, res);
    });

    personaRouter.delete("/del/:id", (req, res) => {
        personaCtrl.deletePersona(req, res);
    });

    personaRouter.put("/edit/:id", (req, res) => {
        personaCtrl.update(req, res);
    });
    /*
    personaRouter.post("/", (req, res) => {
        personaCtrl.create(req, res);
    });
    */

    //AUTH
    personaRouter.get('/userInfo', token.checkJWT, (req, res) => {
        personaCtrl.info(req, res);
    });

    personaRouter.post('/signup',(req, res) => {
        personaCtrl.create(req, res);
    });

    personaRouter.post('/login', (req, res) => {
        personaCtrl.login(req, res);
    });


    return personaRouter;
}
