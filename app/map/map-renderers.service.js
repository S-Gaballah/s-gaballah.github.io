System.register(["@angular/core","./map-symbols.service","../shared/settings.service","esri/renderers/SimpleRenderer","esri/renderers/ScaleDependentRenderer","esri/renderers/UniqueValueRenderer","esri/Color"],function(e,t){"use strict";var r,n,a,i,o,p,c,l,s=this&&this.__decorate||function(e,t,r,n){var a,i=arguments.length,o=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var c=e.length-1;0<=c;c--)(a=e[c])&&(o=(i<3?a(o):3<i?a(t,r,o):a(t,r))||o);return 3<i&&o&&Object.defineProperty(t,r,o),o},d=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};t&&t.id;return{setters:[function(e){r=e},function(e){n=e},function(e){a=e},function(e){i=e},function(e){o=e},function(e){p=e},function(e){c=e}],execute:function(){l=function(){function e(e,t){this._mapSymbolsService=e,this._appSettingService=t}return e.prototype.SetOSTypeSymbol=function(e,t,r,n,a,i,o){var c=this._mapSymbolsService.CreateMarkerSymbol({color:t,size:a}),l=new p.default(c,"OSType"),s=this._mapSymbolsService.CreateMarkerSymbol({color:r,size:i,style:"path",path:this._appSettingService.AndroidPath}),d=this._mapSymbolsService.CreateMarkerSymbol({color:n,size:i,style:"path",path:this._appSettingService.IphonePath});l.addValue("android",s),l.addValue("iPhone",d),l.addValue("iPad",d),this.SetScaleDependecyRenderer(e,o,this.GetStartupRenderer(),l)},e.prototype.GetStartupRenderer=function(){var e=[{type:"colorInfo",field:"Speed",stops:[{value:0,color:new c.default([255,255,255])},{value:50,color:new c.default([127,127,0])},{value:100,color:new c.default([127,127,255])},{value:120,color:new c.default([255,0,0])}]}];return new i.default(this._mapSymbolsService.CreateMarkerSymbol({size:10})).setVisualVariables(e)},e.prototype.SetScaleDependecyRenderer=function(e,t,r,n){var a=new o.default({rendererInfos:[{renderer:r,maxScale:15e4,minScale:e.getMinScale()},{renderer:n,maxScale:e.getMaxScale(),minScale:15e4}]});t.setRenderer(a)},e=s([r.Injectable({providedIn:"root"}),d("design:paramtypes",[n.MapSymbolsService,a.AppSettingService])],e)}(),e("MapRenderersService",l)}}});