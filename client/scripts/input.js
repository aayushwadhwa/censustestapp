const $ = require("jquery")

module.exports = class Input {
    constructor(parentId, attributes, label = "") {
        this.parentDivId = attributes.id + "div"
        $("#" + parentId).append(
            $(document.createElement('div')).attr({id: this.parentDivId, class: "parent-div"})
        )
        this.createHTML(this.parentDivId, attributes, label)
    }

    createHTML(parentId, attributes, label) {
        $("#" + parentId).append(
            $(document.createElement('label')).attr({ for: attributes.name, class: "label" }).html(label)
        ).append(
            $(document.createElement("input")).attr(attributes)
        )
    }
}