# mathematica.js
A simple interface for the Mathematica kernel (outputs are in [ExpressionJSON](https://reference.wolfram.com/language/ref/format/ExpressionJSON.html) format)

# Example
code
```js
const { MathematicaKernel } = require('mathematica.js')

const queries = [
  'Integrate[1/(x^3 - 1), x]',
  'ExportString[Log[I] // TeXForm,"String"]',
  'Factor[x^2-2x]',
  'testVar * 4',
  'Do[0, Infinity]',
]
const mathKernel = new MathematicaKernel()

// mathKernel.run(query: string, expectResult: boolean)
mathKernel.run('testVar := 4', false)

for (const query of queries) {
  mathKernel.run(query).then(result => {
    console.log(`In: ${query}\nOut: ${JSON.stringify(result)}\n`)
  })
}

setTimeout(() => {
  mathKernel.destroy()
}, 4000)
```

output
```
In: Integrate[1/(x^3 - 1), x]
Out: ["Plus",["Times",-1,["Power",3,["Rational",-1,2]],["ArcTan",["Times",["Power",3,["Rational",-1,2]],["Plus",1,["Times",2,"x"]]]]],["Times",["Rational",1,3],["Log",["Plus",1,["Times",-1,"x"]]]],["Times",["Rational",-1,6],["Log",["Plus",1,"x",["Power","x",2]]]]]

In: ExportString[Log[I] // TeXForm,"String"]
Out: "'\\frac{i \\pi }{2}'"

In: Factor[x^2-2x]
Out: ["Times",["Plus",-2,"x"],"x"]

In: testVar * 4
Out: 16
```
