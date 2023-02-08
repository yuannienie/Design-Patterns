// 解释器模式 demo
interface Expression {
  interpret: (stats: Map<string, number>) => boolean;
}

class GreaterExpression implements Expression {
  private key: string;
  private value: number;
  constructor(rule: string) {
    const splitArr = rule.trim().split(' ');
    if (!splitArr || splitArr.length !== 3 || splitArr[1] !== '>') {
      throw new Error('wrong');
    } 
    this.key = splitArr[0];
    this.value = +splitArr[2];
  }

  interpret(stats: Map<string, number>) {
    if (!stats.has(this.key)) {
        return false
    }

    return stats.get(this.key)! > this.value;
  }
}

class LessExpression implements Expression {
  private key: string;
  private value: number;
  constructor(rule: string) {
    const splitArr = rule.trim().split(' ');
    if (!splitArr || splitArr.length !== 3 || splitArr[1] !== '<') {
      throw new Error('wrong');
    } 
    this.key = splitArr[0];
    this.value = +splitArr[2];
  }

  interpret(stats: Map<string, number>) {
    if (!stats.has(this.key)) return false;
    return stats.get(this.key)! < this.value;
  }
}

class EqualExpression implements Expression {
  private key: string;
  private value: number;
  constructor(rule: string) {
    const splitArr = rule.trim().split(' ');
    if (!splitArr || splitArr.length !== 3 || splitArr[1] !== '==') {
      throw new Error('wrong');
    } 
    this.key = splitArr[0];
    this.value = +splitArr[2];
  }

  interpret(stats: Map<string, number>) {
    if (!stats.has(this.key)) return false;
    return stats.get(this.key) === this.value;
  }
}

class AndExpression implements Expression {
  private expressions: (GreaterExpression | LessExpression | EqualExpression)[] = [];
  constructor(rule: string) {
    const strArr = rule.split('&&');
    for (const str of strArr) {
      if (str.includes('>')) {
        this.expressions.push(new GreaterExpression(str));
      } else if (str.includes('<')) {
        this.expressions.push(new LessExpression(str));
      } else if (str.includes('==')) {
        this.expressions.push(new EqualExpression(str));
      } else {
        throw new Error('wrong');
      }
    }
  }

  interpret(stats: Map<string, number>) {
    for (const expression of this.expressions) {
      if (!expression.interpret(stats)) {
        return false;
      }
    }
    return true;
  }
}

class OrExpression implements Expression {
  private expressions: AndExpression[] = [];
  constructor(rule: string) {
    const strArr = rule.split('||');
    for (const str of strArr) {
      this.expressions.push(new AndExpression(str));
    }
  }

  interpret(stats: Map<string, number>) {
    for (const expression of this.expressions) {
      if (expression.interpret(stats)) {
        return true;
      }
    }

    return false;
  }
}

class AlertRuleInterpreter implements Expression {
  private expression: OrExpression;
  constructor(rule: string) {
    this.expression = new OrExpression(rule);
  }

  interpret(stats: Map<string, number>) {
    return this.expression.interpret(stats);
  }
}

const rule = "key1 > 100 && key2 < 30 || key3 < 100 || key4 == 88";
const interpreter = new AlertRuleInterpreter(rule);
const stats = new Map();
stats.set("key1", 101);
stats.set("key3", 121);
stats.set("key4", 89);
const __alert = interpreter.interpret(stats);
console.log(__alert);

export default {};
