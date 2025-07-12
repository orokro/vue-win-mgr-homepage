<!--
	IntroVideoBox.vue
	-----------------

	Shows video & some blurbs
-->
<template>
	<div class="intro-video-box">
		<p class="blurb-top">{{ topBlurb }}</p>
		<video
			class="video-player"
			:src="videoUrl"
			autoplay
			loop
			muted
			playsinline
			controls
		></video>
		<p class="blurb-bottom">{{ bottomBlurb }}</p>
	</div>
</template>

<script setup>
defineProps({
	videoUrl: {
		type: String,
		required: true,
	},
	topBlurb: {
		type: String,
		default: '',
	},
	bottomBlurb: {
		type: String,
		default: '',
	},
});
</script>

<style lang="scss">
.intro-video-box {
	max-width: 1200px;
	margin: 0 auto;
	padding: 1rem;
	text-align: center;

	.video-player {
		width: 100%;
		height: auto;
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		margin: 1rem 0;
	}

	.blurb-top,
	.blurb-bottom {
		font-size: 1.1rem;
		color: #333;
	}
}
</style>
