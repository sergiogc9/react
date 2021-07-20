import * as lib from '.';

const image = 'fake-img';
const croppedImg = 'fake-cropped-img';
const fakeFile = new File([''], 'fake', { type: 'image/png' });
let imageWidth: number;
let imageHeight: number;
(global as any).Image = class extends Image {
	constructor() {
		super();
		setTimeout(() => {
			this.onload();
		}, 100);
	}

	public height = imageHeight;
	public width = imageWidth;

	public onload = () => {};
};

const drawImageMock = jest.fn();
const createElement = document.createElement.bind(document);
document.createElement = (tagName: any) => {
	if (tagName === 'canvas') {
		return {
			getContext: () => ({ drawImage: drawImageMock }),
			toDataURL: () => croppedImg
		};
	}
	return createElement(tagName);
};

describe('image lib', () => {
	beforeEach(() => {
		imageWidth = 10;
		imageHeight = 10;
	});
	it('should crop image', async () => {
		const cropped = await lib.cropImage(image, { x: 10, y: 10, width: 100, height: 100 });
		expect(cropped).toBe(croppedImg);
	});

	it('should get image from file', async () => {
		const fileImage = await lib.getImageFromFile(fakeFile);
		expect(fileImage).toBe('data:image/png;base64,');
	});

	it('should resize image with smaller image', async () => {
		const cropped = await lib.resizeImage(image);
		expect(cropped).toBe(croppedImg);
		expect(drawImageMock).toHaveBeenCalledWith(expect.anything(), 0, 0, imageWidth, imageHeight);
	});

	it('should resize image with smaller non-squared image', async () => {
		imageWidth = 20;
		const cropped = await lib.resizeImage(image);
		expect(cropped).toBe(croppedImg);
		expect(drawImageMock).toHaveBeenCalledWith(expect.anything(), 0, 0, imageWidth, imageHeight);
	});

	it('should resize image with higher width image', async () => {
		imageWidth = 2000;
		const cropped = await lib.resizeImage(image, 1000);
		expect(cropped).toBe(croppedImg);
		expect(drawImageMock).toHaveBeenCalledWith(expect.anything(), 0, 0, 1000, imageHeight / 2);
	});

	it('should resize image with higher height image', async () => {
		imageHeight = 2000;
		const cropped = await lib.resizeImage(image, 1000);
		expect(cropped).toBe(croppedImg);
		expect(drawImageMock).toHaveBeenCalledWith(expect.anything(), 0, 0, imageWidth / 2, 1000);
	});

	it('should convert image to byte array', async () => {
		const smallImage =
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
		const bytes = lib.convertImageToByteArray(smallImage);
		//  prettier-ignore
		expect(bytes).toEqual([137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0, 0, 0, 1, 8, 6, 0, 0, 0, 31, 21, 196, 137, 0, 0, 0, 13, 73, 68, 65, 84, 120, 218, 99, 252, 207, 192, 80, 15, 0, 4, 133, 1, 128, 132, 169, 140, 33, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130]);
	});
});
