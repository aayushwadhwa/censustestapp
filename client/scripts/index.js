var css = require('../styles/main.css');

const STATES = require('../data/state-codes');
const $ = require("jquery");
const _ = require("lodash");

/* Classes Import */
const Dropdown = require('./dropdown');
const Input = require('./input');
const Button = require('./button');
const Visualize = require('./visualize')

const main = "content";

// create state dropdown
const stateAttributes = {id: "stateDropdown", name: "state", class: "dropdown"};
const stateOptions = _.map(STATES, function convert(option) { return {name: option.name, value: option.code }})
const stateDropdown = new Dropdown(main, stateAttributes, stateOptions, "State:");

// create state dropdown
const countyAttributes = {id: "countyDropdown", name: "county", class: "dropdown"};
const countyDropdown = new Dropdown(main, countyAttributes, [], "County");

// create income input
const incomeAttributes = {id: "incomeInput", name: "Income", value: 0, type: "number", class: "input"};
const incomeInput = new Input(main, incomeAttributes, "Income");

// create Ok Button
const buttonAttributes = {id: "okButton", class: "button"};
const okButton = new Button(main, buttonAttributes, "Ok");

// creat chart
const chartAttributes = {id: "myChart"};
const chart = new Visualize(main, chartAttributes, {});

const getCounties = async (state, dropdown) => {
    countyDropdown.updateOptions([{name: "Loading...", value: "-1"}])
    const response = await fetch('http://localhost:3000/counties?state=' + state)
    let data = await response.json();
    data.shift()
    console.log(data)
    const options = _.map(data, function convert(option) { return {name: option[0], value: option[2]}})
    dropdown.updateOptions(options)
    // countyValue = options[0].value
    // getIncome(state, county)
}

const getIncome = async (state, county) => {
    chart.loading(true)
    const response = await fetch('http://localhost:3000/incomes?state=' + state + '&county=' + county)
    let data = await response.json();
    let d = {labels: [], data: []}
    data.incomeDataAll.forEach((v) => {
        max = v.max ? " - " + v.max.toString() : "+";
        d.labels.push(v.min.toString() + max)
        d.data.push(v.households)
    })
    chart.createChart(d)
}

stateDropdown.element.onchange = (element) => {
    getCounties(element.srcElement.value, countyDropdown)
}

// countyDropdown.element.onchange = (element) => {
    // getIncome(stateDropdown.getValue(), element.srcElement.value)
// }

okButton.element.onclick = () => {
    if (incomeInput.getValue() > 0) {
        getIncome(stateDropdown.getValue(), countyDropdown.getValue())
    } else {
        alert("Income value must be greater than 0.")
    }
}

getCounties(stateDropdown.getValue(), countyDropdown);