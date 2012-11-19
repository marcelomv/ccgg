<?php
session_start();

class Conectar
{
    public static function con()
    {
        $con=mysql_connect("mysql.hostinger.com.ar","u190992915_marce","sql18101969");
        mysql_query("SET NAMES 'utf8'");
        mysql_selectdb("u190992915_ccgg");
        return $con;
    }    
}
?>