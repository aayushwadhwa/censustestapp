const $ = require("jquery")

module.exports = class Dropdown {
    constructor(parentId, attributes, options = [], label = "") {
        this.parentDivId = attributes.id + "div"
        $("#" + parentId).append(
            $(document.createElement('div')).attr({id: this.parentDivId, class: "parent-div"})
        )
        this.createHTML(this.parentDivId, attributes, label)
        this.addAllOptions(attributes.id, options)
        this.element = $("#" + attributes.id)[0]
    }

    createHTML(parentId, attributes, label) {
        $("#" + parentId).append(
            $(document.createElement('label')).attr({ for: attributes.name, class: "label" }).html(label)
        ).append(
            $(document.createElement("select")).attr(attributes)
        )
    }

    addAllOptions(id, options) {
        for (let i = 0; i < options.length; i++) {
            this.addOption(id, options[i].name, options[i].value, i == 0)
        }
    }

    getValue() {
        return this.element.value
    }

    addClass(name) {
        let id = this.element.id
        $("#" + id).addClass(name)
    }

    addOption(id, name, value, selected = false) {
        $("#" + id).append(
            $(document.createElement("option")).attr({'value': value, selected: selected}).text(name)
        )
    }

    updateOptions(options) {
        this.element.innerHTML = '';
        this.addAllOptions(this.element.id, options)
    }
}