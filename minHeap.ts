// JOSEPH P. PASAOA
// minHeap / min priorityQueue



class MinHeap {
  tree: number[];
  size: number;
  constructor() {
    this.tree = [null];
    this.size = 0;
  }
}



/* TESTS */
// HELPER FX for checking two arrays are equal in length and composition
const checkForSameArrayEls = (firstArr, secondArr) => {
  // arrays should be of same length, returns false if different
  if (firstArr.length !== secondArr.length) return false;

  // compare corresponding elements in both arrays by index, return false at any inequality
  for (let i = 0; i < firstArr.length; i++) {
    if (firstArr[i] !== secondArr[i]) return false;
  }

  // returns true if no differences
  return true;
}


// A //
const heapA = new MinHeap();
heapA.push(3);
heapA.push(5);
heapA.push(-1);
heapA.push(0);
heapA.push(5);
heapA.push(2);

console.log('checkA1 (content): ',
  checkForSameArrayEls( heapA.tree, [null, -1, 0, 2, 5, 5, 3] )
);
console.log('checkA2 (pop): ', heapA.pop() === -1);
console.log('checkA3 (content): ',
  checkForSameArrayEls( heapA.tree, [null, 0, 3, 2, 5, 5] )
);
console.log('checkA4 (size): ', heapA.size === 5);

heapA.push(-1);
heapA.push(1);
heapA.push(6);
heapA.push(2);

console.log('checkA5 (pop): ', heapA.pop() === -1);
console.log('checkA6 (pop): ', heapA.pop() === 0);
console.log('checkA7 (size): ', heapA.size === 7);
console.log('checkA8 (content): ',
  checkForSameArrayEls( heapA.tree, [null, 1, 2, 2, 3, 5, 6, 5] )
);
console.log('heapA log: ', { tree: heapA.tree, size: heapA.size }, '\n');


// B //
const heapB = new MinHeap();
console.log('checkB1 (size): ', heapB.size === 0);
console.log('checkB2 (pop): ', heapB.pop() === 'this heap is empty');

heapB.push(-10);
heapB.push(-100);
heapB.push(1);
heapB.push(0);
heapB.push(-11);
heapB.push(0);

console.log('checkB3 (pop): ', heapB.pop() === -100);
console.log('checkB4 (content): ',
  checkForSameArrayEls( heapB.tree, [null, -11, -10, 0, 0, 1] )
);

heapB.push(-5);

console.log('checkB5 (pop): ', heapB.pop() === -11);

heapB.push(3);
heapB.push(-50);
heapB.push(-25);

console.log('checkB6 (content): ',
  checkForSameArrayEls( heapB.tree, [null, -50, -25, -10, 0, 1, 3, -5, 0] )
);
console.log('checkB7 (size): ', heapB.size === 8);
console.log('checkB8 (pop): ', heapB.pop() === -50);
console.log('checkB9 (content): ',
  checkForSameArrayEls( heapB.tree, [null, -25, 0, -10, 0, 1, 3, -5] )
);
console.log('heapB log: ', { tree: heapB.tree, size: heapB.size });
