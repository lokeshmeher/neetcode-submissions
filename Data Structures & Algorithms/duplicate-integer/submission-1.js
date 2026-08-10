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

        let uniqNums = new Set([...nums]);
        return uniqNums.size < nums.length;
    }
}
