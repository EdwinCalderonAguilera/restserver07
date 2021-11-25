const {response, request} = require('express');
const bcs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');

const usuariosGet = (req = request, res = response) => {

    const {q, nombre, apikey} = req.query;
    res.json({
        msg: 'get API- controlador',
        q,
        nombre,
        apikey
    })
  }

const usuariosPut = (req, res = response) => {

    const {id} = req.params;
    

    res.json({
        msg: 'put API - controlador',
        id
    })
  }

const usuariosPost = async(req, res = response) => {

    const errors = validationResult(req);

    if ( !errors.isEmpty() ){
      return res.status(400).json(errors);
    }

    const { nombre, correo, password, rol } =  req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ){
      return res.status(400).json({
        msg: 'ese correo ya esta registrado'
      })
    }

    // Encriptar la contrasea

    const salto = bcs.genSaltSync();
    usuario.password = bcs.hashSync( password, salto );

    //guardar en BDD
    await usuario.save();

    res.json({
        msg: 'post API - controlador',
        usuario
    })
  }

  const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'Delete API - controlador'
    })
  }

  const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API - controlador'
    })
  }


  module.exports = {
      usuariosGet,
      usuariosPut,
      usuariosPost,
      usuariosDelete,
      usuariosPatch
  }