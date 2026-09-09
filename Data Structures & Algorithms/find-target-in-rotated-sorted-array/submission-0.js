class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    search(nums, target) {
        /**
         * A trivial solution would be to search linearly in the array.
         * Time: O(n)
         * Space: O(1)
         */
        /**
         * But since the array is sorted we can use it to our advantage and use binary search to 
         * search for the target value.
         * First we find the pivot. Then we do binary search on the left sorted half and the right
         * sorted half to find the target.
         * Time: O(log n)
         * Space: O(1)
         */
        let l = 0, r = nums.length-1;
        let minIdx = 0, min = nums[0];
        while (l <= r) {
            let mid = Math.floor((l+r)/2);
            
            if (nums[mid] < min) {
                min = nums[mid];
                minIdx = mid;
            }

            if (nums.at(-1) >= nums[mid]) {
                r = mid-1;
            }
            else {
                l = mid+1;
            }
        }

        // Search left half
        l = 0, r = minIdx-1;
        while (l <= r) {
            let mid = Math.floor((l+r)/2);
            if (nums[mid] > target) {
                r = mid-1;
            }
            else if (nums[mid] < target) {
                l = mid+1;
            }
            else {
                return mid;
            }
        }

        l = minIdx, r = nums.length-1;
        while (l <= r) {
            let mid = Math.floor((l+r)/2);
            if (nums[mid] > target) {
                r = mid-1;
            }
            else if (nums[mid] < target) {
                l = mid+1;
            }
            else {
                return mid;
            }
        }

        return -1;
    }
}
