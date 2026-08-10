class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    twoSum(nums, target) {
        /**
         * i + j = target
         * for each i, check if target-i / j exists --> we can do this part in constant time
         * by using a hash map of values in num to the index at which that value occurs.
         * --> EDGE CASE: duplicate values => if (i === j) then store indices of i and j
         * in an array and return the first 2 values from that array -- the array will contain
         * unique indices.
         * when you find it, return the indices of i and j.
         */
        /**
         * 1. first create the hash map of values to indices, if value exists then save an array.
         * 2. Loop over each element in the hash map ->[i]-> (since hash maps can be looped over in
         * insertion order) and find the index of the other ->[j].
         * 3. If i==j, then first check if at least two distinct values exists in the hash map for
         * that key, then return them.
         * 
         * Time: O(n), Space: O(n) - where n is the size of the nums array.
         */
        let indexMap = new Map();
        for (let [i, num] of nums.entries()) {
            if (indexMap.has(num)) {
                if (Array.isArray(indexMap.get(num))) {
                    indexMap.set(num, [...indexMap.get(num), i]);
                } else {
                    indexMap.set(num, [indexMap.get(num), i]);
                }
            } else {
                indexMap.set(num, i);
            }
        }

        // WE can loop over `indexMap` instead of `nums` because javascript Map saves insertion order.
        for (let [num, idx] of indexMap) {
            let other = indexMap.get(target-num);
            if (other === undefined) continue;
            
            if (num === target-num) {
                // If pair/more of duplicates exists, for e.g. [5, 5] or [1, 3, 3, 5].
                if (Array.isArray(idx)){
                    return [idx[0], idx[1]];
                }
            }
            else {
                return [idx, other];
            }
        }

        /**
         * A semi optimized solution could use a list of pairs (number to it's index) instead of a
         * hashmap, e.g. [[3, 0], [4, 1], [5, 2], [6, 3]]. THen we can sort the numbers and use 
         * two pointers (one at the beginning, one at the end of the list) to find the numbers whose
         * sum equals target. TIme would be O(nlogn) and space will be O(n).
         */
    }
}
