class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    topKFrequent(nums, k) {
        /**
         * One approach would be to sort the array and count the number of occurences of the most
         * occuring number, then loop over the array once again and count the number of occurences
         * of the 2nd most occuring number and so on totalling k loops over the array.
         * Time: O(kn) where n is the size of the nums array.
         * Space: O(k)
         */
        /**
         * Another approach would be to count the occurence of each distinct element in the array
         * using a hashmap. Then sort the keys of the hashmap to get the k most frequent elements.
         * Time: O(nlogn) where n is the size of the nums array.
         * Space: O(n)
         */
        /**
         * Another approach would be to have k buckets (an array) from most frequent to least frequent
         * numbers. And loop over the nums array once while counting the occurence of each number
         * using a hashmap and adding the number in the appropriate position in the bucket.
         * Then we just return the most frequent (buckets) numbers array.
         * Time: O(kn) as we have to keep the k array sorted in every iteration through the nums
         * array.
         * Space: O(n + k) 
         */
        /**
         * Optimal approach would be to use a trick with the bucket sort algorithm where instead of
         * using the values as indices in the bucket array we use the counts of the numbers as indices
         * in the array, so the maximum size of the array would be n where n is the length of the nums
         * array.
         * Time: O(n) because we are going to loop over the array twice, once to build the hashmap 
         * for storing the counts of each number and again to build the bucket array.
         * Space: O(n) because the hashmap can be at max size n and the bucket array will also be of
         * max size n where n is the size of the nums array.
         */
        let counts = new Map();
        for (let num of nums) {
            if (!counts.has(num)) {
                counts.set(num, 0);
            }
            counts.set(num, counts.get(num)+1);
        }

        let bucket = new Array(nums.length+1);
        for (let i=0; i<bucket.length; i++) {
            bucket[i] = [];
        }
        for (let [num, count] of counts) {
            bucket[count].push(num)
        }

        let mostFrequent = [];
        for (let i=nums.length; i>0; i--) {
            for (let num of bucket[i]) {
                if (mostFrequent.length >= k) {
                    return mostFrequent;
                }
                mostFrequent.push(num);
            }
        }
        return mostFrequent;
    }
}
