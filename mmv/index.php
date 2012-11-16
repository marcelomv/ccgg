<?php
require_once("config.php");

if (!empty($_GET["accion"]))
{
    $accion = $_GET["accion"];
}
else
{
    $accion = "home";
}

if (is_file("controller/" . $accion . "Controller.php"))
{
    require_once("controller/" . $accion . "Controller.php");
}
else
{
    require_once("controller/errorController.php");
}

?>