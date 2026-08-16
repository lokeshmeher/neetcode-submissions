class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    productExceptSelf(nums) {
        /**
         * Brute force approach would be to run a loop for each integer in num to get the product of
         * all elements in the nums array except nums[i].
         * Time complexity: O(n^2)
         * Space complexity: O(n) for the new output array created.
         *
         * Optimal approach would be to calculate the product of all numbers in nums array once
         * which would take O(n) time and then build the output array by dividing the nums[i]
         * from the product for each nums[i].
         * But there is a catch, if number is zero then for output[i] the product could be an 
         * integer or zero depending upon if there are more zeros in the nums array.
         * So, we can use a hash set to track the indices of the zeros.
         * Time: O(n)
         * space: O(n)
         */
        let product = 1;
        let zeros = new Set();
        for (let i=0; i<nums.length; i++) {
            if (nums[i] === 0) {
                zeros.add(i);
            }
            else {
                product *= nums[i];
            }
        }

        let output = [];
        if (zeros.size > 1) {
            output = Array(nums.length).fill(0);
        }
        else if (zeros.size === 1) {
            output = Array(nums.length).fill(0);
            output[zeros.values().next().value] = product;
        }
        else {
            for (let num of nums) {
                output.push(product/num);
            }
        }
        return output;
        /**
         * For the follow up question: yes we can solve it in O(n) time without using the division
         * operation by using the concept of prefix/postfix array.
         */
    }
}
