class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    longestConsecutive(nums) {
        /**
         * One approach would be to sort the array and loop over it once to find the longest
         * consecutive sequence length.
         * Time: O(n* logn)
         * Space: O(1) - ignoring the space taken by sorting
         * 
         * We can do better in terms of time complexity but we have the sacrifice space in order to
         * do that.
         * We can use a hash map to store all numbers in the nums array and loop over the array once
         * and for every number we check if the next number is present in the hash map, if so we
         * update the length and mark the number as visited so that when we encounter the number again
         * in a subsequent iteration of the loop we skip it.  
         * Time: O(n)
         * Space: O(n)
         */
        if (nums.length < 1) return 0;
        else if (nums.length === 1) return 1;

        let numMap = new Map(nums.map(n => [n, false])); // [number, isVisited?]
        let maxLength = 1;
        for (let num of nums) {
            if (numMap.get(num)) continue; // If the number is already visited
            
            numMap.set(num, true)
            let currLength = 1;
            let currNum = num;
            while (numMap.has(++currNum)) {
                currLength++;
                numMap.set(currNum, true);
            }

            if (currLength > maxLength) {
                maxLength = currLength;
            }
        }
        return maxLength;
    }
}
