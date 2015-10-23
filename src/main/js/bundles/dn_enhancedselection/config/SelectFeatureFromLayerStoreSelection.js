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
define(["dojo/_base/lang", "dojo/_base/declare", "dojo/_base/array", "ct/_lang", "ct/_Connect", "ct/array", "ct/Exception", "ct/_string", "./SelectFeatureFromLayerWidget", "ct/store/ComplexMemory", "ct/_when"],
    function (d_lang, declare, d_array, ct_lang, _Connect, ct_array, Exception, ct_string, SelectFeatureFromLayerWidget, ComplexMemoryStore, ct_when) {
        /*
         * COPYRIGHT 2012 con terra GmbH Germany
         */
        return declare([_Connect],
            {
                createInstance: function () {
                    var configStore = this._getConfigStore();
                    var i18n = this._i18n.get().ui;
                    var properties = this._properties || {};
                    var opts = d_lang.mixin({
                        i18n: i18n,
                        configAdminService: this._configAdminService,
                        configStore: configStore,
                        config : this._getComponentConfig()
                    }, properties.widgetProperties);
                    var widget = this._widget = new SelectFeatureFromLayerWidget(opts);
                    return widget;
                },

                _getComponentConfig: function () {
                    var properties = this._properties.widgetProperties;
                    return this._configAdminService.getConfiguration(properties.pid, properties.bid);
                },

                _updateConfig: function (config) {
                    try {
                        this._getComponentConfig().update(config);
                    } catch (e) {
                        e = Exception.wrap(e);
                        var msg = "_Configurable: Can't apply changed configuration! Error:" + e;
                        console.error(msg, e);
                        throw e;
                    }
                },

                destroyInstance: function (instance) {
                    this.disconnect();
                    this._configStore = null;
                    var window = this._window;
                    if (window) {
                        window.close();
                        this._window = null;
                    }
                    this._widget = null;
                    instance.destroyRecursive();
                },

                _getConfigStore: function () {
                    var i18n = this._i18n.get().ui;
                    if (!this._configStore) {
                        //             var i18n = this._i18n.get().widget.grid;
                        var store = this._configStore = new ComplexMemoryStore({
                            data: [],
                            idProperty: "id"
                        });
                        store.getMetadata = function () {
                            return {
                                fields: [{
                                    "title": "id",
                                    "name": "id",
                                    "type": "string",
                                    "identifier": true
                                }, {
                                    "title": i18n.grid.title,
                                    "name": "title",
                                    "type": "string"
                                }, {
                                    "title": i18n.grid.description,
                                    "name": "description",
                                    "type": "string"
                                }]
                            };
                        };
                    }
                    return this._configStore;
                },

                addSurroundingStore: function (service, properties) {
                    var configStore = this._getConfigStore();
                    configStore.add({
                        "id": properties.id,
                        "title": properties.title,
                        "description": properties.description
                    });
                }
            });
    });
