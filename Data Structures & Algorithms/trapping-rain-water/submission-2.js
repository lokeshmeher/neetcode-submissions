class Solution {
    /**
     * @param {number[]} height
     * @return {number}
     */
    trap(height) {
        /**
         * One way would be to go left and right for every value in height
         * array and check if there is a greater element to the left and
         * right of the element. If so, it will hold water with height
         * min(left, right) - height[i].
         * Time: O(n^2) - since we have to check till the very beginning
         * and the very end of the height array.
         * Space O(1)
        */
        // let totalWater = 0;
        // for (let i=0; i<height.length; i++) {
        //     let l=i-1, r=i+1;
        //     let left = 0, right = 0;
        //     while (l>=0) {
        //         if (height[l] > left) {
        //             left = height[l];
        //         }
        //         l--;
        //     }
        //     while (r < height.length) {
        //         if (height[r] > right) {
        //             right = height[r];
        //         }
        //         r++;
        //     }
        //     let water = Math.min(left, right) - height[i];
        //     if (water > 0) {
        //         totalWater += water;
        //     }
        // }
        // return totalWater;

        /**
         * Another way would be to use prefix and suffix arrays to store
         * the maximum height on the left and right of each element in the 
         * height array.
         * Time: O(n)
         * Space: O(n)
         */
        // let prefixMaxes = [];
        // let suffixMaxes = [];
        // let pMax = 0;
        // for (let i=0; i<height.length; i++) {
        //     prefixMaxes.push(pMax);
        //     pMax = Math.max(height[i], pMax);
        // }
        // let sMax = 0;
        // for (let i=height.length-1; i>=0; i--) {
        //     suffixMaxes.unshift(sMax);
        //     sMax = Math.max(height[i], sMax);
        // }

        // let totalWater = 0;
        // for (let i=0; i<height.length; i++) {
        //     let water = Math.min(prefixMaxes[i], suffixMaxes[i]) - height[i];
        //     if (water > 0) {
        //         totalWater += water;
        //     }
        // }
        // return totalWater;

        /**
         * Optimal approach would be to use two pointers to keep track of the
         * maximum height so far.
         * We shift the minimum of the two pointers in each iteration.
         * For example, if the left pointer's value is less than the right
         * pointer, it doesn't matter how big the right pointer value is the
         * bottleneck is going to be the left pointer's value. So we can 
         * confidently shift the left pointer and update the value of the max
         * height so far.
         * We keep track of the max height on the left and right.
         */
        let l = 0, r = height.length-1;
        let maxL = 0, maxR = 0;
        let totalWater = 0;
        while (l < r) {
            maxL = Math.max(height[l], maxL);
            maxR = Math.max(height[r], maxR);
            
            if (maxL < maxR) {
                totalWater += maxL - height[l];
                l++;
            }
            else {
                totalWater += maxR - height[r];
                r--;
            }
        }
        return totalWater;
    }
}
