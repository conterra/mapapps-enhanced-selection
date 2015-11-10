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
    "apprt/ServiceResolver",
    "ct/ui/desktop/util"
], function (declare, d_array, i18n, _Connect, dijit_registry, ServiceResolver, windowUtil) {
    return declare([_Connect], {
        activate: function (cpCtx) {
            this.serviceResolver = new ServiceResolver();
            var bundleCtx = cpCtx.getBundleContext();
            this.serviceResolver.setBundleCtx(bundleCtx);
            this._init();

        },
        _init: function () {
            var srBaseWidget = this.baseWidget;
            srBaseWidget.searchButton.set("iconClass", "icon-magnifier");
            //srBaseWidget.chooseStartButton.set("iconClass", "icon-map-locate");
            this.disconnect();
            this.connect(srBaseWidget, "onSearch", this.search);
            this.connect(srBaseWidget, "onReset", this.reset);
            this.connect(srBaseWidget, "onDrawPolygon", this.draw);
            this.connect(srBaseWidget, "deactivateWidget", this.deactivateWidget);
            this.connect(srBaseWidget.storeSelect, "onChange", this.reset);
            var controller = this._drawController;
            this.connect(this.tool, "onActivate", this.activateWidget);
            this.connect(this.tool, "onDeactivate", this.deactivateWidget);
            this._oldSymbols = {
                previewMarker: controller.get("previewMarker"),
                markerSymbol: controller.get("markerSymbol"),
                lineSymbol: controller.get("lineSymbol"),
                fillSymbol: controller.get("fillSymbol")
            };
        },
        userDrawInputGeometry: function () {
            this._eventService.postEvent("ct/surroundings/DRAW_GEOMETRY");
        },
        getStore: function () {
            var id = this.baseWidget.storeSelect.get("value");
            return this.serviceResolver.getService("ct.api.Store", "(id=" + id + ")");
        },
        searchFinished: function () {
            var srBaseWidget = this.baseWidget;
            srBaseWidget.searchButton.set("iconClass", "icon-magnifier");
        },
        geometryDrawn: function () {
            var srBaseWidget = this.baseWidget;
            srBaseWidget.searchButton.set("disabled", false);
        },
        widgetSelected: function () {
            var srBaseWidget = this.baseWidget;
            srBaseWidget.searchButton.set("disabled", true);
            this.drawGeometryHandler.clearGraphics();
        },
        search: function () {
            var srBaseWidget = this.baseWidget;
            srBaseWidget.searchButton.set("iconClass", "icon-spinner");
            this.drawGeometryHandler.deactivateDraw();
            var spatialRel = srBaseWidget.spatialRelation.get("value");
            var contentNode = srBaseWidget.contentNode;
            var selectedChild = contentNode.get("selectedChildWidget");
            selectedChild.search(this.getStore(), spatialRel);
        },
        reset: function () {
            this.drawGeometryHandler.clearGraphics();
            var baseWidget = this.baseWidget;
            var childWidgets = baseWidget.contentNode;
            var selectedChild = childWidgets.get("selectedChildWidget");
            selectedChild.reenable();
            baseWidget.searchButton.set("disabled", true);
            this._dataModel.setDatasource();
        },
        deactivateWidget: function () {
            this.drawGeometryHandler.deactivateDraw();
            this.drawGeometryHandler.clearGraphics();
            this._dataModel.setDatasource();
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
            var srBaseWidget = this.baseWidget;
            //reenable widget
            srBaseWidget.contentNode && srBaseWidget.contentNode.selectedChildWidget && srBaseWidget.contentNode.selectedChildWidget.onSelected();
        }
    });
});