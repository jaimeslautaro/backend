var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel');
const md5 = require('md5');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/login',{
    layout:'admin/layout'
  });
});

router.get('/logout', function(req, res, next){
  req.session.destroy();
  res.render('admin/login', {
    layout: 'admin/layout'
  })
});

router.post('/', async(req,res,next) =>{
  try{
    var nombre = req.body.nombre;
    var clave = req.body.clave;

    var data = await usuariosModel.getUserByUsernameAndPassword(nombre, clave);

    if(data != undefined){
      req.session.id_usuario = data.id;
      req.session.nombre = data.nombre;

      res.redirect('/admin/productos');
    } else {
      res.render('admin/login', {
        layout: 'admin/layout',
        error: true
      });
    }
  } catch(error){
    console.log(error);
  }
});

module.exports = router;