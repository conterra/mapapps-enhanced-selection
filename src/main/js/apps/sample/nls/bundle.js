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
    root:
            /*
             * COPYRIGHT 2010-2011 con terra GmbH Germany
             */
                    ({
                        apptitle: "Enhanced Selection Demo",
                        custominfo: {
                            imprint: {
                                title: "Imprint",
                                tooltip: "Show imprint",
                                content: "<p>This is a sample text.</p>"
                            }
                        },
                        agssearch: {
                            countries: {
                                title: "Countries in Europe (Search on ArcGIS for Server Map Service)",
                                description: "Search for countries in Europe",
                                placeHolder: "Country..."
                            },
                            campingsites: {
                                title: "Campingsites"
                            },
                            cities: {
                                title: "Cities"
                            },
                            bathingwater: {
                                title: "Bathingwater"
                            }
                        },
                        basemaptoggler: {
                            ui: {
                                labelTitle: "Basemap"
                            }
                        },
                        bookmarks: {
                            ui: {
                                toolTitle: "Set spatial bookmarks",
                                clearButton: "Clear all bookmarks",
                                deleteMessage: "Do you really want to clear all bookmarks?",
                                deleteTitle: "Are you sure?",
                                deleteWarning: "This cannot be undone!"
                            },
                            predefined: {
                                europe: "Europe",
                                germany: "Germany"
                            }
                        },
                        contentviewer: {
                            regions: {
                                search: "Search for more information!"
                            }
                        },
                        map: {
                            glasspane: {
                                settlements: {
                                    tel: "Telephone",
                                    link: "Open Homepage"
                                }
                            },
                            base: {
                                "topo": {
                                    title: "Topo",
                                    description: "A topographic world map"
                                },
                                "aerial": {
                                    title: "Aerial",
                                    description: "Aerial views of the whole world"
                                },
                                "streets": {
                                    title: "Streets",
                                    description: "A detailed world street map"
                                }
                            },
                            operational: {
                                "streets": {
                                    title: "Streets"
                                },
                                bathingwater: {
                                    title: "Bathing Water"
                                },
                                regions: {
                                    title: "Biogeographical Regions"
                                },
                                natura2000: {
                                    title: "Natura 2000 Protected Sites"
                                }
                            }
                        },
                        parametermanager: {
                            ui: {
                                encoderBtn: "Create a link to the current map",
                                encoderBtnTooltip: "Link tool",
                                sendMail: "EMail",
                                linkBoxTitle: "Link URL",
                                codeBoxTitle: "Code to embed in HTML",
                                mailBody: "${url}",
                                mailSubject: "Check out this map!",
                                size: "Size (Pixels)"
                            }
                        },
                        resultcenter: {
                            fields: {
                                title: "Title"
                            }
                        },
                        selection: {
                            infoservice: "Query Social Media",
                            rectangle: "Select Countries (Rectangle)",
                            point: "Select States (Point)",
                            circle: "Select Countries (Circle)",
                            freehand: "Select Countries (Freehand Polygon)",
                            bathingwater_1: {
                                extent: "Select countries to show bathingwater quality data (Rectangle)",
                                point: "Select countries to show bathingwater quality data (Point)",
                                circle: "Select countries to show bathingwater quality data (Circle)",
                                freehand: "Select countries to show bathingwater quality data (Freehand Polygon)"
                            },
                            bathingwater_4: {
                                extent: "Select locations to show bathingwater quality data (Rectangle)",
                                point: "Select locations to show bathingwater quality data (Point)",
                                circle: "Select locations to show bathingwater quality data (Circle)",
                                freehand: "Select locations to show bathingwater quality data (Freehand Polygon)"
                            },
                            regions_0: {
                                extent: "Select regions (Rectangle)",
                                point: "Select regions (Point)",
                                circle: "Select regions (Circle)",
                                freehand: "Select regions (Freehand Polygon)"
                            },
                            composite_natura2000_2_6: {
                                extent: "Select protected sites (Rectangle)",
                                point: "Select protected sites (Point)",
                                circle: "Select protected sites (Circle)",
                                freehand: "Select protected sites (Freehand Polygon)"
                            }
                        },
                        templates: {
                            templates: {
                                seasons: {
                                    mapflow: {
                                        title: "Map Content"
                                    },
                                    agolmapFinder: {
                                        title: "ArcGIS Online Search"
                                    }
                                }
                            }
                        },
                        toolsets: {
                            whatdoyouwant: "What do you want to do?",
                            redliningTools: "Redlining",
                            redliningToolsTooltip: "Redlining-Tools",
                            selectionTools: "Query information from the map",
                            selectionToolsTooltip: "Tools for Selection and Information",
                            navigationTools: "Use navigation tools",
                            navigationToolsTooltip: "Tools for map navigation",
                            mapviewTools: "Map Tools",
                            mapviewToolsTooltip: "Map Tools",
                            startSelectionTools: "Choose start"
                        },
                        fields: {
                            id: "ID",
                            title: "Title",
                            adapter: "Service",
                            type: "Type"
                        }
                    })
            ,
            "de": true
        });