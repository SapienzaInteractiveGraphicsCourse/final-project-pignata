import * as THREE from '../resources/three/build/three.module.js';
import {Player} from "./Player.js"


export class OldSpaceShip extends Player {
    constructor(model) {
        super(model)
        this.model = model;
        this.cam =  model.getObjectByName("shipCam");
        this.lights = model.getObjectByName("shipLights");

        this.lights.children[1].visible = true;
        this.lights.children[1].intensity = 0.0;
        this.lights.children[0].intensity = 10.0;

        this.engine = false;
        this.gear = 4,
        this.speed = [-0.2, -0.1, -0.05, -0.01, 0, 0.01, 0.05, 0.1, 0.2]

        this.rolling = 0;
        this.pitching = 0;
        this.camAngle = 0;

        this.fw = new THREE.Vector3();  // Flip Axis of Rotation
        this.u = new THREE.Vector3();
        this.w = new THREE.Vector3();   // Incline Axis of Rotation
        this.ray = new THREE.Raycaster();
        this.updateAxis();

        this.collision = false;
        this.landing = false;
    }

    updateAxis() {
        var front = new THREE.Vector3();
        var back = new THREE.Vector3();
        var left = new THREE.Vector3();
        var right = new THREE.Vector3();

        this.lights.getObjectByName("frontLight").getWorldPosition(front);
        this.lights.getObjectByName("engineLight").getWorldPosition(back);
        this.lights.getObjectByName("leftLight").getWorldPosition(left);
        this.lights.getObjectByName("rightLight").getWorldPosition(right);

        this.fw = front.clone().add(back.negate()).normalize();
        this.w = right.clone().add(left.negate()).normalize();
        this.u.crossVectors(this.w,this.fw);
        this.ray.set(front,this.fw);
    }
    checkCollision(cast){
        if((typeof cast !== 'undefined')&&(cast.distance <2)&&(!this.collision)){
            console.log("Collision Detected");
            this.collision = true;
            this.gear = 4;
            this.lights.children[1].intensity = this.engine;
        }
        else if((typeof cast !== 'undefined')&&(cast.distance >2)&&(this.collision)){
            this.collision = false;
        }
    }

    land() {
        if (this.engine) {
            if (this.landed){
                this.model.translateOnAxis(this.u,2);
                this.landed = false;
            }

            else{
                var p = new THREE.Vector3();
                this.model.getWorldPosition(p);
                const d = p.length() - 10;

                if (d<3){
                    const phi = p.angleTo(this.u);
                    this.model.rotateOnWorldAxis(this.w,phi);
                    this.model.translateOnAxis(this.u.negate(),d);
                    this.ssEngine();
                    this.landed = true;
                }
                else console.log("Too far for landing: ",d);
            }
        }
    }


    update(cast){
            this.checkCollision(cast);
            if (this.landing) this.land();
            else{
                if (this.rolling != 0){
                    this.roll(this.rolling);
                    if(-0.2 < this.camAngle && this.camAngle  < 0.2){
                        this.cam.rotateZ(-this.rolling/2);
                        this.camAngle -= this.rolling/2;
                    }
                }
                else if (Math.abs(this.camAngle) > 0.01){
                    this.cam.rotateZ(-Math.sign(this.camAngle)*0.02);
                    this.camAngle -= Math.sign(this.camAngle)*0.02;
                }
                if (this.pitching != 0){
                    this.pitch(this.pitching);
                }
                this.model.translateY(-this.speed[this.gear]);
            }
            this.updateAxis();
    }

    ssEngine() {
        this.engine = !this.engine;
        console.log("Engine On: ",this.engine);
        this.gear = 4;
        this.lights.children[1].intensity = this.engine;
    }

    shiftUp(){
        if (this.engine && this.gear < 8 && !this.landed) {
            this.gear +=1;
            this.lights.children[1].intensity += (2)*Math.sign(this.speed[this.gear]);
        }
    }
    shiftDown(){
        if (this.engine && this.gear > 0 && !this.landed) {
            this.gear -=1;
            this.lights.children[1].intensity -= 2*Math.sign(this.speed[this.gear]);
        }
    }
    roll(theta){
        if (!this.landed) this.model.rotateY(theta);
    }
    pitch(phi){
        if (!this.landed) this.model.rotateX(phi);
    }
    dodge(theta){}
    reset(){}

    setUp(){
        window.addEventListener('keydown', (e) => {
            switch(e.code){
                case "ShiftRight": this.ssEngine();               // Shift
                break;
                case "ArrowUp": this.shiftUp();                // Up Arrow
                break;
                case "ArrowDown": this.shiftDown();              // Down Arrow
                break;
                case "KeyW":                                // W
                    if (this.engine && this.pitching > -0.02){
                        this.pitching = -0.02;
                    }
                break;
                case "KeyS":                                // S
                    if (this.engine && this.pitching < 0.02){
                        this.pitching = 0.02;
                    }
                break;
                case "KeyA":                                // A
                    if (this.engine && this.rolling < 0.05){
                        this.rolling = 0.05;
                        //this.cam.rotateZ(-0.2);
                    }
                break;
                case "KeyD":                                // D
                    if (this.engine && this.rolling > -0.05){
                        this.rolling = -0.05;
                        //this.cam.rotateZ(0.2);
                    }
                break;
                case "ArrowLeft": this.dodge(-90);
                break;
                case "ArrowRight": this.dodge(90);
                break;
                case "KeyQ": this.land();
                break;
                case "Backspace": this.reset();
                break;
            }
        });
        window.addEventListener('keyup', (e) => {
            switch(e.code){
                case "KeyW": this.pitching = 0;
                break;
                case "KeyS": this.pitching = 0;
                break;
                case "KeyA":
                    if(this.rolling > 0){
                        //this.cam.rotateZ(0.2);
                        this.rolling = 0;
                    }
                break;
                case "KeyD":
                    if(this.rolling < 0){
                        //this.cam.rotateZ(-0.2);
                        this.rolling = 0;
                    }
                break;
            }
        });
    }
}
