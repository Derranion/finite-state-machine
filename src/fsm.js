const StateList = require('../src/state-list');

class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.model = config.states;
        this.initial = config.initial;
        this.history = new StateList();
        this.history.add(this.initial);
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.history.currentState();
    }

    /**
     * Goes to specified state.
     * @param stateStr
     */
    changeState(state) {
        if(this.model[state]) {
            this.history.add(state);
        } else {
            throw new Error();
        }

    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        var stateStr = this.model[this.getState()].transitions[event];
        this.changeState(stateStr);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.changeState(this.initial);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var states = [];
        var _this = this;

        Object.keys(this.model).forEach(function (state) {
            if(!event || _this.model[state].transitions[event]) {
                states.push(state)
            }
        });

        return states;

    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        return this.history.undo();
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        return this.history.redo();
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history.clear();
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
