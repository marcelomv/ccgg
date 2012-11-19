<?php
require_once("class/class_inventario_informatica.php");
$sol= new Inventario_informatica();
//print_r($_GET);
$obra=$sol->get_obra($_GET["id"]);
?>
	
	<div class="linea">
		<div class="etiqueta">Obras</div>					
		<select name="obra">
			<?php
			for ($i=0; $i <sizeof($obra);$i++)
			{
			?>
			<option value="<?php echo $obra[$i]["id_obra"] ?>" ><?php echo substr($obra[$i]["nombre_obra"],0,45) ?></option>
			<?php
			}
			?>
		</select>
	</div>