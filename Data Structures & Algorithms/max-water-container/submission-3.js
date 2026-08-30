class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    maxArea(heights) {
        /**
         * Brute force would be to take every combination of two pointers
         * and calculate the water contained by them.
         * Time: O(n^2)
         * Space: O(1)
         */
        /**
         * Optimal approach would be to use two pointers and increment the left
         * pointer if it's smaller otherwise we decrement the right pointer.
         */
        let l = 0, r = heights.length - 1;
        let maxWater = 0;
        while (l < r) {
            let area = (r - l) * Math.min(heights[l], heights[r]);
            maxWater = Math.max(maxWater, area);
            if (heights[l] < heights[r]) {
                l++;
            }
            else {
                r--;
            }
        }
        return maxWater;
    }
}
