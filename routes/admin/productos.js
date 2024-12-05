var express = require('express');
var router = express.Router();
var productosModel = require('./../../models/productosModel');
const util = require('util');
const cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

/* GET home page. */
router.get('/', async function(req, res, next) {
  var productos = await productosModel.getProductosList();
  
  productos = productos.map(producto => {
    if(producto.img){
      const imagen = cloudinary.image(producto.img, {
        width: 100,
        height: 100,
        crop: 'pad'
      });
      return {
        ...producto,
        imagen
      }
    } else {
      return {
        ...producto,
        imagen: ''
      }
    }
  });

  res.render('admin/productos',{
    layout:'admin/layout',
    persona: req.session.nombre,
    productos
  });
});

router.get('/agregar', async function (req, res, next){
  var categorias = await productosModel.getCategoriasList();

  res.render('admin/agregar',{
    layout: 'admin/layout',
    categorias
  })
});

router.post('/agregar', async (req, res, next) =>{
  try{

    var img_id = '';
    if(req.files && Object.keys(req.files).length > 0){
      imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilePath)).public_id;
    }

    if( req.body.producto_nombre != "" && 
        req.body.producto_precio != "" && 
        req.body.producto_categoria != ""){
      await productosModel.insertProducto({
        ...req.body,
        img_id
      });
      res.redirect('/admin/productos');
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son requeridos'
      })
    }
  }catch (error){
    console.log(error);
    res.render('admin/agregar'), {
      layout: 'admin/layout',
      error: true,
      message: 'No se cargó el producto'
    }
  }
});

router.get('/eliminar/:id', async (req, res, next)=>{
  var id = req.params.id;

  let producto = await productosModel.getProductoById(id);
  if(producto.img_id){
    await (destroy(producto.img_id));
  };


  await productosModel.deleteProductosById(id);
  res.redirect('/admin/productos');
});

router.get('/modificar/:id', async (req, res, next)=>{
  var id = req.params.id;
  var producto = await productosModel.getProductoById(id);
  var categorias = await productosModel.getCategoriasList();
  var categoriaProducto = await productosModel.getCategoriaById(producto.producto_categoria);

  const imagen = cloudinary.image(producto.img_id, {
    width: 100,
        height: 100,
        crop: 'pad'
  });

  res.render('admin/modificar', {
    layout: 'admin/layout',
    producto,
    categorias,
    categoriaProducto,
    imagen
  })
});

router.post('/modificar', async (req, res, next) => {
  try{

    let img_id = req.body.img_original;
    let borrar_img_vieja = false;
    if(req.body.img_delete === "1"){
      img_id = null;
      borrar_img_vieja = true;
    } else {
      if(req.files && Object.keys(req.files).length > 0){
        imagen = req.files.imagen;
        img_id = (await uploader(imagen.tempFilePath)).public_id;
        borrar_img_vieja = true;
      }
    }

    if(borrar_img_vieja && req.body.img_original){
      await (destroy(req.body.img_original));
    }

    var obj={producto_nombre: req.body.producto_nombre,
      producto_precio: req.body.producto_precio,
      producto_categoria: req.body.producto_categoria,
      img_id
    }
    await productosModel.modificarProductoById(obj, req.body.producto_id);
    res.redirect('/admin/productos');
  } catch (error){
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se modificó el producto'
    });
  }
});

module.exports = router;