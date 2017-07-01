var VEL_MOV = 1.0;

class CameraHandler{

    constructor(){

        //maneja una matriz de vista global CameraMatrix

        //orbital o libre
        this.mode = null;

        freeCam = new FreeCamera([0.0,-1.0,0.0]);
        orbitCam = new OrbitCamera();

        freeCamR = new FreeCamera([-23.0,-5.0,-15.0],0.1,1.2);
        mouse = new Mouse();
    }
    /* ------------------ METODOS COMPARTIDOS/SETTERS -----------------------------------------*/

    updateMatrix() {
        /*Funcion que actualiza la matriz.
         Cada vez que se la llama inicializa la matriz en la identidad
         porque las variables se actualizan por posicion y no por corrimiento.*/

        mat4.identity(CameraMatrix);
        if (this.mode == "orbit") {
            //Solo trasladamos si agrandamos o achicamos el zoom
            var r = -orbitCam.getRadius();
            var vec_1 = vec3.create();
            vec_1 = vec3.fromValues(0.0,0.0,r);
            mat4.translate(CameraMatrix, CameraMatrix, vec_1);

            var p = orbitCam.getPhi();
            var vec_2 = vec3.create();
            vec_2 = vec3.fromValues(1.0, 0.0, 0.0);
            mat4.rotate(CameraMatrix, CameraMatrix, p , vec_2);

            var t = orbitCam.getTheta();
            var vec_3 = vec3.create();
            var vec_3 = vec3.fromValues(0.0, -1.0, 0.0);
            mat4.rotate(CameraMatrix, CameraMatrix, t, vec_3);
        }

        if(this.mode == "free"){

            mat4.scale(CameraMatrix, CameraMatrix, vec4.fromValues(0.5, 0.5, 1.0,1.0));
            var phi = freeCam.getPhi();
            var vec_1 = vec3.fromValues(1.0,0.0,0.0);
            mat4.rotate(CameraMatrix, CameraMatrix, phi, vec_1);

            var theta = freeCam.getTheta();
            var vec_2 = vec3.fromValues(0.0, -1.0, 0.0);
            mat4.rotate(CameraMatrix, CameraMatrix, theta, vec_2);

            var pos = freeCam.getPos();
            mat4.translate(CameraMatrix, CameraMatrix, pos);
        }

        if(this.mode == "freeR"){
            mat4.scale(CameraMatrix, CameraMatrix, vec4.fromValues(0.5, 0.5, 1.0,1.0));
            var phi = freeCamR.getPhi();
            var vec_1 = vec3.fromValues(1.0,0.0,0.0);
            mat4.rotate(CameraMatrix, CameraMatrix, phi, vec_1);

            var theta = freeCamR.getTheta();
            var vec_2 = vec3.fromValues(0.0, -1.0, 0.0);
            mat4.rotate(CameraMatrix, CameraMatrix, theta, vec_2);

            var pos = freeCamR.getPos();
            mat4.translate(CameraMatrix, CameraMatrix, pos);
        }
    }

    setHandler(){
        var body = document.getElementById("my_body");
        var canvas = document.getElementById("my_canvas");

        body.handler = this;
        canvas.handler = this;

        this.setOrbit();
    }

    setOrbit(){

        //asumiendo que el body y canvas estan creados y son globales
        body.onkeydown = this.onKeyDownOrbit;
        canvas.onmousemove = this.onMouseMoveOrbit;
        canvas.onmousedown = this.onMousePressedOrbit;
        canvas.onmouseup = this.onMouseUnpressedOrbit;

        this.mode = "orbit";
        this.updateMatrix();
    }

    setFree(){

        body.onkeydown = this.onKeyDownFree;
        canvas.onmousemove = this.onMouseMoveFree;
        canvas.onmouseup = this.onMouseUnpressedFree;
        canvas.onmousedown = this.onMousePressedFree;

        this.mode = "free";
        this.updateMatrix();
    }

