class FigurasPrimitivas{

    constructor(){
        //
    }


    /*SUPERFICIES DE BARRIDO*/
    /*crea un cuadrado de dimensiones proporcionales a 1x1
    centrado en el origen de coordenadas
     */
    calcularCuadrado(vertices, arrayVecNOR){

        //COMENTARIO: Faltan completar las normales que no se como se llenan, solo se que el eje z va vacio

        //primer vertice
        vertices.push(vec3.fromValues(0.0, 0.0, 0.0));
        var vecNorm1 = vec3.fromValues(0.0, 0.0, 0.0);
        vec3.normalize(vecNorm1, vecNorm1);
        arrayVecNOR.push(vecNorm1);

        vertices.push(vec3.fromValues(1.0, 0.0, 0.0));
        var vecNorm2 = vec3.fromValues(1.0, 0.0, 0.0);
        vec3.normalize(vecNorm2, vecNorm2);
        arrayVecNOR.push(vecNorm2);

        vertices.push(vec3.fromValues(1.0, 0.0, 1.0));
        var vecNorm3 = vec3.fromValues(1.0, 0.0, 1.0);
        vec3.normalize(vecNorm3, vecNorm3);
        arrayVecNOR.push(vecNorm3);

        vertices.push(vec3.fromValues(0.0, 0.0, 1.0));
        var vecNorm4 = vec3.fromValues(0.0, 0.0, 1.0);
        vec3.normalize(vecNorm4, vecNorm4);
        arrayVecNOR.push(vecNorm4);

        //ultimo vertice
        vertices.push(vec3.fromValues(0.0, 0.0, 0.0));
        var vecNorm5 = vec3.fromValues(0.0, 0.0, 0.0);
        vec3.normalize(vecNorm5, vecNorm5);
        arrayVecNOR.push(vecNorm5);

    }


    calcularEstructuraEdificio(vertices, arrayVecNOR, escalado){

        var x = escalado[0];
        var z = escalado[2];
        //primer vertice
        vertices.push(vec3.fromValues(0.0, 0.0, 0.0));
        var vecNorm1 = vec3.fromValues(-1.0, 0.0, -1.0);
        vec3.normalize(vecNorm1, vecNorm1);
        arrayVecNOR.push(vecNorm1);

        vertices.push(vec3.fromValues(0.0, 0.0, z));
        var vecNorm2 = vec3.fromValues(1.0, 0.0, -1.0);
        vec3.normalize(vecNorm2, vecNorm2);
        arrayVecNOR.push(vecNorm2);

        vertices.push(vec3.fromValues(x, 0.0, z));
        var vecNorm3 = vec3.fromValues(1.0, 0.0, 1.0);
        vec3.normalize(vecNorm3, vecNorm3);
        arrayVecNOR.push(vecNorm3);

        vertices.push(vec3.fromValues(x, 0.0, 0.0));
        var vecNorm4 = vec3.fromValues(-1.0, 0.0, 1.0);
        vec3.normalize(vecNorm4, vecNorm4);
        arrayVecNOR.push(vecNorm4);

        //ultimo vertice
        vertices.push(vec3.fromValues(0.0, 0.0, 0.0));
        arrayVecNOR.push(vecNorm1);

    }

    calcularTapaEdificio(vertices, arrayVecNOR, x){

        vertices.push(vec3.fromValues(0.0, 0.0, 0.0));
        var vecNorm1 = vec3.fromValues(0.0, 1.0, 0.0);
        vec3.normalize(vecNorm1, vecNorm1);
        arrayVecNOR.push(vecNorm1);

        vertices.push(vec3.fromValues(x, 0.0, 0.0));
        var vecNorm2 = vec3.fromValues(0.0, 1.0, 0.0);
        vec3.normalize(vecNorm2, vecNorm2);
        arrayVecNOR.push(vecNorm2);


    }


