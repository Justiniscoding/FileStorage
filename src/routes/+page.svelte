<script lang="ts">
	let fileToDecode: FileList;
	let fileToEncode: FileList;

	function submitForm(event: SubmitEvent, type: String): void {
		if (type == "upload") {
			if (fileToEncode.length == 0) {
				return;
			}
		} else {
			if (fileToDecode.length == 0) {
				return;
			}
		}

		event.preventDefault();

		const formData = new FormData();
		if (type == "upload") {
			formData.append("file", fileToEncode[0]);
		} else {
			formData.append("file", fileToDecode[0]);
		}

		fetch(type == "upload" ? "/uploadFile" : "/decodeFile", {
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
<form
	action="/uploadFile"
	method="POST"
	enctype="multipart/form-data"
	onsubmit={(e) => submitForm(e, "upload")}
>
	<input type="file" name="file" bind:files={fileToEncode} />
	<input type="submit" />
</form>

<form
	action="/decodeFile"
	method="POST"
	enctype="multipart/form-data"
	onsubmit={(e) => submitForm(e, "decode")}
>
	<label for="file">File to decode</label>
	<input type="file" name="file" id="file" bind:files={fileToDecode} />
	<input type="submit" />
</form>
