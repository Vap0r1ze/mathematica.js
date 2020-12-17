declare namespace MathematicaJS {
  import { ChildProcessWithoutNullStreams } from 'child_process';
  import { EventEmitter } from 'events';

  class MathematicaKernel extends EventEmitter {
    inCurrent: number;
    inHistory: string[];
    proc: ChildProcessWithoutNullStreams;

    run (script: string, expectReturn?: true): Promise<any>;
    run (script: string, expectReturn: false): Promise<void>;
    destroy (): void;
  }
}
export = MathematicaJS;
