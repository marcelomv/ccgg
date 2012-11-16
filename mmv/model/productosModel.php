<?php


class Productos extends Conectar
{
    private $pro;
    
    public function __construct()
    {
        $this->pro = array();
    }
    
    public function get_productos()
    {
        $sql="select * from productos";
        $res=mysql_query($sql,parent::con());
        while($reg=mysql_fetch_assoc($res))
        {
                $this->pro[]=$reg;
        }
                return $this->pro;
    }
    
    public function get_productos_por_id()
    {
        parent::con();
        
        $sql = sprintf
        (
               "select id_producto, producto, precio from productos where id_producto = %s",     
               parent::comillas_inteligentes($_GET["valor"]) 
        );

        $res = mysql_query($sql);
        
        while($reg=mysql_fetch_assoc($res))
        {
                $this->pro[]=$reg;
        }
                return $this->pro;
        
     }
    
}


?>
