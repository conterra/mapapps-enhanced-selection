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
define({
    root: {
        bundleName: "Enhanced selection configuration",
        bundleDescription: "configuration bundle for the enhanced selection bundle.",
        title: "Enhanced Selection",
        description: "Configure the enhanced selection",
        ui: {
            base: {
                description: "Basic settings for the enhanced selection bundle",
                menuTitle: "Basic Settings",
                clearGraphics: "Clear Graphic"
            },
            storeselection: {
                description: "Configure selection topics",
                menuTitle: "Selection Topics",
                grid: {
                    "title": "Title",
                    "description": "Description"
                },
                hint: "Please specify selection searchstores"
            },
            distance: {
                description: "Configure Selection by distance",
                meter: "Meter",
                kilometer: "Kilometer",
                menuTitle: "Selection By Distance",
                unit: {
                    title: "Unit",
                    tooltip: "Unit for distance calculation"
                },
                minimum: {
                    title: "Minimum",
                    tooltip: "Minimal distance in defined unit"
                },
                maximum: {
                    title: "Maximum",
                    tooltip: "Maximum distance in defined unit"
                },
                interval: {
                    title: "Interval between fixed values",
                    tooltip: "Interval between fixed values"
                },
                defaultStart: {
                title: "Default start",
                tooltip: "Default starting point"
                },
                defaultEnd: {
                    title: "Default end",
                    tooltip: "Default endpoint"
                }
            },
            drivetime: {
                description: "Define travel time",
                menuTitle: "Selection By Travel Time",
                minimum: {
                    title: "Minimum",
                    tooltip: "Minimal time in minutes"
                },
                maximum: {
                    title: "Maximum",
                    tooltip: "Maximum time in minutes"
                },
                interval: {
                    title: "Interval between fixed values",
                    tooltip: "Interval between fixed values"
                }
            },
            freehandpolygon: {
                menuTitle: "Selection By Freehand Graphic",
                description: "Configure freehand graphic"
            },
            selectfeaturefromlayer: {
                menuTitle: "Selection By Area",
                description: "Configure area selection",
                grid: {
                    "title": "Title",
                    "description": "Description"
                },
                hint: "Please specify selection searchstores"
            },
            existinggraphic: {
                menuTitle: "Selection By Existing Graphic",
                description: "Configure existing graphic selection"
            },
            enable: "Enable component",
            enableTooltip: "Enable component",
            searchStore: "Searchstores",
            title: "Selection",
            storeSelector: "Please specify a searchstore",
            selectSpatialRel: "Spatial relationship"
        }
    },
    "de": true
});