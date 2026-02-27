<script lang="ts">
	import EncodeDecode from "$lib/components/EncodeDecode.svelte";
</script>

<h1>Imagify Anything!</h1>
<p>
	This website allows you to turn <u><b>any</b></u> file into an image for easier
	sharing with others :) Just encode your file, send it to all of your friends
	(if any), and then decode it back into its former glory!
</p>

<div class="encodeDecodeContainer">
	<EncodeDecode />
</div>

<style>
	:global(:root) {
		color-scheme: light dark;
	}

	:global(body) {
		background-color: light-dark(#fcfcfc, #10141c);
	}

	.encodeDecodeContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	h1,
	p {
		text-align: center;
	}
</style>
