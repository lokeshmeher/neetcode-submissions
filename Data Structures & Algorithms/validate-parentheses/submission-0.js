class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isValid(s) {
        /**
         * To solve this efficiently we can use a stack.
         * Everytime we see a closing bracket, we peek
         * into the stack to check if the corresponding open bracket is there at the top, if so we
         * pop from the stack and move on to the next character.
         * And everytime we see an opening bracket we push onto the stack.
         * At the end of the string the stack should be empty for the string to be valid as every
         * opening bracket must have a corresponding closing bracket and vice versa. 
         */
        let stack = [];
        let openingBrackets = new Set(['(', '{', '[']);
        for (let char of s) {
            if (openingBrackets.has(char)) stack.push(char);
            else if (char === ')') {
                if (stack.length < 1 || stack[stack.length-1] !== '(') return false;
                else stack.pop();
            }
            else if (char === '}') {
                if (stack.length < 1 || stack[stack.length-1] !== '{') return false;
                else stack.pop();
            }
            else if (char === ']') {
                if (stack.length < 1 || stack[stack.length-1] !== '[') return false;
                else stack.pop();
            }
        }
        return stack.length === 0;
    }
}
