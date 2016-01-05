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
    "ct/_when",
    "ct/store/Filter",
    "ct/_Connect",
    "esri/geometry/Polygon",
    "esri/geometry/Circle"

], function (declare, d_array, i18n, ct_when, Filter, _Connect, Circle) {
    return declare([_Connect], {
        activate: function () {
            this.i18n = this._i18n.get();
        },
        queryStore: function (geometry, store, geomRel) {
            var selectionAction = this.selectionAction;
             selectionAction.selectionParameter = {};
             selectionAction.selectionParameter.operator = "$"+geomRel;
             selectionAction.selectionParameter.store = store;
             this.connect(selectionAction, "onSelectionEnd", function () {
             this.disconnect();
             this._eventService.postEvent("ct/dn_enhancedselection/SEARCH_FINISHED");
             });
             selectionAction.selectionParameter.storeId = store.id;
             selectionAction.performSelection(geometry);
        },
        defaultQuery: function (geometry, store, geomRel) {
            var complexQuery = {};
            var operator = "$" + geomRel;
            complexQuery.geometry = {};
            complexQuery.geometry[operator] = geometry;
            var filter = new Filter(store, complexQuery);

            ct_when(filter.query({}, {count: 0}).total, function (total) {
                if (total) {
                    this._dataModel.setDatasource(filter);
                } else {
                    this._logService.warn({
                        id: 0,
                        message: this.i18n.info.noResultsAreaInfo
                    });
                }
                this._eventService.postEvent("ct/dn_enhancedselection/SEARCH_FINISHED");
            }, function (e) {
                this._logService.warn({
                    id: e.code,
                    message: e
                });
                this._eventService.postEvent("ct/dn_enhancedselection/SEARCH_FINISHED");
            }, this);
        }
    });
});