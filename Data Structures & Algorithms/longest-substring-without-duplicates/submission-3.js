class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    lengthOfLongestSubstring(s) {
        /**
         * Brute force would be to check every possible substring and check for duplicate characters.
         * We returnt the longest substring without duplicates.
         * Time: O(n^2)
         * Space: O(n)
         */
        /**
         * Optimal approach would involve using a sliding window to check for duplicate characters
         * in a substring. We start with L=0, R=0. We use a hash set to check for duplicates.
         * We increment R until we find a duplicate at which point we calculate and save the maximum
         * length achived so far and move L = R. We stop when R reaches the end of the string.
         * Time: O(n)
         * Space: O(n)
         */
        let [l, r, len, uniqChars] = [0, 0, 0, new Set()];
        while (r < s.length) {
            while (uniqChars.has(s[r])) {
                uniqChars.delete(s[l]);
                l++;
            }
            uniqChars.add(s[r]);
            len = Math.max(len, r - l + 1);
            r++;
        }
        return len;
    }
}