    //crea un circulo centrado en el origen
    calcularCirculo(colms, vertices, arrayVecNOR, radio){

        //longitud maxima de la curva que conforma al circulo
        var len = 1.0;

        for (var j = 0; j < colms; j++) {
            var u = j * len / (colms - 1);
            vertices.push(vec3.fromValues(radio * Math.cos(2 * Math.PI * u), radio * Math.sin(2 * Math.PI * u), 0.0));
            var vecNorm = vec3.fromValues(Math.cos(2 * Math.PI * u), Math.sin(2 * Math.PI * u), 0.0);
            vec3.normalize(vecNorm, vecNorm);
            arrayVecNOR.push(vecNorm);

            //para cuando agreguemos la tangente
            //vec3.fromValues( - Math.sin(2 * Math.PI * u), Math.cos(2 * Math.PI * u), 0.0);


        }

    }

    calcularLinea(vertices, arrayVecNOR){

        vertices.push(vec3.fromValues(0.0, 0.0, 0.0));
        var vecNorm1 = vec3.fromValues(0.0, 0.0, 0.0);
        vec3.normalize(vecNorm1, vecNorm1);
        arrayVecNOR.push(vecNorm1);

        vertices.push(vec3.fromValues(1.0, 0.0, 0.0));
        var vecNorm2 = vec3.fromValues(1.0, 0.0, 0.0);
        vec3.normalize(vecNorm2, vecNorm2);
        arrayVecNOR.push(vecNorm2);

    }

    calcularBaseRuta(vertices, arrayVecNOR){

        //primer vertice
        vertices.push(vec3.fromValues(17.0, -0.5, 0.0));
        var vecNorm1 = vec3.fromValues(1.0, 0.0, 0.0);
        vec3.normalize(vecNorm1, vecNorm1);
        arrayVecNOR.push(vecNorm1);

        vertices.push(vec3.fromValues(17.0, 4.0, 0.0));
        var vecNorm2 = vec3.fromValues(0.0, 1.0, 0.0);
        vec3.normalize(vecNorm2, vecNorm2);
        arrayVecNOR.push(vecNorm2);

        vertices.push(vec3.fromValues(16.0, 4.0, 0.0));
        var vecNorm3 = vec3.fromValues(0.0, 1.0, 0.0);
        vec3.normalize(vecNorm3, vecNorm3);
        arrayVecNOR.push(vecNorm3);

        vertices.push(vec3.fromValues(15.0, 1.0, 0.0));
        var vecNorm4 = vec3.fromValues(-1.0, 1.0, 0.0);
        vec3.normalize(vecNorm4, vecNorm4);
        arrayVecNOR.push(vecNorm4);

        vertices.push(vec3.fromValues(3.0, 1.0, 0.0));
        var vecNorm5 = vec3.fromValues(1.0, 1.0, 0.0);
        vec3.normalize(vecNorm5, vecNorm5);
        arrayVecNOR.push(vecNorm5);

        vertices.push(vec3.fromValues(2.0, 4.0, 0.0));
        var vecNorm6 = vec3.fromValues(0.0, 1.0, 0.0);
        vec3.normalize(vecNorm6, vecNorm6);
        arrayVecNOR.push(vecNorm6);

        vertices.push(vec3.fromValues(-2.0, 4.0, 0.0));
        var vecNorm11 = vec3.fromValues(0.0, 1.0, 0.0);
        vec3.normalize(vecNorm11, vecNorm11);
        arrayVecNOR.push(vecNorm11);

        vertices.push(vec3.fromValues(-3.0, 1.0, 0.0));
        var vecNorm12 = vec3.fromValues(-1.0, 1.0, 0.0);
        vec3.normalize(vecNorm12, vecNorm12);
        arrayVecNOR.push(vecNorm12);

        vertices.push(vec3.fromValues(-15.0, 1.0, 0.0));
        var vecNorm13 = vec3.fromValues(1.0, 1.0, 0.0);
        vec3.normalize(vecNorm13, vecNorm13);
        arrayVecNOR.push(vecNorm13);

        vertices.push(vec3.fromValues(-16.0, 4.0, 0.0));
        var vecNorm14 = vec3.fromValues(0.0, 1.0, 0.0);
        vec3.normalize(vecNorm14, vecNorm14);
        arrayVecNOR.push(vecNorm14);

        vertices.push(vec3.fromValues(-17.0, 4.0, 0.0));
        var vecNorm15 = vec3.fromValues(0.0, 1.0, 0.0);
        vec3.normalize(vecNorm15, vecNorm15);
        arrayVecNOR.push(vecNorm15);

        vertices.push(vec3.fromValues(-17.0, -0.5, 0.0));
        var vecNorm16 = vec3.fromValues(-1.0, 0.0, 0.0);
        vec3.normalize(vecNorm16, vecNorm16);
        arrayVecNOR.push(vecNorm16);

        //ultimo vertice repite el primero vertice
        vertices.push(vec3.fromValues(17.0, -0.5, 0.0));
        var vecNorm17 = vec3.fromValues(1.0, 0.0, 0.0);
        vec3.normalize(vecNorm17, vecNorm17);
        arrayVecNOR.push(vecNorm17);

    }

