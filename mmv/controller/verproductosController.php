<?php

require_once("model/productosModel.php");

$pro = New Productos();

$datos = $pro->get_productos_por_id();


require_once("view/verproductos.phtml");
?>
