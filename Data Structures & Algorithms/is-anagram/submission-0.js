class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    isAnagram(s, t) {
        if (s.length !== t.length) return false;

        let charCounts1 = new Map();
        for (let char of s) {
            let prevCount = charCounts1.get(char) ? charCounts1.get(char) : 0;
            charCounts1.set(char, prevCount+1);
        }

        let charCounts2 = new Map();
        for (let char of t) {
            let prevCount = charCounts2.get(char) ? charCounts2.get(char) : 0;
            charCounts2.set(char, prevCount+1);
        }

        for (let [char, count] of charCounts1) {
            if (charCounts2.get(char) !== count) return false;
        }
        return true;
    }
}
