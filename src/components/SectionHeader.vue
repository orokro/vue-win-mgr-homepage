<!--
	SectionHeader.vue
	-----------------

	Horizontal Separator for the home page sections
-->
<template>
	<div class="section-header">
		<div class="section-header-line"></div>
		<h2 class="section-header-text">
			<slot/>
		</h2>
	</div>
</template>
<script setup>

// vue
import { ref, onMounted } from 'vue';

</script>
<style lang="scss" scoped>

	.section-header {

		/* display: none; */

		// fill page width & provide room above
		width: 100vw;
		
		/* box-sizing: content-box; */
		margin-top: 150px;

		/* border: 1px solid red; */

		background: rgba(255, 255, 255, 0.25);
		font-size: 30px;
		color: white;
		text-align: center;
		text-shadow: 3px 2px 0px rgba(0, 0, 0, 0.5);
		padding: 5px;

		h2 {

			font-weight: bolder;
			text-transform: uppercase;
			font-style: italic;
		}
	}

</style>
