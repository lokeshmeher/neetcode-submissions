class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    threeSum(nums) {
        /**
         * The brute force would be to get all the triplets and check if their sum equals 0.
         * We can do this by taking each number in the nums array and checking with every pair
         * in the rest of the array.
         * Time: O(n^3)
         * Space: O(1)
         */
        /**
         * What if we sort the array? Then we can use two pointers on the rest of the array for
         * each number in the array.
         * Time: O(n^2) -- O(nlogn) for sorting and O(n^2) for finding the triplets.
         * Space: O(1)
         */
        nums.sort((a, b) => a-b);  // sort in ascending order
        let triplets = [];
        for (let i=0; i<nums.length; i++) {
            // Skip the same starting element for a triplet  
            if (i > 0 && nums[i] === nums[i - 1]) continue;
            
            let l = i+1, r=nums.length-1;
            let target = -nums[i];
            while (l < r) {
                let sum = nums[l] + nums[r];
                if (sum > target) r--;
                else if (sum < target) l++;
                else {
                    // Skip over duplicate values for l and r
                    while (l < r && nums[l] === nums[l + 1]) l++;
                    while (l < r && nums[r] === nums[r - 1]) r--;
                    
                    triplets.push([nums[i], nums[l], nums[r]]);
                    l++;
                    r--;
                }
            }
        }
        return triplets;
    }
}
