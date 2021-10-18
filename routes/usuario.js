/* import routerx from 'express-promise-router';
import usuarioController from '../controllers/UsuarioController';
import auth from '../middlewares/auth'; */
const routerx = require('express-promise-router');
const usuarioController = require('../controllers/UsuarioController');
const auth = require('../middlewares/auth');

const router = routerx();

router.post('/add', auth.verifyUsuario, usuarioController.add);
// router.get('/query', auth.verifyUsuario, usuarioController.query);
router.get('/list', auth.verifyUsuario, usuarioController.list);
router.put('/update', auth.verifyUsuario, usuarioController.update);
// router.delete('/remove', auth.verifyUsuario, usuarioController.remove);
router.put('/activate', auth.verifyUsuario, usuarioController.activate);
router.put('/deactivate', auth.verifyUsuario, usuarioController.deactivate);
router.post('/login', usuarioController.login);

module.exports = router;