const $ = require("jquery")

module.exports = class Input {
    constructor(parentId, attributes, label = "") {
        this.createHTML(parentId, attributes, label)
    }

    createHTML(parentId, attributes, label) {
        $("#" + parentId).append(
            $(document.createElement('label')).attr({ for: attributes.name }).html(label)
        ).append(
            $(document.createElement("input")).attr(attributes)
        )
    }
}