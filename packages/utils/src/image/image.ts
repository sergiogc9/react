import { CropArea } from './types';

/**
 * Crops an image using a defined area.
 * @param image The image to crop as base64 string
 * @param cropArea The area to crop the image
 * @returns The cropped image as base64 string
 */
export const cropImage = (image: string, cropArea: CropArea) => {
	return new Promise<string>(resolve => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d')!;

		const JSImage = new Image();
		JSImage.onload = () => {
			canvas.width = cropArea.width;
			canvas.height = cropArea.height;
			ctx.drawImage(
				JSImage,
				cropArea.x,
				cropArea.y,
				cropArea.width,
				cropArea.height,
				0,
				0,
				canvas.width,
				canvas.height
			);

			resolve(canvas.toDataURL('image/png'));
		};
		JSImage.src = image!;
	});
};

/**
 * Converts a File object into a base64 image string
 * @param file The file to be converted
 * @returns The image as base64 string
 */
export const getImageFromFile = (file: File) => {
	return new Promise<string>(resolve => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result as string);
		reader.readAsDataURL(file);
	});
};

/**
 * Resizes the image to a desired max width or height. If the image is smaller, no resize is performed.
 * @param image The image in base64 string
 * @param maxSize The maximum size (in px) of the image (only width or height depending on aspect-ratio)
 * @returns The resized image as base64 string.
 */
export const resizeImage = (image: string, maxSize = 1024) => {
	return new Promise<string>(resolve => {
		const JSImage = new Image();
		JSImage.onload = () => {
			const canvas = document.createElement('canvas');

			let { height, width } = JSImage;

			if (width > height) {
				if (width > maxSize) {
					height *= maxSize / width;
					width = maxSize;
				}
			} else if (height > maxSize) {
				width *= maxSize / height;
				height = maxSize;
			}

			canvas.width = width;
			canvas.height = height;
			const ctx = canvas.getContext('2d')!;
			ctx.drawImage(JSImage, 0, 0, width, height);

			resolve(canvas.toDataURL('image/png'));
		};
		JSImage.src = image;
	});
};

/**
 * Converts a base64 string image into an array of bytes.
 * @param image The image in base64 string
 * @returns The image in an array of bytes.
 */
export const convertImageToByteArray = (image: string) => {
	const binaryString = window.atob(image.replace('data:image/png;base64,', ''));
	const len = binaryString.length;
	const bytes = new Uint8Array(len);
	for (let i = 0; i < len; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}
	return Array.from(new Uint8Array(bytes.buffer));
};
