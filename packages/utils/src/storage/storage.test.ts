import { DateTime } from 'luxon';

import Storage from '.';

describe('Storage lib', () => {
	it('should set a value into storage', () => {
		Storage.set('test', { nice: 'awesome' });
		expect(localStorage.getItem('test')).toEqual(JSON.stringify({ value: { nice: 'awesome' } }));
	});

	it('should set a value into storage with expiry date', () => {
		const now = DateTime.now().plus({ day: 1 });
		Storage.set('test', { nice: 'awesome' }, now.toJSDate());
		expect(localStorage.getItem('test')).toEqual(
			JSON.stringify({ value: { nice: 'awesome' }, expiresAt: now.toISO() })
		);
	});

	it('should get an existing value into storage', () => {
		expect(Storage.get('test')).toEqual({ nice: 'awesome' });
	});

	it('should get null value if not exists', () => {
		expect(Storage.get('test-wrong')).toBe(null);
	});

	it('should get null value is expired', () => {
		const expiredDate = DateTime.now().minus({ day: 1 });
		Storage.set('test-expired', { nice: 'awesome' }, expiredDate.toJSDate());
		expect(Storage.get('test-expired')).toEqual(null);
	});

	it('should return has as true if exists', () => {
		expect(Storage.has('test')).toBe(true);
	});

	it('should return has as false if not exists', () => {
		expect(Storage.has('test-wrong')).toBe(false);
	});

	it('should return has as false if value is expired', () => {
		const expiredDate = DateTime.now().minus({ day: 1 });
		Storage.set('test-expired', { nice: 'awesome' }, expiredDate.toJSDate());
		expect(Storage.has('test-expired')).toEqual(false);
	});

	it('should remove value successfully', () => {
		Storage.set('remove-test', 'awesome');
		expect(Storage.has('remove-test')).toBe(true);
		Storage.remove('remove-test');
		expect(Storage.has('remove-test')).toBe(false);
	});

	it('should clear all values successfully', () => {
		Storage.set('remove-test-1', 'awesome1');
		Storage.set('remove-test-2', 'awesome2');
		Storage.set('remove-test-3', 'awesome3');
		expect(Storage.has('remove-test-1')).toBe(true);
		expect(Storage.has('remove-test-2')).toBe(true);
		expect(Storage.has('remove-test-2')).toBe(true);
		Storage.clear();
		expect(Storage.has('remove-test-1')).toBe(false);
		expect(Storage.has('remove-test-2')).toBe(false);
		expect(Storage.has('remove-test-2')).toBe(false);
	});

	it('should receive on change key event', () => {
		const mockHandler = jest.fn();
		Storage.onKeyChange('changing-key', mockHandler);
		Storage.set('changing-key', 'fake');
		expect(mockHandler).toHaveBeenCalled();
	});
});
