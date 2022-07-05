/*
Patron modulo es una funcion anonima
Forma tradicional
(function() {

})();

Forma simplificada con lambda
(() => {

})();


*/
const miModulo = (() => {
    'use strict'

    let deck         = [];
    const tipos      = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    // Refrencias HTML

    const btnPedir = document.querySelector( '#btnPedir' ),
          btnDetener = document.querySelector( '#btnDetener' ),
          btnNuevo = document.querySelector( '#btnNuevo' );

    // Imprimir el btn para estar segudro de donde esta
    // console.log( btnPedir );
    const divCartasJugadores = document.querySelectorAll( '.divCartas' ),
          contadorHTML = document.querySelectorAll( 'small' );

    // Esta funcion iniciliza el juego
    // inicia;iza una constante llamada inicializarJuego que sera iual al parametro numero de jugadores igual a 2, que realizara la funcion
    const inicializarJuego = ( numJugadores = 2 ) => {
        // deck que es igual a la funcion crear deck
        deck = crearDeck();
        // LLama a la variable punto de jugadore para que todo vuelva a cero
        puntosJugadores = [];
        // para iniciar el bulce for, la variable i es igual a 0, miestras i sea menor al parametro numero de jugadores, aumentar la variable i de uno en uno
        for ( let i = 0; i < numJugadores; i++ ) {
            // puntos de jugadores, agregagara 0
            puntosJugadores.push(0);
        }
        // Contador html crea un bucle por cada elemento del contadorHTML aniadira 0 en su texto al iniciar
        contadorHTML.forEach( elem => elem.innerText = 0 );
        // DivcartaJugadores crea un bucle por cada elemento del DivcartaJugadores aniadira 0 en su texto al iniciar
        divCartasJugadores.forEach( elem => elem.innerText = '' );

        // btnPedir se desabilitara si es falso, pero como inicia se habilita el boton
        btnPedir.disabled   = false;
        // btnDetener se desabilitara si es falso, pero como inicia se habilita el boton
        btnDetener.disabled = false;
    }

    // Esta funcion crea un nuvo Deck
    const crearDeck = () => {

        // Reinicializar el deck
        deck = [];
        // para iniciar el bulce for, la variable i es igual a 2, miestras i sea menor o igual a 10, aumentar la variable i de uno en uno
        for( let i = 2; i <= 10; i++ ) {
            // para iniciar el bulce for, se creara una variable llamada tipo por cada indice del arreglo tipo que aumentara de uno en uno
            for( let tipo of tipos ) {
                // deck.push es igual la variable i mas tipo( o sea, el numero mas la letra de la carta)
                deck.push( i + tipo );
            }
        }

        // para iniciar el bulce for, se creara una variable llamada tipo por cada indice del arreglo tipo que aunmentara de uno en uno
        for( let tipo of tipos ) {
            // para iniciar el bulce for, se creara una variable llamada esp por cada indice del arreglo especiales  que aumentara de uno en uno
            for( let esp of especiales ) {
                // deck.push es igual la variable i mas tipo( o sea, J,K o Q mas la letra de la carta)
                deck.push( esp + tipo );
            }
        }
        // Retorna el deck
        return _.shuffle( deck );
    }

    // Esta funcion me permite tomar una carta
    // La funcion constante perdir carta es igual a un parametro que si es verdad realaizara lo siguiente
    const pedirCarta = () => {
        // si el largo del deck es igual el numero cero
        if( deck.length === 0 ) {
            // Alertara de que no hay carta en el deck
            throw 'No hay carta en el deck'; // El throw muestra error en consola
        }
        // returnara la funicon de con su ultimo elemento de su arreglo
        return deck.pop(); // EL metodo pop. elimina y reglasa el ultimo elemento de un arreglo
    }

    // Funncion que sirve para obtener el valor de la carta
    const valorCarta = ( carta ) => {

        const valor = carta.substring( 0, carta.length -1 );
        return ( isNaN(valor) ) ?
            ( valor === 'A' ) ? 11 : 10
            : valor * 1;
    }

    // turno: 0 es igual a primer jugador y el el ultimo sera la computadora
    const acumularPuntos = ( carta, turno ) => {

        // Puntos jugadores tiene el parametro tuno, que va a ser igual a puntod de jugador + valor de la carta, el cual tiene el parametro carta
        puntosJugadores[ turno ] = puntosJugadores[ turno ]  + valorCarta( carta );
        // CondorHTML teine el parametro turno, que en texto a a devolver el parametro turno de la variable puntosjugadores
        contadorHTML[ turno ].innerText = puntosJugadores[ turno ];
        //retornara el parametro turno de la variable puntos jugadores
        return puntosJugadores[ turno ]; // Estos son los puntos acumuladors que va a retornar
    }

    const crearCarta = ( carta, turno ) => {
        // La constante imgCarta es igual DOM mas la funcion de crear un elemento, en este caso un img
        const imgCarta = document.createElement( 'img' );
         // imgCart mas el metodo src es igual al link donde estan las cartas guardadas, mas la funcion carta
        imgCarta.src = `assets/cartas/${ carta }.png`;
         // imgCarta.classList. trannsforma la variable unca clase de lista que agrega las funciones de styles.css a las imagenes selecionadas por la funcion cartar
        imgCarta.classList.add( 'carta' ); // Esta es la clase carta del css
        // Divcartar jugadore tiene el parametro turno que agrega la img carta 
        divCartasJugadores[ turno ].append( imgCarta );
    }

    // Determonar ganador es igual a una funcion de flecha quea hara:
    const determinarGanador = () => {
        // Desestructiuracion de arreglos es un constatnte que tiene puntosminimos y puntos computador es igual a puntosjugadores
        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;
        // Settimeoy en una funcion que hace un callbak y lo regresa en un tiempo que se asignemos
        setTimeout(() => {
            // Si puntosComputadora es igual a puntosMinimos
                if( puntosComputadora === puntosMinimos ){
                    // Haz una alerta de que nadie gana
                    alert( 'Nadie Gana' );
                // Si puntosMinimos es mayor a 21
                } else if( puntosMinimos > 21 ) {
                    // Haz una alerta de que nadie gana
                    alert( 'Computadora Gana' );
                // Si puntosComputador es mayor a 21
                } else if( puntosComputadora > 21 ) {
                    // Haz una alerta de que Jugador gana
                    alert( 'Jugador Gana' );
                //Sino
                } else {
                    // Haz una alerta de que Computadora gana
                    alert( 'Computadora Gana' );
                }
        }, 100);
    }


    // Turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {

        let puntosComputadora = 0;
        do{
            // Creo la constante carta que es igual a la funcion pedir carta
            const carta = pedirCarta();
            //puntos computadora es igual a los parametros carta y posicion -1 de puntosjugadors que es la ultima(computadora simepre sera la ultima)
            puntosComputadora = acumularPuntos( carta, puntosJugadores.length -1 );
            //LLamoa a la fucnion carat, el cual tendra los parametros carta y el turno del computador
            crearCarta( carta, puntosJugadores.length -1 );

            // Si puntos minimos es mayor a 21
            if( puntosMinimos > 21 ) {
                // termina el ciclo
                break;
            }

        // Mintras puntosComputadora sea menor a puntosMinimos y puntos Minimos sea menor o igual a 21, Ejecuta el do
        } while( (puntosComputadora < puntosMinimos) && ( puntosMinimos <=21 ) );

        determinarGanador();
    }

    // EVENTOS
    // Callback es una funcion dentro de un evento
    // Cunado la varible btnPedir cumple con el parametro click, hara un callback
    btnPedir.addEventListener( 'click', function () {
        // Creo la constante carta que es igual a la funcion pedir carta
        const carta = pedirCarta();
        // Creo la constante puntosjugador que sera igual a la funcion acumlular puntos que tiene los parametros carta y 0
        const puntosJugador = acumularPuntos( carta, 0 );
        // LLamamos a la funcion carta que tendra el parametro carta y la posicion del jugador
        crearCarta( carta, 0  );
        
        // LOGICA
        
        // Si la variable puntosJugador es mayor a 21
        if ( puntosJugador > 21 ) {
            // Imprime en consola una adeveretncia de que perdio.
            console.warn( 'Lo siento, perdiste' );
            // Ademas desabilita el boton btnPedir si la condicion es verdad
            btnPedir.disabled = true; 
            // Esto desabilita el boton una vez que el jugador perdio
            btnDetener.disabled = true;
            // Enviamos turno de computadora como un argumento a la funcion turnoComputadora drento de la funcion turnoJugador
            turnoComputadora( puntosJugador );
        // Sino si puntosJugador es igual a valor 21
        } else if( puntosJugador === 21 ) {
            // imprime una advertencia de que gano
            console.warn( '21, GANASTE' );
            // Ademas desabilita el boton btnPedir si la condicion es verdad
            btnPedir.disabled = true; 
            // Esto desabilita el boton detner una vez que ya ha sido tocado
            btnDetener.disabled = true;
            // Enviamos turno de computadora como un argumento a la funcion turnoComputadora drento de la funcion turnoJugador
            turnoComputadora( puntosJugador );
        };
    } )


    // Boton Deterner
    // btnDetener ,as el metodo crear un evento tiene el cparametro 'click', que a su vez realiza la funcion
    btnDetener.addEventListener( 'click', () => {

        // Desabilitar el boton pedir si es verdad que han hehco en el btnDetener clic
        btnPedir.disabled   = true;
        // Desabilitar el boton detener si es verdad que han hehco en el btnDetener clic
        btnDetener.disabled = true;
        
        // LLamo a la funcion puntos jugador para que la computadora juegue
        turnoComputadora( puntosJugadores[0] );
    })

    // Boton Nuevo Juego
    //BtnNuevo crea un evento donde si hacen clic realiza un callbaak de
    // btnNuevo.addEventListener( 'click', () => {
    //     // Crear el deck
    //     inicializarJuego();
    // });

    // Este return, retorna una funcion que es publica
    return {
        nuevoJuego: inicializarJuego
    };


})();