    setFreeR(){

        body.onkeydown = this.onKeyDownFreeR;
        canvas.onmousemove = this.onMouseMoveFreeR;
        canvas.onmouseup = this.onMouseUnpressedFreeR;
        canvas.onmousedown = this.onMousePressedFreeR;

        this.mode = "freeR";
        this.updateMatrix();
    }

    /* ------------------ CAMARA LIBRE CALLE ----------------------------*/

    /*PRESIONAR EL BOTON 1 PARA ENTRAR A LA CAMARA LIBRE CALLE

    CONTROLES:

     */

    onKeyDownFree(e) {
        var theta = freeCam.getTheta();

        switch (e.keyCode) {
            case 87: // W
                freeCam.addPosZ(Math.cos(theta) * VEL_MOV/10);
                freeCam.addPosX(Math.sin(theta) * VEL_MOV/10);
                break;

            case 65: // A
                freeCam.addPosZ(Math.cos(theta + Math.PI/2) * VEL_MOV/10);
                freeCam.addPosX(Math.sin(theta + Math.PI/2) * VEL_MOV/10);
                break;

            case 83: // S
                freeCam.addPosZ(-Math.cos(theta) * VEL_MOV/10);
                freeCam.addPosX(-Math.sin(theta) * VEL_MOV/10);
                break;

            case 68: // D
                freeCam.addPosZ(Math.cos(theta - Math.PI/2) * VEL_MOV/10);
                freeCam.addPosX(Math.sin(theta - Math.PI/2) * VEL_MOV/10);
                break;

            case 81: // Q
                freeCam.addPosY(-VEL_MOV / 10);
                break;
            case 69: //E
                freeCam.addPosY( VEL_MOV / 10);
                break;

            case 50: // 2
                this.handler.setOrbit();
                alert("Camara en modo Orbital");
                break;

            case 51: // 3
                this.handler.setFreeR();
                alert("Camara en modo Libre Ruta");
                break;
        }
        this.handler.updateMatrix();
    }

    onMouseMoveFree(e) {

        if (mouse.pressedState()) {
            var deltaX = mouse.getPosX() - e.clientX;
            var deltaY = mouse.getPosY() - e.clientY;

            mouse.setPosX(e.clientX);
            mouse.setPosY(e.clientY);

            freeCam.addTheta( deltaX * mouse.getVel() );
            freeCam.addPhi( -deltaY * mouse.getVel() );

            if (freeCam.getPhi() < -Math.PI/2) {
                freeCam.setPhi(-Math.PI / 2);
            }

            if (freeCam.getPhi() > Math.PI/2) {
                freeCam.setPhi(Math.PI / 2);
            }
            this.handler.updateMatrix();
        }
    }

    onMousePressedFree(e){
        mouse.setPosX(e.clientX);
        mouse.setPosY(e.clientY);
        mouse.pressedOn();
    }

    onMouseUnpressedFree(e) {
        mouse.pressedOff();
    }


    /* ------------------ CAMARA ORBITAL --------------------------*/

    /* PRESIONAR EL BOTON 2 PARA ENTRAR A LA CAMARA ORBITAL.

    CONTROLES:
        + Para aumentar el zoom.
        - Para disminuir el zoom.
        La camara se mueve con el movimiento del mouse.

     */

    onKeyDownOrbit (e){
        switch (e.keyCode) {

            //Caso en el que + aumenta el zoom
            case 107:

                orbitCam.addRadius(-VEL_MOV);
                if (orbitCam.getRadius() < 0.0){
                    orbitCam.setRadius(0.0);
                }
                this.handler.updateMatrix();
                break;

            case 109:		// '-'
                orbitCam.addRadius(VEL_MOV);
                if (orbitCam.getRadius < 0.0){
                    orbitCam.setRadius(0.0);
                }
                this.handler.updateMatrix();
                break;

            case 49: // 1
                this.handler.setFree();
                alert("Camara en modo Libre Calle");
                break;

            case 51: // 3
                this.handler.setFreeR();
                alert("Camara en modo Libre Ruta");
                break;


        }
    }

