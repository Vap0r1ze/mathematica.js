const childProcess = require('child_process')
const { EventEmitter } = require('events')

const handleStdOut = Symbol('handleStdOut')
const runCurrentIn = Symbol('runCurrentIn')

class MathematicaKernel extends EventEmitter {
  constructor () {
    super()
    this.inCurrent = 0
    this.inHistory = []
    this.proc = childProcess.spawn('math', ['-noprompt'])
    this.proc.stdout.on('data', this[handleStdOut].bind(this))
  }

  [handleStdOut] (data) {
    const outs = data.toString('utf8')
      .trim()
      .replace(/\xC3\x8E\xC2(.)/g, (m, c) => String.fromCharCode(0x300 + c.charCodeAt())) // fix broken greek chars
      .split('\n')
    for (const out of outs) {
      try {
        const result = JSON.parse(JSON.parse(out))
        this.emit(`outResult:${result.id}`, JSON.parse(result.data))
      } catch (error) {}
    }
  }

  [runCurrentIn] () {
    const { query, expectResult } = this.inHistory[this.inCurrent]
    if (!query) return
    if (expectResult)
      this.proc.stdin.write(`ExportString[{"id" -> ${this.inCurrent}, "data" -> ExportString[${query}, "ExpressionJSON", Compact -> True]}, "JSON", Compact -> True]\n`)
    else
      this.proc.stdin.write(`${query}\n`)
    this.inCurrent++
  }

  run (query, expectResult = true) {
    query = query.replace(/\n/g, ' ')
    this.inHistory.push({ query, expectResult })
    if (expectResult) {
      const awaitedId = this.inCurrent
      this[runCurrentIn]()
      return new Promise((resolve, reject) => {
        this.once(`outResult:${awaitedId}`, resolve)
      })
    } else {
      this[runCurrentIn]()
      return Promise.resolve()
    }
  }
  destroy () {
    this.proc.stdin.write('Quit[]\n')
    this.proc.kill('SIGINT')
  }
}

exports.MathematicaKernel = MathematicaKernel
