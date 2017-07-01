class CuadraticBezier{

    constructor(rows, step = 1.0, normalPath = true){
        this.step = step;
        this.control_points = null;
        this.num_control_points = null;
        this.arrayMatT = [];
        this.vecPos = [];
        this.rows = rows;
        this.normalPath = normalPath;
    }

    getLength() {
        return this.num_control_points-2;
    }

// Inicializa los parámetros (interpola por defecto, curva abierta)
// recive un array de puntos de control, conteniendo vec3s
    setControlPoints(points) {
        if (points.length != this.rows){
            console.log("cantidad de puntos invalida, tiene que ser igual que las filas\n");
        }
        if (points.length < 3){
            console.log("insuficiente cantidad de puntos de control para armar una Bezier cuadratica\n");
        }
        if(points.length%3 !=0){
            console.log("cantidad de puntos incorrecta, Bezier recibe multiplos de 3 \n");
        }
        this.control_points = points;
        this.num_control_points = points.length;
    }

    calculateArrays(){
        var tramos = Math.floor(this.rows/3);

        for(var i = 0.0; i < tramos ; i += this.step){
            //se cargan todas las matrices y vectores

            //var u = i * this.getLength() / ((this.rows) - 1);

            var vec = this.getVecAtU(i);
            this.vecPos.push(vec);


            var mat = this.getMatAtU(i);

            this.arrayMatT.push(mat);
        }

    }

    getVecAtU(u){

        var entero = Math.floor(u);
        var t = u - entero;
        var aux= 3*entero;
        //si es el ultimo punto
       if (u >= this.getLength()){
            aux = this.getLength()-1;
            t = 1;
        }
        var p1 = this.control_points[aux];
        var p2 = this.control_points[aux+1];
        var p3 = this.control_points[aux+2];

        // console.log(p1);
        // console.log(p2);
        // console.log(p3);

        return this.interpolar(p1, p2, p3, t);
    }

    interpolar(p1, p2, p3, t){
        var aux = vec3.fromValues(0.0, 0.0, 0.0);
        var base1 = ((1-t)*(1-t));
        var base2 = ((2*t)*(1-t));
        var base3 = (t*t);

        vec3.scaleAndAdd(aux, aux, p1, base1);
        vec3.scaleAndAdd(aux, aux, p2, base2);
        vec3.scaleAndAdd(aux, aux, p3, base3);
        return aux;
    }

    getMatAtU(u){

        //obtenemos primero el vector tangente a traves de la derivada
        var vecTang = this.getTangAtU(u);

        //con el producto vectorial del tangente con (0,0,1) obtenemos el normal
        var vecNorm = this.getNormAtU(u, vecTang);

        //calculamos el vector binormal como el producto entre el normal y tangente
        var vecBinorm = vec3.create();
        vec3.cross(vecBinorm, vecTang, vecNorm);

        //normalizamos los 3 vectores
        vec3.normalize(vecBinorm, vecBinorm);
        vec3.normalize(vecTang, vecTang);
        vec3.normalize(vecNorm, vecNorm);

        //armamos la matriz de transformacion con los 3 vectores
        var matRotacion = mat3.create();
        if (this.normalPath == true) {

            // matRotacion = [ vecNorm[0], vecNorm[1], vecNorm[2],
            //     vecBinorm[0], vecBinorm[1], vecBinorm[2],
            //     vecTang[0], vecTang[1], vecTang[2] ];

            for (var j = 0; j < 3; j++) {
                matRotacion[j + 0] = vecBinorm[j];
                matRotacion[j + 3] = vecNorm[j];
                matRotacion[j + 6] = vecTang[j];
            }
        }
        else{
            mat3.identity((matRotacion));
        }

        return matRotacion;
    }

    getTangAtU(u){


        /* EN CASO DE PROBLEMA VER EL CONTROL EN LAS PUNTAS
         SI LOS PUNTOS SON IGUALES HAY QUE DEFINIR EL (0,0,0) */
        var entero = Math.floor(u);
        var t = u - entero;
        var aux= 3*entero;
        //si es el ultimo punto
        if (u >= this.getLength()){
            aux = this.getLength()-1;
            t = 1;
        }
        var p1 = this.control_points[aux];
        var p2 = this.control_points[aux+1];
        var p3 = this.control_points[aux+2];

        return this.interpolarDeriv(p1, p2, p3, t);

    }

    interpolarDeriv(p1, p2, p3, t){
        var aux = vec3.fromValues(0.0, 0.0, 0.0);

        var base1 = ((-2)*(1 -t));
        var base2 = ((2*(1-t)) - (2*t));
        var base3 = (2*t);

        vec3.scaleAndAdd(aux, aux, p1, base1);
        vec3.scaleAndAdd(aux, aux, p2, base2);
        vec3.scaleAndAdd(aux, aux, p3, base3);
        return aux;
    }

    getNormAtU(u,vecTang){

        var vecNorm = vec3.create();
        var vecBinorm = vec3.fromValues(0.0, 0.0, 1.0);

        vec3.cross(vecNorm, vecBinorm, vecTang);
        return vecNorm;
    }

    getArrayMatT(){
        return this.arrayMatT;
    }

    getVecPos(){
        return this.vecPos;
    }

}
