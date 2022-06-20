import * as THREE from '../resources/three/build/three.module.js';
import {Data} from "./Data.js"

export class Player {
    // active = false;
    animations = {};
// //  Position Parameters:
    constructor(obj){
        this.model = obj;
        this.name = obj.name;
        this.nodes = [];
        this.fw = new THREE.Vector3(0,0,1);  // Forward Direction
        this.up = new THREE.Vector3(0,1,0);   // Up Direction
        this.w = new THREE.Vector3(1,0,0);   // Tangent Direction
        setArrowHelpers(obj.getObjectByName('root'), this.fw, this.up, this.w)
        this.updateAxis()
        console.log('fw: ', this.fw)
        console.log('up: ', this.up)
        console.log('w:',  this.w)
 
        getChildrenNames(obj, this.nodes)
        console.log("New Player: ", this.name)

//      COMPUTE ANIMATIONS:
        for (const [name, clip] of Object.entries(Data[this.name].animations)) {
            let joints = [];
            clip.joints.forEach((joint, i) => {
                joints.push(obj.getObjectByName(joint)[clip.attributes[i]])
            });
            this.animations[name] = new Animation(name, joints, clip.frames, clip.periods, clip.delay, clip.repeat, clip.reset);
            if (this.animations[name].reset) this.animations[name]. concat = this.animations.Reset
        }

        function getChildrenNames(obj, nodes) {
            nodes.push(obj.name)
            if (Array.isArray(obj.children) && obj.children.length){
                for(let child of obj.children){
                    getChildrenNames(child, nodes)
                }
            }
        }

        function setArrowHelpers(root, fw , up, w){
            //      Set the Arrow Helpers for directions...
            const origin = new THREE.Vector3(-1.5, -0.5, 0);
            const length = 0.4;
            const dirX = new THREE.Vector3( 1, 0, 0 );
            const dirY = new THREE.Vector3( 0, 1, 0 );
            const dirZ = new THREE.Vector3( 0, 0, 1 );
                const arrowHelpers = [
                    new THREE.ArrowHelper(fw, origin, length-0.1, 0xFFFFFF),
                    new THREE.ArrowHelper(up, origin, length -0.2, 0x00FF00),
                    new THREE.ArrowHelper(w, origin, length-0.2, 0xFF0000),
                    new THREE.ArrowHelper( dirX, origin, length, 0xFF0000),
                    new THREE.ArrowHelper( dirY, origin, length, 0x00FF00),
                    new THREE.ArrowHelper( dirZ, origin, length, 0x0000FF),
                ];
            const arrows = new THREE.Group()
            arrows.name = 'Arrows'
            arrowHelpers.forEach((arrow) => {arrows.add(arrow);});
            root.add(arrows)

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
                    // this.reset();
                }
            clip.completed = false;
            }
            if (clip.playing) clip.update()
        }
        this.updateAxis()
    }

    updateAxis() {
        const root =  this.model.getObjectByName('root')
        root.getWorldDirection( this.fw ) // Returns a vector representing the direction of object's positive z-axis in world space.
        root.getWorldPosition(this.up)
        this.up.normalize()
        this.w.crossVectors(this.fw, this.up)

        const arrows = root.getObjectByName("Arrows").children
        arrows[0].setDirection(this.fw)
        arrows[1].setDirection(this.up)
        arrows[2].setDirection(this.w)
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

    getChildrenNames(obj) {
        this.nodes.push(obj.name)
        if (Array.isArray(obj.children) && obj.children.length){
            for(let child of obj.children){
                this.getChildrenNames(child)
            }
        }
    }

}

export class Animation{
    paused = false;
    completed = false;
    group = new TWEEN.Group();
    tweens = [];
    next = null;
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
            this.onComplete()
            if (this.nextAnimation != null){
                this.nextAnimation.start()
            } 
            this.stop();
        }
    }

    onComplete(){
        console.log(this.name)
    }

    set concat(animation) {
//      Concatenate animation parameter to this. 
        this.nextAnimation = animation;
    }

    get reverse(){
        const reversedFrames = []
        this.frames.forEach(frame => {
            reversedFrames.push(frame.reverse())
        })
        return new Animation(
            this.name + 'Reverse',
            this.joints,
            reversedFrames,
            this.periods,
            this.delay,
            this.repeat,
            this.reset
        )
    }
}