class Mouse{

    constructor(){
        /* Constructor para manejar las posiciones del mouse.
         seteamos por defecto pero se pueden modificar*/
        this.posX=0.0;
        this.posY=0.0;
        this.vel=0.01;
        this.pressed = false;
    }

    /*SETTERS*/
    setPosX(x){
        this.posX=x;
    }

    setPosY(y){
        this.posY=y;
    }
    /*GETTERS*/
    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }

    getVel(){
        return this.vel;
    }

    pressedOn(){
        this.pressed = true;
    }

    pressedOff(){
        this.pressed = false;
    }

    pressedState(){
        return this.pressed;
    }
}
