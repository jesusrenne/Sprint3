/* import routerx from 'express-promise-router';
import articuloController from '../controllers/ArticuloController';
import auth from '../middlewares/auth'; */
const routerx = require('express-promise-router');
const articuloController = require('../controllers/ArticuloController');
const auth = require('../middlewares/auth');

const router = routerx();

router.post('/add', auth.verifyUsuario, articuloController.add);
router.get('/query', auth.verifyUsuario, articuloController.query);
router.get('/queryCodigo', auth.verifyUsuario, articuloController.queryCodigo);
router.get('/list', articuloController.list);
router.put('/update', auth.verifyUsuario, articuloController.update);
router.delete('/remove', auth.verifyUsuario, articuloController.remove);
router.put('/activate', auth.verifyUsuario, articuloController.activate);
router.put('/deactivate', auth.verifyUsuario, articuloController.deactivate);

module.exports = router;