
class Snapshot {
  private text = '';
  public constructor(text: string) {
    this.text = text;
  }
  public getText(): string {
    return this.text;
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