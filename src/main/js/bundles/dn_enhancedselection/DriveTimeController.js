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
    "dojo/_base/lang",
    "dojo/i18n!./nls/bundle",
    "dijit/form/HorizontalRuleLabels",
    "dijit/Tooltip",
    "ct/_Connect",
    "ct/store/Filter",
    "ct/async",
    "esri/graphic",
    "esri/tasks/FeatureSet",
    "esri/tasks/Geoprocessor",
    "esri/symbols/SimpleMarkerSymbol"
], function (declare, d_lang, i18n, HorizontalRuleLabels, Tooltip, _Connect, Filter, ct_async, Graphic, FeatureSet, Geoprocessor, SimpleMarkerSymbol) {
    return declare([_Connect], {
        geometryType: "Point",
        componentName: "DriveTimeWidget",
        constructor: function (properties) {
        },
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
            var i18n = this._i18n.get().ui.selectionTools.travelTime;
            var timeSliderProps = this._properties.drivetime;
            var timeMinimum = Math.round(timeSliderProps.minimum);
            var timeMaximum = Math.round(timeSliderProps.maximum);
            var timeDifference = timeMaximum - timeMinimum;
            var discreteValues = (timeMaximum - timeMinimum) / timeSliderProps.interval + 1;
            var driveTimeWidget = this.driveTimeWidget;
            //driveTimeWidget.set("tooltip", i18n.tooltip);
            var timeSlider = driveTimeWidget.timeSlider;
            timeSlider.set("discreteValues", discreteValues);
            timeSlider.set("minimum", timeMinimum);
            timeSlider.set("maximum", timeMaximum);
            timeSlider.set("value", [
                timeMinimum + (timeDifference * 0.5)
            ]);

            //configure time rule labels
            new HorizontalRuleLabels({
                container: "topDecoration",
                labels: [
                    timeMinimum + (timeDifference * (0 / 5)),
                    timeMinimum + (timeDifference * (1 / 5)),
                    timeMinimum + (timeDifference * (2 / 5)),
                    timeMinimum + (timeDifference * (3 / 5)),
                    timeMinimum + (timeDifference * (4 / 5)),
                    timeMinimum + (timeDifference * (5 / 5)) + "min"],
                labelStyle: "height:1.5em;"
            }, driveTimeWidget.timeRuleLabels);

            // connect events
            this.disconnect();
            this.connect(driveTimeWidget, "onShow", this.onSelected);
            this.connect(driveTimeWidget, "reenable", this.draw);
            this.connect(driveTimeWidget, "search", this.search);
            this.connect(driveTimeWidget.timeSlider, "onChange", this.onTimeSliderChange);

            this._createGeoprocessor();
        },
        modified: function (componentContext) {
            var properties = this._properties;
            var componentName = this.componentName;
            if (properties.widgetEnabled) {
                componentContext.enableComponent(componentName);
                this.disconnect();
                this._initWidget();
            } else {
                componentContext.disableComponent(componentName);
            }
        },
        geometryDrawn: function (evt) {
            this._inputGeometry = evt.getProperty("geometry");
        },
        draw: function (geometryType) {
            this.drawGeometryHandler.allowUserToDrawGeometry(geometryType || this.geometryType);
        },
        setDriveTimeWidget: function (widget) {
            this.driveTimeWidget = widget;
            this._initWidget();
        },
        unsetDriveTimeWidget: function () {
            this.disconnect();
        },
        _createGeoprocessor: function () {
            this.gp = new Geoprocessor(this._properties.geoprocessorUrl);
        },
        onTimeSliderChange: function (event) {
            var driveTimeWidget = this.driveTimeWidget;
            var minutes = event;
            var text = minutes + " min";

            var parent = driveTimeWidget.getParent();
            if (parent.get("selected") === true) {
                Tooltip.show(text, driveTimeWidget.timeToolTip);

                ct_async(function(arg1) {
                    Tooltip.hide(driveTimeWidget.timeToolTip);
                }, 1500, "arg1");
            }
        },
        onTimeInputChange: function () {
            var driveTimeWidget = this.driveTimeWidget;
            var timeValidationTb = driveTimeWidget.timeText;
            if (timeValidationTb.isValid()) {
                driveTimeWidget.timeSlider.set("value", timeValidationTb.get("value"));
            }
        },
        onSelected: function (selected) {
            var geometryType = this.geometryType;
            this.draw(geometryType);
            this._eventService.sendEvent("ct/dn_enhancedselection/WIDGET_SELECTED", {
                geometry: geometryType
            });
        },
        search: function (store, spatialRel) {
            var driveTimeWidget = this.driveTimeWidget;
            this.selectedStore = store;
            this.spatialRel = spatialRel;
            var geometry = this._inputGeometry;
            if (!geometry) {
                this._logService.warn(this._i18n.get().warning.noToolSelectedWarning);
                return;
            }
            // if range in drive-time is selected

            var minutes = Number(driveTimeWidget.timeSlider.value);
            var symbol = new SimpleMarkerSymbol();
            var graphic = new Graphic(geometry, symbol);

            var features = [];
            features.push(graphic);
            var featureSet = new FeatureSet();
            featureSet.features = features;
            var params = {"facilities": featureSet, "break_values": minutes, "f": "json"};
            this.gp.setOutputSpatialReference(this._mapState.getSpatialReference());
            this.gp.submitJob(params, d_lang.hitch(this, this._completeCallback), d_lang.hitch(this, this._statusCallback), d_lang.hitch(this, this._onError));
            this.drawGeometryHandler.drawDistanceText(geometry, minutes + "minutes");
        },
        _onError: function (error) {
            this._logService.warn({
                id: error.code,
                message: this._i18n.get().warning.polygonErrorWarning + error.message
            });
        },
        _statusCallback: function (jobInfo) {
            /*this._logService.info({
             id: 0,
             message: jobInfo.jobStatus
             });*/
        },
        _completeCallback: function (jobInfo) {
            var that = this;

            that.gp.getResultData(jobInfo.jobId, "service_areas", function (results) {
                var driveTimePolygon = results.value.features[0];
                var geometry = that._coordinateTransformer.transform(driveTimePolygon.geometry, that._mapState.getSpatialReference().wkid);
                that.drawGeometryHandler.drawGeometry(geometry);
                that._mapState.setExtent(geometry.getExtent());

                that.queryController.queryStore(driveTimePolygon.geometry, that.selectedStore, that.spatialRel);
            }, function (error) {
                that._logService.warn({
                    id: error.code,
                    message: that._i18n.get().warning.polygonErrorWarning + error.message
                });
            });
        },
        deactivate: function () {
            this.disconnect();
        }
    });
});