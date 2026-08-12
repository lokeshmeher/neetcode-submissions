class Solution {
    /**
     * @param {string[]} strs
     * @return {string[][]}
     */
    groupAnagrams(strs) {
        /**
         * Sort each string and use it as the key to group the strings into lists.
         * Store the groups in a Map.
         * 
         * Time for sorting O(nlogn * m) where `n` is the max length of each string
         * and `m` is the length of the `strs` array.
         * 
         * Space is O(m * n) where m is the length of the `strs` array and `n` is
         * the max length of each string.
         */
        // let groups = new Map();
        // for (let str of strs) {
        //     let sortedStr = str.split('').sort().join('');
        //     if (!groups.has(sortedStr)) {
        //         groups.set(sortedStr, []);
        //     }
        //     groups.get(sortedStr).push(str);
        // }
        // return [...groups.values()];

        /**
         * Using character counts of each string (an array of fixed length - 26) as the key
         * we can group the anagrams together.
         * Time = O (m * n)
         */
        let groups = new Map();
        for (let str of strs) {
            let charCounts = Array(26).fill(0);
            for (let c of str) {
                let code = c.charCodeAt(0) - "a".charCodeAt(0);
                charCounts[code] += 1;
            }
            let key = charCounts.join(',');
            if (!groups.has(key)) {
                groups.set(key, [])
            }
            groups.get(key).push(str);
        }
        return [...groups.values()];
    }
}
