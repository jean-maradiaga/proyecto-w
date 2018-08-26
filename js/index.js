// RIESGO
// - Nombre/tipo
// - Impacto
// - Probabilidad

var impacto = ['Insuficiente', 'Marginal', 'Critico', 'Catastrofico'];
var probabilidad = ['Bajo', 'Medio', 'Alto'];

var _r = '';
var _i = '';
var _p = '';
var _n = '';

var pv = 1;
var ev = 1;
var ac = 1;

var t1 = $('#riesgos').DataTable();
var t2 = $('#impactos').DataTable();
var t3= $('#probabilidades').DataTable();
var t4 = $('#niveles').DataTable();

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

    $.each(impacto, function (key, value) {
        //console.log(value)
        $('#impacto')
            .append($("<option></option>")
                .attr("value", key + 1)
                .text(value));
    });

    $.each(probabilidad, function (key, value) {
        $('#probabilidad')
            .append($("<option></option>")
                .attr("value", key + 1)
                .text(value));
    });

});

agregarRiesgo = () => {

    getValues()
    t1.row.add([
        _r,
        _i,
        _p,
        _n
    ]).draw(false);
    $('#myModal').modal('toggle')
    document.getElementById("riesgoForm").reset()
    
}

calcularNivel = (i, p) => {
    var result = '';
    var calc = i * p;

    if(calc <= 3){
        return result = '<span class="label label-success">Bajo(' + calc + ')</span>'
    }

    if(calc <= 8){
        return result = '<span class="label label-warning">Media(' + calc + ')</span>'
    }

    if(calc >= 9){
        return result =  '<span class="label label-danger">Alto(' + calc + ')</span>'
    }

    return ''
}

getValues = () => {
    _r = $("#riesgo").val();
    _i = $("#impacto option:selected").text();
    _p = $("#probabilidad option:selected").text();

    _iVal = $("#impacto").val();
    _pVal = $("#probabilidad").val();

    _n = calcularNivel(_iVal, _pVal);
}

$("#riesgoForm").submit(function(e){
    e.preventDefault();
    return false;
});


document.querySelector('button#addRiesgo').addEventListener('click', agregarRiesgo);


// IMPACTOS

var nImp = '';
var nImpVal = '';


agregarImpacto = () => {

    getImpValues()
    t2.row.add([
        nImp,
        nImpVal
    ]).draw(false);
    $('#myImpactModal').modal('toggle')
    document.getElementById("impactForm").reset()
    
}

getImpValues = () => {
    nImp = $("#nImpacto").val();
    nImpVal = $("#impValor").val();
}

$("#impactForm").submit(function(e){
    e.preventDefault();
    return false;
});


document.querySelector('button#addImpacto').addEventListener('click', agregarImpacto);

// Probabilidades

var nProb = '';
var nProbVal = '';


addProb = () => {

    getProbValues()
    t3.row.add([
        nProb,
        nProbVal
    ]).draw(false);
    $('#myProbModal').modal('toggle')
    document.getElementById("probForm").reset()
    
}

getProbValues = () => {
    nProb = $("#nProb").val();
    nProbVal = $("#impProb").val();
}

$("#probForm").submit(function(e){
    e.preventDefault();
    return false;
});


document.querySelector('button#addProb').addEventListener('click', addProb);

// Planned Cost

calcPlannedCost = () => {

    var percetage = $("#perPlanned").val();
    var cost = $("#costPlanned").val();
    var result = (percetage/100) * cost;

    pv = result;
    $('#planResult').val(result);
    calcIndices();
}

$("#PVForm").submit(function(e){
    e.preventDefault();
    return false;
});

document.querySelector('button#calcPlanValue').addEventListener('click', calcPlannedCost);

// Earned Value

calcEarnCost = () => {

    var percentage = $("#evPlanned").val();
    var cost = $("#evCost").val();
    var result = (percentage/100) * cost;

    ev = result;
    $('#evResult').val(result);
    calcIndices();
}

$("#EVForm").submit(function(e){
    e.preventDefault();
    return false;
});

document.querySelector('button#calcEarnValue').addEventListener('click', calcEarnCost);

// Bullshit goes here

saveActualCost = () => {
  ac = $("#ac").val()  
  calcIndices();
}

calcIndices = () => {

    var spi = ev / pv;
    var cpi = ev / ac;
    var sv  = ev - pv;
    var cv  = ev - ac;

    $("#spi").val(spi)
    $("#cpi").val(cpi)
    $("#sv").val(sv)
    $("#cv").val(cv)
}

document.querySelector('button#saveAc').addEventListener('click', saveActualCost);


