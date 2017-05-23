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
            var existingGraphicWidget = this.existingGraphicWidget;
            this.disconnect();
            this.connect(existingGraphicWidget, "onShow", this.onSelected);
            this.connect(existingGraphicWidget, "reenable", this.onSelected);
            this.connect(existingGraphicWidget, "search", this.search);
            this.connect(existingGraphicWidget, "onDone", this.done);
        },
        setExistingGraphicWidget: function (widget) {
            this.existingGraphicWidget = widget;
            this._initWidget();
        },
        unsetExistingGraphicWidget: function () {
            this.disconnect();
        },
        onSelected: function () {
            this._inputGeometry = null;
            this.drawGeometryHandler.deactivateDraw();
            this.drawGeometryHandler.clearGraphics();
            this.existingGraphicWidget.startButton.set("label", this._i18n.get().ui.selectionTools.existingGraphic.button);
            this.selectGraphic();
        },
        selectGraphic: function () {
            var that = this;
            var existingGraphicWidget = this.existingGraphicWidget;
            if (this.con) {
                this.disconnect(this.con);
            }
            this.con = this.connect(this._mapState, "onClick", function (evt) {
                that.disconnect(that.con);
                if (!existingGraphicWidget.getParent().get("selected")) {
                    return;
                }
                if (evt.graphic) {
                    this.drawGeometryHandler.clearGraphics();
                    var inputGeometry = evt.graphic.geometry;
                    if (!that._inputGeometry) {
                        that._inputGeometry = inputGeometry;
                        that.drawGeometryHandler.drawGeometry(inputGeometry);
                        that._mapState.setExtent(inputGeometry.getExtent());
                        that._eventService.postEvent("ct/dn_enhancedselection/SEARCH");
                        that.existingGraphicWidget.startButton.set("label", that._i18n.get().ui.selectionTools.existingGraphic.button2);
                    } else {
                        var oldGeometry = that._inputGeometry;
                        var geometryService = that._geometryService;
                        geometryService.on("union-complete", function (evt) {
                            var geometry = evt.geometry;
                            that._inputGeometry = geometry;
                            that.drawGeometryHandler.drawGeometry(geometry);
                            that._mapState.setExtent(geometry.getExtent());
                            that._eventService.postEvent("ct/dn_enhancedselection/SEARCH");
                        });
                        geometryService.union([oldGeometry, inputGeometry]);
                    }
                } else {
                    that._logService.warn(that._i18n.get().ui.selectionTools.existingGraphic.error);
                }
            });
        },
        done: function () {
            this.selectGraphic();
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