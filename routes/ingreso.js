/* import routerx from 'express-promise-router';
import ingresoController from '../controllers/IngresoController';
import auth from '../middlewares/auth'; */
const routerx = require('express-promise-router');
const ingresoController = require('../controllers/IngresoController');
const auth = require('../middlewares/auth');


const router = routerx();
router.post('/add', auth.verifyAlmacenero, ingresoController.add);
router.get('/query', auth.verifyAlmacenero, ingresoController.query);
router.get('/list', auth.verifyAlmacenero, ingresoController.list);
router.get('/grafico12meses', auth.verifyUsuario, ingresoController.grafico12Meses);
router.get('/consultaFechas', auth.verifyUsuario, ingresoController.consultaFechas);
/*
router.put('/update',auth.verifyAlmacenero,ingresoController.update);
router.delete('/remove',auth.verifyAlmacenero,ingresoController.remove);
*/
router.put('/activate', auth.verifyAlmacenero, ingresoController.activate);
router.put('/deactivate', auth.verifyAlmacenero, ingresoController.deactivate);
module.exports = router;