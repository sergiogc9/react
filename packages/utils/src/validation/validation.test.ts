import * as validation from '.';

describe('Validation lib', () => {
	it('should return invalid phone with empty value', () => {
		expect(validation.isPhoneNumber(null)).toBe(false);
		expect(validation.isPhoneNumber(undefined)).toBe(false);
		expect(validation.isPhoneNumber(' ')).toBe(false);
	});

	it('should return invalid phone with invalid phone value', () => {
		expect(validation.isPhoneNumber('wrong')).toBe(false);
	});

	it('should return valid phone', () => {
		expect(validation.isPhoneNumber('694 584 033')).toBe(true);
		expect(validation.isPhoneNumber('694584033')).toBe(true);
		expect(validation.isPhoneNumber('69 458 40 33')).toBe(true);
		expect(validation.isPhoneNumber('694 58 40 33')).toBe(true);
		expect(validation.isPhoneNumber('+34 694584033')).toBe(true);
		expect(validation.isPhoneNumber('+34 694 58 40 33')).toBe(true);
	});
});
