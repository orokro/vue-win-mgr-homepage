/*
	DemoThreeScene.js
	-----------------

	Sets up the scene with all the floating objects using three-query & three.js.

	Also provides code to manage the particle system & the ability for the UI to test the Query system
*/

// threeJS stuffs
import * as THREE from 'three'
import ThreeQuery from 'three-query';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

// our app classes
import { Floater } from './Floater.js';

// main export
export default class DemoThreeScene {

	/**
	 * Constructor for the DemoThreeScene class.
	 * 
	 * @param {HTMLElement} parentContainerElement - The parent container element where the scene will be rendered.	
	 */
	constructor(parentContainerElement) {

		// save where we'll mount
		this.container = parentContainerElement;

		// our array of floaters after we've set up the scene
		// (floaters = classes to make objects float around)
		this.floaters = [];

		// continue constructor in our async init method
		this.init();
	}


	/**
	 * Async initialization
	 */
	async init() {

		// build the scene with our floating 3D objects and all that
		await this.buildScene();
		const $ = this.$;

		// load HDR lighting
		await this.loadHDR();

		// load our demo shapes & add 'em to the scene
		const obj = await this.tq.loadGeometry('glb', 'demo_shapes.glb');
		this.sceneDetails.scene.add(obj);

		// cache all the colors for our object in the scene
		$('*').each((item) => {

			const $item = $(item);
			const material = $item.material();
	
			if(material!==undefined && material.color){
			item.material = material.clone();
				item.initial_color = material.color.clone();
			}
		});

		// scale up our base size
		const scale = 2.0;
		this.$('#demo-shapes').scale(scale, scale, scale);

		// set up our floaters now that the scene is built
		await this.setupFloaters();
	}


	/**
	 * Loads an HDR environment map and sets it for lighting/reflections.
	 */
	async loadHDR() {

		const { scene, renderer } = this.sceneDetails;

		const rgbeLoader = new RGBELoader();
		const pmremGenerator = new THREE.PMREMGenerator(renderer);
		pmremGenerator.compileEquirectangularShader();

		const hdrTexture = await rgbeLoader.loadAsync('venice_sunset_2k.hdr');
		const envMap = pmremGenerator.fromEquirectangular(hdrTexture).texture;

		scene.environment = envMap;

		hdrTexture.dispose();
		pmremGenerator.dispose();
	}


	/**
	 * Sets up the ThreeJS scene / loads objects / etc
	 */
	async buildScene() {

		// build default scene from our Lib!
		const { scene, lights, cube, camera, renderer } = ThreeQuery.createScene(
			this.container,
			{
				autoSize: true,
				autoRender: true,
				addCube: false,
				addLights: true,
				addControls: false,
				onRender: () => {
					this.render();
				}
			}
		);

		// adjust our lights
		lights.ambientLight.intensity = 0.5;
		lights.directionalLight.intensity = 6.5;

		// adjust our fov a bit
		camera.fov = 45;

		// disable the background
		renderer.setClearColor(0x000000, 0);

		// save to our globals
		this.tq = new ThreeQuery(scene, renderer, camera);
		this.$ = this.tq.$.bind(this.tq);
		this.sceneDetails = {
			scene,
			lights,
			cube,
			renderer,
			camera
		};

		// make a re-usable loader for the glb files.
		// this will automatically scan the object
		const gltfLoader = new GLTFLoader();
		this.tq.addLoader('glb', async (filePath) => {
			const obj = await gltfLoader.loadAsync(filePath);
			return obj.scene;
		});

		// make the base group a bit bigger
		window.tq = this.tq;
		window.$ = this.$;
		window.sceneDetails = this.sceneDetails;
	}


	/**
	 * Sets up the floaters in the scene
	 */
	async setupFloaters() {

		// #demo-shapes is the empty group holding the children to float
		const rootContainer = this.$('#demo-shapes').object();
		const items = rootContainer.children;

		// make a floater for each
		for (const item of items) {

			const newFloater = new Floater(item, {

				// bob speed in seconds (random range)
				bobSpeed: [0.25, 0.5],

				// phase offset (random range)
				bobPhaseOffset: [0, Math.PI * 2],

				// bob amplitude (random range)
				bobAmplitude: [0.01, 0.05],

				// rotation speed in seconds (random range)
				rotSpeed: [0.5, 1.5],
			});

			// add to our array
			this.floaters.push(newFloater);

		}// next item
	}


	/**
	 * Called every render
	 */
	render() {

		// update all the floaters
		this.floaters.map(floater => floater.update());
	}


	/**
	 * Performs raycasting to detect which 3D object is under the cursor.
	 * 
	 * @param {MouseEvent} event - The mousemove event from the DOM.
	 * @returns {string | string[] | null} The name(s) of intersected objects or null if none.
	 */
	cursorRaycast(event) {

		const { camera, renderer, scene } = this.sceneDetails;

		// Calculate normalized device coordinates (-1 to +1) for the pointer
		const rect = renderer.domElement.getBoundingClientRect();
		const mouse = new THREE.Vector2(
			((event.clientX - rect.left) / rect.width) * 2 - 1,
			-((event.clientY - rect.top) / rect.height) * 2 + 1
		);

		// Set up raycaster
		const raycaster = new THREE.Raycaster();
		raycaster.setFromCamera(mouse, camera);

		// Raycast against all mesh objects
		const intersects = raycaster.intersectObjects(scene.children, true);

		if (intersects.length === 0) return null;

		const names = intersects.map(hit => hit.object.userData.name).filter(name => name);

		// Return single name or array depending on hit count
		if (names.length === 1) return names[0];
		if (names.length > 1) return names;

		// if names are missing
		return null; 
	}


	queryInput(queryString){

		const $ = this.$;

		// if the string is empty, re-apply all initial colors
		if(queryString === '') {
			$('*').each((item) => {
				const $item = $(item);
				const initialColor = item.initial_color;
				if(initialColor) {
					$item.material({color: initialColor });
				}
			});
			return;
		}

		// otherwise, make everything gray
		const grayColor = new THREE.Color(0x888888);
		$('*').each((item) => {
			const $item = $(item);
			$item.material() ? $item.material({color: grayColor }) : null;
		});

		// console.log('queryInput', queryString);
		$(queryString).each((item) => {
				const $item = $(item);
				const initialColor = item.initial_color;
				if(initialColor) {
					$item.material({color: initialColor });
				}
			});
		}
}
