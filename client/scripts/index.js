const STATES = require('../data/state-codes');
const $ = require("jquery");
const _ = require("lodash");

/* Classes Import */
const Dropdown = require('./dropdown');
const Input = require('./input');

const main = "content";

// create state dropdown
const stateAttributes = {id: "stateDropdown", name: "state"};
const stateOptions = _.map(STATES, function convert(option) { return {name: option.name, value: option.code }})
const stateDropdown = new Dropdown(main, stateAttributes, stateOptions, "Select a state:");

// create state dropdown
const countyAttributes = {id: "countyDropdown", name: "county"};
const countyDropdown = new Dropdown(main, countyAttributes, [], "Select a County");

// create income input
const incomeAttributes = {id: "incomeInput", name: "Income", value: 0, type: "number"};
const incomeInput = new Input(main, incomeAttributes, "Enter your Income");

// create Ok Button


const getCounties = async (state, dropdown) => {
    countyDropdown.updateOptions([{name: "Loading...", value: "-1"}])
    const response = await fetch('http://localhost:3000/counties?state=' + state)
    let data = await response.json();
    data.shift()
    console.log(data)
    const options = _.map(data, function convert(option) { return {name: option[0], value: option[2]}})
    dropdown.updateOptions(options)
    county = options[0].value
    getIncome(state, county)
}

const getIncome = async (state, county, dropdown=null) => {
    const response = await fetch('http://localhost:3000/incomes?state=' + state + '&county=' + county)
    let data = await response.json();
    console.log(data)
}

stateDropdown.element.onchange = (element) => {
    getCounties(element.srcElement.value, countyDropdown)
}

countyDropdown.element.onchange = (element) => {
    getIncome(stateDropdown.getValue(), element.srcElement.value)
}

getCounties(stateDropdown.getValue(), countyDropdown);