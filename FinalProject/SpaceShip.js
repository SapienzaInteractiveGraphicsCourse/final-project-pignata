import * as THREE from '../resources/three/build/three.module.js';
import {Player} from "./Player.js";


export class SpaceShip extends Player {
	landing = true;

	constructor(model) {
		super(model)
		this.y = new THREE.Vector3(0,1,0);
		this.isMoving = false;
		this.model.position.set(0, 0, 10.45)
		this.model.rotation.set(0,0,0)
		this.alignToZenith()
		model.getObjectByName("SpotLight").target = model.getObjectByName('lightTarget');

		//  	Input Configuration:
		window.addEventListener('keydown', (e) => {
			switch(e.code) {
				case 'KeyB':
					this.animations.Boarding.start();
				break;
				case 'KeyF':
					this.model.position.set(0,12, 0);
					this.alignToZenith()
					break;
				case 'KeyM':
					this.animations.MoveTo.start();	
			}
		})

	}
	update() {
		super.update();
		// if (this.model.position.distanceTo(new THREE.Vector3(0,0,0)) < 13) {
		// 	this.alignToZenith()
		// }
		if (this.isMoving) {
			// this.alignToZenith()
		}
	}

	inAtmosphere(position) {
		const origin = new THREE.Vector3(0,0,0)
		if(position.distanceTo(origin) <=13) {
			return true
		}
		else return false
	}

	// moveTo(position) {
	// 	console.log(position)
	// 	// const animation = new Animation(
	// 	// 	'moveTo',
	// 	// 	[this.model.position],
	// 	// 	[{x: position.x, y: position.y, z: position.z}],
	// 	// 	[1000],
	// 	// 	false,
	// 	// 	[300],
	// 	// 	false
	// 	// )
	// 	// animation.start()
	// 	// this.animations.Boarding.start();
	// 	this.animations.MoveTo.frames[0][0] = {
	// 		x: position.x,
	// 		y: position.y,
	// 		z: position.z
	// 	}
	// 	if (this.inAtmosphere(position)) {
	// 		console.log(this.model)
	// 		const p = position.normalize()
	// 		console.log('desired position up: ', p)
	// 		console.log('current up direction: ', this.y)
	// 		const angle = this.y.angleTo(p)
	// 		console.log('offset angle: ', angle)
	// 		const w = new THREE.Vector3().crossVectors(this.y, p).normalize()
	// 		console.log('rotation axis: ', w)
	// 		this.model.position.set(position.x, position.y, position.z)
	// 		// this.model.rotateOnAxis(w, angle)
	// 		console.log('final rotation coords:', this.model.rotation )
	// 		this.animations.MoveTo.frames[0][1] = {
	// 			x: this.model.rotation.x,
	// 			y: this.model.rotation.y,
	// 			z: this.model.rotation.z,
	// 		}
	// 		// this.model.rotateOnAxis(w, -angle)
	// 		console.log('current rotation coords:', this.model.rotation)
	// 		this.y = p;
	// 		console.log('new y: ', this.y)
	// 	}
		// this.animations.MoveTo.start();
	// }
	moveTo(position, rotation) {
		const p = position.clone().normalize()
		this.y = p;

		this.animations.MoveTo.frames[0][0] = {
			x: position.x,
			y: position.y,
			z: position.z
		}
		
		const dx = rotation.x-this.model.rotation.x
		const dy = rotation.y-this.model.rotation.y
		const dz = rotation.z-this.model.rotation.z

		const dX = String(dx.toFixed(2))
		const dY = String(dy.toFixed(2))
		const dZ = String(dz.toFixed(2))

		
		this.animations.MoveTo.frames[0][1] = {
			x: rotation.x,
			y: rotation.y,
			z: rotation.z,
		}

			console.log('Euler x: ', this.model.rotation.x, rotation.x)
			console.log('Euler y: ', this.model.rotation.y, rotation.y)
			console.log('Euler z: ', this.model.rotation.z, rotation.z)

		if (this.landing){
			// this.animations.Boarding.start()
			// this.landing = false
		}
		// this.model.getObjectByName('lightTarget').position.set(0,-2,0)
		this.animations.MoveTo.start()
	}


	// moveTo(position, rotation) {
	// 	console.log('Euler x: ', this.model.rotation.x, rotation.x, rotation.x-this.model.rotation.x)
	// 	console.log('Euler y: ', this.model.rotation.y, rotation.y, rotation.y-this.model.rotation.y)
	// 	console.log('Euler z: ', this.model.rotation.z, rotation.z, rotation.z-this.model.rotation.z)
	// 	this.model.position.set(position.x, position.y, position.z)
	// 	this.model.rotation.set(rotation.x, rotation.y, rotation.z)
	// }
}