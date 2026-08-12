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
        let groups = new Map();
        for (let str of strs) {
            let sortedStr = str.split('').sort().join('');
            if (!groups.has(sortedStr)) {
                groups.set(sortedStr, []);
            }
            groups.get(sortedStr).push(str);
        }
        return [...groups.values()];
    }
}
