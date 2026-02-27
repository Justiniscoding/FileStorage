<script lang="ts">
	let uploadedFile: FileList;

	function submitForm(event: SubmitEvent): void {
		if (uploadedFile.length == 0) {
			return;
		}

		event.preventDefault();

		const formData = new FormData();
		formData.append("file", uploadedFile[0]);

		fetch("/decodeFile", {
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

<h1>File Storage</h1>
<form action="/uploadFile" method="POST" enctype="multipart/form-data">
	<input type="file" name="file" />
	<input type="submit" />
</form>

<form
	action="/decodeFile"
	method="POST"
	enctype="multipart/form-data"
	onsubmit={submitForm}
>
	<label for="file">File to decode</label>
	<input type="file" name="file" id="file" bind:files={uploadedFile} />
	<input type="submit" />
</form>
