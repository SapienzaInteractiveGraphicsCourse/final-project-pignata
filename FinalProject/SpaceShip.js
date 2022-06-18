import * as THREE from '../resources/three/build/three.module.js';
import {Player, Animation} from "./Player.js"


export class SpaceShip extends Player {
	constructor(model) {
		super(model)
		this.y = new THREE.Vector3(0,1,0);
		model.position.set(0, 0, 10.45)
		model.rotation.set(0,0,0)
		this.alignToZenith()
		model.getObjectByName("SpotLight").target = model.getObjectByName('lightTarget');
//  	Input Configuration:
		window.addEventListener('keydown', (e) => {
			switch(e.code) {
				case 'KeyB':
					this.animations.Boarding.start();
				break;
			}
		})

	}
	update() {
		super.update();
		if (this.model.position.distanceTo(new THREE.Vector3(0,0,0)) < 13) {
			this.alignToZenith()
		}

		// const p = new THREE.Vector3()
		// this.model.getWorldPosition(p)
		// if (p.distanceTo(new THREE.Vector3(0,0,0))<=13) {
		// 	// this.alignTo(p.normalize())
		// }
	}

	moveTo(position) {
		console.log(this.model.position)
		const animation = new Animation(
			'moveTo',
			[this.model.position],
			[{x: position.x, y: position.y, z: position.z}],
			[1000],
			[300],
			false
		)
		this.animations.Boarding.start();
		animation.start();
	}

	alignToZenith() {
/* Function to Align the model respect the tangent to the planet surface. */ 
		let up = new THREE.Vector3()								// up = up direction in world space.
		this.model.getWorldPosition(up)
		up.normalize() 
		// const y = new THREE.Vector3(0,1,0);						// y = up direction in the object space
		const angle = this.y.angleTo(up)   							// Returns the angle between this vector and vector v in radians.
		
		if (angle > 0.1) {
			console.log(up)
			const w = new THREE.Vector3().crossVectors(this.y, up)	// w = ortogonal vector between 
			console.log(angle)
			this.model.rotateOnAxis(w, angle)						// Rotate an object along an axis in object space. The axis is assumed to be normalized.
			this.y = up;
		}
	}


}



// Funzione per Orientare un modello rispetto alla superficie del planet:
/*
	// In ship:
	let p = new THREE.Vector3()				// The Up direction of the ship in the world space.
	this.model.getWorldPosition(p)
	p.normalize()							//! check source code

	let up = this.model.position
	up.normalize()						//The model up direction in object space.
	
// I need the angle between p and up;
	const angle = p.angleTo(up)   // Returns the angle between this vector and vector v in radians.
// Then, I can use this angle to rotate the model in order to align the vectors.
	this.model.rotateOnAxis(p, angle)	//Rotate an object along an axis in object space. The axis is assumed to be normalized.


NOTE: 
	This Function directly rotate the object along the up Axis, 
	an alternative could be to compute yaw, pitch and roll separately, for a smooth animation. 



*/