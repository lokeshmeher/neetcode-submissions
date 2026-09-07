class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    search(nums, target) {
        /**
         * Straightforward binary search.
         * Time: O(log n)
         * Space: O(1)
         */
        let l = 0, r = nums.length-1;
        while (l <= r) {
            let mid = Math.trunc((l+r)/2);
            if (target === nums[mid]) return mid;
            else if (target > nums[mid]) l = mid + 1;
            else r = mid - 1;
        }
        return -1;
    }
}
