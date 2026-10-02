class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {string}
     */
    minWindow(s, t) {
        /**
         * Brute force approach would be to look at every substring greater than or equal to the
         * length of t.
         * Time: O(n^2) - where n is the length of the string s (assuming length of s >> t).
         * Space: O(n) - in worst case the substring might of upto the length of s.
         */
        /**
         * Optimal approach would involve a sliding window. We can use a hashmap to count the
         * occurence of each character in t.
         * Then we use a sliding window. We grow the window (increment the right pointer) until
         * we have all the character counts greater than or equal to the character counts of t.
         * We then shrink the window (increment left pointer until the window becomes invalid)
         * and save the current window as the resulting substring.
         * We shrink the window till it becomes invalid as which point we start growing the
         * window again. We continue this process until we reach the end of string s.
         * If we couldn't find a valid window at this point we return empty string.
         */
        if (t === "") {
            return "";
        }
        
        let l = 0, r = 0;
        let res = "";  // If we find a valid substring this will hold it
        let resLen = Infinity;

        let countT = new Map();
        for (let char of t) {
            countT.set(char, (countT.get(char) || 0) + 1);
        }
        let window = new Map();  // Frequency of characters in the current window
        let need = countT.size
        let have = 0;

        while (r < s.length) {
            let char = s[r];
            window.set(char, (window.get(char) || 0) + 1);
            if (countT.has(char) && countT.get(char) === window.get(char)) {
                have++;
            }

            while (have === need) {
                // We found a result so let's update it
                if (r-l+1 < resLen) {
                    res = s.substring(l, r+1);
                    resLen = r-l+1;
                }
                // pop from left of our window
                let leftChar = s[l];
                window.set(leftChar, window.get(leftChar) - 1);
                if (countT.has(leftChar) && window.get(leftChar) < countT.get(leftChar)) {
                    have--;
                }
                l++;
            }
            r++;
        }

        return res;
    }
}
