class Solution {
    /**
     * @param {number[]} prices
     * @return {number}
     */
    maxProfit(prices) {
        /**
         * Brute force would be - for every element in prices we check every other element after it
         * to calculate the maximum profit that can be achieved. If profit is less than 0 then it's
         * zero.
         * Time: O(n^2)
         * Space: O(1)
         */
        /**
         * Optimal approach would involve using a sliding window. Whenever we encounter an value
         * less than the left value we increment both left and right pointers. Whenever we 
         * encounter a value greater than the left value we calculate and save the profit and then
         * increment the right pointer. When right pointer reaches the end of the array we stop.
         * If right value is less than the left value we move the left pointer to the right pointer.
         */
        let l = 0, r = 1;
        let profit = 0
        while (r < prices.length) {
            if (prices[r] <= prices[l]) {
                l = r;
            }
            else {
                profit = Math.max(profit, prices[r]-prices[l]);
            }
            r++;
        }
        return profit;
    }
}
