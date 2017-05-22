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
    "dojo/dom-geometry",
    "dojo/text!./templates/BaseWidget.html",
    "ct/ui/desktop/util",
    "ct/async",
    "dijit/layout/TabContainer"
], function (declare, i18n, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Buttton, Select, RadioButton, d_domGeometry, templateStringContentShort, windowUtil, ct_async, TabContainer) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        childWidgets: [],
        templateString: templateStringContentShort,
        constructor: function () {
            this.ui = i18n.ui;
        },
        startup: function () {
            this.inherited(arguments);
            if (this._properties.enableContains) {
                this._spatialRelationSelect = new Select({
                    name: "spatialRelation",
                    options: [
                        {label: this.ui.relWithin, value: "contains", selected: true},
                        {label: this.ui.relTouches, value: "intersects"}
                    ]
                }, this.spatialRelation);
            } else {
                this._spatialRelationSelect = new Select({
                    name: "spatialRelation",
                    options: [
                        {label: this.ui.relTouches, value: "intersects", selected: true}
                    ]
                }, this.spatialRelation);
            }
        },
        // onCancel event
        onCancel: function (event) {
        },
        // setTerm event
        onSearch: function (event) {
        },
        // onReset event        
        onReset: function (event) {
        },
        deactivateWidget: function (event) {
        },
        _getContentBox: function (dom) {
            return d_domGeometry.getMarginBox(dom);
        },
        resize: function (dim) {
            if (dim && dim.h > 0) {
                this._containerNode.resize({
                    w: dim.w,
                    h: dim.h
                });
            }
        }
    });
});