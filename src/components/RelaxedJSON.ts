/*
  Copyright (c) 2013, Oleg Grenrus
  All rights reserved.
  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:
      * Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.
      * Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.
      * Neither the name of the Oleg Grenrus nor the
        names of its contributors may be used to endorse or promote products
        derived from this software without specific prior written permission.
  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
  ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
  DISCLAIMED. IN NO EVENT SHALL OLEG GRENRUS BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

interface IToken {
	type: string,
	line: number,
	value?: string
}

interface IRegExp {
	type: string,
	match: Array<any>
}

interface ITokenSpec {
	re: RegExp,
	f: Function
}


// opts.relaxed = opts.relaxed !== undefined ? opts.relaxed : true
// opts.warnings = opts.warnings || opts.tolerant || false
// opts.tolerant = opts.tolerant || false
// opts.duplicate = opts.duplicate || false

interface IState {
	message: string,
	tolerant: boolean,
	warnings: Array<IWarning> | boolean,
	reviver: Function,
	relaxed: boolean,
	duplicate: boolean,
}

interface IWarning {
	message: string,
	line: number
}

class MySyntaxError extends SyntaxError {
	private __line: number;
	private __warnings: Array<IWarning>
	private __obj: any

	public set line(paramVal: number) {
		this.__line = paramVal;
	}
	public get line() {
		return this.__line;
	}

	public get obj() {
		return this.__obj;
	}
	public set obj(val) {
		this.__obj = val;
	}

	public get warnings(): Array<IWarning> {
		return this.__warnings;
	}
	public set warnings(val: Array<IWarning>) {
		this.__warnings = val;
	}
}

export class RelaxedJSON {
	private __lexer: Function;
	private __strictLexer: Function;

	constructor() {
		this.__lexer = this.__makeLexer(this.__makeTokenSpecs(true));
		this.__strictLexer = this.__makeLexer(this.__makeTokenSpecs(false));
	}

	// slightly different from ES5 __some, without cast to boolean
	// [x, y, z].__some(f):
	// ES5:  !! ( f(x) || f(y) || f(z) || false)
	// this:    ( f(x) || f(y) || f(z) || false)
	private __some(array, f): any {
		let acc = false
		for (let i = 0; i < array.length; i++) {
			acc = f(array[i], i, array)
			if (acc) {
				return acc
			}
		}
		return acc
	}

	private __makeLexer(tokenSpecs) {
		let that = this;
		return function (contents) {
			let tokens = []
			let line = 1

			function findToken() {
				return that.__some(tokenSpecs, function (tokenSpec) {
					let m = tokenSpec.re.exec(contents)
					if (m) {
						let raw = m[0]
						contents = contents.slice(raw.length)
						return {
							raw: raw,
							matched: tokenSpec.f(m, line)
						}
					} else {
						return undefined
					}
				})
			}

			while (contents !== '') {
				let matched = findToken()

				if (!matched) {
					let err = new MySyntaxError('Unexpected character: ' + contents[0] + '; input: ' + contents.substr(0, 100))
					err.line = line
					throw err
				}

				// add line to token
				matched.matched.line = line

				// count lines
				line += matched.raw.replace(/[^\n]/g, '').length

				tokens.push(matched.matched)
			}

			return tokens
		}
	}

	private __fStringSingle(m) {
		// String in single quotes
		let content = m[1].replace(/([^'\\]|\\['bnrtf\\]|\\u[0-9a-fA-F]{4})/g, function (mm) {
			if (mm === '"') {
				return '\\"'
			} else if (mm === '\\\'') {
				return '\''
			} else {
				return mm
			}
		})

		return {
			type: 'string',
			match: '"' + content + '"',
			value: JSON.parse('"' + content + '"') // abusing real JSON.parse to unquote string
		}
	}

	private __fStringDouble(m) {
		return {
			type: 'string',
			match: m[0],
			value: JSON.parse(m[0])
		}
	}

	private __fIdentifier(m) {
		// identifiers are transformed into strings
		return {
			type: 'string',
			value: m[0],
			match: '"' + m[0].replace(/./g, function (c) {
				return c === '\\' ? '\\\\' : c
			}) + '"'
		}
	}

	private __fComment(m) {
		// comments are whitespace, leave only linefeeds
		return {
			type: ' ',
			match: m[0].replace(/./g, function (c) {
				return (/\s/).test(c) ? c : ' '
			})
		}
	}

	private __fNumber(m) {
		return {
			type: 'number',
			match: m[0],
			value: parseFloat(m[0])
		}
	}

	private __fKeyword(m) {
		var value
		switch (m[1]) {
			case 'null': value = null; break
			case 'true': value = true; break
			case 'false': value = false; break
			// no default
		}
		return {
			type: 'atom',
			match: m[0],
			value: value
		}
	}

	private __makeTokenSpecs(relaxed): Array<ITokenSpec> {
		function f(type): Function {
			return function (m): IRegExp {
				return { type: type, match: m[0] }
			}
		}

		/* eslint-disable no-useless-escape */
		var ret = [
			{ re: /^\s+/, f: f(' ') },
			{ re: /^\{/, f: f('{') },
			{ re: /^\}/, f: f('}') },
			{ re: /^\[/, f: f('[') },
			{ re: /^\]/, f: f(']') },
			{ re: /^,/, f: f(',') },
			{ re: /^:/, f: f(':') },
			{ re: /^(true|false|null)/, f: this.__fKeyword },
			{ re: /^\-?\d+(\.\d+)?([eE][+-]?\d+)?/, f: this.__fNumber },
			{ re: /^"([^"\\]|\\["bnrtf\\\/]|\\u[0-9a-fA-F]{4})*"/, f: this.__fStringDouble }
		];

		// additional stuff
		if (relaxed) {
			ret = ret.concat([
				{ re: /^'(([^'\\]|\\['bnrtf\\\/]|\\u[0-9a-fA-F]{4})*)'/, f: this.__fStringSingle },
				{ re: /^\/\/.*?(?:\r\n|\r|\n)/, f: this.__fComment },
				{ re: /^\/\*[\s\S]*?\*\//, f: this.__fComment },
				{ re: /^[$a-zA-Z0-9_\-+\.\*\?!\|&%\^\/#\\]+/, f: this.__fIdentifier }
			]);
		}
	  /* eslint-enable no-useless-escape */ret

		return ret;
	}

	private __previousNWSToken(tokens, index) {
		for (; index >= 0; index--) {
			if (tokens[index].type !== ' ') {
				return index
			}
		}
		return undefined
	}

	private __stripTrailingComma(tokens) {
		var res = []
		var that = this;

		tokens.forEach(function (token, index) {
			if (token.type === ']' || token.type === '}') {
				// go backwards as long as there is whitespace, until first comma
				var commaI = that.__previousNWSToken(res, index - 1);

				if (commaI && res[commaI].type === ',') {
					var preCommaI = that.__previousNWSToken(res, commaI - 1);
					if (preCommaI && res[preCommaI].type !== '[' && res[preCommaI].type !== '{') {
						res[commaI] = {
							type: ' ',
							match: ' ',
							line: tokens[commaI].line
						}
					}
				}
			}

			res.push(token)
		})

		return res
	}

	public transform(text) {
		// Tokenize contents
		var tokens = this.__lexer(text)

		// remove trailing commas
		tokens = this.__stripTrailingComma(tokens)

		// concat stuff
		return tokens.reduce(function (str, token) {
			return str + token.match
		}, '')
	}

	private __popToken(tokens, state): IToken {
		var token = tokens[state.pos];
		state.pos += 1;

		if (!token) {
			var line = tokens.length !== 0 ? tokens[tokens.length - 1].line : 1;
			return { type: 'eof', line: line };
		}

		return token
	}

	private __strToken(token) {
		switch (token.type) {
			case 'atom':
			case 'string':
			case 'number':
				return token.type + ' ' + token.match
			case 'eof':
				return 'end-of-file'
			default:
				return '' + token.type + ''
		}
	}

	private __skipColon(tokens, state) {
		var colon = this.__popToken(tokens, state)
		if (colon.type !== ':') {
			var message = 'Unexpected token: ' + this.__strToken(colon) + ', expected \':\''
			if (state.tolerant) {
				state.warnings.push({
					message: message,
					line: colon.line
				})

				state.pos -= 1
			} else {
				var err = new MySyntaxError(message)
				err.line = colon.line
				throw err
			}
		}
	}

	private __skipPunctuation(tokens, state: IState, valid?: Array<string>): IToken {
		let punctuation: Array<string> = [',', ':', ']', '}'];
		let token: IToken = this.__popToken(tokens, state);
		while (true) { // eslint-disable-line no-constant-condition
			if ((!!valid === true) && (valid.indexOf(token.type) !== -1)) {
				return token;
			} else if (token.type === 'eof') {
				return token;
			} else if (punctuation.indexOf(token.type) !== -1) {
				let message: string = 'Unexpected token: ' + this.__strToken(token) + ', expected \'[\', \'{\', number, string or atom'
				if (state.tolerant) {
					state.warnings = state.warnings as Array<IWarning>;
					state.warnings.push({
						message: message,
						line: token.line
					});
					token = this.__popToken(tokens, state);
				} else {
					let err: MySyntaxError = new MySyntaxError(message);
					err.line = token.line;
					throw err;
				}
			} else {
				return token;
			}
		}
	}

	private __raiseError(state: IState, token, message) {
		if (state.tolerant) {
			state.warnings = state.warnings as Array<IWarning>;
			state.warnings.push({
				message: message,
				line: token.line
			})
		} else {
			var err = new MySyntaxError(message)
			err.line = token.line
			throw err
		}
	}

	private __raiseUnexpected(state: IState, token, expected) {
		this.__raiseError(state, token, 'Unexpected token: ' + this.__strToken(token) + ', expected ' + expected)
	}

	private __checkDuplicates(state: IState, obj, token: IToken) {
		let key: String = token.value;

		if (state.duplicate && Object.prototype.hasOwnProperty.call(obj, key)) {
			this.__raiseError(state, token, 'Duplicate key: ' + key);
		}
	}

	private __appendPair(state: IState, obj, key, value) {
		value = state.reviver ? state.reviver(key, value) : value
		if (value !== undefined) {
			obj[key] = value
		}
	}

	private __parsePair(tokens, state, obj) {
		let token: IToken = this.__skipPunctuation(tokens, state, [':']);
		let key;
		let value;

		if (token.type !== 'string') {
			this.__raiseUnexpected(state, token, 'string')
			switch (token.type) {
				case ':':
					token = {
						type: 'string',
						value: 'null',
						line: token.line
					}

					state.pos -= 1
					break

				case 'number':
				case 'atom':
					token = {
						type: 'string',
						value: '' + token.value,
						line: token.line
					}
					break

				case '[':
				case '{':
					state.pos -= 1
					value = this.__parseAny(tokens, state) // eslint-disable-line no-use-before-define
					this.__appendPair(state, obj, 'null', value)
					return
				// no default
			}
		}

		this.__checkDuplicates(state, obj, token)
		key = token.value
		this.__skipColon(tokens, state)
		value = this.__parseAny(tokens, state) // eslint-disable-line no-use-before-define

		this.__appendPair(state, obj, key, value)
	}

	private __parseElement(tokens, state, arr: Array<any>) {
		let key: number = arr.length;
		let value: any = this.__parseAny(tokens, state); // eslint-disable-line no-use-before-define
		arr[key] = state.reviver ? state.reviver('' + key, value) : value;
	}

	private __parseObject(tokens, state) {
		return this.__parseMany(tokens, state, {}, { // eslint-disable-line no-use-before-define
			skip: [':', '}'],
			elementParser: this.__parsePair,
			elementName: 'string',
			endSymbol: '}'
		})
	}

	private __parseArray(tokens, state) {
		return this.__parseMany(tokens, state, [], { // eslint-disable-line no-use-before-define
			skip: [']'],
			elementParser: this.__parseElement,
			elementName: 'json object',
			endSymbol: ']'
		})
	}

	private __parseMany(tokens, state, obj, opts) {
		var token: IToken = this.__skipPunctuation(tokens, state, opts.skip)

		if (token.type === 'eof') {
			this.__raiseUnexpected(state, token, '\'' + opts.endSymbol + '\' or ' + opts.elementName)

			token = {
				type: opts.endSymbol,
				line: token.line
			}
		}

		switch (token.type) {
			case opts.endSymbol:
				return obj;

			default:
				state.pos -= 1 // push the token back
				opts.elementParser(tokens, state, obj)
				break
		}

		// Rest
		while (true) { // eslint-disable-line no-constant-condition
			token = this.__popToken(tokens, state)

			if (token.type !== opts.endSymbol && token.type !== ',') {
				this.__raiseUnexpected(state, token, '\',\' or \'' + opts.endSymbol + '\'')

				token = {
					type: token.type === 'eof' ? opts.endSymbol : ',',
					line: token.line
				}

				state.pos -= 1
			}

			switch (token.type) {
				case opts.endSymbol:
					return obj

				case ',':
					opts.elementParser(tokens, state, obj)
					break
				// no default
			}
		}
	}

	private __endChecks(tokens, state, ret) {
		if (state.pos < tokens.length) {
			this.__raiseError(state, tokens[state.pos],
				'Unexpected token: ' + this.__strToken(tokens[state.pos]) + ', expected end-of-input')
		}

		// Throw error at the end
		if (state.tolerant && state.warnings.length !== 0) {
			let message = state.warnings.length === 1 ? state.warnings[0].message : state.warnings.length + ' parse warnings';
			let err = new MySyntaxError(message);
			err.line = state.warnings[0].line;
			err.warnings = state.warnings;
			err.obj = ret;
			throw err;
		}
	}

	private __parseAny(tokens, state, end?: boolean) {
		let token = this.__skipPunctuation(tokens, state);
		let ret;

		if (token.type === 'eof') {
			this.__raiseUnexpected(state, token, 'json object')
		}

		switch (token.type) {
			case '{':
				ret = this.__parseObject(tokens, state)
				break;
			case '[':
				ret = this.__parseArray(tokens, state)
				break;
			case 'string':
			case 'number':
			case 'atom':
				ret = token.value
				break;
			// no default
		}

		if (end) {
			ret = state.reviver ? state.reviver('', ret) : ret;
			this.__endChecks(tokens, state, ret)
		}

		return ret
	}

	public parse(text, opts?: IState) {
		if (typeof opts === 'function' || opts === undefined) {
			return JSON.parse(this.transform(text), opts as any)
		} else if (new Object(opts) !== opts) { // eslint-disable-line no-new-object
			throw new TypeError('opts/reviver should be undefined, a function or an object')
		}

		opts.relaxed = opts.relaxed !== undefined ? opts.relaxed : true
		opts.warnings = opts.warnings || opts.tolerant || false
		opts.tolerant = opts.tolerant || false
		opts.duplicate = opts.duplicate || false

		if (!opts.warnings && !opts.relaxed) {
			return JSON.parse(text, opts.reviver as any)
		}

		var tokens = opts.relaxed ? this.__lexer(text) : this.__strictLexer(text)

		if (opts.relaxed) {
			// Strip commas
			tokens = this.__stripTrailingComma(tokens)
		}

		if (opts.warnings) {
			// Strip whitespace
			tokens = tokens.filter(function (token) {
				return token.type !== ' '
			})

			var state = { pos: 0, reviver: opts.reviver, tolerant: opts.tolerant, duplicate: opts.duplicate, warnings: [] }
			return this.__parseAny(tokens, state, true)
		} else {
			var newtext = tokens.reduce(function (str, token) {
				return str + token.match
			}, '')

			return JSON.parse(newtext, opts.reviver as any)
		}
	}

	private __stringifyPair(obj, key) {
		return JSON.stringify(key) + ':' + this.stringify(obj[key]) // eslint-disable-line no-use-before-define
	}

	public stringify(obj) {
		switch (typeof obj) {
			case 'string':
			case 'number':
			case 'boolean':
				return JSON.stringify(obj);
			// no default
		}
		if (Array.isArray(obj)) {
			return '[' + obj.map(this.stringify).join(',') + ']';
		}
		if (new Object(obj) === obj) { // eslint-disable-line no-new-object
			var keys = Object.keys(obj);
			keys.sort();
			return '{' + keys.map(this.__stringifyPair.bind(null, obj)) + '}';
		}
		return 'null';
	}
}

export default RelaxedJSON;
