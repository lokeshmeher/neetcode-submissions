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
         * So, we can use a hash set or an array to track the indices of the zeros (using a hash set
         * is 25% more efficient in terms of runtime).
         * Time: O(n)
         * space: O(n)
         */
        /*
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
        */
        /**
         * For the follow up question: yes we can solve it in O(n) time without using the division
         * operation by using the concept of prefix/postfix array.
         * 
         * We can use a prefix array and a postfix array to store the product of the numbers
         * upto that number for each element in the nums array.
         * Then, each element for the output array is basically the product of the previous index
         * from the prefix array and the next index in the postfix array. The edge cases (for first
         * and last index the product from the prefix/postfix arrays could be assumed as 1)
         * 
         * Time: O(n)
         * Space: O(n)
         */
        let prefix = [];
        let product = 1
        for (let num of nums) {
            product *= num;
            prefix.push(product);
        }

        let postfix = [];
        product = 1;
        for (let i=nums.length-1; i>=0; i--) {
            product *= nums[i];
            postfix.unshift(product);
        }

        let output = [];
        for (let i=0; i<nums.length; i++) {
            let prefixProduct = i === 0 ? 1 : prefix[i-1];
            let postfixProduct = i === nums.length-1 ? 1 : postfix[i+1];
            output.push(prefixProduct * postfixProduct);
        }
        return output;
    }
}
