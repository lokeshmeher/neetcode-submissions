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
         * in a substring.
         * Time: O(n)
         * Space: O(n)
         */
        let l = 0, r = 0;
        let longestLen = 0;
        let uniqChars = new Set();
        while (r < s.length) {
            while (uniqChars.has(s[r])) {
                uniqChars.delete(s[l])
                l++;
            }
            uniqChars.add(s[r])
            longestLen = Math.max(longestLen, uniqChars.size);
            r++;
        }
        return longestLen;
    }
}
