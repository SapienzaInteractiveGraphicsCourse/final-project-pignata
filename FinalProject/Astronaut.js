import * as THREE from '../resources/three/build/three.module.js';
import {Player, Animation} from "./Player.js"

export class Astronaut extends Player {
    dX = 0.0;                                       // Increment of X Angle Rotation        
    dY = 0.0;                                       // Increment of Y Angle Rotation
    gravity = false;    
	moving = false;
    turning = false;
    jumping = false;

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
            console.log(Player.players[0].root.rotation)
			animations.Run.stop()
			// animations.Run.delay = false
			animations.Reset.start()
		}

		//      Input Configuration:
        window.addEventListener('keydown', (e) => {
            if(this.active) {
                let clipName;
                switch(e.code){
                    case "KeyW":
                        clipName = (!this.gravity) ? 'Walk': 'Run'
                        if (!this.moving){
                            this.dX = +0.005;
                            this.animations[clipName].repeat = true;
                            if(!this.jumping) this.animations[clipName].start();
                            this.moving = true;
                        }
                    break;
                    case "KeyA":
                        // if(this.animations.Reset.playing) this.animations.Reset.stop()
                        if(this.animations.TurnRight.playing) this.animations.TurnRight.stop()
                        if (this.dY <= 0.0){
                            this.dY = 0.03;
                            this.animations.TurnLeft.start();
                            this.turning = true
                        }
                        break;
                    case "KeyD":
                        // if(this.animations.Reset.playing) this.animations.Reset.stop()
                        if(this.animations.TurnLeft.playing) this.animations.TurnLeft.stop()
                        if (this.dY >= 0.0){
                            this.animations.TurnRight.start();
                            this.turning = true
                            this.dY = -0.03;
                        }
                        break;
                    case "KeyS":
                        this.animations.TurnBack.start();
                        this.turning = true
                        // this.fw = this.dirX.applyAxisAngle(this.dirY, 3.1415)
                        break;
                    case "KeyJ":
                        clipName = (this.gravity) ? 'Jump' : 'nJump'
                        let walk;
                        const moving = this.moving;
                        if (moving) {
                            const walkClipName = (this.gravity) ? 'Run' : 'Walk'
                            walk = this.animations[walkClipName]
                            walk.stop()
                        }
                        this.animations[clipName].onComplete = function() {
                            const astronaut = Player.players[0]                  
                            if(astronaut.moving){
                                const walkClipName = (astronaut.gravity) ? 'Run' : 'Walk'
                                astronaut.animations[walkClipName].start()
                            } 
                            if(astronaut.turning) {
                            }
                            astronaut.jumping = false;
                            // astronaut.animations.Reset();
                        }
                        this.animations[clipName].start()
                        this.jumping = true
                        break;
                    case "KeyR":
                        this.animations.Reset.start();
                        break;
                    case 'KeyG':
                        this.gravity = !this.gravity;
                        console.log('Gravity: ', this.gravity)
                        break;
                    case 'Digit9':
                        this.pov()
                }
            }
        });
        window.addEventListener('keyup', (e) => {
            if(this.active) {
                switch(e.code){
                    case "KeyW":
                        const clipNames = ['Walk', 'Run']
                        clipNames.forEach(clipName => {
                            this.animations[clipName].stop()
                        })
                        this.moving = false;
                        this.dX = 0;
                        if(!this.jumping) this.animations.Reset.start();
                        if(this.dY >0) this.animations.TurnRight.start();
                    break;
                    case "KeyA":
                        if(this.animations.TurnLeft.playing) this.animations.TurnLeft.stop();
                        if(!this.animations.TurnRight.playing) this.animations.Reset.start();
                        this.turning = false;
                        this.dY = 0;
                        // this.animations.TurnRight.start()
                    break;
                    case "KeyD":
                        this.animations.TurnRight.stop();
                        if(!this.animations.TurnLeft.playing) this.animations.Reset.start();
                        this.turning = false;
                        this.dY = 0;

                        // this.animations.TurnLeft.start()
                        // this.reset()
                    break;
                    case "KeyS":
                        // this.dX = 0;
                        // this.animations.Walk.stop();
                        // this.animations.Reset.start()
                    break;
                }
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
        this.boarding(ship)
	}

	boarding(ship) {
		this.animations.MoveTo.frames[1] = [{y: '+2'}]
		this.animations.MoveTo.delay = [1000]
		this.animations.Crunch.delay = [1000]
        // const astronaut = this.model
        this.animations.MoveTo.onComplete = function() {
            const astronaut = Player.players[0];
            const ship = Player.players[1];
            console.log(ship.model.rotation)
            astronaut.root.position.set(0,0,0)
            astronaut.model.rotation.set(0,0,0)
            // ship.root.rotation.set(
            //     ship.model.rotation.x,
            //     ship.model.rotation.y,
            //     ship.model.rotation.z,
            // )
            ship.root.add(astronaut.model)
            console.log(
                "Ship Model ", ship.model.rotation,
                "\nShip Root ", ship.root.rotation,
                "\nAM " , astronaut.model.rotation,
                "\nAR", astronaut.root.rotation,   
                )
            ship.active = true
            ship.model.getObjectByName('lightTarget').position.set(0,0,-1)
        }
		this.animations.CamTransition.concat = [this.animations.MoveTo, this.animations.Crunch]
		this.animations.TurnBack.start()
		this.animations.CamTransition.start()
        this.active = false
	}

    pov(){
        const cam = this.model.getObjectByName('PlayerCam');
        cam.fov = 80
        // this.model.getObjectByName('Head').add(cam)
        cam.position.set(0,0.5,0.2)

        // this.model.getObjectByName('lightEye').position.set(0,1,1)
        // this.model.getObjectByName('lightEye').position.set(0,1,-1)
        // this.model.getObjectByName('lightEye').position.set(0,1,-1)
                // cam.rotation.x = Math.PI
    }

	get moving(){
        return this.animations.Walk.playing;
    }

}