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
        
        let window = new Map();
        let countT = new Map();
        for (let char of t) {
            countT.set(char, (countT.get(char) || 0) + 1);
        }
        let have = 0;
        let need = countT.size;
        let res = [-1, -1];
        let resLen = Infinity;
        let l = 0;

        for (let r=0; r<s.length; r++) {
            let char = s[r];
            window.set(char, (window.get(char) || 0) + 1);
            if (countT.has(char) && window.get(char) === countT.get(char)) {
                have++;
            }

            while (have === need) {
                if (r-l+1 < resLen) {
                    res = [l, r];
                    resLen = r-l+1;
                }

                let left = s[l];
                window.set(left, (window.get(left)-1));
                if (countT.has(left) && window.get(left) < countT.get(left)) {
                    have--;
                }
                l++;
            }
        }

        return resLen === Infinity ? "" : s.substring(res[0], res[1]+1);
    }
}
