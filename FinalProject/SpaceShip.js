import * as THREE from '../resources/three/build/three.module.js';
import {Player} from "./Player.js";


export class SpaceShip extends Player {
	constructor(model) {
		model.getObjectByName('shipCam').name = 'PlayerCam'
		super(model)
		model.getObjectByName('Arrows').visible = this.active;
		console.log(this.animations.Doors)
		this.engine = false
		this.land = true;
		this.inAtmosphere = true;
		this.model.getObjectByName('lightTarget').position.set(0,-1,0)
		model.getObjectByName("SpotLight").target = model.getObjectByName('lightTarget');
		// this.alignToZenith()

		this.animations.Boarding.onComplete = function() {
			model.getObjectByName('Legs').visible = !model.getObjectByName('Legs').visible		
		}

		this.engine = false;
		this.gear = 4,
		this.speed = [-0.2, -0.1, -0.05, -0.01, 0, 0.01, 0.05, 0.1, 0.2]
		this.yaw = 0;
		this.pitch = 0;

		//  	Input Configuration:
		window.addEventListener('keydown', (e) => {
			console.log(this.active)
			if (this.active) {
				switch(e.code) {
					case "ShiftRight": this.ssEngine();               // Shift
					break;
					case "ArrowUp": this.shiftUp();                // Up Arrow
					break;
					case "ArrowDown": this.shiftDown();              // Down
					case "KeyW":                              
						if (this.engine && this.pitching > -0.02) this.pitch = -0.02;
					break;
					case "KeyS":                                
						if (this.engine && this.pitching < 0.02) this.pitch = 0.02;
					break;
					case "KeyA":                                
						if (this.engine && this.rolling < 0.05) this.yaw = 0.05;
					break;
					case "KeyD":                                // D
						if (this.engine && this.rolling > -0.05) this.yaw = -0.05;
					break;
					// case "ArrowLeft": this.dodge(-90);
					// break;
					// case "ArrowRight": this.dodge(90);
					// break;
					// case "KeyQ": this.land();
				}
			} 
		})

	}
	update() {
		if (this.engine) {
			if(this.yaw != 0) this.root.rotateOnWorldAxis(this.up, this.yaw)
			if(this.pitch != 0) this.root.rotateOnWorldAxis(this.w, this.pitch)
			this.root.translateZ(this.speed[this.gear])
		}
		super.update();
	}

	inAtmosphere(position) {
		const origin = new THREE.Vector3(0,0,0)
		if(position.distanceTo(origin) <=13) {
			return true
		}
		else return false
	}

	ssEngine() {
		this.engine = !this.engine;
		console.log("Engine: ",this.engine);
		this.gear = 4;
		// this.lights.children[1].intensity = this.engine;
	}

	shiftUp(){
		if (this.engine && this.gear < 8 && !this.landed) {
				this.gear +=1;
				// this.lights.children[1].intensity += (2)*Math.sign(this.speed[this.gear]);
		}
	}

	shiftDown(){
		if (this.engine && this.gear > 0 && !this.landed) {
				this.gear -=1;
				// this.lights.children[1].intensity -= 2*Math.sign(this.speed[this.gear]);
		}
	}
	turn(theta){
			if (!this.landed) this.root.rotateY(theta);
	}
	pitch(phi){
			if (!this.landed) this.root.rotateX(phi);
	}

	moveTo(rotationFrame) {
		if (!this.active) this.active = true
		const dx = rotationFrame.x - this.model.rotation.x;
		const dy = rotationFrame.y - this.model.rotation.y;
		const dz = rotationFrame.z - this.model.rotation.z;

		const dX = (dx >=0) ? String().concat('+',dx.toFixed(3)) : String(dx.toFixed(3))
		const dY = (dy >=0) ? String().concat('+',dy.toFixed(3)) : String(dy.toFixed(3))
		const dZ = (dz >=0) ? String().concat('+',dz.toFixed(3)) : String(dz.toFixed(3))
		console.log('dX: ', dX)
		console.log('dY: ', dY)
		console.log('dZ: ', dZ)

		const frame = {
			x: dX,
			y: dY,
			z: dZ,
		}

		this.animations.MoveTo.frames[0] = [frame]
		// this.animations.MoveTo.frames[1]. [{y: '+0'}]
		this.animations.MoveTo.periods[0] = 1000
		this.animations.MoveTo.delay = false
		this.animations.MoveTo.concat = [this.animations.Doors]
		if (this.land) {
			// let periods = 0.0;
			// this.animations.Boarding.periods.forEach(period => {periods+=period})
			// this.animations.MoveTo.delay[0] = periods
			this.animations.Boarding.concat = [this.animations.MoveTo]
			this.animations.Boarding.start()
			this.land = false
		}
		else {
			this.animations.MoveTo.start()
		}
		this.active = true
	}

}