    calcularAsfaltoRuta(vertices, arrayVecNOR){

        //primer vertice
        vertices.push(vec3.fromValues(16.8, 0.0, 0.0));
        var vecNorm1 = vec3.fromValues(1.0, 0.0, 0.0);
        vec3.normalize(vecNorm1, vecNorm1);
        arrayVecNOR.push(vecNorm1);

        vertices.push(vec3.fromValues(16.8, 2.0, 0.0));
        var vecNorm2 = vec3.fromValues(0.0, 1.0, 0.0);
        vec3.normalize(vecNorm2, vecNorm2);
        arrayVecNOR.push(vecNorm2);

        // vertices.push(vec3.fromValues(1.2, 2.0, 0.0));
        // var vecNorm3 = vec3.fromValues(-1.0, 1.0, 0.0);
        // vec3.normalize(vecNorm3, vecNorm3);
        // arrayVecNOR.push(vecNorm3);

        // vertices.push(vec3.fromValues(1.2, 0.1, 0.0));
        // var vecNorm4 = vec3.fromValues(-1.0, 1.0, 0.0);
        // vec3.normalize(vecNorm4, vecNorm4);
        // arrayVecNOR.push(vecNorm4);
        //
        // vertices.push(vec3.fromValues(-1.2, 0.1, 0.0));
        // var vecNorm5 = vec3.fromValues(1.0, 1.0, 0.0);
        // vec3.normalize(vecNorm5, vecNorm5);
        // arrayVecNOR.push(vecNorm5);

        // vertices.push(vec3.fromValues(-1.2, 2.0, 0.0));
        // var vecNorm6 = vec3.fromValues(1.0, 1.0, 0.0);
        // vec3.normalize(vecNorm6, vecNorm6);
        // arrayVecNOR.push(vecNorm6);

        vertices.push(vec3.fromValues(-16.8, 2.0, 0.0));
        var vecNorm7 = vec3.fromValues(0.0, 1.0, 0.0);
        vec3.normalize(vecNorm7, vecNorm7);
        arrayVecNOR.push(vecNorm7);

        vertices.push(vec3.fromValues(-16.8, 0.0, 0.0));
        var vecNorm8 = vec3.fromValues(-1.0, 0.0, 0.0);
        vec3.normalize(vecNorm8, vecNorm8);
        arrayVecNOR.push(vecNorm8);

        //ultimo punto que es el primero repetido
        vertices.push(vec3.fromValues(16.8, 0.0, 0.0));
        var vecNorm9 = vec3.fromValues(1.0, 0.0, 0.0);
        vec3.normalize(vecNorm9, vecNorm9);
        arrayVecNOR.push(vecNorm9);

    }

    calcularCalle(vertices, arrayVecNOR, x) {

        vertices.push(vec3.fromValues(0.0, 0.0, 0.0));
        var vecNorm1 = vec3.fromValues(0.0, 1.0, 0.0);
        vec3.normalize(vecNorm1, vecNorm1);
        arrayVecNOR.push(vecNorm1);

        vertices.push(vec3.fromValues(x, 0.0, 0.0));
        var vecNorm2 = vec3.fromValues(0.0, 1.0, 0.0);
        vec3.normalize(vecNorm2, vecNorm2);
        arrayVecNOR.push(vecNorm2);
    }

