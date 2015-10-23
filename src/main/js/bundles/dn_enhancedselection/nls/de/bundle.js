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
        noToolSelectedWarning: "Bitte w\u00E4hlen sie zuerst mithilfe der Werkzeuge eine Startposition aus",
        noQueryParams: "Store gefunden aber keine Anfrage spezifiziert",
        noResultsAdressSearch: "Keine Ergebnisse gefunden: "
    },
    info: {
        noResultsAreaInfo: "Keine Ergebnisse in deisem Gebiet"
    },
    ui: {
        relWithin: "Enthalten In",
        relTouches: "Ber\u00FChrt",
        title: "Erweiterte Selektion",
        storeSelector: "Bitte w\u00E4hlen sie ein Suchthema",
        selectSpatialRel: "Geometrische Beziehung",
        selectionTools: {
            distance: {
                title: "\u00FCber Umkreisdefinition",
                tooltip: "Mit diesem Tool kann eine Umkreissuche durchgeführt werden"
            },
            travelTime: {
                title: "\u00FCber Erreichbarkeitsberechnung",
                desc: "Entfernung nach Fahrzeit (ArcGIS-Online Account ben\u00F6tigt)",
                tooltip: "Mit diesem Tool kann eine Erreichbarkeitsberechnung durchgeführt werden"
            },
            selectFeatureFromStore: {
                title: "\u00FCber Gebietsauswahl",
                desc: "Suchbereich einschr\u00E4nken auf Basis von",
                selectStore: "Suchthema",
                tooltip: "Mit diesem Tool kann eine Suche über Gebietsauswahl durchgeführt werden"
            },
            freehandPolygon: {
                title: "\u00FCber Freihandpolygon",
                desc: "Suchbereich einschr\u00E4nken auf Basis von Freihandpolygon",
                tooltip: "Mit diesem Tool kann eine Suche auf Basis eines Freihandpolygons durchgeführt werden"

            }
        },
        between: "Zwischen",
        and: "und",
        minutes: "Minuten",
        chooseStart: "Start w\u00E4hlen",
        searchButton: "Suche",
        resetButton: "Zur\u00FCcksetzen"
    },
    toggleTool: {
        title: "Erweiterte Selektion",
        tooltip: "Fenster f\u00FCr erweiterte Selektion \u00F6ffnen"
    }
});