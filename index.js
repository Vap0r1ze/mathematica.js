const childProcess = require('child_process')
const { EventEmitter } = require('events')

const handleStdOut = Symbol('handleStdOut')
const runCurrentIn = Symbol('runCurrentIn')
const outResult = Symbol('outResult')

class MathematicaSession extends EventEmitter {
  constructor () {
    super()
    this.waitingForOut = false
    this.inCurrent = 0
    this.inHistory = []
    this.proc = childProcess.spawn('math', ['-noprompt'])
    this.proc.stdout.on('data', this[handleStdOut].bind(this))
  }

  [handleStdOut] (data) {
    this.waitingForOut = false
    this.emit(outResult, this.inCurrent, data.toString().trim())
    this.inCurrent++
    this[runCurrentIn]()
  }

  [runCurrentIn] () {
    const script = this.inHistory[this.inCurrent]
    if (!script) return
    this.waitingForOut = true
    this.proc.stdin.write(`${script}\n`)
  }

  execScript (script) {
    script = script.replace(/\n/g, '')
    this.inHistory.push(script)
    const awaitedIndex = this.inHistory.length - 1
    if (!this.waitingForOut) this[runCurrentIn]()
    return new Promise((resolve, reject) => {
      const resultListener = (i, result) => {
        if (i === awaitedIndex) {
          this.off(outResult, resultListener)
          resolve(result)
        }
      }
      this.on(outResult, resultListener)
    })
  }
  destroy () {
    this.proc.stdin.write('Quit[]\n')
    this.proc.kill('SIGINT')
  }
}

exports.MathematicaSession = MathematicaSession
