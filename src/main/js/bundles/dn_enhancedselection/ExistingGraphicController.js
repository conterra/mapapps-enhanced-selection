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
        componentName: "ExistingGraphicWidget",

        activate: function (componentContext) {
            var properties = this._properties;
            if (!properties.widgetEnabled) {
                var componentName = this.componentName;
                ct_async(function () {
                    componentContext.disableComponent(componentName);
                }, 0);
                return;
            }
            this._initWidget();
        },
        _initWidget: function () {
            var existingGraphicWidget = this.existingGraphicWidget;
            this.disconnect();
            this.connect(existingGraphicWidget, "onShow", this.onSelected);
            this.connect(existingGraphicWidget, "reenable", this.onSelected);
            this.connect(existingGraphicWidget, "search", this.search);
            var i18n = this._i18n.get().ui.selectionTools.existingGraphic;
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
        setFreehandPolygonWidget: function (widget) {
            this.existingGraphicWidget = widget;
            this._initWidget();
        },
        unsetFreehandPolygonWidget: function () {
            this.disconnect();
        },
        onSelected: function () {
            this.drawGeometryHandler.deactivateDraw()
            var that = this;
            var existingGraphicWidget = this.existingGraphicWidget;
            var con = this.connect(this._mapState, "onClick", function (evt) {
                that.disconnect(con);
                if (!existingGraphicWidget.getParent().get("selected")) {
                    return;
                }
                if (evt.graphic) {
                    that._inputGeometry = evt.graphic.geometry;
                    that._eventService.postEvent("ct/dn_enhancedselection/SEARCH");
                } else {
                    that._logService.warn(that._i18n.get().ui.selectionTools.existingGraphic.error);
                }
            });
    },
        search: function (store, spatialRel) {
            var geometry = this._inputGeometry;
            if (!geometry) {
                return;
            }
            this.queryController.queryStore(geometry, store, spatialRel);
        }
    });
});