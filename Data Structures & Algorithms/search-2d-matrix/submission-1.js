class Solution {
    /**
     * @param {number[][]} matrix
     * @param {number} target
     * @return {boolean}
     */
    searchMatrix(matrix, target) {
        /**
         * We can go over each element in the matrix and check if it's equal to the target which
         * would take O(m*n) time.
         */
        /**
         * Since the matrix is sorted, we can use binary search.
         * Time: O(log (m*n)). Space: O(1)
         */

        // Takes an index in the range 0 to (m*n-1) and returns the corresponding value from the
        // matrix.
        let getElement = (i) => {
            let n = matrix[0].length;
            let row = Math.floor(i / n);
            let column = i % n;
            return matrix[row][column];
        }

        let l = 0, r = matrix.length * matrix[0].length - 1;
        while (l <= r) {
            let mid = Math.floor((l+r)/2);

            if (target > getElement(mid)) l = mid+1;
            else if (target < getElement(mid)) r = mid-1;
            else return true;
        }

        return false;
    }
}
