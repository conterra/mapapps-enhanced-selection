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
    "esri/units",
    "ct/async",
    "dijit/form/HorizontalRuleLabels",
    "dijit/Tooltip",
    "ct/_Connect",
    "dojo/dom-construct"
], function (declare, d_array, d_lang, esri_units, ct_async, HorizontalRuleLabels, Tooltip, _Connect, d_domConstruct) {
    return declare([_Connect], {
        geometryType: "Point",
        componentName: "DistanceCircleWidget",
        activate: function (componentContext) {
            var properties = this._properties;
            if (!properties.widgetEnabled) {
                var componentName = this.componentName;
                ct_async(function () {
                    componentContext.disableComponent(componentName);
                }, 0);
                return;
            }
            this.distanceCircleWidget && this._initWidget();

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
        setDistanceCircleWidget: function (widget) {
            this.distanceCircleWidget = widget;
            this._initWidget();
        },
        unsetDistanceCircleWidget: function () {
            this.disconnect();
        },
        _initWidget: function () {
            var distanceWidget = this.distanceCircleWidget;
            var distanceSliderProps = this._properties.distance;
            var unitLong = distanceSliderProps.unit;
            this.radiusUnit = esri_units[unitLong];
            var radiusUnitShort = this.radiusUnitShort = unitLong === "METERS" ? "m" : "km";
            var distanceMinimum = Math.round(distanceSliderProps.minimum);
            var distanceMaximum = Math.round(distanceSliderProps.maximum);
            var distanceStart = Math.round(distanceSliderProps.defaultStart);
            var distanceEnd = Math.round(distanceSliderProps.defaultEnd);
            var distanceDifference = distanceMaximum - distanceMinimum;
            var i18n = this._i18n.get().ui.selectionTools.distance;
            distanceWidget.set("tooltip", i18n.tooltip);
            this.disconnect();
            this.connect(distanceWidget.distanceSlider, "onChange", this.onDistanceSliderChange);
            this.connect(distanceWidget, "onShow", this.onSelected);
            this.connect(distanceWidget, "search", this.search);
            this.connect(distanceWidget, "reenable", this.draw);
            var distanceSlider = distanceWidget.distanceSlider;
            // configure distance slider
            var discreteValues = (distanceMaximum - distanceMinimum) / distanceSliderProps.interval + 1;
            distanceSlider.set("discreteValues", discreteValues);
            distanceSlider.set("minimum", distanceMinimum);
            distanceSlider.set("maximum", distanceMaximum); 
            if(isNaN(distanceStart) || isNaN(distanceEnd)){
                distanceSlider.set("value", [              
                    distanceMinimum + (distanceDifference * 0.25),
                    distanceMaximum - (distanceDifference * 0.25)     
                ]);
            }
            else{
                distanceSlider.set("value", [               
                    distanceStart, distanceEnd
                ]);
            }
            //configure distance rule labels
            var labels = new HorizontalRuleLabels({
                container: "topDecoration",
                labels: [
                    distanceMinimum + (distanceDifference * 0.0),
                    distanceMinimum + (distanceDifference * 0.2),
                    distanceMinimum + (distanceDifference * 0.4),
                    distanceMinimum + (distanceDifference * 0.6),
                    distanceMinimum + (distanceDifference * 0.8),
                    distanceMinimum + (distanceDifference * 1.0) + radiusUnitShort]
            });
            d_domConstruct.place(labels.domNode, distanceWidget.distanceRuleLabels, "only");
            distanceWidget.show();
        },
        onDistanceSliderChange: function (event) {
            var distanceWidget = this.distanceCircleWidget;

            if (event[0] === 0) {
                var text = event[1] + " " + this.radiusUnitShort;
            } else if (event[0] === event[1]) {
                var text = event[1] + " " + this.radiusUnitShort;
            } else {
                var text = event[0] + " - " + event[1] + " " + this.radiusUnitShort;
            }

            var parent = distanceWidget.getParent();
            if (parent.get("selected") === true) {
                Tooltip.show(text, distanceWidget.distanceToolTip);

                ct_async(function (arg1) {
                    Tooltip.hide(distanceWidget.distanceToolTip);
                }, 1500, "arg1");
            }
        },
        draw: function (geometryType) {
            this.drawGeometryHandler.allowUserToDrawGeometry(geometryType || this.geometryType);
        },
        geometryDrawn: function (evt) {
            this._inputGeometry = evt.getProperty("geometry");
            var distanceCircleWidget = this.distanceCircleWidget;
            try {
                if (!distanceCircleWidget.getParent().get("selected")) {
                    return;
                }
                this._eventService.postEvent("ct/dn_enhancedselection/SEARCH");
            } catch (e) {
                // do nothing
            }
        },
        onSelected: function () {
            var geometryType = this.geometryType;
            this.draw(geometryType);
        },
        search: function (store, spatialRel) {
            var distanceWidget = this.distanceCircleWidget;
            var geometry = this._inputGeometry;
            if (!geometry) {
                return;
            }
            var distanceSlider = distanceWidget.distanceSlider;
            var minDistance = distanceSlider.value[0];
            var maxDistance = distanceSlider.value[1];
            var queryFeature = this.drawGeometryHandler.drawCircle(geometry, minDistance, maxDistance, this.radiusUnit);
            var radiusUnitShort = this.radiusUnitShort;
            var featureGeometry = queryFeature.geometry;
            var extent = featureGeometry.getExtent();
            this._mapState.setExtent(extent);
            if (minDistance === 0) {
                this.drawGeometryHandler.drawDistanceText(geometry,
                    maxDistance + radiusUnitShort
                );
            } else {
                this.drawGeometryHandler.drawDistanceText(geometry,
                    minDistance + radiusUnitShort +
                    " - " +
                    maxDistance + radiusUnitShort
                );

            }
            this.queryController.queryStore(featureGeometry, store, spatialRel);
        }
        ,
        deactivate: function (componentContext) {
            //   componentContext.disableComponent(this.componentName);
            this.disconnect();
            this.geometryType = null;
            this.radiusUnitShort = null;
        }

    });
});