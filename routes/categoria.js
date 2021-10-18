/* import routerx from 'express-promise-router';
import categoriaController from '../controllers/CategoriaController';
import auth from '../middlewares/auth'; */
const routerx = require('express-promise-router');
const categoriaController = require('../controllers/CategoriaController');
const auth = require('../middlewares/auth');


const router = routerx();

router.post('/add', auth.verifyUsuario, categoriaController.add);
router.get('/query', auth.verifyUsuario, categoriaController.query);
router.get('/list', auth.verifyUsuario, categoriaController.list);
router.put('/update', auth.verifyUsuario, categoriaController.update);
router.delete('/remove', auth.verifyUsuario, categoriaController.remove);
router.put('/activate', auth.verifyUsuario, categoriaController.activate);
router.put('/deactivate', auth.verifyUsuario, categoriaController.deactivate);


module.exports = router;