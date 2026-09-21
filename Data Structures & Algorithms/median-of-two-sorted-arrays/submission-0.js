class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number}
     */
    findMedianSortedArrays(nums1, nums2) {
        /**
         * Brute force approach would involve combining both arrays into a new array and get the
         * middle element (median).
         * Time: O(m+n)
         * Space: O(m+n)
         */
        /**
         * Optimal approach would involve binary search as suggested by the hints.
         * Let's consider the smaller of the arrays and use binary search on it to find the correct
         * partition.
         * Suppose we take x elements from the smaller array then the larger array will have the
         * partition after half-x elements.
         */
        let [A, B] = [nums1, nums2];
        // A is always the smaller array
        if (nums2.length < nums1.length) {
            [A, B] = [B, A]
        }

        let total = A.length + B.length;
        let half = Math.floor((A.length + B.length)/ 2);

        let l = 0, r = A.length - 1;
        while (true) {
            let i = Math.floor((l + r)/ 2);
            let j = half - i - 2;

            let Aleft = i >= 0 ? A[i] : -Infinity;
            let Aright = i+1 < A.length ? A[i+1] : Infinity;
            let Bleft = j >= 0 ? B[j] : -Infinity;
            let Bright = j+1 < B.length ? B[j+1] : Infinity;

            if (Aleft <= Bright && Bleft <= Aright) {
                if (total % 2 === 0) {
                    return (Math.max(Aleft, Bleft) + Math.min(Aright, Bright)) / 2;
                }
                else {
                    return Math.min(Aright, Bright);
                }
            }
            else if (Aleft > Bright) {
                r = i-1;
            }
            else if (Bleft > Aright) {
                l = i+1;
            }
        }
    }
}
