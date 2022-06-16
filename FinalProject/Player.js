import * as THREE from '../resources/three/build/three.module.js';
import {Data} from "./Data.js"

export class Player {
    animations = {};

//  Position Parameters:
    spherical = new THREE.Spherical(    // Player Position. 
        10.56,                          // radius - the radius, or the Euclidean distance from the point to the origin.
        0,                              // phi - polar angle in radians from the y (up) axis.
        0                               // theta - equator angle in radians around the y (up) axis.
    );     
    dirX = new THREE.Vector3( 1, 0, 0 );
    dirY = new THREE.Vector3( 0, 1, 0 );
    dirZ = new THREE.Vector3( 0, 0, 1);
    dX = 0.0;                                       // Increment of X Angle Rotation        
    dY = 0.0;                                       // Increment of Y Angle Rotation
    turnBack = false;                 

    constructor(obj){
        this.model = obj;
        this.name = obj.name;
        console.log("Player Name : ", this.name)
        this.cam = obj.getObjectByName("PlayerCam")
        this.frontDir = new THREE.Vector3(0,0,1)
        this.dir = new THREE.Vector3(0,0,1)

    //  Set the lightTarget of the astronaut.    
        const lightTarget = new THREE.Object3D();
        lightTarget.name = 'lightTarget'
        this.model.getObjectByName("Head").add(lightTarget);
        lightTarget.position.set(0,0.2,1);
        this.model.getObjectByName("lightEye").target = lightTarget;

//      COMPUTE ANIMATIONS:
        for (const [name, clip] of Object.entries(Data[this.name].animations)) {
            let joints = [];
            clip.joints.forEach((joint, i) => {
                if (joint=='radius') joints.push(this.spherical)
                else joints.push(obj.getObjectByName(joint).rotation)
            });
            this.animations[name] = new Animation(name, joints, clip.frames, clip.periods, clip.repeat, clip.delay, clip.reset);
        }

//      Input Configuration:
        window.addEventListener('keydown', (e) => {
            switch(e.code){
                case "KeyW":
                    this.dX = 0.005;
                    this.animations.Walk.repeat = true;
                    this.animations.Walk.start();
                break;
                case "KeyA":
                    if (this.dY >= 0.0){
                        this.dY = -0.03;
                        this.animations.TurnLeft.start();
                    }
                break;
                case "KeyD":
                    if (this.dY <= 0.0){
                        this.dY = 0.03;
                        this.animations.TurnRight.start();
                    }
                break;
                break;
                case "KeyS":
                    // this.dX = -0.0025;
                    // this.animations.Walk.start();
                    this.animations.TurnBack.start();
                break;
                case "KeyJ":
                    this.animations.Jump.start();
                break;
                case "KeyR":
                    this.animations.Reset.playng = false;
                    this.animations.Reset.start();
                break;
            }
        });
        window.addEventListener('keyup', (e) => {
            switch(e.code){
                case "KeyW":
                    this.animations.Walk.repeat = false;
                    this.animations.Walk.stop();
                    // this.reset();
                    this.animations.Reset.start();
                    this.dX = 0;
                break;
                case "KeyA":
                    this.dY = 0;
                    this.animations.TurnLeft.stop();
                    this.animations.Reset.start();

                break;
                case "KeyD":
                    this.dY = 0;
                    this.animations.TurnRight.stop();
                    this.reset()
                break;
                case "KeyS":
                    // this.dX = 0;
                    // this.animations.Walk.stop();
                    // this.animations.Reset.start()
                break;
            }
        });
    }

    update() {
        // this.model.rotateOnWorldAxis(this.dirY,-this.dY)
        // this.model.translateOnAxis(this.dirZ, this.dX)
        // this.spherical.setFromVector3(this.model.position)
        // this.spherical.radius = 10.56
        // // console.log(this.dir)
        // // console.log(this.frontDir)
        // //  this.spherical.phi -= this.dX;
        // // this.spherical.theta -= this.dY;
        // this.model.position.setFromSpherical(this.spherical);
        // // this.model.rotation.x = this.spherical.theta - Math.PI

        for (const [name, clip] of Object.entries(this.animations)) {
            if (clip.completed){
                console.log(clip.name)
                //clip.setTweens();
                if(clip.reset){
                    console.log('reset');
                    this.reset();
                }
            clip.completed = false;
            }
            if (clip.playing){
                clip.update();
            }
        }
    }

    reset(){
        this.animations.Reset.playing = false;
        this.animations.Reset.setTweens(this.animations.Reset);
        this.animations.Reset.start();
        //this.animations.Reset.playing = false;
    }

    get moving(){
        return this.animations.Walk.playing;
    }

}

class Animation{
    paused = false;
    completed = false;
    group = new TWEEN.Group();
    tweens = [];
    constructor(name, joints, frames, periods, repeat, delay, reset) {
        this.playing = false;
        this.name = name;
        this.repeat = repeat;
        this.joints = joints;
        this.frames = frames;
        this.periods = periods;
        this.delay = delay;
        this.reset = reset;
        //this.setTweens(this);
    }

    setTweens(clip){
        this.group.removeAll();
        let tweens = [];
        for (let i = 0; i<this.joints.length; i++){
            let firstTween, currentTween;
            for (let j = 0; j < this.frames[i].length; j++) {
                const tween = new TWEEN.Tween(this.joints[i],this.group).to(this.frames[i][j],this.periods[j]);
                if (this.delay){
                    if (this.delay[j]){
                        tween.delay(this.delay[j]);
                    }
                }

                if (j==0) {
                    tween.onComplete(function(){
                        clip.completed = false;
                    })
                    firstTween = tween;
                }
                else currentTween.chain(tween);
                currentTween = tween;
            }

            // if (this.repeat) {
            //     const tween = new TWEEN.Tween(this.joints[i],this.group).to(this.frames[i][0],this.periods[0])
            //     currentTween.onComplete(function() {
            //         console.log('AMALA');
            //     })
            //     currentTween.chain(tween,firstTween)
            //     //currentTween.chain(firstTween);
            // }
            const tween = new TWEEN.Tween(this.joints[i],this.group).to(this.frames[i][0],this.periods[0])
            currentTween.onComplete(function() {
                clip.completed = true;
            })
            currentTween.chain(tween,firstTween)
            //currentTween.chain(firstTween);
            tweens.push(firstTween);
        }

        this.tweens = tweens;
    }

    start() {
        if(!this.playing){
            this.setTweens(this);
            this.tweens.forEach((tween) => {
                tween.start();
            });
            this.playing = true;
        }
    }

    stop() {
        if(this.playing){
            this.playing = false;
            this.group.getAll().forEach((tween) => tween.stop());
        }
    }

    update(time){
        this.group.update();
        if ((this.completed)&&(!this.repeat)) {
            this.stop();
        }
    }
}