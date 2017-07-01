class AutosAnimados {

    constructor(ruta, puntos, factory) {
        this.ruta = ruta;
        this.puntos = puntos;
        this.factory = factory;

        this.autos1 = [];
        this.autos2 = [];
        this.autos3 = [];
        this.autos4 = [];

        this.ruedas1 = [];
        this.ruedas2 = [];
        this.ruedas3 = [];
        this.ruedas4 = [];

        this.posAutos1 = [];
        this.posAutos2 = [];
        this.posAutos3 = [];
        this.posAutos4 = [];

        this.vecPosAutos = null;
        this.arrayMatA = null;

        this.createAutos();

        this.rotacion = 0.0;
        this.count = 0.0;

    }

    createAutos() {

        //creo dos nuevas curvas que se adecuen a los autos
        var puntosAutos = [];
        for (var j = 0; j < this.puntos.length; j++) {
            var vecR = this.puntos[j];
            puntosAutos.push([vecR[0] + 1.9, vecR[1], (vecR[2])]);
        }
        var curvaAutos = new CuadraticBSpline(puntosAutos.length, 0.1, true);

        curvaAutos.setControlPoints(puntosAutos);
        curvaAutos.calculateArrays();

        this.vecPosAutos = curvaAutos.getVecPos();
        this.arrayMatA = curvaAutos.getArrayMatT();

        var random1 = Math.random() * 5;
        var random2 = Math.random() * 5;
        var factorCantAutos = 5.0;
        var ajusteAutosBordes = 5.0;
        var distanciaEntreAutos = 2;
        for (var k = ajusteAutosBordes; k < this.vecPosAutos.length - ajusteAutosBordes - random1 - 10.0; k += factorCantAutos + random1) {

            var i = Math.floor(k);

            //auto 1
            var vec1 = this.vecPosAutos[i];
            var mat1 = this.factory.getMatriz4x4(this.arrayMatA[i]);

            var auto1 = this.factory.createCar(this.ruedas1);
            auto1.translate(vec1[1], vec1[0], vec1[2] - 10);
            auto1.applyMatrix(mat1);
            auto1.rotate(Math.PI / 2, 0.0, 0.0, 1.0);
            auto1.rotate(Math.PI / 2, 0.0, 1.0, 0.0);
            auto1.scale(0.5, 0.5, 0.5);
            this.ruta.add(auto1);
            this.autos1.push(auto1);
            this.posAutos1.push(i);

            //auto 2
            var pos2 = i + 6 + Math.floor(random1);
            var vec2 = this.vecPosAutos[pos2];
            var mat2 = this.factory.getMatriz4x4(this.arrayMatA[pos2]);

            var auto2 = this.factory.createCar(this.ruedas2);
            auto2.translate(vec2[1], vec2[0], vec2[2] - 15);
            auto2.applyMatrix(mat2);
            auto2.rotate(Math.PI / 2, 0.0, 0.0, 1.0);
            auto2.rotate(Math.PI / 2, 0.0, 1.0, 0.0);
            auto2.scale(0.5, 0.5, 0.5);
            this.ruta.add(auto2);
            this.autos2.push(auto2);
            this.posAutos2.push(pos2);

            //auto3
            var vec3 = this.vecPosAutos[i];
            var mat3 = this.factory.getMatriz4x4(this.arrayMatA[i]);

            var auto3 = this.factory.createCar(this.ruedas3);
            auto3.translate(vec3[1], vec3[0], vec3[2] + 10);
            auto3.applyMatrix(mat3);
            auto3.rotate(Math.PI / 2, 0.0, 0.0, 1.0);
            auto3.rotate(-Math.PI / 2, 0.0, 1.0, 0.0);
            auto3.scale(0.5, 0.5, 0.5);
            this.ruta.add(auto3);
            this.autos3.push(auto3);
            this.posAutos3.push(i);

            //auto 4
            var pos4 = i + 6 + Math.floor(random2);
            var vec4 = this.vecPosAutos[pos4];
            var mat4 = this.factory.getMatriz4x4(this.arrayMatA[pos4]);

            var auto4 = this.factory.createCar(this.ruedas4);
            auto4.translate(vec4[1], vec4[0], vec4[2] + 15);
            auto4.applyMatrix(mat4);
            auto4.rotate(Math.PI / 2, 0.0, 0.0, 1.0);
            auto4.rotate(-Math.PI / 2, 0.0, 1.0, 0.0);
            auto4.scale(0.5, 0.5, 0.5);
            this.ruta.add(auto4);
            this.autos4.push(auto4);
            this.posAutos4.push(pos4);

            random1 = Math.random() * 5;
            random2 = Math.random() * 5;

        }
        //si se quiere levantar mas todo solo cambiar esto
        this.ruta.translate(0.0, 20.0, 0.0);

    }


    updateAutos(){

        var largoCurva = 55.0;

        this.count += 0.5;
        this.rotacion += 0.1;

        if (this.count > 1.15){
            this.count = 0.5;
        }
        //0.8 es a la izq en eje x

        if(this.rotacion>2.0){
            this.rotacion = 0.0;
        }

        for (var i = 0; i < this.autos1.length; i++){

            var auto1 = this.autos1[i];
            var auto2 = this.autos2[i];
            var auto3 = this.autos3[i];
            var auto4 = this.autos4[i];

            var rueda1 = this.ruedas1[i];
            var rueda2 = this.ruedas2[i];
            var rueda3 = this.ruedas3[i];
            var rueda4 = this.ruedas4[i];

            this.posAutos1[i] -= Math.floor(this.count);
            this.posAutos2[i] -= Math.floor(this.count);
            this.posAutos3[i] += Math.floor(this.count);
            this.posAutos4[i] += Math.floor(this.count);

            var random = Math.random() * 5;

            if(this.posAutos1[i] < 5.0){
                this.posAutos1[i] = largoCurva;
            }

            if(this.posAutos2[i] <5.0){
                this.posAutos2[i] = largoCurva - Math.floor(random);
            }

            if(this.posAutos3[i] > largoCurva){
                this.posAutos3[i] = 5.0;
            }

            if(this.posAutos4[i] > largoCurva){
                this.posAutos4[i] = 5.0 + Math.floor(random);
            }

            var pos1 = this.posAutos1[i];
            var pos2 = this.posAutos2[i];
            var pos3 = this.posAutos3[i];
            var pos4 = this.posAutos4[i];


            var vec1 = this.vecPosAutos[pos1];
            var vec2 = this.vecPosAutos[pos2];
            var vec3 = this.vecPosAutos[pos3];
            var vec4 = this.vecPosAutos[pos4];

            var mat1 = this.factory.getMatriz4x4(this.arrayMatA[pos1]);
            var mat2 = this.factory.getMatriz4x4(this.arrayMatA[pos2]);
            var mat3 = this.factory.getMatriz4x4(this.arrayMatA[pos3]);
            var mat4 = this.factory.getMatriz4x4(this.arrayMatA[pos4]);

            var angulo = Math.PI * this.rotacion;

            /*ACTUALIZACION AUTO 1*/
            rueda1[0].resetMatrix();
            rueda1[0].translate(2.3, 1.0, 0.0);
            rueda1[0].rotate(-angulo , 0.0, 0.0, 1.0);//
            rueda1[0].translate(-2.3, -1.0, 0.0);
            rueda1[0].translate(0.0, 0.0, -0.2);

            rueda1[1].resetMatrix();
            rueda1[1].translate(2.3, 1.0, 0.0);
            rueda1[1].rotate(-angulo , 0.0, 0.0, 1.0);//
            rueda1[1].translate(-2.3, -1.0, 0.0);
            rueda1[1].translate(0.0, 0.0, 3.7);

            rueda1[2].resetMatrix();
            rueda1[2].translate(9.1, 1.0, 0.0);
            rueda1[2].rotate(-angulo , 0.0, 0.0, 1.0);//
            rueda1[2].translate(-9.1, -1.0, 0.0);
            rueda1[2].translate(0.0, 0.0, -0.2);

            rueda1[3].resetMatrix();
            rueda1[3].translate(9.1, 1.0, 0.0);
            rueda1[3].rotate(-angulo , 0.0, 0.0, 1.0);//
            rueda1[3].translate(-9.1, -1.0, 0.0);
            rueda1[3].translate(0.0, 0.0, 3.7);

            auto1.resetMatrix();
            auto1.translate(vec1[1], vec1[0], vec1[2] - 10);
            auto1.applyMatrix(mat1);
            auto1.rotate(Math.PI / 2, 0.0, 0.0, 1.0);
            auto1.rotate(Math.PI / 2, 0.0, 1.0, 0.0);
            auto1.scale(0.5, 0.5, 0.5);

            /*ACTUALIZACION AUTO 2*/
            rueda2[0].resetMatrix();
            rueda2[0].translate(2.3, 1.0, 0.0);
            rueda2[0].rotate(-angulo , 0.0, 0.0, 1.0);//
            rueda2[0].translate(-2.3, -1.0, 0.0);
            rueda2[0].translate(0.0, 0.0, -0.2);

            rueda2[1].resetMatrix();
            rueda2[1].translate(2.3, 1.0, 0.0);
            rueda2[1].rotate(-angulo , 0.0, 0.0, 1.0);//
            rueda2[1].translate(-2.3, -1.0, 0.0);
            rueda2[1].translate(0.0, 0.0, 3.7);

            rueda2[2].resetMatrix();
            rueda2[2].translate(9.1, 1.0, 0.0);
            rueda2[2].rotate(-angulo , 0.0, 0.0, 1.0);//
            rueda2[2].translate(-9.1, -1.0, 0.0);
            rueda2[2].translate(0.0, 0.0, -0.2);

            rueda2[3].resetMatrix();
            rueda2[3].translate(9.1, 1.0, 0.0);
            rueda2[3].rotate(-angulo , 0.0, 0.0, 1.0);//
            rueda2[3].translate(-9.1, -1.0, 0.0);
            rueda2[3].translate(0.0, 0.0, 3.7);

            auto2.resetMatrix();
            auto2.translate(vec2[1], vec2[0], vec2[2] - 15);
            auto2.applyMatrix(mat2);
            auto2.rotate(Math.PI / 2, 0.0, 0.0, 1.0);
            auto2.rotate(Math.PI / 2, 0.0, 1.0, 0.0);
            auto2.scale(0.5, 0.5, 0.5);

            /*ACTUALIZACION AUTO 3*/
            rueda3[0].resetMatrix();
            rueda3[0].translate(2.3, 1.0, 0.0);
            rueda3[0].rotate(-angulo , 0.0, 0.0, 1.0);//
            rueda3[0].translate(-2.3, -1.0, 0.0);
            rueda3[0].translate(0.0, 0.0, -0.2);

            rueda3[1].resetMatrix();
            rueda3[1].translate(2.3, 1.0, 0.0);
            rueda3[1].rotate(-angulo , 0.0, 0.0, 1.0);//
            rueda3[1].translate(-2.3, -1.0, 0.0);
            rueda3[1].translate(0.0, 0.0, 3.7);

            rueda3[2].resetMatrix();
            rueda3[2].translate(9.1, 1.0, 0.0);
            rueda3[2].rotate(-angulo , 0.0, 0.0, 1.0);//
            rueda3[2].translate(-9.1, -1.0, 0.0);
            rueda3[2].translate(0.0, 0.0, -0.2);

            rueda3[3].resetMatrix();
            rueda3[3].translate(9.1, 1.0, 0.0);
            rueda3[3].rotate(-angulo , 0.0, 0.0, 1.0);//
            rueda3[3].translate(-9.1, -1.0, 0.0);
            rueda3[3].translate(0.0, 0.0, 3.7);

            auto3.resetMatrix();
            auto3.translate(vec3[1], vec3[0], vec3[2] + 10);
            auto3.applyMatrix(mat3);
            auto3.rotate(Math.PI / 2, 0.0, 0.0, 1.0);
            auto3.rotate(-Math.PI / 2, 0.0, 1.0, 0.0);
            auto3.scale(0.5, 0.5, 0.5);

            /*ACTUALIZACION AUTO 4*/
            rueda4[0].resetMatrix();
            rueda4[0].translate(2.3, 1.0, 0.0);
            rueda4[0].rotate(-angulo , 0.0, 0.0, 1.0);//
            rueda4[0].translate(-2.3, -1.0, 0.0);
            rueda4[0].translate(0.0, 0.0, -0.2);

            rueda4[1].resetMatrix();
            rueda4[1].translate(2.3, 1.0, 0.0);
            rueda4[1].rotate(-angulo , 0.0, 0.0, 1.0);//
            rueda4[1].translate(-2.3, -1.0, 0.0);
            rueda4[1].translate(0.0, 0.0, 3.7);

            rueda4[2].resetMatrix();
            rueda4[2].translate(9.1, 1.0, 0.0);
            rueda4[2].rotate(-angulo , 0.0, 0.0, 1.0);//
            rueda4[2].translate(-9.1, -1.0, 0.0);
            rueda4[2].translate(0.0, 0.0, -0.2);

            rueda4[3].resetMatrix();
            rueda4[3].translate(9.1, 1.0, 0.0);
            rueda4[3].rotate(-angulo , 0.0, 0.0, 1.0);//
            rueda4[3].translate(-9.1, -1.0, 0.0);
            rueda4[3].translate(0.0, 0.0, 3.7);

            auto4.resetMatrix();
            auto4.translate(vec4[1], vec4[0], vec4[2] + 15);
            auto4.applyMatrix(mat4);
            auto4.rotate(Math.PI / 2, 0.0, 0.0, 1.0);
            auto4.rotate(-Math.PI / 2, 0.0, 1.0, 0.0);
            auto4.scale(0.5, 0.5, 0.5);
        }

    }

}