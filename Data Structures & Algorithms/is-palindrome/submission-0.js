class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isPalindrome(s) {
        /**
         * One way to do it would be to reverse the string and compare with the original string.
         * If they are the same (ignoring case and non-alphanumeric characters) we know the string
         * is a palindrome.
         * Time: O(n)
         * Space: O(n) - as we create a new string
         */
        /**
         * We can't optimize the time further but we can optimize the space to O(1) using the two
         * pointers approach.
         * We start two pointers one at the beginning and one at the end of the string.
         * We compare the two characters, if they are the same we increment the left pointer and 
         * decrement the right pointer. We do this until the two pointers cross each other at which
         * point we return true meaning the string is a palindrome.
         * If at any point the characters are not the same then we return false.
         * Time: O(n)
         * Space: O(1)
         */
        let isAlphaNumeric = (char) => {
            let code = char.toLowerCase().charCodeAt(0);
            if ((code >= 97 && code <= 122) || (code >= 48 && code <= 57)) return true;
            else return false
        }

        let left = 0, right = s.length-1;
        while (left < right) {
            if (!isAlphaNumeric(s.at(left))) {
                left++;
                continue;
            }
            if (!isAlphaNumeric(s.at(right))) {
                right--;
                continue;
            }

            if (s.at(left).toLowerCase() !== s.at(right).toLowerCase()) return false;
            else {
                left++;
                right--;
            }
        }
        return true;
    }
}
