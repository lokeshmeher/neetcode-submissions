class Solution {
    /**
     * We can use a hashmap to count the occurence of each character in each string then serialize
     * the list of maps to JSON. On decoding we parse the JSON and rebuild the list of strings.
     * Time: O(n) where n is the total length of all characters in all the strings.
     * Space: O(n) as we are creating a new string/list after encoding and decoding which will
     * allocate new memory.
     */
    encode(strs: string[]): string {
        let charMapList: [string, number[]][][] = [];
        for (let str of strs) {
            let charMap = new Map<string, number[]>();
            for (let i = 0; i < str.length; i++) {
                let char = str[i];
                if (!charMap.has(char)) charMap.set(char, []);
                charMap.get(char)!.push(i);
            }
            charMapList.push([...charMap]);
        }
        let str = JSON.stringify(charMapList);
        return str;
    }

    decode(str: string): string[] {
        let charMapList: [string, number[]][][] = JSON.parse(str);
        let strs: string[] = [];
        for (let items of charMapList) {
            let charMap = new Map<string, number[]>(items);

            let len = 0;
            for (let indexList of charMap.values()) {
                len += indexList.length;
            }

            let s = new Array<string>(len);
            for (let [char, indices] of charMap.entries()) {
                for (let index of indices) {
                    s[index] = char;
                }
            }
            strs.push(s.join(''));
        }
        return strs;
    }
}