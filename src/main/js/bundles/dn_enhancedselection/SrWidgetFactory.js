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
        getStoreProperties: function (idOrStore) {
            var resolver = this.serviceResolver;
            if (typeof (idOrStore) === "string") {
                return resolver.getServiceProperties("ct.api.Store", "(id=" + idOrStore + ")");
            }
            return resolver.getServiceProperties(idOrStore);
        },
        createInstance: function () {
            var srBaseWidget = this.baseWidget;
            this.connect(srBaseWidget.storeSelect, "addOption", function () {
                this.baseWidget.storeSelect.options.sort(function (a, b) {
                    return a.label.localeCompare(b.label);
                })
            });
            if (!srBaseWidget.storeSelect) {
                return;
            }
            d_array.forEach(this.selectionOptions, function (item) {
                if (typeof item != 'undefined') {
                    srBaseWidget.storeSelect.addOption({
                        label: item.label,
                        value: item.value
                    });
                }
            }, this);
            this.selectionOptions.added = true;
            var contentNode = srBaseWidget.contentNode;
            var geometryInputProvider = this.geometryInputProvider;
            d_array.forEach(geometryInputProvider, function (providingWidget) {
                contentNode.addChild(providingWidget);
            });
            return srBaseWidget;
        },
        addSurroundingStore: function (store, serviceproperties) {
            var baseWidget = this.baseWidget;
            var storeTitle = serviceproperties.title;
            var storeId = serviceproperties.id;
            if (!this._shouldStoreBeDisplayed(storeId)) {
                return;
            }
            if (!this.selectionOptions.added) {
                var index = 0;
                d_array.forEach(this.storeIds, function (entry, i) {
                    if (entry === storeId) {
                        index = i;
                    }
                });
                var option = {
                    label: storeTitle,
                    value: storeId
                };
                this.selectionOptions[index] = option;
            } else {
                //add option directly if selectionOptions already added
                if (baseWidget && baseWidget.storeSelect) {
                    baseWidget.storeSelect.addOption({
                        label: storeTitle,
                        value: storeId
                    });
                }
            }
        },
        removeSurroundingStore: function (store, serviceproperties) {
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
            if (d_array.indexOf(this.storeIds, name) > -1) {
                return true;
            }
            return false;
        },
        removeGeometryInputProvider: function (component) {
            var srBaseWidget = this.baseWidget;
            var contentNode = srBaseWidget.contentNode;
            contentNode && contentNode.removeChild(component.getParent());
        },
        addGeometryInputProvider: function (component) {
            var srBaseWidget = this.baseWidget;
            var contentNode = srBaseWidget.contentNode;
            var contentPane = new ContentPane({content: component, title: component.get("title")});
            this.connect(contentPane, "onShow", function () {
                component.onShow();
            });
            contentNode && contentNode.addChild(contentPane);
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
        destroyInstance: function (container) {
            // tabs are no ComponentFactories, so we have to preserve the widgets from destruction
            d_array.forEach(container.getChildren(), function (tab) {
                container.removeChild(tab);
            });
            container.destroyRecursive();
        }
    });
});