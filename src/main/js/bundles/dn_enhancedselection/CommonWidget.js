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
    "dojo/i18n!./nls/bundle",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/form/Button",
    "dijit/form/Select",
    "dijit/form/RadioButton",
    "dojox/form/RangeSlider",
    "ct/util/css",
    "dojo/text!./templates/DriveTimeWidget.html",
    "dojo/text!./templates/FreehandPolygonWidget.html",
    "dojo/text!./templates/SelectFeatureFromLayerWidget.html",
    "dojo/text!./templates/CircleWidget.html"

], function (declare, i18n, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Buttton, Select, RadioButton, RangeSlider, css, DriveTimeWidget, FreehandPolygonWidget, SelectFeatureFromLayerWidget, CircleWidget) {

    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: "",
        constructor: function (properties) {
            var templateStringContent;
            this.ui = i18n.ui;
            var cpName = properties["Component-Name"];
            switch (cpName) {
                case "DistanceCircleWidget":
                    templateStringContent = CircleWidget;
                    this.set("title", i18n.ui.selectionTools.distance.title);
                    break;
                case "DriveTimeWidget":
                    templateStringContent = DriveTimeWidget;
                    this.set("title", i18n.ui.selectionTools.travelTime.title);
                    break;
                case "FreehandPolygonWidget":
                    templateStringContent = FreehandPolygonWidget;
                    this.set("title", i18n.ui.selectionTools.freehandPolygon.title);
                    break;
                case "SelectFeatureFromLayerWidget":
                    templateStringContent = SelectFeatureFromLayerWidget;
                    this.set("title", i18n.ui.selectionTools.selectFeatureFromStore.title);
                    break
            }
            this.set("templateString", templateStringContent);
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
        }
    });
});