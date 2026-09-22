class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    characterReplacement(s, k) {
        /**
         * Brute force would be to consider every substring and return the maximum length of the
         * substring that has at most k replacements. The number of replacements is equal to the
         * difference between the length of the substring and the frequency of the most frequent
         * character in that substring.
         */
        /**
         * Optimal approach would involve using a sliding window to get the substring and increment
         * the right pointer whenever the number of replacements is less than or equal to k.
         * Similarly we decrement the left pointer whenever the number of replacements exceeds k.
         * Result will be the maximum window size observed at each iteration.
         */
        let res = 1;
        let l = 0, r = 0;
        let counts = new Map("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(c => [c, 0]));
        while (r < s.length) {
            counts.set(s[r], counts.get(s[r])+1);
            while (r-l+1 - Math.max(...counts.values()) > k) {
                counts.set(s[l], counts.get(s[l])-1);
                l++;
            }
            res = Math.max(res, r-l+1);
            r++;
        }

        return res;
    }
}
