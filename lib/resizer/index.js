// Native
const fs = require('fs');

// Vendor
const imagemin = require('imagemin');
const imageminPluginJpegtran = require('imagemin-jpegtran');
const imageminPluginPngquant = require('imagemin-pngquant');
const sharp = require('sharp');

// Utilities
const {
	getFilePath,
	getFilename,
	getFileExtension,
 } = require('../utilities');

const resizer = (input, output, size) => {
	const outputPath = getFilePath(output);
	const outputFilename = getFilename(output);
	const outputExtension = getFileExtension(output);

	const image = sharp(input);

	image
		.metadata()
		.then((metadata) => {
			const imageSize = (size === undefined) ? metadata.width : size;

			return image
				.resize(imageSize)
				.toBuffer();
		})
		.then(data => imagemin.buffer(data, {
			plugins: [
				imageminPluginJpegtran(),
				imageminPluginPngquant(),
			],
		}))
		.then((outputBuffer) => {
			const filenameStructure = `${outputPath}${outputFilename}${(size) ? `-${size}w` : ''}${outputExtension}`;

			fs.writeFile(filenameStructure, outputBuffer, (error) => {
				if (!error) {
					console.log(`Written file to ${filenameStructure}`);
				} else {
					console.error(error);
				}
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

module.exports = resizer;
