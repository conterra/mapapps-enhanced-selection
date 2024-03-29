# Enhanced Selection

The Enhanced Selection Bundle allows you to select features in enhanced ways. There are these six special types of selection:
- Area Selection
- Freehand Polygon
- Polygon
- Existing Graphic
- Current Extent
- Distance
- Travel Time
- Search Selection

![freehand polygon selection](https://github.com/conterra/mapapps-enhanced-selection/blob/master/polygonSelection.JPG)

![distance selection](https://github.com/conterra/mapapps-enhanced-selection/blob/master/distance.JPG)


Installation Guide
------------------
#### Configurable Components:

##### BaseWidget:
Enable Bundle in `app.json`
```
"load" : {
   // ...
   "allowedBundles": [
       "dn_enhancedselection",
       // ...
   ]
}
```
Then check if you can choose it in Live Configuration / Extended Configuration.

To add the layer to one of the toolbars open Up 
> Live Configuration / Extended Configuration / Toolset (toolset) / Components / ToolsetManager 

and add `dn_enhancedselectionToggleTool` to any `tools` array (depending on where you want to place the button)

Basic Settings
```
"BaseWidget": {
  "enableContains": true
}
```
##### BaseWidgetController:
Basic Settings
```
"BaseWidgetController": {
  "clearGraphics": true
}
```
##### SrWidgetFactory:
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
##### SelectFeatureFromLayerController:
Define selectable stores
```
"SelectFeatureFromLayerController": {
  "widgetEnabled": true,
  "storeIds": [
    "%STORE_ID1%",
    "%STORE_ID2%",
    ...
  ]
}
```
##### FreehandPolygonController
```
"FreehandPolygonController": {
  "widgetEnabled": true
}
```
##### PolygonController
```
"PolygonController": {
  "widgetEnabled": true
}
```
##### ExistingGraphicController
```
"ExistingGraphicController": {
  "widgetEnabled": true
}
```
##### CurrentExtentController
```
"CurrentExtentController": {
  "widgetEnabled": true
}
```
##### DistanceCircleController:
```
"DistanceCircleController": {
  "widgetEnabled": true,
  "distance": {
    "minimum": 0,
    "maximum": 1000,
    "defaultStart": 0,
    "defaultEnd": 500,
    "interval": 50,
    "unit": "KILOMETERS"
  }
}
```
##### DriveTimeController
```
"DriveTimeController": {
  "widgetEnabled": true,
  "geoprocessorUrl": "http://logistics.arcgis.com/arcgis/rest/services/World/ServiceAreas/GPServer/GenerateServiceAreas",
  "drivetime": {
    "minimum": 0,
    "maximum": 30,
    "interval": 1
  }
}
```

##### SearchSelection
```
"SearchSelectionController": {
   "widgetEnabled": true
},
```

You can activate or deactivate all widgets by setting "widgetEnabled" to true or false.

To change the order of selection types you can change the Service-Ranking:

```
"SelectFeatureFromLayerWidget": {
  "Service-Ranking": -1
},
"FreehandPolygonWidget": {
  "Service-Ranking": -2
},
"PolygonWidget": {
  "Service-Ranking": -3
},
"ExistingGraphicWidget": {
  "Service-Ranking": -4
},
"CurrentExtentWidget": {
  "Service-Ranking": -5
},
"DistanceCircleWidget": {
  "Service-Ranking": -6
},
"DriveTimeWidget": {
  "Service-Ranking": -7
}
```

Development Guide
------------------
### Define the mapapps remote base
Before you can run the project you have to define the mapapps.remote.base property in the pom.xml-file:
`<mapapps.remote.base>http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%</mapapps.remote.base>`

##### Other methods to to define the mapapps.remote.base property.
1. Goal parameters
`mvn install -Dmapapps.remote.base=http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%`

2. Build properties
Change the mapapps.remote.base in the build.properties file and run:
`mvn install -Denv=dev -Dlocal.configfile=%ABSOLUTEPATHTOPROJECTROOT%/build.properties`

