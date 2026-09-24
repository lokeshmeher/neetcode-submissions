class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    characterReplacement(s, k) {
        /**
         * Brute force would be to consider every substring we can form from the given string s
         * and get the count of the most frequent character. We then check to see if the length
         * of the substring minus the count of the most frequent character is less than or equal
         * to k. If so, we have a valid length (which would be the length of the substring). After
         * doing this for every substring we take the maximum valid length and return it.
         * Time: O(n^2)
         * Space: O(n)
         */
        /*
        let maxLen = 0;
        for (let i=0; i<s.length; i++) {
            for (let j=i; j<s.length; j++) {
                let str = s.substring(i, j+1);
                let counter = new Map();
                for (let char of str) {
                    counter.set(char, (counter.get(char) || 0) + 1);
                }
                if (str.length - Math.max(...counter.values()) <= k) {
                    maxLen = Math.max(maxLen, str.length);
                }
            }
        }
        return maxLen;
        */

        /**
         * Optimal approach would involve a sliding window to get the substrings. We continue to 
         * grow the length of the window as long as the difference between the number of characters
         * and the count of the most frequent character is less than k. We shrink the window as long
         * as the condition fails. We store the maximum length of the substring that is valid.
         * We continue to loop till the right pointer reaches the end of the string and we can't
         * shrink the window any further. We keep a hash map of the frequence of each character in
         * the substring.
         * Time: O(26 * n) = O(n)
         * Space: O(1)
         */
        let l = 0, r = 0;
        let maxLen = 0;
        let freq = new Map();
        while (r < s.length) {
            freq.set(s[r], (freq.get(s[r]) || 0) + 1);

            while (r-l+1 - Math.max(...freq.values()) > k) {
                freq.set(s[l], freq.get(s[l])-1);
                l++;
            }

            maxLen = Math.max(maxLen, r-l+1);
            r++;
        }
        return maxLen;
    }
}
