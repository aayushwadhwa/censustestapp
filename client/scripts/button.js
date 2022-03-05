const $ = require("jquery")

module.exports = class Button {
    constructor(parentId, attributes, text = "") {
        this.parentDivId = attributes.id + "div"
        $("#" + parentId).append(
            $(document.createElement('div')).attr({id: this.parentDivId, class: "parent-div text-right"})
        )
        this.createHTML(this.parentDivId, attributes, text)
        this.element = $("#" + attributes.id)[0]
    }

    createHTML(parentId, attributes, text) {
        $("#" + parentId).append(
            $(document.createElement("button")).attr(attributes).html(text)
        )
    }
    addClass(className) {
        let id = this.element.id
        $("#" + id).addClass(className)
    }
}