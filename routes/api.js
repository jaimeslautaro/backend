var express = require('express');
var router = express.Router();
var productosModel = require('../models/productosModel');
var cloudinary = require('cloudinary').v2;
var nodemailer = require('nodemailer');

router.get('/productos', async function(req, res, next) {
    var productos = await productosModel.getProductosList();

    productos = productos.map(producto =>{
        if(producto.img){
            const imagen = cloudinary.url(producto.img, {
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

    res.json(productos);
});

router.post('/contacto', async (req, res)=>{
    const mail = {
        to: 'jaimes.lautaro@gmail.com',
        subject: 'Contacto web',
        html: `${req.body.nombre} se contactó a través de la web y quiere más información a este correo: ${req.body.email} <br>Además, hizo el siguiente comentario: ${req.body.mensaje} <br>Su teléfono es: ${req.body.telefono}`
    }

    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    })

    await transport.sendMail(mail);

    res.status(201).json({
        error: false,
        message: 'Mensaje enviado'
    })
})

module.exports = router;