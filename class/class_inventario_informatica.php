<?php
require_once("class_solicitud.php");

class Inventario_informatica
{
	private $clasi;
	private $clasi_id;
	private $inv;
	private $empresa;
	private $empresa_id;

	public function __construct()
	{
		$this->clasi=array();
		$this->clasi_id=array();
		$this->inv=array();
		$this->empresa=array();
		$this->empresa_id=array();
	}
	
	public function get_clasificacion()
	{
		$sql="select * from clasificacion_computadores order by clasificacion asc";
        $res=mysql_query($sql,Conectar::con());
        while ($reg=mysql_fetch_assoc($res))
        {
            $this->clasi[]=$reg;
        }
            return $this->clasi;
	}
	
	public function get_clasificacion_por_id($id)
	{
		$sql="select * from clasificacion_computadores where id_clasificacion = '".$id."';";
        $res=mysql_query($sql,Conectar::con());
        while ($reg=mysql_fetch_assoc($res))
        {
            $this->clasi_id[]=$reg;
        }
            return $this->clasi_id;
	}
        
    public function insert_inventario_computadores()
    {
       // print_r($_POST);
        $sql="insert into inventario_computadores values 
                (null,
                '".$_POST["clasificacion"]."',
                '".$_POST["empresa"]."',
                '".$_POST["obra"]."',
                '".$_POST["codigo"]."',
                '".$_POST["equipo"]."',
                '".$_POST["detalle"]."',
                now())";
       //   echo $sql;
        $res=mysql_query($sql,Conectar::con());
    }

    public function elimina_inventario_informatica($id)
    {
        $sql="delete from inventario_computadores where id_equipo=$id";
        $res=mysql_query($sql,Conectar::con());
        echo "<script type='text/javascript'>
        alert('El registro ha sido eliminado correctamente');
        window.location='inventario_informatica.php';
        </script>";
    }

    public function edit_inventario_informatica($id,$clasi,$empr,$obra,$codi,$equi,$deta)
    {
        $sql="update inventario_computadores "
            ." set "
            ." id_clasificacion='$clasi', "
            ." id_empresa='$empr', "
            ." id_obra='$obra', "
            ." codigo='$codi', "
            ." equipo='$equi', "
            ." detalle='$deta', "
            ." fecha=now() "
            ." where "
            ." id_equipo=$id ";
        $res=mysql_query($sql,Conectar::con());
        echo "<script type='text/javascript'>
        alert('El registro ha sido modificado correctamente');
        window.location='inventario_informatica.php';
        </script>"; 
    }
	    	
	public function get_inventario_informatica()
	{
		$sql="select * from inventario_computadores";
        $res=mysql_query($sql,Conectar::con());
        while ($reg=mysql_fetch_assoc($res))
        {
            $this->inv[]=$reg;
        }
            return $this->inv;
	}

	public function get_inventario_informatica_por_id($id)
	{
		$sql="select * from inventario_computadores where id_equipo =".$id.";";
        $res=mysql_query($sql,Conectar::con());
        while ($reg=mysql_fetch_assoc($res))
        {
            $this->inv[]=$reg;
        }
            return $this->inv;
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

    public function get_empresa_por_id($id)
    {
        $sql="select * from empresas where id_empresa = '".$id."';";
        $res=mysql_query($sql,Conectar::con());
        while ($reg=mysql_fetch_assoc($res))
        {
            $this->empresa_id[]=$reg;
        }
            return $this->empresa_id;
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
	  
    public function get_obra($id)
    {
        $sql="select * from obras where id_empresa = ".$id.";";
        $res=mysql_query($sql,Conectar::con());
        while ($reg=mysql_fetch_assoc($res))
        {
            $this->obra[]=$reg;
        }
            return $this->obra;
    }
    
	
	
}
?>