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
        bundleName: "Enhanced Selection",
        bundleDescription: "This bunlde provides tools for enhanced selection.",
        error: {
            failedQuery: "Query failed"
        },
        warning: {
            resultErrorWarning: "Results could not be loaded: ",
            polygonErrorWarning: "Polygon could not be calculated: ",
            noToolSelectedWarning: "Please select a start point with help of a tool first.",
            noQueryParams: "Store found, but no query parameters specified.",
            noResultsAdressSearch: "No results found: "
        },
        info: {
            noResultsAreaInfo: "No results in this area."
        },
        ui: {
            relWithin: "Within",
            relTouches: "Touches",
            title: "Enhanced Selection",
            storeSelector: "Please pick a selection topic",
            selectSpatialRel: "Spatial relation",
            selectionTools: {
                distance: {
                    title: "By Distance"
                },
                travelTime: {
                    title: "By Travel Time",
                    desc: "Distance by travel time (ArcGIS-Online Account required)"
                },
                selectFeatureFromStore: {
                    title: "By Area Selection",
                    desc: "Restrict search area based on",
                    selectStore: "Search Topic"
                },
                freehandPolygon: {
                    title: "By Freehand Polygon",
                    desc: "Restrict search area based on a freehand polygon."

                }
            },
            between: "Between",
            and: "and",
            minutes: "Minutes",
            chooseStart: "Choose Start",
            searchButton: "Search",
            resetButton: "Reset"
        },
        toggleTool: {
            title: "Enhanced Selection",
            tooltip: "Open window for enhanced selection"
        }

    },
    "de": true
})
;