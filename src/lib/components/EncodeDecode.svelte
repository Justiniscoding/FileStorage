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
		<p>Upload your file here</p>
		<input
			type="file"
			name="file"
			id="file"
			bind:files={uploadedFiles}
			accept="image/*"
		/>
		<button type="submit">{isEncoding ? "Encode" : "Decode"}</button>
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
		background-color: #f39193;
		width: 100%;
		height: 100%;

		position: absolute;
		top: 0;
		left: 0;
	}

	.titleMovingBackground {
		width: 50%;
		height: 100%;

		background-color: #73b8ff;
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
		/* background-color: red; */
	}

	/* .titleOption.selected { */
	/* 	background-color: #97c142; */
	/* } */

	form {
		display: flex;
		flex-direction: column;
	}
</style>
