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
            menuTitle: "Grundeinstellungen",
            description: "Grundeinstellungen f\u00FCr die erweiterte Selektion",
            clearGraphics: "Grafik l\u00F6schen"
        },
        storeSelection: {
            menuTitle: "Selektionsthemen",
            description: "Seletkionsthemen definieren",
            grid: {
                "title": "Titel",
                "description": "Beschreibung"
            },
            hint: "Bitte w\u00E4hlen Sie die Stores aus, die zur Selektion zur Verf\u00FCgung stehen sollen"
        },
        selectFeatureFromLayer: {
            menuTitle: "Selektion durch Gebietsauswahl",
            description: "Auswahl anhand Gebietsauswahl konfigurieren",
            grid: {
                "title": "Titel",
                "description": "Beschreibung"
            },
            hint: "Bitte w\u00E4hlen Sie die Stores aus, die f\u00FCr die Gebietsauswahl zur Verf\u00FCgung stehen sollen"
        },
        freehandPolygon: {
            menuTitle: "Selektion durch Freihandpolygon",
            description: "Auswahl anhand Freihandpolygon konfigurieren"
        },
        polygon: {
            menuTitle: "Selektion durch Polygon",
            description: "Auswahl anhand Polygon konfigurieren"
        },
        existingGraphic: {
            menuTitle: "Selektion durch Vorhandene Grafik",
            description: "Auswahl anhand vorhandener Grafik konfigurieren"
        },
        distance: {
            menuTitle: "Selektion durch Entfernung",
            description: "Entfernungsselektion konfigurieren",
            meter: "Meter",
            kilometer: "Kilometer",
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
            },
            defaultStart: {
                title: "Standard Startwert",
                tooltip: "Voreingestellter Startwert"
            },
            defaultEnd: {
                title: "Standard Endwert",
                tooltip: "Voreingestellter Endwert"
            }
        },
        driveTime: {
            menuTitle: "Selektion durch Fahrzeit",
            description: "Fahrzeiten definieren",
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
        enable: "Komponente aktivieren",
        enableTooltip: "Komponente aktivieren",
        searchStore: "Selektionsstores",
        title: "Selektion",
        storeSelector: "Bitte w\u00E4hlen sie ein Selektionsthema",
        selectSpatialRel: "Geometrische Beziehung"
    }
});