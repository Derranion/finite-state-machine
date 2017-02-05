const State = require('../src/state');

class StateList {

    constructor() {
        this.length = 0;
        this.current = null;
    }

    add(data) {
        var state = new State();
        state.data = data;
        if (this.current) {
            this.current.next = state;
        }
        state.prev = this.current;
        this.length++;
        this.current = state;
    }

    currentState() {
        return this.current ? this.current.data : null;
    }

    undo() {
        if (this.current && this.current.prev) {
            this.current = this.current.prev;
            return true;
        } else {
            return false;
        }
    }

    redo() {
        if (this.current && this.current.next) {
            this.current = this.current.next;
            return true;
        } else {
            return false;
        }

    }

    clear() {
        this.current.next = null;
        this.current.prev = null;
        this.length = 1;
    }
}

module.exports = StateList;

