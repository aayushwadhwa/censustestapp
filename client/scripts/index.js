const STATES = require('../data/state-codes');
const $ = require("jquery");
const _ = require("lodash");

/* Classes Import */
let Dropdown = require('./dropdown');

const main = "content";

const stateAttributes = {id: "stateDropdown", name: "state"};
const stateOptions = _.map(STATES, function convert(option) { return {name: option.name, value: option.code }})
const state = new Dropdown(main, stateAttributes, stateOptions, "Select a state:");
state.onchange = (element) => {
    console.log(element.srcElement.value)
}
