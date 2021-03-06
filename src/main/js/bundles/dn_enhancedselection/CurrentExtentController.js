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
    "ct/_Connect",
    "ct/async"
], function (declare, i18n, _Connect, ct_async) {
    return declare([_Connect], {
        componentName: "CurrentExtentWidget",
        activate: function (componentContext) {
            var properties = this._properties;
            if (!properties.widgetEnabled) {
                var componentName = this.componentName;
                ct_async(function () {
                    componentContext.disableComponent(componentName);
                }, 0);
                return;
            }
            this.currentExtentWidget && this._initWidget();
        },
        deactivate: function () {
            this.disconnect();
            this._inputGeometry = null;
        },
        modified: function (componentContext) {
            var properties = this._properties;
            var componentName = this.componentName;
            if (properties.widgetEnabled) {
                componentContext.enableComponent(componentName);
                this._initWidget();
            } else {
                componentContext.disableComponent(componentName);
            }
        },
        _initWidget: function () {
            var currentExtentWidget = this.currentExtentWidget;
            this.disconnect();
            this.connect(currentExtentWidget, "onShow", this.onSelected);
            this.connect(currentExtentWidget, "reenable", this.onSelected);
            this.connect(currentExtentWidget, "search", this.search);
            this.connect(currentExtentWidget, "onDone", this.done);
        },
        setCurrentExtentWidget: function (widget) {
            this.currentExtentWidget = widget;
            this._initWidget();
        },
        unsetCurrentExtentWidget: function () {
            this.disconnect();
        },
        onSelected: function () {
            this.drawGeometryHandler.deactivateDraw();
            this.drawGeometryHandler.clearGraphics();
            this._inputGeometry = null;
        },
        done: function () {
            this.drawGeometryHandler.clearGraphics();
            this._eventService.postEvent("ct/dn_enhancedselection/SEARCH");
        },
        search: function (store, spatialRel) {
            var geometry = this._inputGeometry = this._mapState.getExtent();
            if (!geometry) {
                return;
            }
            this.queryController.queryStore(geometry, store, spatialRel);
        }
    });
});