declare namespace MathematicaJS {
  import { ChildProcessWithoutNullStreams } from 'child_process';
  import { EventEmitter } from 'events';

  class MathematicaSession extends EventEmitter {
    inCurrent: number;
    inHistory: string[];
    proc: ChildProcessWithoutNullStreams;

    execScript (script: string): Promise<String>;
    destroy (): void;
  }
}
export = MathematicaJS;
