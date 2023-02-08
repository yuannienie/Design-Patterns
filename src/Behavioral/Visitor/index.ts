// 访问者模式 demo
interface Visitor {
  visitCPU(cpu: CPU): void;
  visitDisk(disk: HardDisk): void;
}

class UpdateVisitor implements Visitor {
  public visitCPU(cpu: CPU): void {
      cpu.command = '1 + 1 = 2';
  }

  public visitDisk(disk: HardDisk): void {
      disk.command = 'memo 1 + 1 = 2';
  }
}

abstract class HardWare {
  public command: string;

  constructor(command: string) {
      this.command = command;
  }

  public run() {
      console.log(this.command);
  }

  public abstract accept(visitor: Visitor): void;
} 

class HardDisk extends HardWare {
  constructor(command: string) {
      super(command);
  }

  public accept(visitor: Visitor) {
      visitor.visitDisk(this);
  }
}

class CPU extends HardWare {
  constructor(command: string) {
      super(command);
  }

  public accept(visitor: Visitor) {
      visitor.visitCPU(this);
  }
}

class EggRobot {
  private disk: HardDisk;
  private cpu: CPU;

  constructor() {
      this.cpu = new CPU('1 + 1 = 1');
      this.disk = new HardDisk('memo: 1 + 1 = 1');
  }

  public calc() {
      this.cpu.run();
      this.disk.run();
  }

  public accept(visitor: Visitor) {
      console.log('====== updating ======');
      this.cpu.accept(visitor);
      this.disk.accept(visitor);
  }
}

const erdan = new EggRobot();
erdan.calc()
const updatePack = new UpdateVisitor();
erdan.accept(updatePack);
erdan.calc();

export default {};