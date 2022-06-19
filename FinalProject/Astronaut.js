import * as THREE from '../resources/three/build/three.module.js';
import {Player} from "./Player.js"

export class Astronaut extends Player {
	//  Position Parameters:
    dirX = new THREE.Vector3( 1, 0, 0 );
    dirY = new THREE.Vector3( 0, 1, 0 );
    dirZ = new THREE.Vector3( 0, 0, 1);
    dX = 0.0;                                       // Increment of X Angle Rotation        
    dY = 0.0;                                       // Increment of Y Angle Rotation
    gravity = false;    

	constructor(model) {
		super(model)
//		Set the lightTarget of the astronaut.    
        const lightTarget = new THREE.Object3D();
        lightTarget.name = 'lightTarget'
        this.model.getObjectByName("lightEye").add(lightTarget);
        lightTarget.position.set(0,-1,1);
        this.model.getObjectByName("lightEye").target = lightTarget;

		//      Input Configuration:
        window.addEventListener('keydown', (e) => {
            let clipName;
            switch(e.code){
                case "KeyW":
                    clipName = (!this.gravity) ? 'Walk': 'Run'
					if (!this.animations[clipName].playing){
						this.dX = +0.005;
						this.animations[clipName].repeat = true;
						this.animations[clipName].start();
					}
                break;
                case "KeyA":
                    if (this.dY <= 0.0){
                        this.dY = 0.03;
                        this.animations.TurnLeft.start();
                    }
                break;
                case "KeyD":
                    if (this.dY >= 0.0){
                        this.dY = -0.03;
                        this.animations.TurnRight.start();
                    }
                break;
                case "KeyS":
                    this.animations.TurnBack.start();
                    this.dirX = this.dirX.applyAxisAngle(this.dirY, 3.1415)
                break;
                case "KeyJ":
                    // if (this.animations.Walk.playing) this.animations.Walk.stop()
                    clipName = (!this.gravity) ? 'Jump' : 'nJump'
                    this.animations[clipName].start()
                break;
                case "KeyR":
                    this.animations.Reset.playng = false;
                    this.animations.Reset.start();
                break;
                case 'KeyG':
                    this.gravity = !this.gravity;
                    console.log('Gravity: ', this.gravity)
                break;
            }
        });
        window.addEventListener('keyup', (e) => {
            let clipName
            switch(e.code){
                case "KeyW":
                    clipName = (!this.gravity) ? 'Walk':'Run'
                    // this.animations[clipName].repeat = false;
                    this.animations[clipName].stop();
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
                    this.animations.Reset.start();
                    // this.reset()
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
		super.update();
		//      Compute Momevent Update:
        if(this.dY!=0){
            this.model.rotateOnWorldAxis(this.dirY, this.dY)
            this.dirX = this.dirX.applyAxisAngle(this.dirY, this.dY)
        }
        if(this.dX!=0){
            this.model.rotateOnWorldAxis(this.dirX, this.dX) 
            this.dirY = this.dirY.applyAxisAngle(this.dirX, this.dX)
        }

	}

	callSpaceShip(spaceShip){
		console.log('Calling The SpaceShip...')
		let spherical = new THREE.Spherical()
		let position = new THREE.Vector3()
		this.model.getObjectByName('root').getWorldPosition(position)
		// console.log("Astronaut Coords: \n",position)
		spherical.setFromVector3(position);
		// console.log(spherical)
		// console.log(spherical);
		// spherical.radius += 2;
		spherical.radius -= 0.1;

		let shipEndPosition = new THREE.Vector3();
		shipEndPosition.setFromSpherical(spherical)
		// console.log('Spaceship Required Position for Boarding:\n', shipEndPosition)
		spaceShip.moveTo(shipEndPosition, this.model.rotation)
	}

	get moving(){
        return this.animations.Walk.playing;
    }

}