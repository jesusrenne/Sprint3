/* import routerx from 'express-promise-router';
import ventaController from '../controllers/VentaController';
import auth from '../middlewares/auth'; */
const routerx = require('express-promise-router');
const ventaController = require('../controllers/VentaController');
const auth = require('../middlewares/auth');

const router = routerx();

router.post('/add', auth.verifyVendedor, ventaController.add);
router.get('/query', auth.verifyVendedor, ventaController.query);
router.get('/list', auth.verifyVendedor, ventaController.list);
router.get('/grafico12meses', auth.verifyUsuario, ventaController.grafico12Meses);
router.get('/consultaFechas', auth.verifyUsuario, ventaController.consultaFechas);
/*
router.put('/update',auth.verifyAlmacenero,ventaController.update);
router.delete('/remove',auth.verifyAlmacenero,ventaController.remove);
*/
router.put('/activate', auth.verifyVendedor, ventaController.activate);
router.put('/deactivate', auth.verifyVendedor, ventaController.deactivate);


module.exports = router;