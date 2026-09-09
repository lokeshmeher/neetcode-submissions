class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findMin(nums) {
        /**
         * Brute force approach would be to linearly search the array for the minimum value.
         * Time: O(n)
         * Space: O(1)
         */
        /**
         * Since the array is sorted but rotated we can use binary search to look for the minimum
         * in O(log n) time.
         */
        let l = 0, r = nums.length-1;
        let min = nums.at(-1);
        while (l <= r) {
            let mid = Math.floor((l+r)/2);

            if (nums.at(-1) >= nums[mid]) {
                if (nums[mid] < min) min = nums[mid];
                r = mid-1;
            }
            else {
                l = mid+1
            }
        }
        return min;
    }
}
