import * as THREE from '../resources/three/build/three.module.js';
import {Player} from "./Player.js"

export class Astronaut extends Player {
	//  Position Parameters:
    // dirX = new THREE.Vector3( 1, 0, 0 );
    // dirY = new THREE.Vector3( 0, 1, 0 );
    // dirZ = new THREE.Vector3( 0, 0, 1);
    dX = 0.0;                                       // Increment of X Angle Rotation        
    dY = 0.0;                                       // Increment of Y Angle Rotation
    gravity = false;    
	moving = false;

	constructor(model) {
		super(model)
//		Set the lightTarget of the astronaut.    
        const lightTarget = new THREE.Object3D();
        lightTarget.name = 'lightTarget'
        this.model.getObjectByName("lightEye").add(lightTarget);
        lightTarget.position.set(0,-1,1);
        this.model.getObjectByName("lightEye").target = lightTarget;
		const animations = this.animations;

		this.animations.TurnBack.onStart = function(){
			// animations.Run.delay = [500]
			animations.Run.start()
		}

		this.animations.TurnBack.onComplete = function() {
			animations.Run.stop()
			// animations.Run.delay = false
			animations.Reset.start()
		}

		//      Input Configuration:
        window.addEventListener('keydown', (e) => {
            let clipName;
            switch(e.code){
                case "KeyW":
                    clipName = (!this.gravity) ? 'Walk': 'Run'
					if (!this.moving){
						this.dX = +0.005;
						this.animations[clipName].repeat = true;
						this.animations[clipName].start();
						this.moving = true;
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
                    // this.fw = this.dirX.applyAxisAngle(this.dirY, 3.1415)
                	break;
                case "KeyJ":
					clipName = (this.gravity) ? 'Jump' : 'nJump'
                    if (this.animations.Walk.playing) {
						const walk = this.animations.Walk
						walk.stop()
						const moving = this.moving
						this.animations[clipName].onComplete = function() {
							if(moving) walk.start()
						}
					}
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
				case 'Digit9':
					console.log(this.animations.Crunch)
					this.animations.Crunch.start()
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
					this.moving = false;
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
		//      Compute Momevent Update:
        if(this.dY!=0){
			this.model.rotateOnWorldAxis(this.up, this.dY)
            // this.fw = this.dirX.applyAxisAngle(this.dirY, this.dY)
			// this.updateAxis()
        }
        if(this.dX!=0){
			this.model.rotateOnWorldAxis(this.w, -this.dX) 
            // this.dirY = this.dirY.applyAxisAngle(this.dirX, this.dX)
        }
		super.update();
	}

	callSpaceShip(ship) {
		console.log('Calling the SpaceShip...')
		const rotationFrame = {
			x: this.model.rotation.x,
			y: this.model.rotation.y,
			z: this.model.rotation.z,
		}
		ship.moveTo(rotationFrame)
		this.animations.MoveTo.frames[1] = [{y: '+2'}]
		this.animations.MoveTo.delay = [1000]
		this.animations.Crunch.delay = [1000]
		// this.animations.TurnBack.concat = this.animations.MoveTo
		this.animations.CamTransition.concat = [this.animations.MoveTo, this.animations.Crunch]
		this.animations.TurnBack.start()
		this.animations.CamTransition.start()
		// this.animations.TurnBack.start()

	}

	boarding(ship) {
		/* DEPRECATED */
		let spherical = new THREE.Spherical().setFromVector3(this.model.getObjectByName('root').position)
		let spherical2 = new THREE.Spherical().setFromVector3(ship.model.position)
		const dPhi = spherical2.phi - spherical.phi
		console.log('dPhi : ', dPhi)
		this.animations.MoveTo.frames[0] = [{x: spherical2.phi}]
		this.animations.MoveTo.frames[1] = [{y: 10.56}]
		this.animations.MoveTo.start()
		this.dirY = this.dirY.applyAxisAngle(this.dirX, dPhi)	
	}

	get moving(){
        return this.animations.Walk.playing;
    }

}