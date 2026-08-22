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
         * So, we basically loop through each element and check if the top of the stack is less
         * than the current temperature, if it is we pop from the stack and update `answer` at
         * the correct index by calculating the difference between the current index and the index
         * we popped from the stack.
         * Time: O(n) - since the while loop will only run if there are elements in the stack at max
         * for n number of times in total.
         * Space: O(n)
         */
        let stack = [];  // pair: [temperature, index]
        let answer = Array(temperatures.length).fill(0);
        for (let [i, temp] of temperatures.entries()) {
            while (stack.length > 0 && stack.at(-1)[0] < temp) {
                let [last, idx] = stack.pop();
                answer[idx] = i-idx;
            }
            stack.push([temp, i]);
        }
        return answer;
    }
}
