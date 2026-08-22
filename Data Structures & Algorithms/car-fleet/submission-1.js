class Solution {
    /**
     * @param {number} target
     * @param {number[]} position
     * @param {number[]} speed
     * @return {number}
     */
    carFleet(target, position, speed) {
        /**
         * There is no brute force for this. The optimal solution is the straightforward way to solve
         * this.
         * We calculate the time taken by each car. Then we sort the time according to the position
         * array, i.e., car starting at position 0 will be first then 1, 2, and so on.
         * Then we build an array of stacks (the actual fleets) -- We take the time taken by the last
         * car (last starting position) and check if the car before it takes less than or equal time
         * to it, if so they form a fleet (we create a new stack with the two cars).
         * We go on (pushing onto the stack) until we find a car that takes more time than the time
         * taken by the current fleet (which will be the time taken by the car at the bottom of the
         * stack).
         * We create a new stack (fleet) and add to the fleets array.
         * The result will be the length of the fleets array.
         */
        let positionAndTime = position.map((p, i) => [p, (target-p)/speed[i]]); // [position, time]
        // Sorted according to position in ascending order
        let time = positionAndTime.sort((a, b) => a[0] - b[0]).map(val => val[1]);

        let i=time.length-1;
        let fleets = [];
        while (i>=0) {
            let fleet = [];
            fleet.push(time[i]); // Add the time taken by the first car
            i--;
            while (i>=0 && time[i] <= fleet[0]) {
                fleet.push(time[i]);
                i--;
            }
            fleets.push(fleet);
        }

        return fleets.length;

    }
}