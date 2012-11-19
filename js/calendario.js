// JavaScript Document
//Calendario de uso libre
//desarrollado por Johan Calderon
//nahhoj@hotmail.com - johancalderon@micro2c.com
//www.micro2c.com
//Bogota - Colombia
//25-10-2011
var _calendarios_=0;
var calendarios=new Array(10);
var meses=new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
var dias_mes = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
var temp_calendario=0;

function crear_calendario(lanzador,texto,formato){
    calendarios[_calendarios_]=new Array(3);
    calendarios[_calendarios_][0]=lanzador;
    calendarios[_calendarios_][1]=texto;
    calendarios[_calendarios_][2]=formato;
    _calendarios_++;
}

$(window).ready(function(){
    $(".lanzador").click(function(){
        if ($("." + $(this).attr("id")).length){//saber si existe el ID
            $("." + $(this).attr("id")).remove();
        }
        else{
            for(i=0;i<_calendarios_;i++){
                if ($("." + calendarios[i][0]).length)//saber si existe el ID
                    $("." + calendarios[i][0]).remove();                
            }
            put_calendario($(this).attr("id"),0,0);
            $("." + $(this).attr("id")).css("top", $("#" + $(this).attr("id")).position().top  + "px")//ubica el calendario junto al boton lanzador
            $("." + $(this).attr("id")).css("left", $("#" + $(this).attr("id")).position().left + $("#" + $(this).attr("id")).outerWidth() + "px")//ubica el calendario junto al boton lanzador
        }
    });

    function put_calendario(lanzador,month,year){
        var html=null;
        var mes=null;
        var ano=null
        var hoy=null;
        var dias=null; //dias que tiene el mes
        var dia_=null; //dia que empieza el mes        
        var mes_hoy=null;
        var ano_hoy=null;
        
        fecha_hoy=new Date();
        hoy=fecha_hoy.getUTCDate();
        mes_hoy=fecha_hoy.getMonth();
        ano_hoy=fecha_hoy.getUTCFullYear();        
        
        if (month==0 && year<1900){
            for(i=0;i<_calendarios_;i++){
                if (calendarios[i][0]==lanzador)
                    id_texto=calendarios[i][1];
            }

            if ($("#" + id_texto).val().length>0){
                temp_texto=$("#" + id_texto).val();
                if (temp_texto.length==10 && (temp_texto.substr(2, 1)=='/' || temp_texto.substr(2, 1)=='-') && (temp_texto.substr(5, 1)=='/' || temp_texto.substr(5, 1)=='-')){//formato fecha
                    for(i=0;i<_calendarios_;i++){
                        if (calendarios[i][0]==lanzador){                        
                            formato=calendarios[i][2]
                        }
                    }                
                    
                    if (formato=="mm/dd/aaaa" || formato=="mm-dd-aaaa"){
                        mes=parseInt(temp_texto.substr(0, 2),10);
                        ano=parseInt(temp_texto.substr(6, 4),10);
                    }
                    else{
                        mes=parseInt(temp_texto.substr(3, 2),10);
                        ano=parseInt(temp_texto.substr(6, 4),10);
                    }
                                        
                    if (mes<=12 && (ano>1900 && ano<2100)){
                        if (mes==2 && ano_bisiesto(ano)){
                            dias=29;
                        }
                        else{
                            dias=dias_mes[mes-1];
                        }
                        dia_=dia_semana(1,mes-1,ano)-1;                    
                        mes=meses[mes-1];
                    }
                    else{                    
                        //fecha de hoy
                        fecha_hoy=new Date();
                        mes=meses[fecha_hoy.getMonth()];
                        ano=fecha_hoy.getFullYear();
                        if (fecha_hoy.getMonth()==1 && ano_bisiesto(ano)){
                            dias=29;
                        }
                        else{
                            dias=dias_mes[fecha_hoy.getMonth()];
                        }
                        dia_=dia_semana(1,fecha_hoy.getMonth(),ano)-1;
                    }
                }
                else{
                    //fecha de hoy
                    fecha_hoy=new Date();
                    mes=meses[fecha_hoy.getMonth()];
                    ano=fecha_hoy.getFullYear();
                    if (fecha_hoy.getMonth()==1 && ano_bisiesto(ano)){
                        dias=29;
                    }
                    else{
                        dias=dias_mes[fecha_hoy.getMonth()];
                    }
                    dia_=dia_semana(1,fecha_hoy.getMonth(),ano)-1;
                }
            }
            else{
                //fecha de hoy
                fecha_hoy=new Date();
                mes=meses[fecha_hoy.getMonth()];
                ano=fecha_hoy.getFullYear();
                if (fecha_hoy.getMonth()==1 && ano_bisiesto(ano)){
                    dias=29;
                }
                else{
                    dias=dias_mes[fecha_hoy.getMonth()];
                }
                dia_=dia_semana(1,fecha_hoy.getMonth(),ano)-1;
            }       
        }
        else{//cambio de mes con los botones
            mes=month;
            ano=year;
            if (mes<=12 && (ano>1900 && ano<2100)){
                if (mes==2 && ano_bisiesto(ano)){
                    dias=29;
                }
                else{
                    dias=dias_mes[mes-1];
                }
                dia_=dia_semana(1,mes-1,ano)-1;                    
                mes=meses[mes-1];
            }
            else{
                //fecha de hoy
                fecha_hoy=new Date();
                mes=meses[fecha_hoy.getMonth()];
                ano=fecha_hoy.getFullYear();
                if (fecha_hoy.getMonth()==1 && ano_bisiesto(ano)){
                    dias=29;
                }
                else{
                    dias=dias_mes[fecha_hoy.getMonth()];
                }
                dia_=dia_semana(1,fecha_hoy.getMonth(),ano)-1;
            }
        }
        
        html='<div class="' + lanzador + ' calendario">';
        html +='<table>'+
        '<tr>' +
        '<th colspan="1" class="lastmes"><<</th>' +
        '<th class="mes_" colspan="5">' + mes + ' de ' + ano + '</th>' +
        '<th colspan="1" class="nextmes">>></th>' +
        '</tr>' +
        '<tr>' +
        '<th>Do</th>' +
        '<th>Lu</th>' +
        '<th>Ma</th>' +
        '<th>Mi</th>' +
        '<th>Ju</th>' +
        '<th>Vi</th>' +
        '<th>Sa</th>' +
        '</tr>';
        d=1;
        for(i=0;i<42;i++){
                if (i%7==0)
                        html +='<tr>'; 			

                if (i>=dia_){
                        if (d<=dias){
                                if (d==hoy && meses[mes_hoy]==mes && ano_hoy==ano)
                                        html +='<td class="link_calendario hoy">' + d + '</td>';
                                else
                                        html +='<td class="link_calendario">' + d + '</td>';
                        }
                        else
                                html +='<td></td>';
                        d++;
                }
                else{
                        html +='<td></td>';
                }

                if ((i+1)%7==0 && i!=0)
                        html +='</tr>';
        }		
        html +='</table>' + 
                    '</div>';				
        $("body").append(html);
        //temp_calendario=1;
    }

    $(".calendario table tr .link_calendario").live("click",function(){
        temp=$(this).closest("div").attr("class").split(" ");
        for(i=0;i<_calendarios_;i++){
            if (calendarios[i][0]==temp[0]){
                text=calendarios[i][1]
                formato=calendarios[i][2]
            }
        }        
        fecha=$("." + temp[0] + " .mes_").html().split(" de ");
        for(i=0;i<12;i++){
            if (meses[i]==fecha[0]){
                i++
                if (i<10)
                    __mes="0" + i;
                else
                    __mes=i;                
                if ($(this).html()<10)
                    __dia="0" + $(this).html()
                else
                    __dia=$(this).html()
                if (formato=="mm/dd/aaaa")
                    $("#" + text).val(__mes + "/" + __dia + "/" + fecha[1])                    
                else if (formato=="dd/mm/aaaa")
                    $("#" + text).val(__dia + "/" + __mes + "/" + fecha[1])                    
                else if (formato=="mm-dd-aaaa")
                    $("#" + text).val(__mes + "-" + __dia + "-" + fecha[1])                    
                else if (formato=="dd-mm-aaaa")
                    $("#" + text).val(__dia + "-" + __mes + "-" + fecha[1])                    
                else 
                    $("#" + text).val(__mes + "/" + __dia + "/" + fecha[1])                    
                
                $("." + temp[0]).remove();
                break;
            }
        }
    });       
    
    $(".calendario table tr .lastmes").live("click",function(){
       temp=$(this).closest("div").attr("class").split(" ");
       _fecha_=$("." + temp[0] + " .mes_").html().split(" de ");
       for(i=0;i<12;i++){
           if (meses[i]==_fecha_[0])
               mes=i+1;
       }              
       ano=parseInt(_fecha_[1]);
       if (mes==1){
           mes=12
           ano--;
       }
       else{
           mes--;
       }       
       $("." + temp[0]).remove();
       put_calendario(temp[0],mes,ano);
       $("." + temp[0]).css("top", $("#" + temp[0]).position().top  + "px")//ubica el calendario junto al boton lanzador
       $("." + temp[0]).css("left", $("#" + temp[0]).position().left + $("#" + temp[0]).outerWidth() + "px")//ubica el calendario junto al boton lanzador
    });
    
    $(".calendario table tr .nextmes").live("click",function(){
       temp=$(this).closest("div").attr("class").split(" ");
       _fecha_=$("." + temp[0] + " .mes_").html().split(" de ");
       for(i=0;i<12;i++){
           if (meses[i]==_fecha_[0])
               mes=i+1;
       }              
       ano=parseInt(_fecha_[1]);
       if (mes==12){
           mes=1
           ano++;
       }
       else{
           mes++;
       }       
       $("." + temp[0]).remove();
       put_calendario(temp[0],mes,ano);
       $("." + temp[0]).css("top", $("#" + temp[0]).position().top  + "px")//ubica el calendario junto al boton lanzador
       $("." + temp[0]).css("left", $("#" +
           temp[0]).position().left + $("#" + temp[0]).outerWidth() + "px")//ubica el calendario junto al boton lanzador
    });   
    
    $('.calendario').live('mouseover mouseout', function(event){
        if (event.type == 'mouseover')
            temp_calendario=2;
        else
            temp_calendario=1;
    });

    $(document).click(function(event){        
        if (temp_calendario==1){
            $(".calendario").remove();
            temp_calendario=0;
        }
    });
});

function ano_bisiesto(ano){
    if ((ano % 4 == 0) && ((ano % 100 != 0) || (ano % 400 == 0)))
        return 1;
    else
        return 0;
}

function dia_semana(d,m,y){
    hlpr = dias_mes[m];    
    if (d < dias_mes[m] + 1){
        if (m == 1 && y % 4 == 0)
            hlpr++;
        fecha = new Date(y,m,d);        
        diasemana = fecha.getDay();        
    }
    return diasemana+1;
}