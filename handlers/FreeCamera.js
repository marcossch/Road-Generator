class FreeCamera{

    //recive una lista con las 3 coordenadas de la posicion inicial
    constructor(init_pos,p=0.0,t=0.0){

        this.pos = init_pos; //Posicion inicial del observador
        this.phi = p;     //Angulo en xy que indica si mira para arriba o para abajo.
        this.theta = t;
    }

    /* GETTERS */
    getPhi(){
        return this.phi;
    }

    getTheta(){
        return this.theta;
    }

    getPos(){
        return this.pos;
    }

    /* ADDS */

    addPosX(x){
        var aux = this.pos[0];
        aux += x;
        this.pos[0] = aux;
    }

    addPosY(y){
        var aux = this.pos[1];
        aux += y;
        this.pos[1] = aux;
    }

    addPosZ(z){
        var aux = this.pos[2];
        aux += z;
        this.pos[2]= aux;
    }

    addTheta(t){
        this.theta += t;
    }

    addPhi(p){
        this.phi += p;
    }

    /* SETTERS */

    setTheta(t){
        this.theta = t;
    }

    setPhi(p){
        this.phi = p;
    }

}