CREATE DATABASE  IF NOT EXISTS `proyecto`;
USE `proyecto`;

DROP TABLE IF EXISTS `categorias`;
CREATE TABLE `categorias` (
  `categoria_id` int NOT NULL AUTO_INCREMENT,
  `categoria_descripcion` varchar(200) NOT NULL,
  PRIMARY KEY (`categoria_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `categorias` WRITE;
INSERT INTO `categorias` VALUES (1,'Placas de video'),(2,'Fuentes'),(3,'Procesadores'),(4,'Motherboard');
UNLOCK TABLES;

DROP TABLE IF EXISTS `productos`;
CREATE TABLE `productos` (
  `producto_id` int NOT NULL AUTO_INCREMENT,
  `producto_nombre` varchar(200) DEFAULT NULL,
  `producto_precio` float DEFAULT NULL,
  `producto_categoria` int NOT NULL,
  `img_id` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`producto_id`),
  KEY `producto_categoria_idx` (`producto_categoria`),
  CONSTRAINT `producto_categoria` FOREIGN KEY (`producto_categoria`) REFERENCES `categorias` (`categoria_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `productos` WRITE;
INSERT INTO `productos` VALUES (22,'GeForce RTX 3050',125000,1,'ircue4gkerxlpz8slzvt'),(23,'AMD RX580',110000,1,'bwajtpecqxt0zduvc2ud'),(24,'GeForce RTX 4090',69,1,'plmydybsc8bmlhmpn3k3');
UNLOCK TABLES;

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `clave` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `usuarios` WRITE;
INSERT INTO `usuarios` VALUES (1,'jaimeslautaro','25d55ad283aa400af464c76d713c07ad');
UNLOCK TABLES;
