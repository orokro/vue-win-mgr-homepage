<!--
	TryMeBox.vue
	------------

	The box that begs the viewer to try.
-->
<template>

	<!-- outer most wrapper -->
	<div class="try-me-box">

		<!-- animated arrow on bottom left -->
		<div 
			class="arrow"
			:class="{
				hide: boxIsFocused
			}"
		/>

		<!-- content -->
		<div class="content">

			<h2
				:class="{
					hide: boxIsFocused
				}"
			>
				Try me!
			</h2>

			<div 
				v-if="!boxIsFocused"
				class="click-target"
				@click="emit('query-clicked', '.hat')"
			/>
			
			<div 
				class="text"
				:class="{
					hide: !boxIsFocused
				}"
			>
				Try something like:
				<ul>
					<li>
						<span 
							class="cmd" 
							@click="emit('query-clicked', '#tophat')"
						>#tophat</span>
					</li>
					<li>
						<span 
							class="cmd" 
							@click="emit('query-clicked', '.ball')"
						>.ball</span>
					</li>
					<li>
						<span 
							class="cmd" 
							@click="emit('query-clicked', '.ball.red')"
							>.ball.red</span>
					</li>
					<li>
						<span 
							class="cmd" 
							@click="emit('query-clicked', '.cube, .ball')"
						>.cube, .ball</span>
					</li>
					<li>
						<span 
							class="cmd" 
							@click="emit('query-clicked', '.feather')"
						>.feather</span>
					</li>
					<li>
						<span 
							class="cmd" 
							@click="emit('query-clicked', '.hat .feather')"
							>.hat .feather</span>
					</li>
				</ul>
				
			</div>

		</div>
	</div>

</template>
<script setup>

// vue
import { onMounted } from 'vue';

// props
const props = defineProps({
	
	// no props for now
	boxIsFocused: {
		type: Boolean,
		default: false
	},

});

// when the box is clicked, emit an event
const emit = defineEmits(['query-clicked']);

</script>
<style lang="scss" scoped>

	// outer most box
	.try-me-box {

		// for debug
		/* border: 1px solid red; */

		// no annoying text selection
		user-select: none;
		pointer-events: none;

		// fixed size
		width: 190px;
		height: 150px;

		// animated arrow on the bottom-left
		.arrow {

			// hide after focus
			opacity: 1;
			transition: opacity 0.3s ease-in-out;
			&.hide {
				opacity: 0.0;
			}

			// for debug
			/* border: 1px solid red; */
			// fixed on bottom
			position: absolute;
			bottom: 65px;
			left: -100px;

			// animated
			animation: arrow-ani 4s ease-in-out infinite;

			// fixed size
			width: 148px;
			height: 111px;

			// load bg image
			background-image: url('/img/try_me_arrow.png');
			background-size: 100% 100%;
			background-repeat: no-repeat;

			transform-origin: bottom right;
			@keyframes arrow-ani {
				0%{
					transform: rotate(-10deg) scale(0.75);
				}

				50%{
					transform: rotate(-15deg) scale(0.75);
				}

				100%{
					transform: rotate(-10deg) scale(0.75);
				}
			}

		}// .arrow


		// box w/ content
		.content {

			// fixed fill parent
			position: absolute;
			inset: 0px 0px 0px 0px;
			
			background: white;
			border: 3px solid black;
			border-radius: 10px;

			// TRY ME
			h2 {

				// centered
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);

				// text settings
				font-size: 30px;
				color: #00ABAE;
				font-weight: bolder;
				text-transform: uppercase;
				white-space: nowrap;

				// animate fade out
				opacity: 1;
				transition: opacity 0.3s ease-in-out;
				&.hide {
					opacity: 0.0;
				}			

				// animate the text
				animation: rotate-left 2s ease-in-out infinite alternate;

				// rotate left/right keyframes
				@keyframes rotate-left {
					0% {
						transform: translate(-50%, -50%) rotate(10deg);
					}
					100% {
						transform: translate(-50%, -50%) rotate(-10deg);
					}
				}
			}

			// invisible panel to allow clicks while "TRY ME" is shown
			.click-target {

				// clickable
				pointer-events: initial;
				cursor: pointer;

				// fill container
				position: absolute;
				inset: 0px 0px 0px 0px;

			}// .click-target

			// text box
			.text {

				// animate fade out
				opacity: 1;
				transition: opacity 0.3s ease-in-out;
				&.hide {
					opacity: 0.0;
				}	

				padding: 2px 10px;

				ul {
					margin: 0px;
					line-height: 17px;
				}

				li {
					margin: 0px;
					padding: 0px;
					line-height: 17px;
					
					.cmd {

						pointer-events: initial;

						font-family: monospace;
						font-weight: bolder;
						background: rgba(0, 0, 0, 0.8);
						color: white;
						padding: 0px 5px;
						border-radius: 20px;
					
						cursor: pointer;
						&:hover {
							background: #00ABAE;
						}
					}// .cmd

				}// li

			}// .text

		}// .content

	}// .try-me-box

</style>
