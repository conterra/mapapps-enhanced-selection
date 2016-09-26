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
    "./GeometryInputWidget",
    "dijit/form/Button",
    "dijit/form/Select",
    "dijit/form/RadioButton",
    "dojox/form/RangeSlider",
    "ct/util/css",
    "dojo/text!./templates/DriveTimeWidget.html"
], function (declare, i18n, _GeometryInputWidget, Button, Select, RadioButton, RangeSlider, css, template) {
    return declare([_GeometryInputWidget], {
        templateString: template,
        constructor: function (properties) {
            this.i18n = i18n;
        },
        postCreate: function () {
            this.set("title", i18n.ui.selectionTools.travelTime.title);
            this.inherited(arguments);
        }
    });
});