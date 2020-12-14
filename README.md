# mathematica.js
A simple interface for the Mathematica kernel

# Example
code
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

output
```
In: Integrate[1/(x^3 - 1), x]
Out: -(ArcTan[(1 + 2*x)/Sqrt[3]]/Sqrt[3]) + Log[1 - x]/3 - Log[1 + x + x^2]/6

In: 2+2
Out: 4

In: Factor[x^2-2x]
Out: (-2 + x)*x
```
