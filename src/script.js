const numbers = document.querySelectorAll('[type-num]');
const operators = document.querySelectorAll('[type-operator]');
const equalButton = document.getElementsByClassName('two-col')[0];
const operationPrev = document.getElementsByClassName('operation-prev')[0];
const operationCurr = document.getElementsByClassName('operation-curr')[0];
const allClear = document.querySelector('[type-ac]');
const history = document.querySelector('[type-his]');
const del = document.querySelector('[type-del]');

class Calcultor {
    constructor(operationPrev,operationCurr){
        this.operationCurr = operationCurr;
        this.operationPrev = operationPrev;
        this.current = '';
        this.prev = ''
        this.record=''
        this.records=[]
        this.operation = undefined;
    }
    allClear() {
        this.current = '';
        this.prev = ''
        this.operation = undefined;
    }
    delete() {
        this.current = this.current.slice(0,-1)
    }
    appendNewNum(num) {
        if (num === '.' && this.current.includes('.')) return
        this.current += num;
    }
    appendOperation(op){
        if (this.current ==='') return
        if(this.prev !== '') this.calculate();
        this.operation = op;
        this.prev = this.current;
        this.current=''
    }
    calculate() {
        let res = 0;
        if (isNaN(parseFloat(this.prev)) || isNaN(parseFloat(this.current))) return
        if (this.operation === '+') {
            res = parseFloat(this.prev) + parseFloat(this.current);

        } else if (this.operation === '-') {
            res = parseFloat(this.prev) - parseFloat(this.current);

        } else if (this.operation === '*') {
            res = parseFloat(this.prev) * parseFloat(this.current);

        }else if (this.operation === '÷') {
            res = parseFloat(this.prev) / parseFloat(this.current);

        }
        this.current = res.toString();
        this.records.push(res)
        this.prev = '';
    }
    show() {
        this.operationPrev.innerHTML = this.prev;
        this.operationCurr.innerHTML = this.current;
    }

    showHistory(){
        alert(this.records.slice(-10))
    }
}
const cal = new Calcultor(operationPrev,operationCurr);
numbers.forEach(button => {
    button.addEventListener('click',() => {
        cal.appendNewNum(button.innerHTML);
        cal.show()
    })
})
operators.forEach(button => {
    button.addEventListener('click', () => {
        cal.appendOperation(button.innerHTML);
        cal.show();
    })
})
equalButton.addEventListener('click', () => {
    cal.calculate();
    cal.show();
    cal.allClear()
})
allClear.addEventListener('click', () => {
    cal.allClear();
    cal.show();
})
del.addEventListener('click', () => {
    cal.delete();
    cal.show();
})
history.addEventListener('click', () => {
    cal.showHistory();
})
