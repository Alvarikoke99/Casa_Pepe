var primeros = ["Puré de patata", "Macarrones con queso", "Garbanzos con chorizo", "Judías verdes", "Sopa de pescado"];
var segundos = ["Merluza a la plancha", "Pescado", "Solomillo de cerdo"];
var postres = ["Fruta", "Arroz con leche", "Natillas"];
var platosMesas = [[], [], [], [], []];

var preciosPrimeros = [5.95, 4.95, 6.95, 3.95, 5.95];
var preciosSegundos = [6.95, 5.95, 3.95];
var preciosPostres = [2.00, 2.30, 2.50];
var precioExtras = [1.30, 5.00]; // Café y copa
var extras = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
var cuentas = [0, 0, 0, 0, 0];

function resetSelectMultiple(id) {
    var select = document.getElementById(id);
    for (opcion in select.options) {
        select.options.remove(0);
    }
}

function actualizarCarta(idSelect, categoria) {
    resetSelectMultiple(idSelect);
    var select = document.getElementById(idSelect);
    switch (categoria) {
        case 1:
            platos = primeros;
            break;
        case 2:
            platos = segundos;
            break;
        case 3:
            platos = postres;
            break;
        default:
            platos = primeros;
            break;
    }
    for (var i = 0; i < platos.length; i++){
        var opcion = document.createElement('option');
        opcion.value = "plato" + (i + 1);
        opcion.innerHTML = platos[i];
        select.appendChild(opcion);
    }
}

function pedidoMesa(idPrimeros, idSegundos, idCarta, idMesa, idMesas, idCuenta) {
    var platos;
    if(document.getElementById(idPrimeros).checked) {
        platos = primeros;
        precios = preciosPrimeros;
    }
    else if(document.getElementById(idSegundos).checked) {
        platos = segundos;
        precios = preciosSegundos;
    }
    else {
        platos = postres;
        precios = preciosPostres;
    }
    var numPlato = document.getElementById(idCarta).selectedIndex;
    var numMesa = document.getElementById(idMesas).selectedIndex;

    if(numPlato >= 0) { // Se evitan las pulsaciones en blanco
        platosMesas[numMesa].push(platos[numPlato]);
        addOpcionSelect(idMesa, "plato", platos[numPlato]);

        cuentas[numMesa] +=  precios[numPlato];
        cuenta = cuentas[numMesa].toFixed(2) + "€";
        document.getElementById(idCuenta).value = cuenta.replace(".",",");
    }
}

function cambiarMesa(idMesas, idMesa, idCuenta, idCafe, idCopa) {
    var numMesa = document.getElementById(idMesas).selectedIndex;
    var select = document.getElementById(idMesa);

    resetSelectMultiple(idMesa);
    
    for (plato of platosMesas[numMesa]){
        var opcion = document.createElement('option');
        opcion.value = "plato";
        opcion.innerHTML = plato;
        select.appendChild(opcion);
    }

    if(extras[0][numMesa] == 1) {
        document.getElementById(idCafe).checked = true;
    }
    else {
        document.getElementById(idCafe).checked = false;
    }
    if(extras[1][numMesa] == 1) {
        document.getElementById(idCopa).checked = true;
    }
    else {
        document.getElementById(idCopa).checked = false;
    }

    cuenta = cuentas[numMesa].toFixed(2) + "€";
    document.getElementById(idCuenta).value = cuenta.replace(".",",");
}

function modificarExtra(idMesas, idCuenta, idExtra, opcion) {
    var numMesa = document.getElementById(idMesas).selectedIndex;
    if (document.getElementById(idExtra).checked) {
        cuentas[numMesa] += precioExtras[opcion];
        extras[opcion][numMesa] = 1;
    }
    else {
        cuentas[numMesa] -= precioExtras[opcion];
        extras[opcion][numMesa] = 0;
    }
    cuenta = cuentas[numMesa].toFixed(2) + "€";
    document.getElementById(idCuenta).value = cuenta.replace(".",",");
}

function cobrar(idMesas, idMesa, idCafe, idCopa, idCuenta) {
    var numMesa = document.getElementById(idMesas).selectedIndex;
    resetSelectMultiple(idMesa);
    document.getElementById(idCafe).checked = false;
    document.getElementById(idCopa).checked = false;
    document.getElementById(idCuenta).value = "";
    platosMesas[numMesa] = [];
    extras[0][numMesa] = 0;
    extras[1][numMesa] = 0;
    cuentas[numMesa] = 0;
}

function addOpcionSelect(idSelect, valor, contenido) {
    var select = document.getElementById(idSelect);
    var opcion = document.createElement('option');
    opcion.value = valor;
    opcion.innerHTML = contenido;
    select.appendChild(opcion);
}