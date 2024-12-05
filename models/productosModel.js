var pool = require('./bd');

async function getProductosList(){
    try{
        var query = "select producto_id as id,producto_nombre as nombre,producto_precio as precio,categoria_descripcion as nombre_categoria,img_id as img from productos join categorias on producto_categoria = categoria_id;";
        var rows = await pool.query(query);

        return rows;
    }catch (error){
        console.log(error);
    }
}

async function getCategoriasList(){
    try{
        var query = "select categoria_id as codigo, categoria_descripcion as nombre from categorias;";
        var rows = await pool.query(query);

        return rows;
    }catch (error){
        console.log(error);
    }
}

async function getCategoriaById(id){
    var query = "select * from categorias where categoria_id = ?";
    var rows = await pool.query(query, [id]);

    return rows[0];
}

async function insertProducto(obj){
    try{
        var query = "insert into productos set ?";
        var rows = await pool.query(query, [obj]);
        
        return rows;
    } catch (error){
        throw error;
    }
}

async function deleteProductosById(id) {
    var query = "delete from productos where producto_id = ?";
    var rows = await pool.query(query, [id]);

    return rows;
}

async function getProductoById(id){
    var query = "select * from productos where producto_id = ?";
    var rows = await pool.query(query, [id]);
    
    return rows[0];
}

async function modificarProductoById(obj, id){
    try{
        var query = 'update productos set ? where producto_id=?';
        var rows = await pool.query(query, [obj, id]);
        return rows;
        
    } catch (error){
        throw error;
    }
}

module.exports = { getProductosList, getCategoriasList, getCategoriaById, insertProducto, deleteProductosById, getProductoById, modificarProductoById };