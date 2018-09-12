// Vendor
const { ArgumentParser } = require('argparse');

// Package
const pkg = require('../package.json');

const createParserArguments = () => {
	const parser = new ArgumentParser({
		version: pkg.version,
		addHelp: true,
		description: pkg.description,
	});

	// File or directory input flag
	parser.addArgument(['-i', '--input'], {
		help: 'Input file including path or input folder to recursively get input files from',
		required: true,
	});

	// File or directory output flag
	parser.addArgument(['-o', '--output'], {
		help: 'Output file including path or output folder to recursively write output files to',
		required: true,
	});

	// File dimensions flag
	parser.addArgument(['-s', '--sizes'], {
		help: 'File dimensions',
		required: false,
	});

	// Fit to box (picks largest dimension)
	parser.addArgument(['-f', '--fit'], {
		dest: 'fit',
		help: 'Enable fit to maximum dimensions',
		required: false,
		action: 'storeTrue',
	});

	// Keep filenames unchanged
	parser.addArgument(['-k', '--keep-name'], {
		dest: 'keepName',
		help: 'Disable appending size into name, e.g. -1500w',
		required: false,
		action: 'storeTrue',
	});

	const args = parser.parseArgs();

	return args;
};

const args = createParserArguments();

module.exports = args;
