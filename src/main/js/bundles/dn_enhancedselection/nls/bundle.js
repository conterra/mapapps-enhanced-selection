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
            noQueryParams: "Store found, but no query parameters specified.",
            noResultsAdressSearch: "No results found: ",
            noAreaFoundWarning: "No Area found"
        },
        info: {
            noResultsAreaInfo: "No results in this area."
        },
        ui: {
            relWithin: "Within",
            relTouches: "Touches",
            title: "Enhanced Selection",
            storeSelector: "Topic",
            selectSpatialRel: "Spatial relation",
            selectionTools: {
                distance: {
                    title: "Distance",
                    button: "Select location"
                },
                travelTime: {
                    title: "Travel Time",
                    desc: "Distance by travel time (ArcGIS-Online Account required)",
                    button: "Select location"
                },
                selectFeatureFromStore: {
                    title: "Area",
                    desc: "Restrict search area based on",
                    button: "Select area",
                    selectStore: "Search Topic"
                },
                freehandPolygon: {
                    title: "Freehandpolygon",
                    desc: "Restrict search area based on a freehand polygon.",
                    button: "Draw polygon"

                },
                existingGraphic: {
                    title: "Existing Graphic",
                    desc: "Restrict search area based on a graphic.",
                    button: "Get graphic",
                    error: "No graphic found"
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