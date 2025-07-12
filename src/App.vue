<!--
	App.vue
	-------

	Main base component for the site/app.
-->
<template>

	<!-- box that renders 3D objects & interactively lets you test queries -->
	<a id="demo"/>
	<br><br><br><br>
	<IntroVideoBox
		video-url="Vue-Win-Mgr-Demo.mp4"
		top-blurb="Check out this amazing window manager demo!"
		bottom-blurb="Let us know what you think after watching."
	/>

	<!-- overview video -->
	<a id="overview"/>
	<SectionHeader>Overview</SectionHeader>
	<br><br>
	<div class="overview-box">

		<h2>ThreeQuery In a Nutshell:</h2>
		<br>
		<p>Imagine in Blender you build a scene hierarchy:</p>
		<br>
		<img src="/img/blender_screen.png" width="100%"/>

		<br><br>
		<p>
			Notice how you can add <span class="cmd">#id-names</span> and <span class="cmd">.class-names</span>
			to objects, just by adding to their name in Blender:
			<br>(or your application of choice*)
		</p>
		<img src="/img/blender_names.png" width="100%"/>

		<br><br>
		After you export the Blender scene as <span class="cmd">MonkeyScene.glb</span>,
		you can then import using ThreeQuery, like so:
		<br><br>
		<img src="/img/load_monkeys.png" width="100%"/>

		<br><br>
		By using the <span class="cmd">.loadGeometry</span> method, all the loaded objects are scaned for the <span class="cmd">#id-names</span> and <span class="cmd">.class-names</span> provided in the Blender scene hierarchy.
		<br><br>
		Now you can do easy & fun stuff, with jQuery like syntax:
		<br><br>
		<img src="/img/code_sample.png" width="100%"/>
		<br><br>
		<em>*Note: in order for ThreeQuery to find the <span class="cmd">#id-names</span> and <span class="cmd">.class-names</span> in your scene, you need to add them to the name of the objects in your 3D application of choice. When you export the file, they must appear on the "userData.name" field of the imported ThreeJS model. Exporting a GLTF/GLB from Blender does this by default, other applications may or may not.</em>

		<br><br>
		<br><br>
		<h2>ThreeQuery Tutorial:</h2>
		<br>
		<p>
			Below is a full tutorial for how to get started with Blender + ThreeQuery!
		</p>
		<br>
		<div align="center" style="min-height: 60vh;">
			<iframe
				width="100%"
				style="width: 100%; aspect-ratio: 16/9; max-width: 1200px;"
				src="https://www.youtube.com/embed/pdj98sUquEM?si=1bbF55CglEGD84r1"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
			></iframe>
		</div>
	</div>
	
	<!-- markdown parsed & rendered from the readme -->
	<a id="get"/>
	<SectionHeader>Get</SectionHeader>
	<br><br>
	<div class="get-box">

		<h2>Install in your Project:</h2>
	
		<br><br>
		<h3>With NPM:</h3>	
		<pre class="code">npm install three-query</pre>
		Then...
		<pre class="code">import ThreeQuery from 'three-query';</pre>


		<br><br>
		<h3>Or use a CDN:</h3>
		<a href="https://unpkg.com/three-query@latest/dist/three-query.global.js" target="_blank">
			<pre class="code">https://unpkg.com/three-query@latest/dist/three-query.global.js</pre>
		</a>
		Then...
		<pre class="code">import ThreeQuery from 'https://unpkg.com/three-query@latest/dist/three-query.global.js';</pre>
		Or...
		<pre class="code">&lt;script src="https://unpkg.com/three-query@latest/dist/three-query.global.js"&gt;&lt;/script&gt;</pre>
		
		<br><br>
		<h2>Check out ThreeQuery over here:</h2>
		<div class="row">

			<div class="box">
				<div>
					Find it on
					<a href="https://www.npmjs.com/package/three-query?activeTab=readme" target="_blank">NPM:</a>
				</div>
				<a href="https://www.npmjs.com/package/three-query?activeTab=readme" target="_blank">
					<img class="site-logo" src="/img/npm_logo.png" alt="NPM Logo" height="70px"/>
				</a>
			</div>

			<div class="box">
				<div>
					Find it on
					<a href="https://github.com/orokro/ThreeQuery" target="_blank">GitHub:</a>
				</div>
				<a href="https://github.com/orokro/ThreeQuery" target="_blank">
					<img class="site-logo" src="/img/github_logo.png" alt="GitHub Logo" height="100px"/>
				</a>
			</div>

		</div>

	</div>

	<!-- markdown parsed & rendered from the readme -->
	<a id="docs"/>
	<SectionHeader>Docs</SectionHeader>
	<br><br>
	<TheDocs />

	<!-- bar long the top w/ links and whatnot -->
	<Header/>

	<br><br>
	<br><br>
	<div class="copy-right">&copy; Greg Miller / Orokro, 2025</div>
	<br><br>
