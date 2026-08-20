class Solution {
    /**
     * @param {string[]} tokens
     * @return {number}
     */
    evalRPN(tokens) {
        /**
         * Brute force approach would be to loop through the array and find an operator.
         * Once we find and operator we get the previous two values and calculate the result of the
         * operation. Then remove all three elements and put back the result at that position.
         * We do this till there is one element left which would be our final result.
         * Time: O(n^2) -- IF WE RUN THIS WE WILL GET TIME LIMIT EXCEEDED
         * Space: O(1)
         */
        /*
        if (tokens.length === 1) return tokens[0];
        else if (tokens.length === 2) {
            if (tokens.at(-1) === '-') return -Number(tokens[0]);
        }

        let operators = new Set(['+', '-', '*', '/']);
        let operations = new Map([
            ['+', (a, b) => a + b],
            ['-', (a, b) => a - b],
            ['*', (a, b) => a * b],
            ['/', (a, b) => Math.trunc(a / b)]
        ])
        while (tokens.length > 1) {
            for (let [i, token] of tokens.entries()) {
                if (operators.has(token)) {
                    let left = Number(tokens[i-2]);
                    let right = Number(tokens[i-1]);
                    let result = operations.get(token)(left, right);
                    // remove left, right and the operand and put back result in their place
                    tokens.splice(i-2, 3, result);
                    break;
                }
            }
        }
        return tokens[0];
        */

        /**
         * Optimal approach would be to use a stack data structure to store all operands.
         * Then when we encounter an operator we pop twice from the stack and after calculating
         * the result we store push it back onto the stack;
         * Time: O(n)  since we have to loop over `tokens` once.
         * Space: O(n)  since we may have to store all elements in the worst case.
         */
        let operands = [];
        let ops = new Set(['+', '-', '*', '/']);
        let operations = new Map([
            ['+', (a, b) => a + b],
            ['-', (a, b) => a - b],
            ['*', (a, b) => a * b],
            ['/', (a, b) => Math.trunc(a / b)]
        ]);
        for (let t of tokens) {
            if (ops.has(t)) {
                let right = Number(operands.pop());
                let left = Number(operands.pop());
                let result = operations.get(t)(left, right);
                operands.push(result);
            }
            else {
                operands.push(t);
            }
        }
        return operands[0];
    }
}
