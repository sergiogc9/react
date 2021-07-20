import { EventEmitter } from 'events';
import { DateTime } from 'luxon';

type StorageItem = {
	expiresAt?: string;
	value: any;
};

const storageEventEmitter = new EventEmitter();

// Checks if an element is valid, i.e. it is not expired. If not found, it isn't considered valid. If expired, it is removed from local storage.
const __isItemValid = (key: string) => {
	const savedData = localStorage.getItem(key);

	if (!savedData) return false;

	const item: StorageItem = JSON.parse(savedData);
	const isValid = !item.expiresAt || DateTime.fromISO(item.expiresAt) > DateTime.now();
	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	if (!isValid) Storage.remove(key);

	return isValid;
};

const Storage = {
	// Checks if a key exists in the storage and it is not expired
	has: (key: string) => __isItemValid(key),
	// Gets the storage value from a key, returns null if not found
	get: (key: string): any | null => {
		const savedData = localStorage.getItem(key);
		if (savedData) {
			const item: StorageItem = JSON.parse(savedData);
			if (__isItemValid(key)) return item.value;
		}
		return null;
	},
	// Sets the JSON serializable value into storage using key
	set: (key: string, value: any, expireDate?: Date) => {
		const item: StorageItem = {
			value
		};
		if (expireDate) item.expiresAt = DateTime.fromJSDate(expireDate).toISO();
		const stringValue = JSON.stringify(item);
		localStorage.setItem(key, stringValue);
		storageEventEmitter.emit(key);
	},
	// Removes any existing value in the storage for the passed key
	remove: (key: string) => {
		localStorage.removeItem(key);
		storageEventEmitter.emit(key);
	},
	// Clears all storage values
	clear: () => localStorage.clear(),
	// Listen for storage key value changes. Remember to unsubscribe!
	onKeyChange: (key: string, callback: (...args: any) => any) => {
		return storageEventEmitter.addListener(key, callback);
	}
};

export default Storage;