</template>
<script setup>

// vue
import { ref } from 'vue';

// components
import Header from './components/Header.vue';
import TheDocs from './components/TheDocs.vue';
import SectionHeader from './components/SectionHeader.vue';
import MDBox from './components/MDBox.vue';
import IntroVideoBox from './components/IntroVideoBox.vue';

</script>

<style lang="scss">

	header {
		line-height: 1.5;
	}

	.logo {
		display: block;
		margin: 0 auto 2rem;
	}

	@media (min-width: 1024px) {
		header {
			display: flex;
			place-items: center;
			padding-right: calc(var(--section-gap) / 2);
		}

		.logo {
			margin: 0 2rem 0 0;
		}

		header .wrapper {
			display: flex;
			place-items: flex-start;
			flex-wrap: wrap;
		}
	}

	// add gradient & titled images to main page background
	body {

		/* background: linear-gradient(#5e5e5e, #000);
		background-position: fixed; */

		overflow-x: clip;

		// use pseudo element to add a vertical gradient that doesn't scroll with content
		&::before {

			// required content to make pseudo element work
			content: "";

			// fill screen
			position: fixed;
			inset: 0px 0px 0px 0px;
			width: 100vw;
			height: 100vh;

			// just a nice gradient
			background: linear-gradient(#AAA, #000);

			// always on bottom, no interaction
			z-index: -1;
			pointer-events: none;	
		}
	
		// use another pseudo element to add a tiled background image
		// that doesn't scroll with content
		&::after {

			// required content to make pseudo element work
			content: "";
			opacity: 0.33;
			// fill screen
			position: fixed;
			inset: 0px 0px 0px 0px;
			/* width: 100vw;*/
			height: 100vh; 

			// tiled background image over the screen
			background-image: url('/img/bg_tiles.png');
			background-size: 602px;
			background-repeat: repeat;
			background-position: center;

			// always on bottom, no interaction
			z-index: -1;
			pointer-events: none;	

		}// &::after

	}// body

	.get-box {

		background: white;

		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;

		.row {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			gap: 20px;

			.box {
				flex: 1 1 calc(50% - 20px);
				background: #f0f0f0;
				border-radius: 10px;
				padding: 20px;
				text-align: center;

				// Center content inside the box
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				text-align: center;

				.site-logo {
					margin-top: 20px;
				}

			}// .box

		}// .row

	}// .get-box

	// the overview section
	.overview-box {

		background: white;

		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;

		// slightly bigger
		font-size: 1.2rem;

		// the code cmd inline elements
		.cmd {

			// dark themed pill
			background: rgba(0, 0, 0, 0.7);			
			padding: 0px 15px;
			border-radius: 50px;

			// text styles
			font-family: monospace;
			font-weight: bolder;
			color: white;
		}// .cmd

	}// .overview-box

	.copy-right {
		text-align: center;
		color: white;
	}
	
</style>
