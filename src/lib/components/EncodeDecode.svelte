<script lang="ts">
	let isEncoding = $state(true);

	let uploadedFiles: FileList | null = $state(null);

	function submitForm(event: SubmitEvent): void {
		if (!uploadedFiles || uploadedFiles.length == 0) {
			return;
		}

		event.preventDefault();

		const formData = new FormData();
		formData.append("file", uploadedFiles[0]);

		fetch(isEncoding ? "/uploadFile" : "/decodeFile", {
			method: "POST",
			body: formData,
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				const a = document.createElement("a");

				a.href = data.file;
				a.download = data.fileName;

				document.body.appendChild(a);

				a.click();

				document.body.removeChild(a);
			});
	}
</script>

<div class="container">
	<div class="titleBar">
		<button class="titleOption" onclick={() => (isEncoding = true)}
			>Encode</button
		>
		<button class="titleOption" onclick={() => (isEncoding = false)}
			>Decode</button
		>
		<div class="titleStaticBackground"></div>
		<div class="titleMovingBackground" class:selected={isEncoding}></div>
	</div>
	<form
		action="/decodeFile"
		method="POST"
		enctype="multipart/form-data"
		onsubmit={submitForm}
	>
		<p class="uploadText">Upload your file here!</p>
		<input
			type="file"
			name="file"
			id="file"
			bind:files={uploadedFiles}
			accept="image/*"
		/>
		<button type="submit" class="encodeButton"
			>{isEncoding ? "Encode" : "Decode"}</button
		>
	</form>
</div>

<style>
	.container {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		border: 2px solid #e6495a;
		padding: 0.5vw;

		width: 50vw;
	}

	.titleBar {
		width: 100%;
		height: 2vw;

		display: flex;
		flex-direction: row;

		position: relative;
	}

	.titleStaticBackground {
		background-color: #b09165;
		width: 100%;
		height: 100%;

		position: absolute;
		top: 0;
		left: 0;
	}

	.titleMovingBackground {
		width: 50%;
		height: 100%;

		background-color: #59c2ff;
		position: absolute;
		top: 0;
		left: 0;

		transition: 0.5s;
		transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);

		transform: translateX(100%);
	}

	.selected {
		transform: translateX(0);
	}

	.titleOption {
		width: 50%;
		height: 100%;
		text-align: center;
		border: none;
		cursor: pointer;

		color: black;
		background-color: transparent;

		z-index: 11;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	#file {
		background-color: #ff8f40;
		padding: 1vw 2vw;
		border: 0.1vw dashed #5a6673;
		border-radius: 0.5vw;
		margin-bottom: 2vw;
	}

	#file::file-selector-button {
		border: none;
		background-color: #333;
		margin-right: 2vw;
	}

	.uploadText {
		text-align: center;
		font-family: monospace;
		font-size: 1vw;
	}

	.encodeButton {
		border: 0.1vw solid black;
		padding: 0.75vw 1vw;
		width: 15vw;
		cursor: pointer;
		border-radius: 0.5vw;
		font-size: 1vw;
	}
</style>
