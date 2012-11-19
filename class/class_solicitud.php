<?php
require_once("class.php");

class Solicitud
{
    private $empresa;
    private $obra;
    private $emite;
    private $autoriza;
    private $solicitud;
    private $firma;    
    private $firma2;
   
    public function __construct()
    {
        $this->empresa=array();
        $this->obra=array();
        $this->persona=array();
        $this->autoriza=array();
        $this->solicitud=array();
        $this->firma=array();
        $this->firma2=array();        
    }

    public function get_empresa()
    {
        $sql="select * from empresas order by Empresa asc";
        $res=mysql_query($sql,Conectar::con());
        while ($reg=mysql_fetch_assoc($res))
        {
            $this->empresa[]=$reg;
        }
            return $this->empresa;
    }
    
    public function get_obra()
    {
        $sql="select * from obras where id_empresa = ".$_GET["id"]."";
        $res=mysql_query($sql,Conectar::con());
        while ($reg=mysql_fetch_assoc($res))
        {
            $this->obra[]=$reg;
        }
            return $this->obra;
    }
    
    public function get_emitido()
    {
        $sql="select * from firmas order by persona asc";
        $res=mysql_query($sql,Conectar::con());
        while ($reg=mysql_fetch_assoc($res))
        {
            $this->emite[]=$reg;
        }
            return $this->emite;
    }

    public function get_autorizado()
    {
        $sql="select * from firmas order by persona asc";
        $res=mysql_query($sql,Conectar::con());
        while ($reg=mysql_fetch_assoc($res))
        {
            $this->autoriza[]=$reg;
        }
            return $this->autoriza;
    }
    
    public function insert_solicitud()
    {
       // print_r($_POST);
        $sql="insert into solicitud_documento values 
                (null,
                '".$_POST["obra"]."',
                now(),
                '".$_POST["empresa"]."',
                '".$_POST["unidad"]."',
                '".$_POST["monto"]."',
                '".$_POST["doc_ref"]."',
                '".$_POST["detalle"]."',
                '".$_POST["tipo_cheque"]."',
                '".$_POST["plazo_cheque"]."',
                '".$_POST["girar_a"]."',
                '".$_POST["rut"]."',
                '".$_POST["direccion"]."',
                '".$_POST["solicitado"]."',
                '".$_POST["emitido"]."',
                '".$_POST["autorizado"]."')"; 
        //echo $sql;
        $res=mysql_query($sql,Conectar::con());
        header("Location: index.php");	
    }    
    
    public function get_solicitud_por_id()
    {
        $sql="select * from solicitud_documento where id_solicitud = ".$_GET["id"]."";
        $res=mysql_query($sql,Conectar::con());
        while ($reg=mysql_fetch_assoc($res))
        {
            $this->solicitud[]=$reg;
        }
        //print_r($res);
            return $this->solicitud;
    }
    
    public function get_empresa_por_id($id)
    {
        $sql="select * from empresas where id_empresa = '".$id."';";
        $res=mysql_query($sql,Conectar::con());
        while ($reg=mysql_fetch_assoc($res))
        {
            $this->empresa[]=$reg;
        }
            return $this->empresa;
    }    

    public function get_obra_por_id($obra,$emp)
    {
        $sql="select * from obras where id_obra = ".$obra." and id_empresa = ".$emp."";
        $res=mysql_query($sql,Conectar::con());
        while ($reg=mysql_fetch_assoc($res))
        {
            $this->obra[]=$reg;
        }
            return $this->obra;
    }    

    public function get_firmas_por_id($fir)
    {
        $sql="select * from firmas where id_firma = ".$fir."";
        $res=mysql_query($sql,Conectar::con());
        while ($reg=mysql_fetch_assoc($res))
        {
            $this->firma[]=$reg;
        }
            return $this->firma;
    }    

    public function get_firmas2_por_id($fir)
    {
        $sql="select * from firmas where id_firma = ".$fir."";
        $res=mysql_query($sql,Conectar::con());
        while ($reg=mysql_fetch_assoc($res))
        {
            $this->firma2[]=$reg;
        }
            return $this->firma2;
    } 
    
}

?>