import * as THREE from '../resources/three/build/three.module.js';
import {Player, Animation} from "./Player.js"


export class SpaceShip extends Player {
	constructor(model) {
		super(model)
		model.position.z = 10.45
		model.getObjectByName("SpotLight").target = model.getObjectByName('lightTarget');
//  	Input Configuration:
		window.addEventListener('keydown', (e) => {
			switch(e.code) {
				case 'KeyB':
					this.animations.Boarding.start();
				break;
				case 'KeyF':
					this.animations.Rotate.start();
			}
		})

	}
	update() {
		super.update();
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
}