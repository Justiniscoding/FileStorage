import sharp from "sharp";

export function parseFile(file: File): Promise<void> {
	return new Promise(async resolve => {
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		const imagePixelArray = Uint8Array.from(buffer);

		const imagePixelAmount = Math.ceil(buffer.length / 4);

		let factor1 = 0;
		let factor2 = 0;

		for (let i = Math.ceil(Math.sqrt(imagePixelAmount)); i >= 1; i--) {
			if (imagePixelAmount % i == 0) {
				factor1 = i;
				factor2 = imagePixelAmount / i;
				break;
			}
		}


		let needToAdd = (factor1 * factor2 * 4 - buffer.length);
		const paddingElements = new Uint8Array(new Array(needToAdd).fill(0));

		const fullImage = Buffer.concat([imagePixelArray, paddingElements]);

		sharp(fullImage, {
			raw: {
				width: factor1,
				height: factor2,
				channels: 4
			}
		}).png().toFile("file.png");

		resolve();
	});
}
