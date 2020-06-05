// JOSEPH P. PASAOA
// minHeap / min priorityQueue



class MinHeap {
  tree: number[];
  size: number;
  constructor() {
    this.tree = [null];
    this.size = 0;
  }


  /* REFERENCE HELPERS */
  // nondestructive return of rootValue
  getRootValue = () => this.tree[1];

  // returns parentIndex of inputIndex
  getParentIndex = (inputIndex: number) => {
    return inputIndex % 2 === 0
      ? inputIndex / 2
      : (inputIndex - 1) / 2;
  }

  // returns specified children indices of inputIndex. returns undefined
      // for any index larger than size
  getLeftChildIndex = (inputIndex: number) => {
    const supposedIndex = inputIndex * 2;
    return supposedIndex < this.size
      ? supposedIndex
      : undefined;
  }
  getRightChildIndex = (inputIndex: number) => {
    const supposedIndex = inputIndex * 2 + 1;
    return supposedIndex < this.size
      ? supposedIndex
      : undefined;
  }


  /* DYNAMIC HELPERS */
  // adds new value as new lowest leaf and increments size
  addNewLowestLeaf = (newValue: number) => {
    const { tree } = this;
    this.size++;
    tree[this.size] = newValue;
    return;
  }

  // swaps values of two indices
  swapValues = (indexOne: number, indexTwo: number) => {
    const { tree } = this;
    [
      tree[indexOne], tree[indexTwo]
    ] = [
      tree[indexTwo], tree[indexOne]
    ];
    return;
  }

  // (recursive) that compares the node at inputed index to its parent and
      // swaps values if child value is lesser then recurses
  bubbleLessers = (targetChildIndex: number) => {
    // return if target is root
    if (targetChildIndex === 1) return;

    const { tree, bubbleLessers } = this;
    const fetchedParentIndex = this.getParentIndex(targetChildIndex);

    // parent is already lesser, bubbling stops here
    if (tree[fetchedParentIndex] < tree[targetChildIndex]) {
      return;
    }

    // child is lesser, bubble and recurse
    this.swapValues(targetChildIndex, fetchedParentIndex);
    return bubbleLessers(fetchedParentIndex);
  }

  // (recursive) compares the node at inputed index to its children and
      // amongst them the least value node is made the parent, otherwise
      // the node stays the parent if it is already the least
  sinkGreaters = (targetParentIndex: number) => {
    const { tree, sinkGreaters } = this;
    const leftChildIndex = this.getLeftChildIndex(targetParentIndex);
    const rightChildIndex = this.getRightChildIndex(targetParentIndex);

    // NO children, recursion stops
    if (!leftChildIndex && !rightChildIndex) return;

    // has TWO children, check if rightChild value is lesser than parentValue
    if (rightChildIndex && tree[rightChildIndex] < tree[targetParentIndex]) {

      // if so, swap with parentValue whichever is lower: left or right child, then recurse with that childIndex
      if (tree[leftChildIndex] < tree[rightChildIndex]) {
        this.swapValues(targetParentIndex, leftChildIndex);
        return sinkGreaters(leftChildIndex);
      } else {
        this.swapValues(targetParentIndex, rightChildIndex);
        return sinkGreaters(rightChildIndex);
      }
    } else {

    // has ONLY LEFT child, swap if childValue is lower and recurse, otherwise recursion stops here
      if (tree[targetParentIndex] < tree[leftChildIndex]) return;
      this.swapValues(targetParentIndex, leftChildIndex);
      return sinkGreaters(leftChildIndex);
    }
  }


  /* MAIN METHODS */
  push(newValue: number) {
    // if no root, make newValue root
    if (this.size === 0) {
      this.addNewLowestLeaf(newValue);
      return;
    }

    // add newValue to tree as lowest leaf and apply recursive bubbling to it
    this.addNewLowestLeaf(newValue);
    this.bubbleLessers(this.size);
    return;
  }

  pop() {
    const { tree } = this;

    // heap size: 0
    if (this.size === 0) {
      return 'this heap is empty';
    }

    // heap size: 1 - output the root, no sinkGreaters call
    if (this.size === 1) {
      this.size--;
      return tree.pop();
    }

    // all other heap sizes - output the root, move lowest leaf Value to be root value,
        // then call recursive sinkGreaters on new root value, decrement size
    const output = this.getRootValue();
    tree[1] = tree.pop();
    this.sinkGreaters(1);
    this.size--;
    return output;
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
