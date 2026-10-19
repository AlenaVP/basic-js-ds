const { NotImplementedError } = require('../lib');
const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor() {
    this.head = null;
  }

  getUnderlyingList() {
    if (this.head === null) return null;

    const convertNode = (node) => {
      if (node === null) return null;

      return {
        value: node.value,
        next: convertNode(node.next),
      }
    }

    return convertNode(this.head);
  }

  enqueue(value) {
    const node = new ListNode(value);

    if (this.head) {
      let current = this.head;

      while (current.next) {
        current = current.next;
      }
      current.next = node;
    } else {
      this.head = node;
    }
  }

  dequeue() {
    if (this.head === null) {
      return undefined;
    }

    const value = this.head.value;

    if (this.head !== null) {
      this.head = this.head.next;
    }

    return value;
  }
}

module.exports = {
  Queue
};
