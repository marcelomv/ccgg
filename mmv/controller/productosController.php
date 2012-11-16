<?php

require_once("model/productosModel.php");

$pro = New Productos();

$datos = $pro->get_productos();



require_once("view/productos.phtml");
?>
