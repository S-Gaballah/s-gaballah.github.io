System.register(["@angular/core","./map.service"],function(e,t){"use strict";var n,r,o,c=this&&this.__decorate||function(e,t,n,r){var o,c=arguments.length,i=c<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;0<=a;a--)(o=e[a])&&(i=(c<3?o(i):3<c?o(t,n,i):o(t,n))||i);return 3<c&&i&&Object.defineProperty(t,n,i),i},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};t&&t.id;return{setters:[function(e){n=e},function(e){r=e}],execute:function(){o=function(){function e(e){this._mapService=e}return e.prototype.ngOnInit=function(){this._mapService.CreateMap()},e.prototype.ngOnDestroy=function(){},e=c([n.Component({moduleId:"app/map/",selector:"map-view",templateUrl:"map.component.html",styleUrls:["map.css"]}),i("design:paramtypes",[r.MapService])],e)}(),e("EsriMapComponent",o)}}});