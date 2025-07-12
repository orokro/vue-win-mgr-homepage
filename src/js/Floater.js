/*
	Floater.js
	----------

	Helper class to apply to our 3d objects to make them float and bob around in the scene.
*/

// three stuffs
import * as THREE from 'three';

export class Floater {

	/**
	 * Constructor for the Floater class.
	 * 
	 * @param {Object3D} object3D - The 3D object to apply the floating effect to.
	 * @param {Object} options - options for the floating effect, see comment below
	 */
	constructor(object3D, options = {}) {

		// save the object ref and start time
		this.object = object3D;
		this.startTime = performance.now();

		/**
		 * Either returns a value as-is, or if an array was provided, pick a random value from [min, max].
		 * 
		 * @param {Number} value - the value or an array of 2 values
		 * @param {Number} fallback - fallback value if value is undefined
		 * @param {String} name - parameter name for logging
		 * @returns {Number}
		 */
		const parseValue = (value, fallback, name) => {

			// if we got array, do the random
			if (Array.isArray(value)) {
				
				// get angy if array is not exactly 2 elements
				if (value.length !== 2)
					console.warn(`Floater: '${name}' array must have exactly 2 elements. Using first 2.`);
				
				const min = value[0];
				const max = value[1];
				return Math.random() * (max - min) + min;
			}

			// if we got a number, return it
			return value !== undefined ? value : fallback;
		};

		/**
		 * Either returns a vector 3 value as-is, or if an array was provided, pick a random value from [min, max].
		 * 
		 * @param {Vector3} value - the value or an array of 2 values
		 * @param {Vector3} fallback - fallback value if value is undefined
		 * @param {String} name - parameter name for logging
		 * @returns {Vector3}
		 */
		const parseVector3 = (value, fallback, name) => {

			// if we got array, do the random
			if (Array.isArray(value)) {

				// get angy if array is not exactly 2 elements
				if (value.length !== 2)
					console.warn(`Floater: '${name}' array must have exactly 2 Vector3s. Using first 2.`);

				const min = value[0];
				const max = value[1];
				return new THREE.Vector3(
					Math.random() * (max.x - min.x) + min.x,
					Math.random() * (max.y - min.y) + min.y,
					Math.random() * (max.z - min.z) + min.z
				);
			}

			// if we got a vector3, return it
			return value ? value.clone() : fallback.clone();
		};

		// Parse and assign parameters
		this.bobSpeed = parseValue(options.bobSpeed, 1, 'bobSpeed');
		this.bobAmplitude = parseValue(options.bobAmplitude, 1, 'bobAmplitude');
		this.bobAxis = parseVector3(options.bobAxis, new THREE.Vector3(0, 1, 0), 'bobAxis');
		this.bobPhase = parseValue(options.bobPhase, 0, 'bobPhase');

		this.rotSpeed = parseValue(options.rotSpeed, this.bobSpeed, 'rotSpeed');
		this.rotAmplitude = parseValue(options.rotAmplitude, 0.1, 'rotAmplitude');
		this.rotAxis = parseVector3(options.rotAxis, new THREE.Vector3(0, 1, 0.5), 'rotAxis');
		this.rotPhase = parseValue(options.rotPhase, 0, 'rotPhase');

		// Store initial position & rotation
		this.initialPosition = this.object.position.clone();
		this.initialRotation = this.object.rotation.clone();
	}


	/**
	 * Call this during render loop - updates the position and rotation of the object based on the floating effect.
	 */
	update() {
		const time = (performance.now() - this.startTime) / 1000; // seconds

		// Bobbing offset
		const bobOffset = Math.sin(time * this.bobSpeed + this.bobPhase) * this.bobAmplitude;
		const bobVector = this.bobAxis.clone().multiplyScalar(bobOffset);
		this.object.position.copy(this.initialPosition.clone().add(bobVector));

		// Rotational offset
		const rotOffset = Math.sin(time * this.rotSpeed + this.rotPhase) * this.rotAmplitude;
		this.object.rotation.x = this.initialRotation.x + this.rotAxis.x * rotOffset;
		this.object.rotation.y = this.initialRotation.y + this.rotAxis.y * rotOffset;
		this.object.rotation.z = this.initialRotation.z + this.rotAxis.z * rotOffset;
	}

}
