define([
    "dojo/_base/declare",
    "dojo/i18n!./nls/bundle",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/form/Button",
    "dijit/form/Select",
    "dijit/form/RadioButton",
    "dojox/form/RangeSlider",
    "ct/util/css",
    "dojo/text!./templates/FreehandPolygonWidget.html"

], function (declare, i18n, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Button, Select, RadioButton, RangeSlider, css, template) {

    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        constructor: function (properties) {
            this.i18n = i18n;
        },
        postCreate: function () {
            this.set("title", i18n.ui.selectionTools.freehandPolygon.title);
            this.inherited(arguments);
        },
        reenable: function () {
        },
        search: function (evt) {
        },
        resize: function () {
            this.inherited(arguments);
        },
        show: function () {
            //css.switchHidden(this.domNode.parentNode, false);
            //var domNode = this.domNode;
            //if (domNode.parentNode) {
            //    domNode.parentNode.addChild(domNode);
            //}
        },
        hide: function () {
            //css.switchHidden(this.domNode.parentNode, true);
            //var domNode = this.domNode;
            //if (domNode.parentNode) {
            //    domNode.parentNode.removeChild(domNode);
            //}
        },
        onShow: function () {
        }
    });
});