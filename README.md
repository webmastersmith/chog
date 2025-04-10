# chog

## Simplified Chalk and Console.log with Web Friendly util.inspect for Arrays and Objects

- **This library modifies the String.prototype, Number.prototype, and Boolean.prototype** for the current shell session.
- Combines advanced color techniques to simplify console.log messages.
- Add colors and styles to Strings, Numbers, and Booleans.
- [NPM chog](https://www.npmjs.com/package/chog)

```ts
// download
npm i chog

// commonjs
const chog = require('chog');
// esm
import chog from 'chog';

// chog will console.log for you.                    any order 👇
chog.black.whiteBg('before red', " I'm italic red ".red.italic.underline.blackBg, 'after red.');

// Types
import { type Chog } from 'chog';
```

## Colors

```ts
// Colors
const colors = [
  'black', 'red',
  'green', 'yellow',
  'blue', 'magenta',
  'cyan', 'white', '
  gray', 'grey'
];
const backgroundColors = [
  'blackBg', 'redBg',
  'greenBg', 'yellowBg',
  'blueBg', 'magentaBg',
  'cyanBg', 'whiteBg',
  'grayBg', 'greyBg',
];
const styles = ['bolder', 'dim', 'italic', 'underline', 'reset'];
```

## Simple Example

![Multiple items console.log with colors](images/red2.png)

```ts
// see image 👆
chog('Danger Will Robinson!'.red, 'The message awaits...');
chog.blue('Danger Will Robinson!'.red, 'The message awaits...');
// more!
chog.black.whiteBg('before red', " I'm italic red ".red.italic.underline.blackBg, 'after red.');
// same as                                           reset must come last 👇
chog.black.whiteBg('before red', " I'm italic red ".red.italic.underline.reset, 'after red.');

// Numbers
chog((123).red, (456).white.bolder.italic);

// Booleans
chog(true.green.underline.italic, false.blue.bolder);
```

## Advanced Example

![Automatic object destructure](images/obj.png)

```ts
// Automatic web friendly 'util.inspect' object destructuring 👆.
// Object and Array colors are fixed and cannot be altered.
const obj = {
  a: 'a',
  b: {
    c: false,
    d: {
      e: [1, 2, 3, 4, 5, { f: 'one', g: ['two', 3, true, { h: 'three' }] }],
      g: {
        p: (v: string) => {
          return '?';
        },
      },
    },
  },
};
const arr = [
  2,
  4,
  7,
  'the',
  {
    p: 'hi',
    q: 2,
    z: {
      super: 'nested',
      a: {
        b: 'great!',
      },
    },
  },
];

chog.blue.yellowBg(
  'multiple javascript types',
  (64).red.reset,
  obj,
  arr,
  false.greenBg,
  undefined,
  'the end.'
);
```

## License

Published under the Apache-2.0 license. © Bryon Smith 2024.
