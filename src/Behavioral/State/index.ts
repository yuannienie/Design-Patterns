// 状态模式 demo
// 马里奥可以变身为多种形态，比如小马里奥(Small Mario)、超级马里奥(Super Mario)、火焰马里奥(Fire Mario) 等等。
// 在不同的游戏情节下，各个形态会互相转化，并相应的增减积分。比如，初始形态是小马里奥，吃了蘑菇之后就会变成超级马里奥，并且增加 100 积分。
enum State {
  Small,
  Super,
  Fire,
  Dead,
}

// 状态类接口
interface IMario {
  getName: () => State;
  obtainMushroom: (machine: MarioStateMachine) => void;
  obtainCape: (machine: MarioStateMachine) => void;
  meetMonster: (machine: MarioStateMachine) => void;
}

class SmallMario implements IMario {
  public static instance = new SmallMario();
  private constructor() {
    // initial not allowed
  }
  public static getInstance() {
    return this.instance
  }

  public getName(): State {
    return State.Small;
  }

  // Small -> Super
  obtainMushroom(machine: MarioStateMachine) {
    machine.setState(SuperMario.getInstance());
    machine.setScore(machine.getScore() + 100);
  }

  // Small -> Fire
  obtainCape(machine: MarioStateMachine) {
    machine.setState(FireMario.getInstance());
    machine.setScore(machine.getScore() + 200);
  }

  // Small -> dead
  meetMonster(machine: MarioStateMachine) {
    machine.setState(new Dead());
    machine.setScore(machine.getScore() - 500);
  }
}

class SuperMario implements IMario {
  public static instance = new SuperMario();
  private constructor() {
    // initial not allowed
  }
  public static getInstance() {
    return this.instance
  }

  public getName(): State {
    return State.Super;
  }

  obtainMushroom(machine: MarioStateMachine) {
    // do nothing
  }

  obtainCape(machine: MarioStateMachine) {
    machine.setState(FireMario.getInstance());
    machine.setScore(machine.getScore() + 200);
  }

  meetMonster(machine: MarioStateMachine) {
    machine.setState(SmallMario.getInstance());
    machine.setScore(machine.getScore() - 100);
  }
}

class FireMario implements IMario {
  public static instance = new FireMario();
  private constructor() {
    // initial not allowed
  }
  public static getInstance() {
    return this.instance
  }

  public getName(): State {
    return State.Fire;
  }

  obtainMushroom(machine: MarioStateMachine) {
    // do nothing
  }

  obtainCape(machine: MarioStateMachine) {
    // do nothing
  }

  meetMonster(machine: MarioStateMachine) {
    machine.setState(SmallMario.getInstance());
    machine.setScore(machine.getScore() - 100);
  }
}

class Dead implements IMario {
  getName(): State {
    return State.Dead
  }

  obtainMushroom(machine: MarioStateMachine) {
    // throw error
  }

  obtainCape(machine: MarioStateMachine) {
    // throw error
  }

  meetMonster(machine: MarioStateMachine) {
    // throw error
  }
}

class MarioStateMachine {
  private score = 0;
  private currentState: IMario = SmallMario.getInstance();

  public obtainMushroom() {
    this.currentState.obtainMushroom(this);
  }

  public obtainCape() {
    this.currentState.obtainCape(this);
  }

  public meetMonster() {
    this.currentState.meetMonster(this);
  }

  public getScore(): number {
    return this.score;
  }

  public setScore(score: number): void {
    this.score = score;
  }

  public getState(): State {
    return this.currentState.getName();
  }

  public setState(state: IMario): void {
    this.currentState = state;
  }
}

const marioStateMachine = new MarioStateMachine();
console.log('current state:', marioStateMachine.getState());
console.log('current score:', marioStateMachine.getScore());
marioStateMachine.obtainMushroom();
console.log('current state:', marioStateMachine.getState());
console.log('current score:', marioStateMachine.getScore());
marioStateMachine.obtainCape();
console.log('current state:', marioStateMachine.getState());
console.log('current score:', marioStateMachine.getScore());
marioStateMachine.meetMonster();
console.log('current state:', marioStateMachine.getState());
console.log('current score:', marioStateMachine.getScore());

export default {}