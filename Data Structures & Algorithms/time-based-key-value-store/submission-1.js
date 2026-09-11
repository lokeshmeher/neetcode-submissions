class TimeMap {
    constructor() {
        this.keyStore = new Map();
    }

    /**
     * We can store the values in a sorted list (sorted by the timestamp).
     * When setting we just push onto the list since we're given that all timestamps of set are
     * strictly increasing.
     * When getting we check for the timestamp which is smaller than or equal to the provided
     * timestamp and return the corresponding value.
     * 
     * Time: O(1) for set, O(log n) for get - where n is the total number of values associated
     * with a key.
     * Space: O(m * n) - where m is the total number of keys.
     */

    /**
     * @param {string} key
     * @param {string} value
     * @param {number} timestamp
     * @return {void}
     */
    set(key, value, timestamp) {
        if (!this.keyStore.has(key)) {
            this.keyStore.set(key, []);
        }
        this.keyStore.get(key).push([timestamp, value]);
    }

    /**
     * @param {string} key
     * @param {number} timestamp
     * @return {string}
     */
    get(key, timestamp) {
        let arr = this.keyStore.get(key) || [];
        let l = 0, r = arr.length-1;
        let val = "";
        while (l <= r) {
            let mid = Math.floor((l+r)/2);

            if (arr[mid][0] === timestamp) {
                return arr[mid][1];
            }
            else if (arr[mid][0] < timestamp) {
                val = arr[mid][1];
                l = mid+1;
            }
            else {
                r = mid-1;
            }
        }
        return val;
    }
}
