class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    largestRectangleArea(heights) {
        /**
         * Brute force solution would be to loop over each height in `heights` and considering
         * that height at the final height of the rectangle we go both left and right as long as
         * our area keeps increasing. The moment our area decreases (from either sides) we stop.
         * That would be the largest rectangle that could be formed with that height, i.e.
         * `heights[i]`. We do this for every element in heights array. Then we take the maximum
         * of all the areas that could be formed with each element in the heights array.
         * Time: O(n^2)
         * Space: O(n)
         */
        /*
        let areas = [];
        for (let i=0; i<heights.length; i++) {
            let left = i-1, right = i+1;
            let area = heights[i];
            while (left >= 0 && heights[left] >= heights[i]) {
                area += heights[i];
                left--;
            }
            while (right < heights.length && heights[right] >= heights[i]) {
                area += heights[i];
                right++;
            }
            areas.push(area);
        }
        return Math.max(...areas);
        */
        
        /**
         * A slightly optimal approach would be to precompute the left and right boundaries for each
         * height. We can do this efficiently in O(n) time as (for example) if we have to calculate
         * the left boundary of the current height we check if the previous height is greater or
         * equal to the current height, if so the left boundary for the current height is the left
         * boundary of the previous height. We do the same thing for right boundary storing the 
         * right boundaries for each height.
         * Then we calculate the area formed by each height.
         * Answer would be the max of all the areas.
         * Time: O(n) - O(n) each for calculating the left boundaries, right boundaries, areas and
         * the maximum of the areas.
         * Space: O(n) - O(n) each for storing the left boundaries, right boundaries and areas.
         * 
         * THIS LOGIC IS FUNDAMENTALLY FLAWED.
         * CORRECTION: INSTEAD OF CHECKING JUST THE PREVIOUS/NEXT VALUES WE HAVE TO KEEP CHECKING
         * ON BOTH LEFT AND RIGHT SIDE AS (FOR EXAMPLE) THE ONE ON THE LEFT OF THE PREVIOUS HEIGHT
         * MIGHT BE LESS THAN THE PREVIOUS BUT GREATER OR EQUAL TO THE CURRENT HEIGHT.
         * 
         * ----------------- SO THIS WILL ALSO TAKE O(n^2) time. -----------------
         */
        /*
        // How many boxes to left we go. If we can't go left then value is 0.
        let leftBoundaries = [];
        for (let i=0; i<heights.length; i++) {
            let boundary = 0;
            let prev = i-1;
            while (prev >= 0 && heights[prev] >= heights[i]) {
                boundary++;
                prev--;
            }
            leftBoundaries.push(boundary);
        }
        console.log(...leftBoundaries);

        // How many boxes to right we go. If we can't go right then value is 0.
        let rightBoundaries = Array(heights.length).fill(0);
        for (let i=heights.length-1; i>=0; i--) {
            let boundary = 0;
            let next = i+1;
            while (next < heights.length && heights[next] >= heights[i]) {
                boundary++;
                next++;
            }
            rightBoundaries[i] = boundary;
        }
        console.log(...rightBoundaries);
        
        // Area that can be formed with each height.
        let areas = [];
        for (let i=0; i<heights.length; i++) {
            let width = 1 + leftBoundaries[i] + rightBoundaries[i];
            areas.push(width * heights[i]);
        }
        console.log(...areas);
        
        return Math.max(...areas);
        */

        // -------------------------------------------------------------------------------------------
        /**
         * We know that as long as the the height of the adjacent bar is increasing or the same
         * we can keep extending the area. We can use this information.
         * 
         * Let's consider the case when the bar heights are strictly increasing from left
         * to right. In that case the first bar can extend all the way to the end. The second
         * bar can extend all the way to the right but can't extend towards the left. The largest
         * rectangle will be the area of the last bar. What kind of data structure can we use to
         * keep track of the boundaries?
         * 
         * Let's consider the case when the bar heights are strictly decreasing. In that case
         * the first bar can't extend towards the right. Same for the rest of the bars.
         * The largest rectangle will be the area of the first bar.
         * 
         * Let's consider another case where the bar heights are all same.
         * In this case all the bars can extend all the way towards the right till the very end
         * and all the bars can extend all the way towards the start.
         * 
         * So, we need a data structure to check when we encounter a bar, we want to know how long
         * towards the left we can extend this. Since we don't know what comes after we don't know
         * the right boundary at any point in time but we ASSUME that we can extend towards the
         * right since we haven't SEEN what's on the right.
         * 
         * For the first bar we know we can't extend it towards the left so we know the starting
         * point for the rectangle with height heights[0] is 0. We then move on to the next bar.
         * If it is the same height or larger we know that we can extend the previous bar one 
         * step towards the right. So, if we store the starting point for previous bar - as long as
         * we keep encountering a bar with height greater than or equal to that bar we can extend
         * it's area. As soon as we hit a bar with less height we know the previous bar can't extend
         * any further -- So, we calculate the area formed by the height of the previous bar since
         * we are storing the starting point for each height and the end point will be the current
         * point -- THIS WILL BE THE AREA OF THE RECTANGLE WITH THE LARGEST HEIGHT (ENCOUNTERED TILL
         * THIS POINT) -- we store this area and move further.
         * 
         * Since we've already
         * calculated the area formed by the height of the previous bar we no longer need this
         * information so we can discard it.
         * 
         * So basically we can use a monotonically increasing stack to store the starting points
         * of the rectangles for each height and we pop from the stack after calculating the area
         * formed by the previous height whenever we encounter a height less than the previous.
         * We keep popping (and calculating the area formed by each height popped) until we encounter
         * a bar with less height than the current bar. As we pop we extend the starting point for
         * the current bar one position to the left for each pop we do. We then push the current
         * height and index onto the stack.
         * 
         * After we've gone through all the bars, we may still have a non empty stack - which
         * means that all the bars with those starting points extend till the very end.
         * We then have to calculate those areas as well while popping from the stack until it's
         * empty.
         * 
         * By now we would have got our max area.
         */
        let maxArea = 0;
        let stack = [];  // [height, starting index]
        for (let i=0; i<heights.length; i++) {
            if (stack.length > 0) {
                let top = stack.at(-1);
                if (heights[i] === top[0]) continue;
                else if (heights[i] > top[0]) {
                    stack.push([heights[i], i]);
                }
                else {
                    let start = i;
                    while (stack.length > 0 && stack.at(-1)[0] > heights[i]) {
                        let [height, idx] = stack.pop();
                        start = idx;
                        maxArea = Math.max(maxArea, height * (i-idx));
                    }
                    stack.push([heights[i], start]);
                }
            }
            else {
                stack.push([heights[i], i]);
            }
        }

        while (stack.length > 0) {
            let [height, idx] = stack.pop();
            let area = height * (heights.length - idx);
            maxArea = Math.max(maxArea, area);
        }

        return maxArea;
    }
}
