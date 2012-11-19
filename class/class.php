<?php
session_start();

class Conectar
{
    public static function con()
    {
        $con=mysql_connect("localhost","marcelo","18101969");
        mysql_query("SET NAMES 'utf8'");
        mysql_selectdb("ccgg");
        return $con;
    }    
}
?>