import sharp from "sharp";

export function parseFile(file: File): Promise<Object> {
	return new Promise(async resolve => {
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		const nameLength = file.name.length;
		const fileNameArray = new Uint8Array(Buffer.from(file.name));
		const fileNameWithLengthArray = new Uint8Array(nameLength + 1);

		fileNameWithLengthArray[0] = nameLength;
		fileNameWithLengthArray.set(fileNameArray, 1);

		const imagePixelArray = Uint8Array.from(buffer);

		const imagePixelAmount = Math.ceil((buffer.length + nameLength + 1) / 4);

		let factor1 = 0;
		let factor2 = 0;

		for (let i = Math.ceil(Math.sqrt(imagePixelAmount)); i >= 1; i--) {
			if (imagePixelAmount % i == 0) {
				factor1 = i;
				factor2 = imagePixelAmount / i;
				break;
			}
		}

		const needToAdd = (factor1 * factor2 * 4 - buffer.length);
		const paddingArray = new Array(needToAdd).fill(0);

		paddingArray[0] = needToAdd - 1;
		const paddingElements = new Uint8Array(paddingArray);

		const fullImage = Buffer.concat([fileNameWithLengthArray, imagePixelArray, paddingElements]);

		const imageString = await sharp(fullImage, {
			raw: {
				width: factor1,
				height: factor2,
				channels: 4
			}
		}).png().toBuffer();

		resolve({
			file: `data:image/png;base64,${imageString.toString("base64")}`,
			fileName: `encoded ${file.name}`
		});
	});
}

export function decodeFile(file: File): Promise<Object> {
	return new Promise(async resolve => {
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		const { data, info } = await sharp(buffer).raw().toBuffer({ resolveWithObject: true });

		let cutoffAmount = 0;

		if (data[info.size - 1] == 0) {
			for (let i = info.size - 1; i >= 0; i--) {
				if (data[i] == 0) {
					continue;
				}

				let zeroAmount = info.size - 1 - i;
				if (zeroAmount == data[i]) {
					cutoffAmount = zeroAmount + 1;
					break;
				} else {
					// TODO : Throw an error for incompatible image
				}
			}
		}

		const fileBuffer = data.slice(data[0] + 1, info.size - cutoffAmount - 1);

		let fileName = data.slice(1, data[0] + 1).toString();

		const base64 = `data:text/plain;base64,` + fileBuffer.toString("base64");

		resolve({
			file: base64,
			fileName: fileName
		});
	});
}
