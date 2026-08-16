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
         * Space complexity: O(1) - if we don't consider the space taken by the output array.
         *
         * Optimal approach would be to calculate the product of all numbers in nums array once
         * which would take O(n) time and then build the output array by dividing the nums[i]
         * from the product for each nums[i].
         * But there is a catch, if number is zero then for output[i] the product could be an 
         * integer or zero depending upon if there are more zeros in the nums array.
         * So, we can use a hash set or an array to track the indices of the zeros (using a hash set
         * is 25% more efficient in terms of runtime).
         * Time: O(n)
         * space: O(n) - in worst case all values could be zero to `zeros` could be of size n
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
        /*
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
        */

        /**
         * There is an even more efficient way to do it in terms of memory (if we don't count the
         * memory taken by the output array) then we can do it in O(1) memory.
         * We can basically use the output array itself to store the prefix/postfix value.
         * We're gonna do 2 pass over the nums array. In the first pass we are going to calculate
         * the prefix and store the result in the output array but shifted one position to the right
         * so that when we calculate the postfix we just have to multiply the existing value with
         * the stored prefix in each position to get the correct value in the output array.
         * Time: O(n)
         * Space: O(1)
         */
        let output = Array(nums.length);
        let pre = 1;
        for (let i=0; i<nums.length; i++) {
            output[i] = pre;
            pre *= nums[i];
        }
        // At this point each element in the output array stores the prefix product till that
        // element but not including that element.
        let post = 1;
        for (let i=nums.length-1; i>=0; i--) {
            output[i] *= post; // final value of output[i]
            post *= nums[i];
        }

        return output;
    }
}
