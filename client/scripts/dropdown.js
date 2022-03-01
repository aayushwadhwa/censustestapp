const $ = require("jquery")

module.exports = class Dropdown {
    constructor(parentId, attributes, options = [], label = "") {
        this.createHTML(parentId, attributes, label)
        this.addAllOptions(attributes.id, options)
        return $("#" + attributes.id)[0]
    }

    createHTML(parentId, attributes, label) {
        $("#" + parentId).append(
            $(document.createElement('label')).attr({ for: attributes.name }).html(label)
        ).append(
            $(document.createElement("select")).attr(attributes)
        )
    }

    addAllOptions(id, options) {
        for (let i = 0; i < options.length; i++) {
            this.addOption(id, options[i].name, options[i].value, i == 0)
        }
    }

    addOption(id, name, value, selected = false) {
        $("#" + id).append(
            $(document.createElement("option")).attr({'value': value, selected: selected}).text(name)
        )
    }
}