    onMouseMoveOrbit(e){
        //Se tiene que mover si el mouse esta apretado
        if (mouse.pressedState()) {

            /*Obtenemos el movimiento en X e Y realizado por el mouse
             restando la posicion anterior(la guardada), con la nueva del mouse*/
            var deltaX = mouse.getPosX() - e.clientX;
            var deltaY = mouse.getPosY() - e.clientY;

            mouse.setPosX(e.clientX);
            mouse.setPosY(e.clientY);

            orbitCam.addTheta(deltaX * mouse.getVel());
            orbitCam.addPhi(-deltaY * mouse.getVel());

            if (orbitCam.getPhi() < -Math.PI/2) {
                orbitCam.setPhi(-Math.PI / 2);
            }

            if (orbitCam.getPhi() > Math.PI/2) {
                orbitCam.setPhi(Math.PI / 2);
            }

            this.handler.updateMatrix();
        }

    }

    onMousePressedOrbit(e){
        mouse.setPosX(e.clientX);
        mouse.setPosY(e.clientY);
        mouse.pressedOn();
    }

    onMouseUnpressedOrbit(e) {
        mouse.pressedOff();
    }

    /* ------------------ CAMARA LIBRE RUTA ----------------------------*/

    /*PRESIONAR EL BOTON 3 PARA ENTRAR A LA CAMARA LIBRE EN LA RUTA

     CONTROLES:

     */

    onKeyDownFreeR(e) {
        var theta = freeCamR.getTheta();

        switch (e.keyCode) {
            case 87: // W
                freeCamR.addPosZ(Math.cos(theta) * VEL_MOV/10);
                freeCamR.addPosX(Math.sin(theta) * VEL_MOV/10);
                break;

            case 65: // A
                freeCamR.addPosZ(Math.cos(theta + Math.PI/2) * VEL_MOV/10);
                freeCamR.addPosX(Math.sin(theta + Math.PI/2) * VEL_MOV/10);
                break;

            case 83: // S
                freeCamR.addPosZ(-Math.cos(theta) * VEL_MOV/10);
                freeCamR.addPosX(-Math.sin(theta) * VEL_MOV/10);
                break;

            case 68: // S
                freeCamR.addPosZ(Math.cos(theta - Math.PI/2) * VEL_MOV/10);
                freeCamR.addPosX(Math.sin(theta - Math.PI/2) * VEL_MOV/10);
                break;
                break;

            case 81: // Q
                freeCamR.addPosY(-VEL_MOV / 10);
                break;
            case 69: //E
                freeCamR.addPosY( VEL_MOV / 10);
                break;

            case 49: // 1
                this.handler.setFree();
                alert("Camara en modo Libre Calle");
                break;

            case 50: // 2
                this.handler.setOrbit();
                alert("Camara en modo Orbital");
                break;
        }
        this.handler.updateMatrix();
    }

    onMouseMoveFreeR(e) {

        if (mouse.pressedState()) {
            var deltaX = mouse.getPosX() - e.clientX;
            var deltaY = mouse.getPosY() - e.clientY;

            mouse.setPosX(e.clientX);
            mouse.setPosY(e.clientY);

            freeCamR.addTheta( deltaX * mouse.getVel() );
            freeCamR.addPhi( -deltaY * mouse.getVel() );

            if (freeCamR.getPhi() < -Math.PI/2) {
                freeCamR.setPhi(-Math.PI / 2);
            }

            if (freeCamR.getPhi() > Math.PI/2) {
                freeCamR.setPhi(Math.PI / 2);
            }
            this.handler.updateMatrix();
        }
    }

    onMousePressedFreeR(e){
        mouse.setPosX(e.clientX);
        mouse.setPosY(e.clientY);
        mouse.pressedOn();
    }

    onMouseUnpressedFreeR(e) {
        mouse.pressedOff();
    }

    /*---------- METODOS EXTRA -------------*/

    getPosition(){

        if(this.mode == "free"){
            return freeCam.getPos();
        }

        else if(this.mode == "freeR"){
            return freeCamR.getPos();
        }

        return orbitCam.getPosOrbit();
    }


}