class Solution {
    /**
     * @param {number[]} numbers
     * @param {number} target
     * @return {number[]}
     */
    twoSum(numbers, target) {
        /**
         * One way would be to check every number with every other number (basically all the pairs)
         * and check if their sum equals target.
         * Time: O(n^2)
         * Space: O(1)
         */
        /**
         * Since the array is sorted, we can do this optimally using two pointers.
         * We start at each end and iterate through the array of numbers to check if their sum
         * equals target. If their sum is greater than the target we decrement the right pointer
         * and if their sum is less than target we increment the left pointer. Otherwise we
         * return the indices.
         * Time: O(n)
         * Space: O(1)
         */
        let l = 0, r = numbers.length-1;
        while (l < r) {
            if (numbers[l] + numbers[r] > target) r--;
            else if (numbers[l] + numbers[r] < target) l++;
            else return [l+1, r+1];  // 1-indexed
        }
    }
}
