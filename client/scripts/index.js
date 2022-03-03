const STATES = require('../data/state-codes');
const $ = require("jquery");
const _ = require("lodash");

/* Classes Import */
const Dropdown = require('./dropdown');

const main = "content";

const stateAttributes = {id: "stateDropdown", name: "state"};
const stateOptions = _.map(STATES, function convert(option) { return {name: option.name, value: option.code }})
const stateDropdown = new Dropdown(main, stateAttributes, stateOptions, "Select a state:");
stateDropdown.element.style.width = '150px'

const countyAttributes = {id: "countyDropdown", name: "county"};
const countyDropdown = new Dropdown(main, countyAttributes);
countyDropdown.element.style.width = '150px'

const getCounties = async (state, dropdown) => {
    countyDropdown.updateOptions([{name: "Loading...", value: "-1"}])
    const response = await fetch('http://localhost:3000/counties?state=' + state)
    let data = await response.json();
    data.shift()
    console.log(data)
    const options = _.map(data, function convert(option) { return {name: option[0], value: option[2]}})
    dropdown.updateOptions(options)
}

stateDropdown.element.onchange = (element) => {
    getCounties(element.srcElement.value, countyDropdown)
}   

getCounties(stateDropdown.getValue(), countyDropdown);
