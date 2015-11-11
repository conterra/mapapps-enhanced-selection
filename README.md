# Enhanced Selection

The Enhanced Selection Bundle allows you to select features in enhanced ways. There are these four special types of selection:
- Area Selection
- Freehand Polygon
- Travel Time
- Distance

### Sample App ###
http://www.mapapps.de/mapapps/resources/apps/downloads_enhancedselection/index.html

Installation Guide
------------------
####Configurable Components:

#####DistanceCircleController:
```
"DistanceCircleController": {
  "distance": {
    "minimum": 0,
    "maximum": 1000,
    "interval": 50,
    "unit": "KILOMETERS"
  }
}
```
#####DriveTimeController
```
"DriveTimeController": {
  "geoprocessorUrl": "http://logistics.arcgis.com/arcgis/rest/services/World/ServiceAreas/GPServer/GenerateServiceAreas",
  "distance": {
    "minimum": 0,
    "maximum": 500,
    "interval": 50,
    "unit": "KILOMETERS"
  }
}
```
#####SelectFeatureFromLayerController:
Define selectable stores
```
"SelectFeatureFromLayerController": {
  "storeIds": [
    "%STORE_ID1%",
    "%STORE_ID2%",
    ...
  ]
}
```
#####SrWidgetFactory:
Define selectable stores
```
"SrWidgetFactory": {
  "storeIds": [
    "%STORE_ID1%",
    "%STORE_ID2%",
    ...
  ]
}
```

You can activate or deactivate all widgets by setting "widgetEnabled" to true or false.
