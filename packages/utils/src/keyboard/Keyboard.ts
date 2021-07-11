import { EventKeyValue, Key, KeyValues } from './types';

const KEYS: Record<Key, KeyValues> = {
	ArrowDown: { code: 40, value: 'ArrowDown' },
	ArrowUp: { code: 38, value: 'ArrowUp' },
	Backspace: { code: 8, value: 'Backspace' },
	End: { code: 8, value: 'End' },
	Enter: { code: 13, value: 'Enter' },
	Escape: { code: 27, value: 'Escape' },
	Home: { code: 36, value: 'Home' },
	Space: { code: 32, value: ' ' },
	Tab: { code: 9, value: 'Tab' }
};

const Keyboard = {
	isKey(key: Key, eventValue: EventKeyValue) {
		const keyData = KEYS[key];

		if (!keyData) return false;

		if (typeof eventValue === 'number') return eventValue === keyData.code;
		return eventValue === keyData.value;
	},
	isLetterOrNumber(keyValue: string) {
		const regex = /^[A-Za-z0-9]+$/;

		return keyValue.length === 1 && !!keyValue.match(regex);
	}
};

export default Keyboard;
