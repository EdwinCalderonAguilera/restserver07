const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();


router.get('/', usuariosGet )


router.put('/:id', usuariosPut )

router.post('/',[
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),
        check('password', 'la contrasea es obligatoria').isLength(6),
        check('correo', 'el correo no es valido').isEmail(),
        check('rol', 'no es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
        validarCampos

], usuariosPost )

router.delete('/', usuariosDelete )

router.patch('/', usuariosPatch )


module.exports = router;

