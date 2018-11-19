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
    "dojo/_base/lang",
    "dojo/i18n!./nls/bundle",
    "ct/_Connect",
    "ct/async",
    "ct/_when",
    "esri/tasks/FeatureSet",
    "esri/tasks/Geoprocessor",
    "esri/symbols/SimpleMarkerSymbol",
    "apprt/ServiceResolver",
    "dijit/form/FilteringSelect"
], function (declare, d_array, d_lang, i18n, _Connect, ct_async, ct_when, FeatureSet, Geoprocessor, SimpleMarkerSymbol, ServiceResolver) {
    return declare([_Connect], {
        geometryType: "Point",
        componentName: "SelectFeatureFromLayerWidget",
        activate: function (componentContext) {
            var serviceResolver = this.serviceResolver = new ServiceResolver();
            var bundleCtx = componentContext.getBundleContext();
            serviceResolver.setBundleCtx(bundleCtx);
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
        getStoreProperties: function (idOrStore) {
            var resolver = this.serviceResolver;
            if (typeof (idOrStore) === "string") {
                return resolver.getServiceProperties("ct.api.Store", "(id=" + idOrStore + ")");
            }
            return resolver.getServiceProperties(idOrStore);
        },
        _initWidget: function () {
            var selectFeatureFromLayerWidget = this.selectFeatureFromLayerWidget;
            var storeSelectionSelect = selectFeatureFromLayerWidget.storeSelectionSelect;
            this.disconnect();
            this.connect(selectFeatureFromLayerWidget, "onShow", this.onSelected);
            this.connect(selectFeatureFromLayerWidget, "reenable", this.draw);
            this.connect(selectFeatureFromLayerWidget, "search", this.search);
            storeSelectionSelect.set("options", []);
            if (!this.serviceResolver) {
                return;
            }
            d_array.forEach(this._properties.storeIds, function (storeId) {
                var storeProperties = this.getStoreProperties(storeId);
                if (storeProperties) {
                    storeSelectionSelect.addOption(
                        {
                            label: storeProperties.title,
                            value: storeId
                        }
                    );
                }
            }, this);
        },
        setSelectFeatureFromLayerWidget: function (widget) {
            this.selectFeatureFromLayerWidget = widget;
            this._initWidget();
        },
        unsetSelectFeatureFromLayerWidget: function () {
            this.disconnect();
        },
        geometryDrawn: function (evt) {
            var geom = evt.getProperty("geometry");
            var selectFeatureFromLayerWidget = this.selectFeatureFromLayerWidget;
            try {
                if (!selectFeatureFromLayerWidget.getParent().get("selected")) {
                    return;
                }
                var storeSelectionSelect = selectFeatureFromLayerWidget.storeSelectionSelect;
                var selectedStoreId = storeSelectionSelect.get("value");
                var store = this.getStore(selectedStoreId);

                clearTimeout(this._timeout);
                var that = this;
                this._timeout = setTimeout(function () {
                    ct_when(store.query({
                        geometry: {
                            $intersects: geom
                        }
                    }, {
                        fields: {
                            "geometry": true
                        }
                    }), function (result) {
                        if (result.length > 0) {
                            var geometry = result[0].geometry;
                            that._mapState.setExtent(geometry.getExtent());
                            var inputGeom = that._inputGeometry = geometry;
                            that.drawGeometryHandler.drawGeometry(inputGeom);
                            that._eventService.postEvent("ct/dn_enhancedselection/SEARCH");
                        } else {
                            that._logService.warn(that._i18n.get().warning.noAreaFoundWarning);
                        }
                    }, this);
                }, 1000);
            } catch (e) {
                //do nothing
            }
        },
        getStore: function (id) {
            return this.serviceResolver.getService("ct.api.Store", "(id=" + id + ")");
        },
        draw: function (geometryType) {
            this.drawGeometryHandler.allowUserToDrawGeometry(geometryType || this.geometryType);
        },
        onSelected: function (selected) {
            this._inputGeometry = null;
            this.drawGeometryHandler.clearGraphics();
            var geometryType = this.geometryType;
            this.draw(geometryType);
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