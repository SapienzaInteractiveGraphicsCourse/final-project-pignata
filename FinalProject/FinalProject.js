import * as THREE from '../resources/three/build/three.module.js';
import { OrbitControls } from '../resources/three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from '../resources/three/examples/jsm/loaders/GLTFLoader.js';
import {GUI} from "../resources/three/examples/jsm/libs/dat.gui.module.js"
import {TWEEN} from "../resources/three/examples/jsm/libs/tween.module.min.js"
import {Player} from "./Player.js"

window.onload = loadScene();


function loadScene(){
    THREE.Cache.enabled = false;
    const loader = new THREE.ObjectLoader();
    loader.load(('scenes/scene1.json'), function (scene) {init(scene)});
    //loader.load(('scenes/PlanetSystem.json'), function (scene) {init(scene)});
    //loader.load(('scenes/CharacterAnimation.json'), function (scene) {init(scene)});

}

function init(scene){
//  Set the canvas: 
    const canvas = document.getElementById("gl-canvas");
    canvas.width  = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
    canvas.style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; border:2px solid white";

//  Set the Renderer options:
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.physicallyCorrectLights = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap; //THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

//  Set the Camera:
    const camera = scene.getObjectByName("PlayerCam");
    window.addEventListener('resize', resize);

//  Set the Astronaut as Player:
    const astronaut = scene.getObjectByName("Astronaut");
    let names = []
    getChildrenNames(astronaut)
    console.log(names)
    const player = new Player(astronaut);
    let dirX = new THREE.Vector3( 1, 0, 0 );
    let dirY = new THREE.Vector3( 0, 1, 0 );
    let dirZ = new THREE.Vector3( 0, 0, 1 );

//  Planet Configuration:
    let planetParamas = {x: 0, y: 0}
    // const tweenTurnBack = new TWEEN.Tween(planetParams).to({y: '+3.1415'}, 400).delay(400)
    const tweenTurnBack = new TWEEN.Tween(scene.getObjectByName("Planet").rotation).to({y: '+3.1415'}, 400).delay(400)

//  Set the box for orientation:  
    const box = scene.getObjectByName("Box");
    box.scale.set(0.05,0.05,0.05);
    box.position.setFromSpherical(new THREE.Spherical(1.02, -0.2, 0));
    box.lookAt(0,0,0);

//  Function calls:
    configureInputs();
    setArrowHelpers();
    guiOptions();
    render();

    function render() {
        requestAnimationFrame(render);
        camera.updateProjectionMatrix();
        player.update();
        orbits();
        // TWEEN.update();
        renderer.render(scene, camera);

    }

    function getChildrenNames(obj) {
        names.push(obj.name)
        if (Array.isArray(obj.children) && obj.children.length){
            for(let child of obj.children){
                getChildrenNames(child)
            }
        }
    }

    function configureInputs() {
        //TODO: Configure global keyboard inputs...
        window.addEventListener('keydown', (e) => {
            switch(e.code){
                case('KeyS'):
                    // tweenTurnBack.start()
                    dirX = dirX.negate()
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
        if (player.dY !=0 ) scene.getObjectByName("Planet").rotateOnWorldAxis(dirY, player.dY);
        if (player.dX != 0) scene.getObjectByName("Planet").rotateOnWorldAxis(dirX,player.dX);
    }

    function setArrowHelpers(){
//      Set the Arrow Helpers for directions...
        const origin = new THREE.Vector3(1, 11, 0);
        const length = 0.5;
        const hex = 0xffffff;
        const dirX = new THREE.Vector3( 1, 0, 0 );
        const dirY = new THREE.Vector3( 0, 1, 0 );
        const dirZ = new THREE.Vector3( 0, 0, 1 );
            const arrowHelpers = [
            new THREE.ArrowHelper( dirX, origin, length, hex ),
            new THREE.ArrowHelper( dirY, origin, length, hex ),
            new THREE.ArrowHelper( dirZ, origin, length, hex )
        ];
        arrowHelpers.forEach((arrow) => {scene.add(arrow);});
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
        const lights = [
            scene.getObjectByName("star1Light"),
            scene.getObjectByName("star2Light"),
            scene.getObjectByName("lightEye")
        ];  
        lights.forEach(light => {
            const lightFolder = lightsFolder.addFolder(light.name);
            lightFolder.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
            lightFolder.add(light, 'intensity', 0, 1000);
            lightFolder.add(light, 'distance', 0, 1000);
            lightFolder.add(light, 'decay', 0, 2);
            if (light.name == 'lightEye') {
                lightFolder.add(light, 'angle', 0, 1.57);
                lightFolder.add(light, 'penumbra', 0, 1);

                const targetFolder = lightFolder.addFolder("Target");
                const lightTarget = astronaut.getObjectByName("lightTarget");
                targetFolder.add(lightTarget.position, 'x', 0,10);
                targetFolder.add(lightTarget.position, 'y', 0,10);
                targetFolder.add(lightTarget.position, 'z', 0,10);
            }
        });
    }

    function resize() {
        var factor = 0.9; // percentage of the screen
        var w = window.innerWidth * factor;
        var h = window.innerHeight * factor;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    };
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