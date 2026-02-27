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
		<button
			class="titleOption"
			class:selected={isEncoding}
			onclick={() => (isEncoding = !isEncoding)}>Encode</button
		>
		<button
			class="titleOption"
			class:selected={!isEncoding}
			onclick={() => (isEncoding = !isEncoding)}>Decode</button
		>
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

		display: flex;
		flex-direction: row;
	}

	.titleOption {
		width: 50%;
		height: 2vw;
		text-align: center;
		border: none;
		transition: 0.2s;
		cursor: pointer;
	}

	.titleOption.selected {
		background-color: #97c142;
	}

	form {
		display: flex;
		flex-direction: column;
	}
</style>
