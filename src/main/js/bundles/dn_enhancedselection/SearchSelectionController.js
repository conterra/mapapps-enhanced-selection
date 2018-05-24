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
    "ct/async",
    "dojo/_base/array"
], function (declare, i18n, _Connect, ct_async, d_array) {
    return declare([_Connect], {
        componentName: "SearchSelectionWidget",
        _inputGeometry: null,
        activate: function (componentContext) {
            var properties = this._properties;
            this.id = properties.id || this.id;
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

        },
        _initWidget: function () {
            var SearchSelectionWidget = this.SearchSelectionWidget;
            this.disconnect();
            this.connect(SearchSelectionWidget, "search", this.search);
            this.connect(SearchSelectionWidget, "onDone", this.done);
        },
        unsetCurrentExtentWidget: function () {
            this.disconnect();
        },
        handle: function (item, opts) {
            if (item.geometry.type === "polygon") {


                this._inputGeometry = item.geometry;
                var children = this.baseWidget.contentNode.getChildren();
                d_array.forEach(children, function (child) {
                    if (child.content.params["Component-Name"] === "SearchSelectionWidget") {

                        this.baseWidget.contentNode.selectChild(child)

                    }
                }, this);
            } else (this._inputGeometry = null)
        },
        setResultAsGeometry: function () {
            if (!this._inputGeometry) {
                this._logService.warn(this._i18n.get().ui.selectionTools.searchSelection.error);
            } else {
                inputGeometry = this._inputGeometry;
                this._mapState.setExtent(inputGeometry.getExtent());
                this._eventService.postEvent("ct/dn_enhancedselection/SEARCH");
            }
        },

        done: function () {
            this.setResultAsGeometry();
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