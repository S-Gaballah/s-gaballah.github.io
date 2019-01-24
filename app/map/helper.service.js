System.register(["@angular/core","esri/TimeExtent","./map.service"],function(e,t){"use strict";var i,o,r,n,a=this&&this.__decorate||function(e,t,i,r){var n,a=arguments.length,s=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var c=e.length-1;0<=c;c--)(n=e[c])&&(s=(a<3?n(s):3<a?n(t,i,s):n(t,i))||s);return 3<a&&s&&Object.defineProperty(t,i,s),s},s=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};t&&t.id;return{setters:[function(e){i=e},function(e){o=e},function(e){r=e}],execute:function(){n=function(){function e(e){this._esriMapService=e}return e.prototype.DisplayBasicPoints=function(i,r){var n=this,a=this._esriMapService.CreatePoint(r.X,r.Y,4326);if(0<i.graphics.filter(function(e){return e.attributes.ID==r.ID}).length)i.graphics.filter(function(e){return e.attributes.ID==r.ID}).forEach(function(e,t){if(0==t)n._esriMapService.UpdateGraphic(e,a,r);else i.remove(e)});else{var e=this._esriMapService.CreateGraphic(a,r);i.add(e)}},e.prototype.DisplayByTimeExtent=function(t,e,i){var r=new Date,n=r.setSeconds(r.getSeconds())-1e3*i,a=r.setSeconds(r.getSeconds());e.GPSTime=a,0<t.graphics.length&&t.graphics.filter(function(e){return e.attributes.GPSTime<n}).forEach(function(e){t.remove(e)});var s=this._esriMapService.CreatePoint(e.X,e.Y,4326),c=this._esriMapService.CreateGraphic(s,e);t.add(c),this._esriMapService.Map.setTimeExtent(new o.default(new Date(n),new Date(a)))},e.prototype.GetLayerDefination=function(){return{layerDefinition:{geometryType:"esriGeometryPoint",objectIdField:"ObjectId",trackIdField:"TrackID",timeInfo:{startTimeField:"GPSTime",endTimeField:null,trackIdField:"ID",timeExtent:[1277412330365],timeReference:null,timeInterval:3,timeIntervalUnits:"esriTimeUnitsSeconds",exportOptions:{useTime:!0,timeDataCumulative:!1,timeOffset:null,timeOffsetUnits:null},hasLiveData:!0},drawingInfo:{renderer:null},fields:[{name:"ObjectId",type:"esriFieldTypeOID",alias:"ObjectId"},{name:"LoggedTime",type:"esriFieldTypeDate",alias:"AltitudeFeet"},{name:"GPSTime",type:"esriFieldTypeDate",alias:"Aircraft ID"},{name:"Y",type:"esriFieldTypeDouble",alias:"Y"},{name:"X",type:"esriFieldTypeDouble",alias:"X"},{name:"ID",type:"esriFieldTypeString"},{name:"TrackID",type:"esriFieldTypeInteger",alias:"TrackID"},{name:"OSType",type:"esriFieldTypeString",alias:"OSType"}]},featureSet:{features:[],geometryType:"esriGeometryPoint"}}},e=a([i.Injectable({providedIn:"root"}),s("design:paramtypes",[r.MapService])],e)}(),e("HelperService",n)}}});