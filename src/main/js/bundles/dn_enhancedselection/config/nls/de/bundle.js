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
    bundleName: "Erweiterte Selektion Konfiguration",
    bundleDescription: "Konfigurationsbundle f\u00FCr das Enhanced Selection Bundle.",
    title: "Erweiterte Selektion",
    description: "Erweiterte Selektion konfigurieren",
    ui: {
        base: {
            description: "Grundeinstellungen f\u00FCr die erweiterte Selektion",
            menuTitle: "Grundeinstellungen",
            clearGraphics: "Grafik l\u00F6schen"
        },
        storeselection: {
            description: "Suchthemen definieren",
            menuTitle: "Suchthemen"
        },
        distance: {
            description: "Entfernungsselektion konfigurieren",
            meter: "Meter",
            kilometer: "Kilometer",
            menuTitle: "Selektion durch Entfernung",
            unit: {
                title: "Einheit",
                tooltip: "Einheit zur Distanzberechnung"
            },
            minimum: {
                title: "Minimum",
                tooltip: "Minimale Entfernung in definierter Einheit"
            },
            maximum: {
                title: "Maximum",
                tooltip: "Maximale Entfernung in definierter Einheit"
            },
            interval: {
                title: "Intervall zwischen festen Werten",
                tooltip: "Intervall zwischen festen Werten"
            }
        },
        drivetime: {
            description: "Fahrzeiten definieren",
            menuTitle: "Selektion durch Fahrzeit",
            minimum: {
                title: "Minimum",
                tooltip: "Minimale Zeit in Minuten"
            },
            maximum: {
                title: "Maximum",
                tooltip: "Maximale Zeit in Minuten"
            },
            interval: {
                title: "Intervall zwischen festen Werten",
                tooltip: "Intervall zwischen festen Werten"
            }
        },
        freehandpolygon: {
            menuTitle: "Selektion durch Freihandgrafik",
            description: "Auswahl anhand Freihandgrafik konfigurieren"
        },
        selectfeaturefromlayer: {
            menuTitle: "Selektion durch Gebietsauswahl",
            description: "Auswahl anhand Gebietsauswahl konfigurieren"
        },
        existinggraphic: {
            menuTitle: "Selektion durch Vorhandene Grafik",
            description: "Auswahl anhand vorhandener Grafik konfigurieren"
        },
        enable: "Komponente aktivieren",
        enableTooltip: "Komponente aktivieren",
        searchStore: "Suchstores",
        relWithin: "Enthalten In",
        relTouches: "Ber\u00FChrt",
        title: "Selektion",
        storeSelector: "Bitte w\u00E4hlen sie ein Suchthema",
        selectSpatialRel: "Geometrische Beziehung",
        selectionTools: {
            distance: {
                title: "\u00FCber Umkreisdefinition"
            },
            travelTime: {
                title: "\u00FCber Erreichbarkeitsberechnung",
                desc: "Entfernung nach Fahrzeit (ArcGIS-Online Account ben\u00F6tigt)"
            },
            selectFeatureFromStore: {
                title: "\u00FCber Gebietsauswahl",
                desc: "Suchbereich einschr\u00E4nken auf Basis von",
                selectStore: "Suchthema"
            },
            freehandPolygon: {
                title: "\u00FCber Freihandpolygon",
                desc: "Suchbereich einschr\u00E4nken auf Basis von Freihandpolygon"

            }
        },
        grid: {
            "title": "Titel",
            "description": "Beschreibung"
        },
        hint: "Bitte w\u00E4hlen Sie die Stores aus, die zur Selektion zur Verf\u00FCgung stehen sollen"
    }
});