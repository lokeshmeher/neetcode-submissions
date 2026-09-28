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
        /*
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
        */

        /**
         * There is an even more optimal solution that runs in O(n) time as suggested in the
         * solution.
         * Time complexity is actually O(26 + n) = O(n).
         * We keep a variable that keeps the number of characters that match.
         * Anytime this variable becomes 26 (since we're given only lower case letters) we return
         * true.
         * We can either use a hash map or an array to count the characters in each string.
         */
        if (s1.length > s2.length) return false;
        
        let s1Count = new Map(), s2Count = new Map();
        for (let i=0; i<s1.length; i++) {
            s1Count.set(s1[i], (s1Count.get(s1[i]) || 0) + 1);
            s2Count.set(s2[i], (s2Count.get(s2[i]) || 0) + 1);
        }

        let matches = 0;
        for (let i=0; i<26; i++) {
            let char = String.fromCharCode(i+'a'.charCodeAt(0));
            if (s1Count.get(char) === undefined) s1Count.set(char, 0);
            if (s2Count.get(char) === undefined) s2Count.set(char, 0);

            if (s1Count.get(char) === s2Count.get(char)) matches += 1;
        }

        let l = 0;
        for (let r=s1.length; r<s2.length; r++) {
            if (matches === 26) return true;

            s2Count.set(s2[r], s2Count.get(s2[r])+1);
            if (s1Count.get(s2[r]) === s2Count.get(s2[r])) matches++;
            else if (s1Count.get(s2[r]) + 1 === s2Count.get(s2[r])) matches--;

            s2Count.set(s2[l], s2Count.get(s2[l])-1);
            if (s1Count.get(s2[l]) === s2Count.get(s2[l])) matches++;
            else if (s1Count.get(s2[l]) - 1 === s2Count.get(s2[l])) matches--;
            l++;
        }

        return matches === 26;
    }
}