    calcularTecho(vertices,arrayVecNOR){

        var x0= 0.0;
        var x1= 1.0;
        var x2= 7.0;
        var x3= 11.0;
        var r= 1.0;
        var y1= 1.0;
        var y2= 2.0;
        var y3= 2.5;
        var y4=3.5;

        vertices.push(vec3.fromValues(x0, y3,0.0));
        var vecNorm1 = vec3.fromValues(-1.0, -1.0, 0.0);
        vec3.normalize(vecNorm1, vecNorm1);
        arrayVecNOR.push(vecNorm1);

        vertices.push(vec3.fromValues(x2, y3,0.0));
        var vecNorm2 = vec3.fromValues(1.0, -1.0, 0.0);
        vec3.normalize(vecNorm2, vecNorm2);
        arrayVecNOR.push(vecNorm2);

        vertices.push(vec3.fromValues(x2-1.0, y4,0.0));
        var vecNorm3 = vec3.fromValues(6.0, 3.5, 0.0);
        vec3.normalize(vecNorm3, vecNorm3);
        arrayVecNOR.push(vecNorm3);

        vertices.push(vec3.fromValues(x1+(2*r), y4,0.0));
        var vecNorm4 = vec3.fromValues(-3.0, 3.5, 0.0);
        vec3.normalize(vecNorm4, vecNorm4);
        arrayVecNOR.push(vecNorm4);

        vertices.push(vec3.fromValues(x1+(r), y4-0.5,0.0));
        var vecNorm4 = vec3.fromValues(-2.0, 3.0, 0.0);
        vec3.normalize(vecNorm4, vecNorm4);
        arrayVecNOR.push(vecNorm4);

        vertices.push(vec3.fromValues(x0, y3,0.0));
        arrayVecNOR.push(vecNorm1);

    }

    calcularCarroceria(vertices,arrayVecNOR){

        var x0= 0.0;
        var x1= 1.0;
        var x2= 7.0;
        var x3= 11.0;
        var r= 1.0;
        var y1= 1.0;
        var y2= 2.0;
        var y3= 2.5;
        var y4 = 3.5;

        /*Declaro los puntos de la carroceria del auto
        arrancando por el vertice inferior izquierdo, y avanzando
        en x hasta la trompa del auto*/
        vertices.push(vec3.fromValues(x0, y1, 0.0));
        var vecNorm1 = vec3.fromValues(-1.0, -1.0, 0.0);
        vec3.normalize(vecNorm1, vecNorm1);
        arrayVecNOR.push(vecNorm1);

        //this.createBaseRueda(x1,y1,r,vertices,arrayVecNOR);

        /*vertices.push(vec3.fromValues(x2, y1, 0.0));
        var vecNorm2 = vec3.fromValues(0.0, -1.0, 0.0);
        vec3.normalize(vecNorm2, vecNorm2);
        arrayVecNOR.push(vecNorm2);
        */

        //this.createBaseRueda(x2,y1,r,vertices,arrayVecNOR);

        vertices.push(vec3.fromValues(x3, y1, 0.0));
        var vecNorm3 = vec3.fromValues(1.0, -1.0, 0.0);
        vec3.normalize(vecNorm3, vecNorm3);
        arrayVecNOR.push(vecNorm3);

        vertices.push(vec3.fromValues(x3, y2, 0.0));
        var vecNorm4 = vec3.fromValues(1.0, 1.0, 0.0);
        vec3.normalize(vecNorm4, vecNorm4);
        arrayVecNOR.push(vecNorm4);

        vertices.push(vec3.fromValues(x2, y3, 0.0));
        var vecNorm5 = vec3.fromValues(0.0, 1.0, 0.0);
        vec3.normalize(vecNorm5, vecNorm5);
        arrayVecNOR.push(vecNorm5);

        vertices.push(vec3.fromValues(x2-1.0, y4,0.0));
        var vecNorm8 = vec3.fromValues(6.0, 3.5, 0.0);
        vec3.normalize(vecNorm8, vecNorm8);
        arrayVecNOR.push(vecNorm8);

        vertices.push(vec3.fromValues(x1+(2*r), y4,0.0));
        var vecNorm9 = vec3.fromValues(-3.0, 3.5, 0.0);
        vec3.normalize(vecNorm9, vecNorm9);
        arrayVecNOR.push(vecNorm9);

        vertices.push(vec3.fromValues(x1+(r), y4-0.5,0.0));
        var vecNorm10 = vec3.fromValues(-2.0, 3.0, 0.0);
        vec3.normalize(vecNorm10, vecNorm10);
        arrayVecNOR.push(vecNorm10);

        vertices.push(vec3.fromValues(x0, y3, 0.0));
        var vecNorm6 = vec3.fromValues(-1.0, 1.0, 0.0);
        vec3.normalize(vecNorm6, vecNorm6);
        arrayVecNOR.push(vecNorm6);

        //ultimo vertice
        vertices.push(vec3.fromValues(x0, y1, 0.0));
        var vecNorm7 = vec3.fromValues(-1.0,-1.0, 0.0);
        vec3.normalize(vecNorm7, vecNorm7);
        arrayVecNOR.push(vecNorm7);

    }

