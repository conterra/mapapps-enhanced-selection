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
            distance: {
                title: "Entfernung",
                button: "Ort ausw\u00E4hlen",
                tooltip: "Mit diesem Tool kann eine Selektion auf Basis eines Umkreises durchgef\u00FChrt werden"
            },
            travelTime: {
                title: "Fahrtzeit",
                desc: "Entfernung nach Fahrzeit (ArcGIS-Online Account ben\u00F6tigt)",
                button: "Ort ausw\u00E4hlen",
                tooltip: "Mit diesem Tool kann eine Erreichbarkeitsberechnung durchgef\u00FChrt werden"
            },
            selectFeatureFromStore: {
                title: "Gebiet",
                desc: "Selektionsbereich einschr\u00E4nken auf Basis eines Gebietes",
                selectStore: "Selektionsthema",
                button: "Gebiet ausw\u00E4hlen",
                tooltip: "Mit diesem Tool kann eine Selektion \u00FCber Gebietsauswahl durchgef\u00FChrt werden"
            },
            freehandPolygon: {
                title: "Freihandgrafik",
                desc: "Selektionsbereich einschr\u00E4nken auf Basis von Freihandpolygon",
                button: "Grafik zeichnen",
                tooltip: "Mit diesem Tool kann eine Selektion auf Basis eines Freihandpolygons durchgef\u00FChrt werden"
            },
            existingGraphic: {
                title: "Vorhandene Grafik",
                desc: "Selektionsbereich einschr\u00E4nken auf Basis einer Grafik",
                button: "Vorhandene Grafik ausw\u00E4hlen",
                tooltip: "Mit diesem Tool kann eine Selektion auf Basis einer vorhandenen Grafik durchgef\u00FChrt werden",
                error: "Keine Grafik gefunden"

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