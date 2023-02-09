// 备忘录模式 demo
// Captures and externalizes an object’s internal state so that it can be restored later, all without violating encapsulation.
import readline from 'readline';
class Snapshot {
  private text = '';
  public constructor(text: string) {
    this.text = text;
  }
  public getText(): string {
    return this.text;
  } 
}

class SnapshotHolder {
  private snapshotStack: Snapshot[] = [];
  public pushSnapshot(snapshot: Snapshot) {
    this.snapshotStack.push(snapshot);
  }

  public popSnapshot(): Snapshot | undefined {
    if (this.snapshotStack.length === 0) return void 0;
    return this.snapshotStack.pop();
  }
}

class InputText {
  private text = '';
  
  public getText(): string {
    return this.text;
  }

  public append(input: string): void {
    this.text += input;
  }

  public createSnapshot(): Snapshot {
    return new Snapshot(this.text);
  }

  public restoreSnapshot(snapshot: Snapshot) {
    this.text = snapshot.getText();
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const inputText = new InputText();
const snapshotHolder = new SnapshotHolder();

const handleListCommand = () => console.log(inputText.getText());
const handleUndoCommand = () => {
  const snapshot = snapshotHolder.popSnapshot();
  if (snapshot === undefined) console.log('No Store!');
  else inputText.restoreSnapshot(snapshot!);
};
const handleDefaultCommand = (lineStr: string) => {
  snapshotHolder.pushSnapshot(inputText.createSnapshot());
  inputText.append(lineStr);
}
const handleCloseCommand = (rl: readline.Interface) => rl.close();

rl.on('line', (line) => {
  const lineStr = line.trim();
  switch (lineStr) {
   case ':list':
    handleListCommand();
    break;
   case ':undo':
    handleUndoCommand();
    break;
   case ':close':
    handleCloseCommand(rl);
    break;
   default:
    handleDefaultCommand(lineStr);
    break;
  }
 });

 rl.on('close', () => { 
  console.log('See U!');
  process.exit(0);
 });

 console.log('======== NOW YOU CAN INPUT SOME COMMAND ========')
 export default {};