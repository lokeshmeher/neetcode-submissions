class Solution {
    /**
     * @param {string} s1
     * @param {string} s2
     * @return {boolean}
     */
    checkInclusion(s1, s2) {
        /**
         * We keep a rolling window of size s1.length on s2 and count the occurence of each
         * character using a hash map. If the count match to the count of characters in s1 we
         * return true. 
         * Time: O(26 * n) = O(n) - where n is the size of s2 - since both strings contain only
         * lowercase letters.
         * Space: O(2 * 26) = O(1).
         */
        let l = 0, r = s1.length-1;
        let count1 = new Map();
        for (let char of s1) {
            count1.set(char, (count1.get(char) || 0) + 1);
        }
        let count2 = new Map();
        for (let char of s2.substring(l, r+1)) {
            count2.set(char, (count2.get(char) || 0) + 1);
        }
        while (r < s2.length) {
            let equal = true;
            for (let [key, val] of count1.entries()) {
                if (count2.get(key) != val) {
                    equal = false;
                    break;
                }
            }
            if (equal) {
                return true;
            }

            count2.set(s2[l], count2.get(s2[l]) - 1);
            l++;
            r++;
            count2.set(s2[r], (count2.get(s2[r]) || 0) + 1);
        }
        return false;
    }
}
