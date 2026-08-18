class Solution {
    /**
     * @param {character[][]} board
     * @return {boolean}
     */
    isValidSudoku(board) {
        /**
         * One way to do it would be to loop over each row, column and sub-box and using a hash set
         * we can check if the values are unique in each row/column/sub-box.
         * Time: O(n^2) where n x n is the dimension of the sudoku board.
         * Space: O(n) since we only need one hash set while comparing each row/column/sub-box.
         */
        
        // Checking each row...
        for (let i=0; i<board.length; i++) {
            let numCount = 0;
            let uniqNums = new Set();
            for (let j=0; j<board[i].length; j++) {
                if (board[i][j] !== '.') {
                    numCount++;
                    uniqNums.add(board[i][j]);
                }
            }
            if (numCount > uniqNums.size) return false;
        }

        // Checking each column...
        for (let j=0; j<board.length; j++) {
            let numCount = 0;
            let uniqNums = new Set();
            for (let i=0; i<board.length; i++) {
                if (board[i][j] !== '.') {
                    numCount++;
                    uniqNums.add(board[i][j]);
                }
            }
            if (numCount > uniqNums.size) return false;
        }

        // Checking each sub-box...
        /**
         * Even though this has 4 nested for loops the time complexity is still O(n^2) because
         * each for loop runs square root of n times.
         */
        for (let i2 = 0; i2<Math.sqrt(board.length); i2++) {
            for (let j2 = 0; j2<Math.sqrt(board.length); j2++) {
                let numCount = 0;
                let uniqNums = new Set();
                for (let i1 = i2*3; i1 < i2*3+3; i1++) {
                    for (let j1 = j2*3; j1 < j2*3+3; j1++) {
                        if (board[i1][j1] !== '.') {
                            numCount++;
                            uniqNums.add(board[i1][j1]);
                        }
                    }
                }
                if (numCount > uniqNums.size) return false;
            }
        }

        return true;
    }
}
