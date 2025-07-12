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

		background: rgba(0, 0, 0, 0.25);
		color: white;
		text-align: center;

		padding: 20px;

		h2 {

			font-weight: bolder;
			text-transform: uppercase;
			font-style: italic;
		}
	}

</style>
