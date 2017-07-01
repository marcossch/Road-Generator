class OrbitCamera{

    constructor(){

        //Constructor de la camara orbital.
        this.center = [0.0, 0.0, 0.0];
        this.radius = 130;
        this.phi = 0.6;
        this.theta = 0.3;
    }

    /*SETTERS*/
    setRadius(r){
        this.radius = r;
    }

    setPhi(p){
        this.phi = p;
    }

    setTheta(t){
        this.theta = t;
    }

    /*ADDS*/
    addRadius(r){
        this.radius+=r;
    }

    addTheta(t){
        this.theta += t;
    }

    addPhi(p){
        this.phi += p;
    }

    /*GETTERS*/

    getRadius(){
        return this.radius;
    }

    getPhi(){
        return this.phi;
    }

    getTheta(){
        return this.theta;
    }

    getPosOrbit(){
        var x = this.radius * Math.sin(this.phi) * Math.cos(this.theta);
        var y = this.radius * Math.sin(this.phi) * Math.sin(this.theta);
        var z =this.radius * Math.cos(this.phi);

        return [x,y,z];
    }
}
