import inspect from 'browser-util-inspect';

// https://stackoverflow.com/questions/68387483/how-does-nodejs-module-chogs-chaining-syntax-work
const colors = [
  { name: 'black', colorId: 30 },
  { name: 'red', colorId: 31 },
  { name: 'green', colorId: 32 },
  { name: 'yellow', colorId: 33 },
  { name: 'blue', colorId: 34 },
  { name: 'magenta', colorId: 35 },
  { name: 'cyan', colorId: 36 },
  { name: 'white', colorId: 37 },
  { name: 'gray', colorId: 90 },
  { name: 'grey', colorId: 90 },
];

const styles = [
  { name: 'bolder', colorId: 1 },
  { name: 'dim', colorId: 2 },
  { name: 'italic', colorId: 3 },
  { name: 'underline', colorId: 4 },
  { name: 'reset', colorId: 0 },
];
const colorReset = '\x1b[0m';
const setFgColor = (num: number) => `\x1b[${num}m`;
const setBgColor = (num: number) => `\x1b[${num + 10}m`;
const setBgColorName = (color: string) => `${color}Bg`;

// create basic function.
function chog(...txt: unknown[]) {
  // separate objects
  const s = txt.map((item) => {
    return typeof item !== 'object'
      ? chog.buf + item + colorReset
      : inspect(item, false, Number.POSITIVE_INFINITY, true);
  });
  console.log(s.join(`${chog.buf} ${colorReset}`));
  // reset buf
  chog.buf = '';
}
// initialize buf.
chog.buf = '';

// set fg and bg colors on String.prototype.
for (const { name, colorId } of colors) {
  // set fgColor. -String
  Object.defineProperty(String.prototype, name, {
    get: function () {
      return setFgColor(colorId) + this + colorReset;
    },
  });
  // set bgColor -String
  Object.defineProperty(String.prototype, setBgColorName(name), {
    get: function () {
      return setBgColor(colorId) + this + colorReset;
    },
  });
  // set fgColor. -Number
  Object.defineProperty(Number.prototype, name, {
    get: function () {
      return setFgColor(colorId) + this + colorReset;
    },
  });
  // set bgColor -Number
  Object.defineProperty(Number.prototype, setBgColorName(name), {
    get: function () {
      return setBgColor(colorId) + this + colorReset;
    },
  });
  // set fgColor. -Boolean
  Object.defineProperty(Boolean.prototype, name, {
    get: function () {
      return setFgColor(colorId) + this + colorReset;
    },
  });
  // set bgColor -Boolean
  Object.defineProperty(Boolean.prototype, setBgColorName(name), {
    get: function () {
      return setBgColor(colorId) + this + colorReset;
    },
  });
  // set chog fgColors
  Object.defineProperty(chog, name, {
    get: function () {
      this.buf += setFgColor(colorId);
      return this;
    },
  });
  // set chog bgColors
  Object.defineProperty(chog, setBgColorName(name), {
    get: function () {
      this.buf += setBgColor(colorId);
      return this;
    },
  });
}
// set styles on String.prototype.
for (const { name, colorId } of styles) {
  // set String.prototype styles
  Object.defineProperty(String.prototype, name, {
    get: function () {
      return setFgColor(colorId) + this + colorReset;
    },
  });
  // set Number.prototype styles
  Object.defineProperty(Number.prototype, name, {
    get: function () {
      return setFgColor(colorId) + this + colorReset;
    },
  });
  // set Boolean.prototype styles
  Object.defineProperty(Boolean.prototype, name, {
    get: function () {
      return setFgColor(colorId) + this + colorReset;
    },
  });
  // set chog Styles
  Object.defineProperty(chog, name, {
    get: function () {
      this.buf += setFgColor(colorId);
      return this;
    },
  });
}

// biome-ignore lint/suspicious/noExplicitAny:
export default chog as any as Chog;

export interface Chog {
  // chog function.
  (...text: unknown[]): string | number | boolean;

  // fgColor
  readonly black: Chog;
  readonly red: Chog;
  readonly green: Chog;
  readonly yellow: Chog;
  readonly blue: Chog;
  readonly magenta: Chog;
  readonly cyan: Chog;
  readonly white: Chog;
  readonly gray: Chog;
  readonly grey: Chog;

  // bgColor
  readonly blackBg: Chog;
  readonly redBg: Chog;
  readonly greenBg: Chog;
  readonly yellowBg: Chog;
  readonly blueBg: Chog;
  readonly magentaBg: Chog;
  readonly cyanBg: Chog;
  readonly whiteBg: Chog;
  readonly grayBg: Chog;
  readonly greyBg: Chog;

  // styles
  readonly dim: Chog;
  readonly italic: Chog;
  readonly underline: Chog;
  readonly bolder: Chog;
  readonly reset: Chog;
}

// stop type error on Strings.
declare global {
  export interface String {
    // fgColor
    readonly black: String;
    readonly red: String;
    readonly green: String;
    readonly yellow: String;
    readonly blue: String;
    readonly magenta: String;
    readonly cyan: String;
    readonly white: String;
    readonly gray: String;
    readonly grey: String;

    // bgColor
    readonly blackBg: String;
    readonly redBg: String;
    readonly greenBg: String;
    readonly yellowBg: String;
    readonly blueBg: String;
    readonly magentaBg: String;
    readonly cyanBg: String;
    readonly whiteBg: String;
    readonly grayBg: String;
    readonly greyBg: String;

    // styles
    readonly dim: String;
    readonly italic: String;
    readonly underline: String;
    readonly bolder: String;
    readonly reset: String;
  }

  export interface Number {
    // fgColor
    readonly black: Number;
    readonly red: Number;
    readonly green: Number;
    readonly yellow: Number;
    readonly blue: Number;
    readonly magenta: Number;
    readonly cyan: Number;
    readonly white: Number;
    readonly gray: Number;
    readonly grey: Number;

    // bgColor
    readonly blackBg: Number;
    readonly redBg: Number;
    readonly greenBg: Number;
    readonly yellowBg: Number;
    readonly blueBg: Number;
    readonly magentaBg: Number;
    readonly cyanBg: Number;
    readonly whiteBg: Number;
    readonly grayBg: Number;
    readonly greyBg: Number;

    // styles
    readonly dim: Number;
    readonly italic: Number;
    readonly underline: Number;
    readonly bolder: Number;
    readonly reset: Number;
  }

  export interface Boolean {
    // fgColor
    readonly black: Boolean;
    readonly red: Boolean;
    readonly green: Boolean;
    readonly yellow: Boolean;
    readonly blue: Boolean;
    readonly magenta: Boolean;
    readonly cyan: Boolean;
    readonly white: Boolean;
    readonly gray: Boolean;
    readonly grey: Boolean;

    // bgColor
    readonly blackBg: Boolean;
    readonly redBg: Boolean;
    readonly greenBg: Boolean;
    readonly yellowBg: Boolean;
    readonly blueBg: Boolean;
    readonly magentaBg: Boolean;
    readonly cyanBg: Boolean;
    readonly whiteBg: Boolean;
    readonly grayBg: Boolean;
    readonly greyBg: Boolean;

    // styles
    readonly dim: Boolean;
    readonly italic: Boolean;
    readonly underline: Boolean;
    readonly bolder: Boolean;
    readonly reset: Boolean;
  }
}
