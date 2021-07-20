import React from 'react';

/**
 * Fetches an image and returns it as an encoded base64 image
 * @param url The image source url
 * @returns The image in base64 encoded string
 */
const useFetchImage = (url: string | null) => {
	const [image, setImage] = React.useState<HTMLImageElement | null>(null);
	const [imageBase64, setImageBase64] = React.useState<string | null>(null);

	React.useEffect(() => {
		if (url) {
			const fetchImage = (retry: number) => {
				const newImage = new Image();
				newImage.addEventListener('load', () => setImage(newImage));
				newImage.addEventListener('error', () => {
					// Retry if some error ocurred. e.g. S3 fails for CORS sometimes.
					if (retry > 1) {
						return fetchImage(retry - 1);
					}
				});
				newImage.setAttribute('crossOrigin', 'anonymous');
				newImage.src = url;
			};
			fetchImage(10);
		} else setImage(null);
	}, [url]);

	React.useEffect(() => {
		if (image) {
			const canvas = document.createElement('canvas');
			canvas.width = image.width;
			canvas.height = image.height;
			const ctx = canvas.getContext('2d')!;
			ctx.drawImage(image, 0, 0);
			setImageBase64(canvas.toDataURL('image/png'));
		} else setImageBase64(null);
	}, [image]);

	return imageBase64;
};

export default useFetchImage;
