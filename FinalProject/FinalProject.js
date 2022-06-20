import * as THREE from '../resources/three/build/three.module.js';
import { OrbitControls } from '../resources/three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from '../resources/three/examples/jsm/loaders/GLTFLoader.js';
import {GUI} from "../resources/three/examples/jsm/libs/dat.gui.module.js"
import {TWEEN} from "../resources/three/examples/jsm/libs/tween.module.min.js"
import {Player} from "./Player.js"
import { Astronaut } from './Astronaut.js';
import { SpaceShip } from './SpaceShip.js';

window.onload = loadScene();


function loadScene(){
    THREE.Cache.enabled = false;
    const loader = new THREE.ObjectLoader();
    loader.load(('scenes/scene4.json'), function (scene) {init(scene)});
    //loader.load(('scenes/PlanetSystem.json'), function (scene) {init(scene)});
    //loader.load(('scenes/CharacterAnimation.json'), function (scene) {init(scene)});

}

function init(scene){
//  Set the canvas: 
    // const c1 = document.getElementById('info-canvas');
    // c1.width  = window.innerWidth * 0.8;
    // c1.height = window.innerHeight * 0.8;
    // c1.style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; border:2px solid white";

    // const ctx = c1.getContext('2d');
    // ctx.font = "30px Arial";
    // ctx.fillText("Hello World", 10, 50);

    const canvas = document.getElementById("gl-canvas");
    canvas.width  = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
    canvas.style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; border:2px solid white";

//  Set the Renderer options:
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.physicallyCorrectLights = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap; //THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

//  Get all nodes names:
    let nodes = [];
    getChildrenNames(scene);
//  Set the Camera:
    let camera = scene.getObjectByName("PlayerCam");
    window.addEventListener('resize', resize);

//  Scene Configuration: 
    // let vStars =  0.005;
    // let vPlanet = 0.0005;
    // let vUniverse = -0.0005;

//  Lights:

//  Set the Astronaut as Player:
    const astronaut = scene.getObjectByName("Astronaut");
    const player = new Astronaut(astronaut);

//  SpaceShip:
    // const ship = scene.getObjectByName("SpaceShip");
    const ship = new SpaceShip(scene.getObjectByName("SpaceShip"))
    // const spherical = new
    // ship.position.setF


//  Function calls:
    configureInputs();
    // setArrowHelpers();
    guiOptions();
    render();

    function render() {
        requestAnimationFrame(render);
        camera.updateProjectionMatrix();
        player.update();
        ship.update()
        orbits();
        renderer.render(scene, camera);
    }

    function configureInputs() {
        //TODO: Configure global keyboard inputs...
        window.addEventListener('keydown', (e) => {
            switch(e.code){
                case('KeyS'):
                    // tweenTurnBack.start()
                    // dirX = dirX.negate()
                break;
                case('KeyC'):
                    camera = ship.model.getObjectByName('shipCam')
                break;
                case 'Space':
					player.callSpaceShip(ship)
                break;
                case 'KeyP':
					player.boarding(ship)
				break;
            }
        })
        
        window.addEventListener('keyUp', (e) => {
            switch(e.code){
                
            }
        })

    }

    function orbits(t){
//      Compute Planet Rotation, Stars Revolution and Universe Rotation.  
        scene.getObjectByName("Stars").rotateY(0.005);
        scene.getObjectByName("Universe").rotateX(-0.0005);
        // scene.getObjectByName("Planet Zigarov").rotateZ(0.0005);
    }

    function setArrowHelpers(){
//      Set the Arrow Helpers for directions...
        const origin = new THREE.Vector3(-1.5, -0.5, 0);
        const length = 0.5;
        const hex = 0xffffff;
        const dirX = new THREE.Vector3( 1, 0, 0 );
        const dirY = new THREE.Vector3( 0, 1, 0 );
        const dirZ = new THREE.Vector3( 0, 0, 1 );
            const arrowHelpers = [
            new THREE.ArrowHelper( dirX, origin, length, 0xFF0000),
            new THREE.ArrowHelper( dirY, origin, length, 0x00FF00),
            new THREE.ArrowHelper( dirZ, origin, length, 0x0000FF),
            // new THREE.ArrowHelper( dirZ, origin, length-0.2, hex),
        ];
        arrowHelpers.forEach((arrow) => {astronaut.getObjectByName('root').add(arrow);});
    }

    function guiOptions(){
//      Set all the user controls: Lights, Cam.   
        const gui = new GUI();

//      Camera Controls:     
        const camFolder = gui.addFolder('PlayerCam');
        camFolder.add(camera, 'fov', 30, 90);
        camFolder.add(camera.position, 'y', 0, 10);
        camFolder.add(camera.position, 'z', -5, 5);
        camFolder.add(camera.rotation, 'x', -Math.PI, -Math.PI/2);

//      Lights Controls: 
        const lightsFolder = gui.addFolder("Lights");
        let lights = [
            // scene.getObjectByName("star1Light"),
            // scene.getObjectByName("star2Light"),
            scene.getObjectByName("lightEye")
            // scene.getObjectByName("shipLight")
        ];  
        nodes.forEach(node => {
            if (node.includes("Light")) lights.push(scene.getObjectByName(node))
        })
        lights.forEach(light => {
            const lightFolder = lightsFolder.addFolder(light.name);
            lightFolder.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
            lightFolder.add(light, 'intensity', 0, 1000);
            lightFolder.add(light, 'distance', 0, 1000);
            lightFolder.add(light, 'decay', 0, 2);
            if (light.type == 'SpotLight') {
                lightFolder.add(light, 'angle', 0, 1.57);
                lightFolder.add(light, 'penumbra', 0, 1);

                const targetFolder = lightFolder.addFolder("Target");
                const lightTarget = light.getObjectByName("lightTarget");
                targetFolder.add(lightTarget.position, 'x', -5,5);
                targetFolder.add(lightTarget.position, 'y', -5,5);
                targetFolder.add(lightTarget.position, 'z', -5,5);
            }
        });

//      Planet System Controls:
        const planetSystemFolder = gui.addFolder('PlanetSystem');
        planetSystemFolder.add(player, 'gravity').onChange((value) => {console.log('gravity: ',value);});   
        planetSystemFolder.open()
    }

    function resize() {
        var factor = 0.9; // percentage of the screen
        var w = window.innerWidth * factor;
        var h = window.innerHeight * factor;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    };    function getChildrenNames(obj) {
        nodes.push(obj.name)
        if (Array.isArray(obj.children) && obj.children.length){
            for(let child of obj.children){
                getChildrenNames(child)
            }
        }
    }

        function getChildrenNames(obj) {
        nodes.push(obj.name)
        if (Array.isArray(obj.children) && obj.children.length){
            for(let child of obj.children){
                getChildrenNames(child)
            }
        }
    }
}

class ColorGUIHelper {
    constructor(object, prop) {
        this.object = object;
        this.prop = prop;
    }
    get value() {
        return `#${this.object[this.prop].getHexString()}`;
    }
    set value(hexString) {
        this.object[this.prop].set(hexString);
    }
}