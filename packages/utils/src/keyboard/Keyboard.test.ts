import Keyboard from '.';

describe('Testing Keyboard class', () => {
	it('should return false if provided key is not implemented', () => {
		expect(Keyboard.isKey('Fake' as any, 13)).toBe(false);
		expect(Keyboard.isKey('Fake' as any, 'Enter')).toBe(false);
	});

	it('should return true if key which or key code are the ones for the Enter key', () => {
		expect(Keyboard.isKey('Enter', 13)).toBe(true);
		expect(Keyboard.isKey('Enter', 'Enter')).toBe(true);
	});

	it('should return false when key which or key code are not the ones for the Enter key', () => {
		expect(Keyboard.isKey('Enter', 5)).toBe(false);
		expect(Keyboard.isKey('Enter', '515')).toBe(false);
	});

	it('should return true if key which or key code are the ones for the Escape key', () => {
		expect(Keyboard.isKey('Escape', 27)).toBe(true);
		expect(Keyboard.isKey('Escape', 'Escape')).toBe(true);
	});

	it('should return false when key which or key code are not the ones for the Escape key', () => {
		expect(Keyboard.isKey('Escape', 54)).toBe(false);
		expect(Keyboard.isKey('Escape', 'sknk')).toBe(false);
	});

	it('should return true if key which or key code are the ones for the ArrowDown key', () => {
		expect(Keyboard.isKey('ArrowDown', 40)).toBe(true);
		expect(Keyboard.isKey('ArrowDown', 'ArrowDown')).toBe(true);
	});

	it('should return false if key which or key code are the ones for the ArrowDown key', () => {
		expect(Keyboard.isKey('ArrowDown', 70)).toBe(false);
		expect(Keyboard.isKey('ArrowDown', 'Ar54n')).toBe(false);
	});

	it('should return true if key which or key code are the ones for the ArrowUp key', () => {
		expect(Keyboard.isKey('ArrowUp', 38)).toBe(true);
		expect(Keyboard.isKey('ArrowUp', 'ArrowUp')).toBe(true);
	});

	it('should return false if key which or key code are the ones for the ArrowUp key', () => {
		expect(Keyboard.isKey('ArrowUp', 70)).toBe(false);
		expect(Keyboard.isKey('ArrowUp', 'Ar54n')).toBe(false);
	});

	it('should return true if key which or key code are the ones for the Tab key', () => {
		expect(Keyboard.isKey('Tab', 9)).toBe(true);
		expect(Keyboard.isKey('Tab', 'Tab')).toBe(true);
	});

	it('should return false if key which or key code are the ones for the Tab key', () => {
		expect(Keyboard.isKey('Tab', 70)).toBe(false);
		expect(Keyboard.isKey('Tab', 'Ar54n')).toBe(false);
	});

	it('should return true if key which or key code are the ones for the End key', () => {
		expect(Keyboard.isKey('End', 8)).toBe(true);
		expect(Keyboard.isKey('End', 'End')).toBe(true);
	});

	it('should return false if key which or key code are the ones for the End key', () => {
		expect(Keyboard.isKey('End', 70)).toBe(false);
		expect(Keyboard.isKey('End', 'Ar54n')).toBe(false);
	});

	it('should return true if key which or key code are the ones for the Home key', () => {
		expect(Keyboard.isKey('Home', 36)).toBe(true);
		expect(Keyboard.isKey('Home', 'Home')).toBe(true);
	});

	it('should return false if key which or key code are the ones for the Home key', () => {
		expect(Keyboard.isKey('Home', 70)).toBe(false);
		expect(Keyboard.isKey('Home', 'Ar54n')).toBe(false);
	});

	it('should return true if key which or key code are the ones for the Backspace key', () => {
		expect(Keyboard.isKey('Backspace', 8)).toBe(true);
		expect(Keyboard.isKey('Backspace', 'Backspace')).toBe(true);
	});

	it('should return false if key which or key code are the ones for the Backspace key', () => {
		expect(Keyboard.isKey('Backspace', 70)).toBe(false);
		expect(Keyboard.isKey('Backspace', 'Ar54n')).toBe(false);
	});

	it('should return true if key which or key code are the ones for the Space key', () => {
		expect(Keyboard.isKey('Space', 32)).toBe(true);
		expect(Keyboard.isKey('Space', ' ')).toBe(true);
	});

	it('should return false if key which or key code are the ones for the Space key', () => {
		expect(Keyboard.isKey('Space', 70)).toBe(false);
		expect(Keyboard.isKey('Space', 'Ar54n')).toBe(false);
	});

	it('should return true if key value is a letter or number', () => {
		expect(Keyboard.isLetterOrNumber('s')).toBe(true);
		expect(Keyboard.isLetterOrNumber('g')).toBe(true);
		expect(Keyboard.isLetterOrNumber('o')).toBe(true);
		expect(Keyboard.isLetterOrNumber('4')).toBe(true);
		expect(Keyboard.isLetterOrNumber('0')).toBe(true);
		expect(Keyboard.isLetterOrNumber('7')).toBe(true);
	});

	it('should return false if key value is not a letter nor number', () => {
		expect(Keyboard.isLetterOrNumber('Meta')).toBe(false);
		expect(Keyboard.isLetterOrNumber('Escape')).toBe(false);
		expect(Keyboard.isLetterOrNumber('Tab')).toBe(false);
		expect(Keyboard.isLetterOrNumber('Backspace')).toBe(false);
	});
});
