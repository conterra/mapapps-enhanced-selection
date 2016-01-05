/*
 * Copyright (C) 2015 con terra GmbH (info@conterra.de)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/form/Button",
    "dijit/form/Select",
    "dijit/form/RadioButton",
    "dojox/form/RangeSlider",
    "ct/util/css",
    "dojo/text!./templates/DistanceCircleWidget.html"

], function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Button, Select, RadioButton, RangeSlider, css, template) {

    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
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