    createBaseRueda(x,y,r,vertices, arrayVecNOR){
        /*Funcion auxiliar para crear la cabidad de la rueda.
        * @X es el x apartir del cual dibujamos
        * @Y es el y a partir del cual dibujamos
        * @r es el radio
        * @esRueda es un bool para saber si es la rueda o la cabidad*/

        var cantPuntos = 1;
        var total = 0.0;

        for (var j = -cantPuntos; j <= total; j+=0.2) {
            var u = (j * Math.PI);
            var c = Math.cos(u);
            var s = Math.sin(u);
            var vec = vec3.fromValues( (x+r) + (r*c) , y + Math.abs(r*s) , 0.0);
            vertices.push(vec);

            var vecNorm = vec3.fromValues(c/c, 0.0, s/s);
            vec3.normalize(vecNorm, vecNorm);
            arrayVecNOR.push(vecNorm);
            // Esto agrega 6 puntos puntos
        }
    }

    createRueda(vertices,arrayVecNOR,escalado){
        /*Escalado es un vector que tiene los dos primeros datos
         con las posiciones, y el tercero con el radio.
         */
        var x = escalado[0];
        var y = escalado[1];
        var r = escalado[2];


        for (var j = 0; j <= 2; j+=0.2) {

            var u = (j * Math.PI);

            var vec = vec3.fromValues( x + (r*Math.cos(u)) , y + r*Math.sin(u) , 0.0);
            vertices.push(vec);

            var vecNorm = vec3.fromValues(255,255,255);
            vec3.normalize(vecNorm, vecNorm);
            arrayVecNOR.push(vecNorm);
        }

    }

    calcularVereda(vertices, arrayVecNOR){

        vertices.push(vec3.fromValues(2.0, 0.0, 0.0));
        var vecNorm1 = vec3.fromValues(-1.0, 0.0, 0.0);
        vec3.normalize(vecNorm1, vecNorm1);
        arrayVecNOR.push(vecNorm1);

        this.calcularCurvaEsquina(vertices,arrayVecNOR, 18.0, 2.0, 1);

        this.calcularCurvaEsquina(vertices,arrayVecNOR, 18.0, 18.0, 2);

        this.calcularCurvaEsquina(vertices,arrayVecNOR, 2.0, 18.0,3);

        this.calcularCurvaEsquina(vertices, arrayVecNOR, 2.0, 2.0, 4);

        vertices.push(vec3.fromValues(2.0, 0.0, 0.0));
        arrayVecNOR.push(vecNorm1);

    }

