const expect = require('chai').expect;
const ImageLibrary = require('../index.js');

const imgLib = new ImageLibrary('/image-library/test/uploads', 'icons');

// console.log(imgLib);

// getImages

describe('getImages', () => {
	
	it('should return 3 images', (done) => {

		expect(imgLib.getImages().length).to.equal(3);
		done();

	});

});

// removeImage

// describe('removeImage', () => {
	
// });