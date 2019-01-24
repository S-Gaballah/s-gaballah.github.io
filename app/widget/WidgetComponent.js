System.register(["@angular/core","../map/map.service"],function(t,e){"use strict";var i,o,n,p=this&&this.__decorate||function(t,e,i,o){var n,p=arguments.length,r=p<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;0<=s;s--)(n=t[s])&&(r=(p<3?n(r):3<p?n(e,i,r):n(e,i))||r);return 3<p&&r&&Object.defineProperty(e,i,r),r},r=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};e&&e.id;return{setters:[function(t){i=t},function(t){o=t}],execute:function(){n=function(){function t(t){this.mapServie=t,this.isOpen=!1,this.title="header",this.width="20em",this.height="20em",this.backgroundColor="#fff",this.pointerX="20px",this.pointerY="50px",this.open=new i.EventEmitter,this.close=new i.EventEmitter}return t.prototype.ngOnChanges=function(){1==this.isOpen&&this.open.emit()},t.prototype.onClose=function(){this.close.emit()},p([i.Input(),r("design:type",Boolean)],t.prototype,"isOpen",void 0),p([i.Input(),r("design:type",String)],t.prototype,"title",void 0),p([i.Input(),r("design:type",String)],t.prototype,"width",void 0),p([i.Input(),r("design:type",String)],t.prototype,"height",void 0),p([i.Input(),r("design:type",String)],t.prototype,"backgroundColor",void 0),p([i.Input(),r("design:type",String)],t.prototype,"pointerX",void 0),p([i.Input(),r("design:type",String)],t.prototype,"pointerY",void 0),p([i.Output(),r("design:type",Object)],t.prototype,"open",void 0),p([i.Output(),r("design:type",Object)],t.prototype,"close",void 0),t=p([i.Component({templateUrl:"widget.component.html",selector:"dragabbale-widget",moduleId:"app/widget/",styleUrls:["widget.css"]}),r("design:paramtypes",[o.MapService])],t)}(),t("WidgetComponent",n)}}});