import * as THREE from '../resources/three/build/three.module.js';
import {Data} from "./Data.js"

export class Player {
    animations = {};
// //  Position Parameters:
    constructor(obj){
        this.model = obj;
        this.name = obj.name;
        this.nodes = [];

        // getChildrenNames(obj)
        console.log("New Player: ", this.name)

//      COMPUTE ANIMATIONS:
        for (const [name, clip] of Object.entries(Data[this.name].animations)) {
            let joints = [];
            clip.joints.forEach((joint, i) => {
                joints.push(obj.getObjectByName(joint)[clip.attributes[i]])
            });
            this.animations[name] = new Animation(name, joints, clip.frames, clip.periods, clip.delay, clip.repeat, clip.reset);
        }
    }

    update() {
//      Compute Animation Update:
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
            if (clip.playing) clip.update()
        }
    }

    reset(){
        this.animations.Reset.playing = false;
        this.animations.Reset.setTweens(this.animations.Reset);
        this.animations.Reset.start();
        //this.animations.Reset.playing = false;
    }

    alignToZenith() {
/* Function to Align the model respect the tangent to the planet surface. */ 
        let up = new THREE.Vector3()								// up = up direction in world space.
        this.model.getWorldPosition(up)
        up.normalize() 
        // const y = new THREE.Vector3(0,1,0);						// y = up direction in the object space
        const angle = this.y.angleTo(up)   							// Returns the angle between this vector and vector v in radians.
        if (angle > 0.1) {
            const w = new THREE.Vector3().crossVectors(this.y, up)	// w = ortogonal vector between 
            console.log(w)
            this.model.rotateOnAxis(w, angle)						// Rotate an object along an axis in object space. The axis is assumed to be normalized.
            this.y = up;
        }
    }
}

export class Animation{
    paused = false;
    completed = false;
    group = new TWEEN.Group();
    tweens = [];
    constructor(name, joints, frames, periods, delay, repeat, reset) {
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
            console.log(this.frames)
            for (let j = 0; j < this.frames[i].length; j++) {
                const tween = new TWEEN.Tween(this.joints[i],this.group).to(this.frames[i][j],this.periods[j]);
                if(Array.isArray(this.delay)){
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
            if (this.repeat) {
                currentTween.onComplete(function() {
                    console.log('AMALA');
                })
                const tween = new TWEEN.Tween(this.joints[i],this.group).to(this.frames[i][0],this.periods[0])
                currentTween.chain(tween,firstTween)
                //currentTween.chain(firstTween);
            }
            else {
                const tween = new TWEEN.Tween(this.joints[i],this.group).to(this.frames[i][0],this.periods[0])
                currentTween.onComplete(function() {
                    clip.completed = true;
                })
                currentTween.chain(tween,firstTween)
            }
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

    update(){
        this.group.update();
        if ((this.completed)&&(!this.repeat)) {
            this.stop();
        }
    }
}