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
    bundleName: "Umkreissuche Konfiguration",
    bundleDescription: "Konfigurationsbundle f\u00FCr das Surroundings Bundle.",
    title: "Komplexe Selektion",
    description: "Komplexe Selektion konfigurieren",
    ui: {
        base: {
            description: "Selektionsthemen definieren",
            skipStores: "Ignorierte Selektionsthemen",
            skipStoresTooltip: "Kommasepariert Liste mit Suchthemen, die nicht zur Verfügung gestellt werden. Werden keine angegeben, wird diese Einstellung ignoriert",
            allowedStores: " Nutzbare Selektionsthemen",
            allowedStoresTooltip: "Kommasepariert Liste mit Suchthemen, die zur Verfügung gestellt werden. Werden keine angegeben, wird diese Einstellung ignoriert",
            menuTitle: "Grundeinstellungen"
        },
        distance: {
            description: "Distanzselektion konfigurieren",
            meter: "Meter",
            kilometer: "Kilometer",
            menuTitle: "Distanzselektion",
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
            skipStores: "Ignorierte Selektionsthemen",
            skipStoresToolip: "Kommasepariert Liste mit Suchthemen, die nicht zur Verfügung gestellt werden. Werden keine angegeben, wird diese Einstellung ignoriert",
            allowedStores: " Nutzbare Selektionsthemen",
            allowedStoresTooltip: "Kommasepariert Liste mit Suchthemen, die zur Verfügung gestellt werden. Werden keine angegeben, wird diese Einstellung ignoriert",
            menuTitle: "Fahrzeiten"
        },
        freehandpolygon: {
            menuTitle: "Freihandpolygon",
            description: "Freihandpolygon konfigurieren"
        },
        selectfeaturefromlayer: {
            menuTitle: "Gebietsauswahl",
            description: "Gebietsauswahl konfigurieren"
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