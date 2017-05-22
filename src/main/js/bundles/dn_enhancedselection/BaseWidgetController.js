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
    "dojo/_base/array",
    "dojo/i18n!./nls/bundle",
    "ct/_Connect",
    "dijit/registry",
    "apprt/ServiceResolver"
], function (declare, d_array, i18n, _Connect, dijit_registry, ServiceResolver) {
    return declare([_Connect], {
        activate: function (cpCtx) {
            this.serviceResolver = new ServiceResolver();
            var bundleCtx = cpCtx.getBundleContext();
            this.serviceResolver.setBundleCtx(bundleCtx);
            this._init();
        },
        _init: function () {
            var baseWidget = this.baseWidget;
            this.disconnect();
            this.connect(baseWidget, "onReset", this.reset);
            this.connect(baseWidget, "onDrawPolygon", this.draw);
            this.connect(baseWidget, "deactivateWidget", this.deactivateWidget);
            this.connect(baseWidget.storeSelect, "onChange", this.reset);
            this.connect(this.tool, "onActivate", this.activateWidget);
            this.connect(this.tool, "onDeactivate", this.deactivateWidget);
            var controller = this._drawController;
            this._oldSymbols = {
                previewMarker: controller.get("previewMarker"),
                markerSymbol: controller.get("markerSymbol"),
                lineSymbol: controller.get("lineSymbol"),
                fillSymbol: controller.get("fillSymbol")
            };
        },
        userDrawInputGeometry: function () {
            this._eventService.postEvent("ct/dn_enhancedselection/DRAW_GEOMETRY");
        },
        getStore: function () {
            var id = this.baseWidget.storeSelect.get("value");
            return this.serviceResolver.getService("ct.api.Store", "(id=" + id + ")");
        },
        geometryDrawn: function () {
            this.drawGeometryHandler.deactivateDraw();
            /*var that = this;
             clearTimeout(this._timeout);
             this._timeout = setTimeout(function () {
             that.search();
             }, 2000);*/
        },
        search: function () {
            var baseWidget = this.baseWidget;
            var spatialRel = baseWidget._spatialRelationSelect.get("value");
            var contentNode = baseWidget.contentNode;
            var selectedChild = contentNode.get("selectedChildWidget");
            var store = this.getStore();
            selectedChild.content.search(store, spatialRel);
        },
        reset: function () {
            this.drawGeometryHandler.clearGraphics();
            var baseWidget = this.baseWidget;
            var childWidgets = baseWidget.contentNode;
            var selectedChild = childWidgets.get("selectedChildWidget");
            selectedChild.content.reenable();
            this._dataModel.setDatasource();
        },
        deactivateWidget: function () {
            this.drawGeometryHandler.disconnect(),
                this.drawGeometryHandler.deactivateDraw();
            if (this._properties.clearGraphics) {
                this.drawGeometryHandler.clearGraphics();
                this._dataModel.setDatasource();
            }
            this.resetLookupSymbol();
        },
        resetLookupSymbol: function () {
            var oldSymbols = this._oldSymbols;
            if (oldSymbols) {
                this._oldSymbols = null;
                var controller = this._drawController;
                controller.set(oldSymbols);
            }
        },
        deactivate: function () {
            this.deactivateWidget();
            this.disconnect();
            this.tool.set("active", false);
            this._oldSymbols = null;
        },
        activateWidget: function () {
            this._init();
            var baseWidget = this.baseWidget;
            //reenable widget
            baseWidget.contentNode && baseWidget.contentNode.selectedChildWidget && baseWidget.contentNode.selectedChildWidget.onShow();
        }
    });
});