    calcularCurvaEsquina(vertices,arrayVecNOR, x,z, control){
        /* el parametro control es un parametro para saber que esquina debe dibujar*/

        var r=2.0;

        if(control == 1){
            var j= 1.5;
            var max = 2.0;
        }
        if (control == 2){
            var j = 0.0;
            var max =0.5;
        }
        if(control == 3){
            var j = 0.5;
            var max = 1.0;
        }
        if(control == 4){
            var j = 1;
            var max = 1.5;
        }

        for (j; j <= max; j+=0.1) {

            var u = (j * Math.PI);
            var c = Math.cos(u);
            var s = Math.sin(u);
            var vec = vec3.fromValues( x + (r*c) ,0.0, z + (r*s));
            vertices.push(vec);

            var vecNorm = vec3.fromValues(-s, 0.0, c );
            vec3.normalize(vecNorm, vecNorm);
            arrayVecNOR.push(vecNorm);
        }
        //Entran 6 puntos

    }

    calcularEscena(vertices, arrayVecNOR, x) {

        vertices.push(vec3.fromValues(0.0, 0.0, 0.0));
        var vecNorm1 = vec3.fromValues(0.0, -1.0, 0.0);
        vec3.normalize(vecNorm1, vecNorm1);
        arrayVecNOR.push(vecNorm1);

        vertices.push(vec3.fromValues(x, 0.0, 0.0));
        var vecNorm2 = vec3.fromValues(0.0, -1.0, 0.0);
        vec3.normalize(vecNorm2, vecNorm2);
        arrayVecNOR.push(vecNorm2);
    }

    /*SUPERFICIES DE REVOLUCION*/

    calcularColumna(arrayVecPos, ejeRotacion, arrayVecNor){

        ejeRotacion.push(vec3.fromValues(0.0,1.0,0.0));

        arrayVecPos.push(vec3.fromValues(2.5,2.0,0.0));
        arrayVecPos.push(vec3.fromValues(2.5,17.0,0.0));

        arrayVecNor.push(vec3.fromValues(1.0,0.5,0.0));
        arrayVecNor.push(vec3.fromValues(1.0,0.0,0.0));

    }

    calcularBaseColumna(rows, arrayVecPos, ejeRotacion, arrayVecNor) {

        ejeRotacion.push(vec3.fromValues(0.0, 1.0, 0.0));

        arrayVecPos.push(vec3.fromValues(6.0,0.0,0.0) );
        arrayVecPos.push(vec3.fromValues(5.9,0.5,0.0) );
        arrayVecPos.push(vec3.fromValues(5.7,1.0,0.0) );
        arrayVecPos.push(vec3.fromValues(5.3,1.4,0.0) );
        arrayVecPos.push(vec3.fromValues(4.9,1.65,0.0) );
        arrayVecPos.push(vec3.fromValues(4.3,1.80,0.0)  );
        arrayVecPos.push(vec3.fromValues(3.5,1.9,0.0) );
        arrayVecPos.push(vec3.fromValues(2.5,2.0,0.0) );


        arrayVecNor.push(vec3.fromValues(1.0,0.0,0.0) );
        arrayVecNor.push(vec3.fromValues(0.99,0.08,0.0) );
        arrayVecNor.push(vec3.fromValues(0.98,0.17,0.0) );
        arrayVecNor.push(vec3.fromValues(0.96,0.25,0.0) );
        arrayVecNor.push(vec3.fromValues(0.94,0.32,0.0) );
        arrayVecNor.push(vec3.fromValues(0.92,0.39,0.0) );
        arrayVecNor.push(vec3.fromValues(0.88,0.48,0.0) );
        arrayVecNor.push(vec3.fromValues(0.78,0.62,0.0));
    }

    calcularTapaColumna(arrayVecPos, ejeRotacion, arrayVecNor){

        ejeRotacion.push( vec3.fromValues(0.0,1.0,0.0) );

        arrayVecPos.push(vec3.fromValues(2.5,17.0,0.0));
        arrayVecPos.push(vec3.fromValues(7.0,19.0,0.0));
        arrayVecPos.push(vec3.fromValues(7.0,20.0,0.0));

        arrayVecNor.push(vec3.fromValues(0.15,0.99,0.0));
        arrayVecNor.push(vec3.fromValues(0.35,0.93,0.0));
        arrayVecNor.push(vec3.fromValues(0.33,0.94,0.0));
    }

}
