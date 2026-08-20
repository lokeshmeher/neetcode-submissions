class MinStack {
    constructor() {
        // this.min = undefined;
        this.stack = [];
    }

    // /**
    //  * @param {number} val
    //  * @return {void}
    //  */
    // push(val) {
    //     if (this.stack.length === 0) this.min = val;
    //     else if (val < this.min) {
    //         this.min = val;
    //     }
        
    //     this.stack.push(val);
    // }

    // /**
    //  * @return {void}
    //  */
    // // This takes O(n) time but it's not often that we'll encounter the minimum value
    // // while popping from the stack, hence, the amortized time complexity is O(1).
    // pop() {
    //     let val = this.stack.pop();
    //     if (val === this.min) {
    //         let tempStack = [];
    //         while (this.stack.length > 0) {
    //             tempStack.push(this.stack.pop())
    //         }
    //         // this.push takes care of storing the new minimum value
    //         while (tempStack.length > 0) {
    //             this.push(tempStack.pop());
    //         }
    //     }
    //     return val;
    // }

    // /**
    //  * @return {number}
    //  */
    // top() {
    //     return this.stack.at(-1);
    // }

    // /**
    //  * @return {number}
    //  */
    // getMin() {
    //     return this.min;
    // }

    /**
     * Another way to do it would be to keep track of the minimum at every position in the stack.
     * So, the minimum at the top would be the minimum upto that point in the stack.
     * When we push a new element or pop from the stack we recalculate the minimum by comparing with
     * the top of the stack.
     * Time: O(1) for push, pop, top and getMin
     * Space: O(n) - storing [value, mininum] for the length of the stack
     */
    push(val) {
        let newMin = val;
        if (this.stack.length > 0) newMin = Math.min(val, this.stack.at(-1)[1]);

        this.stack.push([val, newMin]);
    }

    pop() {
        if (this.stack.length > 0) return this.stack.pop()[0];
    }

    top() {
        if (this.stack.length > 0) return this.stack.at(-1)[0];
    }

    getMin() {
        if (this.stack.length > 0) return this.stack.at(-1)[1];
    }
}
