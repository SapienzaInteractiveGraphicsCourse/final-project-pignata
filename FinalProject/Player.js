import * as THREE from '../resources/three/build/three.module.js';
import {Data} from "./Data.js"

export class Player {
    static players = [];
    // active = false;
    animations = {};
    active = false;             // Enable Player Interactions.
    pov = false;                // Enable first person prospective


// //  Position Parameters:
constructor(obj){
        this.name = obj.name;
        this.model = obj;
        this.root  = obj.getObjectByName('root')
        this.nodes = [];
        getChildrenNames(obj, this.nodes);
        this.fw = new THREE.Vector3(0,0,1);  // Forward Direction
        this.up = new THREE.Vector3(0,1,0);   // Up Direction
        this.w = new THREE.Vector3(1,0,0);   // Tangent Direction
        this.cam = obj.getObjectByName('PlayerCam');

        // setArrowHelpers(obj.getObjectByName('root'), this.fw, this.up, this.w)
        setArrowHelpers(this.cam, this.fw, this.up, this.w)
        this.updateAxis()
        console.log("New Player: ", this.name)

//      Load and Compute Animations:
        for (const [name, clip] of Object.entries(Data[this.name].animations)) {
            let joints = [];
            clip.joints.forEach((joint, i) => {
                joints.push(obj.getObjectByName(joint)[clip.attributes[i]])
            });
            this.animations[name] = new Animation(name, joints, clip.frames, clip.periods, clip.delay, clip.repeat, clip.reset);
            if (this.animations[name].reset) this.animations[name].concat = [this.animations.Reset]
        }
        
        Player.players.push(this)

        function getChildrenNames(obj, nodes) {
            nodes.push(obj.name)
            if (Array.isArray(obj.children) && obj.children.length){
                for(let child of obj.children){
                    getChildrenNames(child, nodes)
                }
            }
        }

        function setArrowHelpers(cam, fw , up, w){
//      Set the Arrow Helpers for directions...
            const origin = new THREE.Vector3( 0.2 , -0.15, -0.5);
            const length = 0.1;
            const dirX = new THREE.Vector3( -1, 0, 0 );
            const dirY = new THREE.Vector3( 0, 1, 0 );
            const dirZ = new THREE.Vector3( 0, 0, -1 );
            const fw_1 = fw.clone()
            fw_1.z *= -1            
            fw_1.x *= -1            
            const arrowHelpers = [
                new THREE.ArrowHelper(fw, origin, length*0.8, 0xFFFFFF),
                new THREE.ArrowHelper(fw_1, origin, length*0.8, 0xFFFF00),
                new THREE.ArrowHelper( dirX, origin, length, 0xFF0000),
                new THREE.ArrowHelper( dirY, origin, length, 0x00FF00),
                new THREE.ArrowHelper( dirZ, origin, length, 0x0000FF),
            ];
            const arrows = new THREE.Group()
            arrows.name = 'Arrows'
            arrowHelpers.forEach((arrow) => {arrows.add(arrow);});
            cam.add(arrows)
        }
            
    }

    update() {
//      Compute Animation Update:
        for (const [name, clip] of Object.entries(this.animations)) {
            if (clip.completed){
                // console.log(clip.name)
                //clip.setTweens();
                if(clip.reset){
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
        const fw_1 = this.fw.clone()
        fw_1.z *= -1            
        fw_1.x *= -1 
        arrows[0].setDirection(this.fw)
        arrows[1].setDirection(fw_1)
    }

    reset(){
        this.animations.Reset.playing = false;
        this.animations.Reset.setTweens(this.animations.Reset);
        this.animations.Reset.start();
        //this.animations.Reset.playing = false;
    }

    alignToZenith() {
/* Function to Align the model respect the tangent to the planet surface.
        DEPRECATED 
*/ 
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
                if(this.delay != false && this.delay != undefined){
                    if (this.delay[j] != false && this.delay[j] != undefined){
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
        this.onStart()
        if(!this.playing){
            console.log(this.name)
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
        this.onUpdate();
        this.group.update();
        if ((this.completed)&&(!this.repeat)) {
            this.onComplete()
            if (this.next != null){
                this.next.forEach(animation => {animation.start()})
                this.next = null;
            } 
            this.stop();
        }
    }

    onComplete(){}
    onStart(){}
    loadParams(param) { this.params.push(param)}
    onUpdate(){}

    set concat(animations) {
//      Concatenate animation parameter to this. 
        this.next = animations;
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