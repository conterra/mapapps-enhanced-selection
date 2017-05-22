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
    "ct/array",
    "dojo/dom-construct",
    "ct/_Connect",
    "apprt/ServiceResolver",
    "dijit/layout/ContentPane"
], function (declare, d_array, ct_array, d_domConstruct, _Connect, ServiceResolver, ContentPane) {
    return declare([_Connect], {
        /**
         * @constructs
         */
        constructor: function (properties) {
            this.selectionOptions = [];
            this.storeIds = properties.storeIds;
        },
        activate: function (cpCtx) {
            var serviceResolver = this.serviceResolver = new ServiceResolver();
            var bundleCtx = cpCtx.getBundleContext();
            serviceResolver.setBundleCtx(bundleCtx);
        },
        modified: function () {
            var baseWidget = this.baseWidget;
            var storeSelect = baseWidget.storeSelect;
            storeSelect.set("options", []);
            var storeIds = this.storeIds = this._properties.storeIds;
            d_array.forEach(storeIds, function (storeId) {
                var storeProperties = this.getStoreProperties(storeId);
                if (storeProperties) {
                    storeSelect.addOption(
                        {
                            label: storeProperties.title,
                            value: storeId
                        }
                    );
                }
            }, this);
        },
        getStoreProperties: function (idOrStore) {
            var resolver = this.serviceResolver;
            if (typeof (idOrStore) === "string") {
                return resolver.getServiceProperties("ct.api.Store", "(id=" + idOrStore + ")");
            }
            return resolver.getServiceProperties(idOrStore);
        },
        createInstance: function () {
            var baseWidget = this.baseWidget;
            if (!baseWidget.storeSelect) {
                return;
            }
            var contentNode = baseWidget.contentNode;
            var geometryInputProvider = this.geometryInputProvider;
            d_array.forEach(geometryInputProvider, function (providingWidget) {
                contentNode.addChild(providingWidget);
            });
            return baseWidget;
        },
        sortSelectionOptions: function(){
            var sortedOptions = [];
            var baseWidgetStoreSelect = this.baseWidget.storeSelect;
            d_array.forEach(this.storeIds, function (entry, i) {
                d_array.forEach(baseWidgetStoreSelect.options ,function(option, j) {
                    if (entry === option.value) {
                        sortedOptions[i] = option;
                    }
                });
            });
            baseWidgetStoreSelect.options[0].selected = true;
            baseWidgetStoreSelect.removeOption(baseWidgetStoreSelect.options);
            baseWidgetStoreSelect.addOption(sortedOptions);
        },
        addEnhancedSelectionStore: function (store, serviceproperties) {
            var baseWidget = this.baseWidget;
            var storeTitle = serviceproperties.title;
            var storeId = serviceproperties.id;
            if (!this._shouldStoreBeDisplayed(storeId)) {
                return;
            }               
            baseWidget.storeSelect.addOption({
                label: storeTitle,
                value: storeId
            });
            this.sortSelectionOptions();
        },
        removeEnhancedSelectionStore: function (store, serviceproperties) {
            var baseWidget = this.baseWidget;
            var storeId = serviceproperties.id;
            // remove store from widget
            if (baseWidget && baseWidget.storeSelect) {
                baseWidget.storeSelect.removeOption(storeId);
            } else {
                // if widget has not been initialized yet we store all options
                ct_array.arrayRemove(this.selectionOptions, null, {
                    value: storeId
                });
            }
        },
        asArray: function (val) {
            if (!val || !val.length) {
                return [];
            }
            if (typeof(val) === "string") {
                return val.split(/\s*,\s*/);
            }
            return val;
        },
        _shouldStoreBeDisplayed: function (name) {
            return d_array.indexOf(this.storeIds, name) > -1;
        },
        removeGeometryInputProvider: function (component) {
            var baseWidget = this.baseWidget;
            var contentNode = baseWidget.contentNode;
            contentNode && contentNode.removeChild(component.getParent());
        },
        addGeometryInputProvider: function (component) {
            var baseWidget = this.baseWidget;
            var contentNode = baseWidget.contentNode;
            var contentPane = new ContentPane({content: component, title: component.get("title")});
            this.connect(contentPane, "onShow", function () {
                component.onShow();
            });
            contentNode && contentNode.addChild(contentPane);
        },
        destroyInstance: function (container) {
            // tabs are no ComponentFactories, so we have to preserve the widgets from destruction
            d_array.forEach(container.getChildren(), function (tab) {
                container.removeChild(tab);
            });
            container.destroyRecursive();
        }
    });
});