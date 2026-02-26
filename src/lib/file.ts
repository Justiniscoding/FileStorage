export function parseFile(file: File): void {
	const reader = new FileReader();

	reader.onerror = error => {
		console.error(error);
	}
	reader.onload = () => {
		console.log("The result of the reader is " + reader.result);
	}
	reader.readAsText(file);
}
