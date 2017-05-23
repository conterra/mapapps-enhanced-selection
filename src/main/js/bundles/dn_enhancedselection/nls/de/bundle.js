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
    bundleName: "Erweiterte Selektion",
    bundleDescription: "Dieses Bundle stellt verschiedene Werkzeuge f\u00FCr die erweiterte Selektion zur Verf\u00FCgung.",
    error: {
        failedQuery: "Anfrage fehlgeschlagen"
    },
    warning: {
        resultErrorWarning: "Ergebnisse konnten nicht geladen werden: ",
        polygonErrorWarning: "Polygon konnte nicht berechnet werden: ",
        noQueryParams: "Store gefunden aber keine Anfrage spezifiziert",
        noResultsAdressSearch: "Keine Ergebnisse gefunden: ",
        noAreaFoundWarning: "Kein Gebiet gefunden"
    },
    info: {
        noResultsAreaInfo: "Keine Ergebnisse in deisem Gebiet"
    },
    ui: {
        relWithin: "Enthalten In",
        relTouches: "Ber\u00FChrt",
        title: "Erweiterte Selektion",
        storeSelector: "Selektionsthema",
        selectSpatialRel: "Geometrische Beziehung",
        selectionTools: {
            selectFeatureFromLayer: {
                title: "Gebiet",
                desc: "Selektionsbereich einschr\u00E4nken auf Basis eines Gebietes",
                selectStore: "Selektionsthema",
                button: "Gebiet ausw\u00E4hlen"
            },
            freehandPolygon: {
                title: "Freihandpolygon",
                desc: "Selektionsbereich einschr\u00E4nken auf Basis eines Freihandpolygons",
                button: "Freihandpolygon zeichnen"
            },
            polygon: {
                title: "Polygon",
                desc: "Selektionsbereich einschr\u00E4nken auf Basis eines Polygons",
                button: "Polygon zeichnen"
            },
            existingGraphic: {
                title: "Vorhandene Grafik",
                desc: "Selektionsbereich einschr\u00E4nken auf Basis einer Grafik in der Karte",
                button: "Vorhandene Grafik ausw\u00E4hlen",
                button2: "Weitere vorhandene Grafik ausw\u00E4hlen",
                error: "Keine Grafik gefunden"
            },
            currentExtent: {
                title: "Aktueller Kartenausschnitt",
                desc: "Selektionsbereich einschr\u00E4nken auf Basis des aktuellen Kartenausschnitts",
                button: "Im aktuellen Kartenausschnitt suchen"
            },
            distance: {
                title: "Entfernung",
                desc: "Selektionsbereich einschr\u00E4nken auf Basis der Entfernung",
                button: "Ort ausw\u00E4hlen"
            },
            driveTime: {
                title: "Fahrtzeit",
                desc: "Selektionsbereich einschr\u00E4nken auf Basis der Entfernung nach Fahrzeit (ArcGIS-Online Account ben\u00F6tigt)",
                button: "Ort ausw\u00E4hlen"
            }
        },
        between: "Zwischen",
        and: "und",
        minutes: "Minuten",
        chooseStart: "Start w\u00E4hlen",
        resetButton: "Zur\u00FCcksetzen"
    },
    toggleTool: {
        title: "Erweiterte Selektion",
        tooltip: "Fenster f\u00FCr erweiterte Selektion \u00F6ffnen"
    }
});