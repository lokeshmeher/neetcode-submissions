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

        let prefixMaxes = [];
        let suffixMaxes = [];
        let pMax = 0;
        for (let i=0; i<height.length; i++) {
            prefixMaxes.push(pMax);
            pMax = Math.max(height[i], pMax);
        }
        let sMax = 0;
        for (let i=height.length-1; i>=0; i--) {
            suffixMaxes.unshift(sMax);
            sMax = Math.max(height[i], sMax);
        }

        let totalWater = 0;
        for (let i=0; i<height.length; i++) {
            let water = Math.min(prefixMaxes[i], suffixMaxes[i]) - height[i];
            if (water > 0) {
                totalWater += water;
            }
        }
        return totalWater;
    }
}
