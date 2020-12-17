
const { MathematicaKernel } = require('.')

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
