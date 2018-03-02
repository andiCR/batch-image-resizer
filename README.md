# Image resizer

[![dependencies](https://david-dm.org/timvanscherpenzeel/image-resizer.svg)](https://david-dm.org/timvanscherpenzeel/image-resizer)
[![devDependencies](https://david-dm.org/timvanscherpenzeel/image-resizer/dev-status.svg)](https://david-dm.org/timvanscherpenzeel/image-resizer#info=devDependencies)

CLI tool for resizing images using [sharp](https://github.com/lovell/sharp) and optimising `jpg` and `png` files using [imagemin](https://github.com/imagemin/imagemin). The CLI tool does not require `imagemagick` or `graphicsmagick` to be installed.

Supports both single files as well as recursive file finding and processing using a glob pattern.

## Installation

```sh
$ npm install
```

## Example

Directory glob
```sh
$ node ./bin/image-resizer.js -i ./input -o ./output -s "[50, 500, 1000, 1500]"
```

Specific file
```sh
$ node ./bin/image-resizer.js -i ./input/example.png -o ./output/example.png -s "[50, 500, 1000, 1500]"
```

Which in turn creates
```sh
input
└── example.jpg

output
├── example-1000w.jpg
├── example-1500w.jpg
├── example-500w.jpg
└── example-50w.jpg
```

## Flags

### Default
	-v, --version [print version number]
	-h, --help [print help]

### Required
	-i, --input [example: -i ./input/example.png] [example: -i ./input] [required]
	-o, --output [example: -o ./output/example.png] [example: -o ./output] [required]

### Optional
	-s, --sizes [example: -s "[50, 500, 1000, 1500]"] [not required]

## Formats

```html
<img
	alt="Example image description"
	srcset="example-500w.jpg 500w, example-1000w.jpg 1000w, example-1500w.jpg 1500w"
	src="example-1000w.jpg"
/>

<picture>
	<source srcset="example-500w.webp 500w, example-1000w.webp 1000w, example-1500w.webp 1500w" type="image/webp">
	<source srcset="example-500w.jpg 500w, example-1000w.jpg 1000w, example-1500w.jpg 1500w" type="image/jpeg">
	<img src="example-500w.jpg" alt="Example image description">
</picture>
```

## Licence

My work is released under the [MIT license](https://raw.githubusercontent.com/TimvanScherpenzeel/detect-features/master/LICENSE).