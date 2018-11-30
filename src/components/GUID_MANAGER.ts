/**
 * Fancy ID generator that creates 20-character string identifiers with the following properties:
 *
 * 1. They're based on timestamp so that they sort *after* any existing ids.
 * 2. They contain 72-bits of random data after the timestamp so that IDs won't collide with other clients' IDs.
 * 3. They sort *lexicographically* (so the timestamp is converted to characters that will sort properly).
 * 4. They're monotonically increasing.  Even if you generate more than one in the same timestamp, the
 *    latter ones will sort after the former ones.  We do this by using the previous random bits
 *    but "incrementing" them by 1 (only in the case of a timestamp collision).
 */
// Modeled after base64 web-safe chars, but ordered by ASCII.
const PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

// Timestamp of last push, used to prevent local collisions if you push twice in one ms.
// let lastPushTime = 0;

// We generate 72-bits of randomness which get turned into 12 characters and appended to the
// timestamp to prevent collisions with other clients.  We store the last characters we
// generated because in the event of a collision, we'll use those same characters except
// "incremented" by one.
// let lastRandChars = [];

/**
 * Manager that handles creating singletons for generating keys.
 *
 * @export
 * @class GUID_MANAGER
 */
export class GUID_MANAGER {
	private __lastPushTime : number
	private __lastRandChars : Array<number>
	private __PUSH_CHARS : string;
	private __SINGLETONS : object;

	constructor (id) {
		if (!this.__SINGLETONS) {
			this.__SINGLETONS = {};
		}

		if (this.__SINGLETONS.hasOwnProperty(id)) {
			return this.__SINGLETONS[id];
		} else {
			this.__PUSH_CHARS = PUSH_CHARS;
			this.__lastPushTime = 0;
			this.__lastRandChars = [];

			this.__SINGLETONS[id] = this;
		}
	}

	public key() {
		let now = new Date().getTime();
		let duplicateTime = (now === this.__lastPushTime);
		let i;
		this.__lastPushTime = now;

		let timeStampChars = new Array(8);
		for (i = 7; i >= 0; i--) {
			timeStampChars[i] = this.__PUSH_CHARS.charAt(now % 64);
			// NOTE: Can't use << here because javascript will convert to int and lose the upper bits.
			now = Math.floor(now / 64);
		}
		if (now !== 0) throw new Error('We should have converted the entire timestamp.');

		let id = timeStampChars.join('');

		if (!duplicateTime) {
			for (i = 0; i < 12; i++) {
				this.__lastRandChars[i] = Math.floor(Math.random() * 64);
			}
		} else {
			// If the timestamp hasn't changed since last push, use the same random number, except incremented by 1.
			for (i = 11; i >= 0 && this.__lastRandChars[i] === 63; i--) {
				this.__lastRandChars[i] = 0;
			}
			this.__lastRandChars[i]++;
		}
		for (i = 0; i < 12; i++) {
			id += this.__PUSH_CHARS.charAt(this.__lastRandChars[i]);
		}
		if (id.length != 20) throw new Error('Length should be 20.');

		return id;
	}
}
