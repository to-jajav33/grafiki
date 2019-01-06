
export interface IGDataResponseOptions {
	pathRef : object | null | undefined,
	data : boolean | null | number | string | undefined | object
}

export class GDataResponse {
	private __pathRef : object | null | undefined;
	private __data : boolean | null | number | string | undefined | object;

	constructor (options ?: IGDataResponseOptions) {
		this.__pathRef = options.pathRef || null;
		this.__data = options.data || undefined;
	}

	public path() {
		let outPath;
		if (this.__pathRef && typeof this.__pathRef === 'object') {
			outPath = JSON.parse(JSON.stringify(this.__pathRef));
		} else {
			outPath = this.__pathRef;
		}

		return outPath;
	}

	public val() {
		let outVal;
		if (this.__data && typeof this.__data === 'object') {
			outVal = JSON.parse(JSON.stringify(this.__data));
		} else {
			outVal = this.__data;
		}

		return outVal;
	}
}
