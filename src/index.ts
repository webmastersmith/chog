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
];
const colorReset = '\x1b[0m';
const setFgColor = (num: number) => `\x1b[${num}m`;
const setBgColor = (num: number) => `\x1b[${num + 10}m`;
const setBgColorName = (color: string) => `${color}Bg`;

// create basic function.
function chog(...txt: unknown[]) {
  // separate objects
  const s = txt.map((item) => {
    return typeof item !== 'object' ? chog.buf + item + colorReset : inspect(item, false, null, true);
  });
  console.log(s.join(' '));
  // reset buf
  chog.buf = '';
}
// initialize buf.
chog.buf = '';

// set fg and bg colors on String.prototype.
for (const { name, colorId } of colors) {
  // set fgColor.
  Object.defineProperty(String.prototype, name, {
    get: function () {
      return setFgColor(colorId) + this + colorReset;
    },
  });
  // set bgColor
  Object.defineProperty(String.prototype, setBgColorName(name), {
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
  // set chog Styles
  Object.defineProperty(chog, name, {
    get: function () {
      this.buf += setFgColor(colorId);
      return this;
    },
  });
}

export default chog as any as Chog;

export interface Chog {
  // chog function.
  (...text: unknown[]): string;

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
}

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
  }
}
