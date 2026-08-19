class MinStack {
    constructor() {
        this.min = undefined;
        this.stack = [];
    }

    /**
     * @param {number} val
     * @return {void}
     */
    push(val) {
        if (this.stack.length === 0) this.min = val;
        else if (val < this.min) {
            this.min = val;
        }
        
        this.stack.push(val);
    }

    /**
     * @return {void}
     */
    // This takes O(n) time but it's not often that we'll encounter the minimum value
    // while popping from the stack, hence, the amortized time complexity is O(1).
    pop() {
        let val = this.stack.pop();
        if (val === this.min) {
            let tempStack = [];
            while (this.stack.length > 0) {
                tempStack.push(this.stack.pop())
            }
            // this.push takes care of storing the new minimum value
            while (tempStack.length > 0) {
                this.push(tempStack.pop());
            }
        }
        return val;
    }

    /**
     * @return {number}
     */
    top() {
        return this.stack.at(-1);
    }

    /**
     * @return {number}
     */
    getMin() {
        return this.min;
    }
}
