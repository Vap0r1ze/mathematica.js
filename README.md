# mathematica.js
A simple interface for the Mathematica kernel

# Example
```js
const { MathematicaSession } = require('mathematica.js')

const q = ['Integrate[1/(x^3 - 1), x]', '2+2', 'Factor[x^2-2x]', 'Do[0, Infinity]']
const session = new MathematicaSession()

for (const script of q) {
  session.execScript(script).then(result => {
    console.log(`In: ${script}\nOut: ${result}\n`)
  })
}

setTimeout(() => {
  session.destroy()
}, 2000)
```
