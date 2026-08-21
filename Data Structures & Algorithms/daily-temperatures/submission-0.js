class Solution {
    /**
     * @param {number[]} temperatures
     * @return {number[]}
     */
    dailyTemperatures(temperatures) {
        /**
         * Brute force would be to loop over `temperatures` and for each `i` we start another loop
         * from i+1 to end of the array and check if the temperature for the index is greater than
         * the temperatures[i]. We do this for every i.
         * Time: O(n^2)
         * Space: O(1)
         */
        /**
         * Optimal approach involves a monotonically decreasing stack as suggested by the hints.
         * So, we basically loop through each element and check if it's greater than the top
         * of the stack. If it is we pop from the stack until we hit an element greater than
         * the current element while updating the answer array to be the 
         */
        let stack = [];
        let answer = Array(temperatures.length).fill(0);
        for (let [i, t] of temperatures.entries()) {
            if (stack.length > 0) {
                let top = stack.at(-1);
                if (t <= top[0]) {
                    stack.push([t, i]);
                }
                // t > top of stack
                else {
                    while (stack.length > 0) {
                        let last = stack.at(-1);
                        if (last[0] >= t) break;
                        answer[last[1]] = i-last[1];
                        stack.pop();
                    }
                    stack.push([t, i]);
                }
            }
            else {
                stack.push([t, i]);
            }
        }
        return answer;
    }
}
