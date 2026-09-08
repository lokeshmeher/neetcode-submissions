class Solution {
    /**
     * @param {number[]} piles
     * @param {number} h
     * @return {number}
     */
    minEatingSpeed(piles, h) {
        /**
         * One way would be to linearly search every value starting from the minimum value in the 
         * `piles` array and find the `k` for which the number of hours to eat all the bananas
         * is less than or equal to the `h` hours.
         * Time: O(n * m) - where n is the size of the input array and m is the maximum value in the
         * array.
         * Space: O(1)
         */
        // Return the number of hours taken to eat all the bananas with `val` bananas per hour.
        let hoursTaken = (val) => {
            let hours = 0;
            for (let pile of piles) {
                hours += Math.ceil(pile/val);
            }
            return hours;
        }

        let max = Math.max(...piles);
        // let k = 1;
        // while (hoursTaken(k) > h && k <= max) {
        //     k++;
        // }
        // return k;
        /**
         * Since we are searching for a value within a range, we can use binary search.
         */
        let l = 1, r = max, k = max;
        while (l <= r) {
            let mid = Math.floor((l + r)/2);
            
            if (hoursTaken(mid) <= h) {
                r = mid-1;
                if (mid < k) k = mid;
            }
            else {
                l = mid+1;
            }
        }
        return k;
    }
}
