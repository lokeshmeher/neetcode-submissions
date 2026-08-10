class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    hasDuplicate(nums) {
        // let uniqNums = new Set();
        // for (let n of nums) {
        //     if (uniqNums.has(n)) {
        //         return true;
        //     }
        //     else {
        //         uniqNums.add(n);
        //     }
        // }
        // return false

        /**
         * This two liner solution is slightly less efficient in terms of memory because we have
         * to build the entire set before checking whereas in the previous solution we may return
         * the answer before we even iterate through the whole array of nums.
         *  */
        let uniqNums = new Set([...nums]);
        return uniqNums.size < nums.length;
    }
}
