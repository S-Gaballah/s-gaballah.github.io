/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler/src/schema/dom_element_schema_registry", ["require", "exports", "tslib", "@angular/compiler/src/core", "@angular/compiler/src/ml_parser/tags", "@angular/compiler/src/util", "@angular/compiler/src/schema/dom_security_schema", "@angular/compiler/src/schema/element_schema_registry"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var core_1 = require("@angular/compiler/src/core");
    var tags_1 = require("@angular/compiler/src/ml_parser/tags");
    var util_1 = require("@angular/compiler/src/util");
    var dom_security_schema_1 = require("@angular/compiler/src/schema/dom_security_schema");
    var element_schema_registry_1 = require("@angular/compiler/src/schema/element_schema_registry");
    var BOOLEAN = 'boolean';
    var NUMBER = 'number';
    var STRING = 'string';
    var OBJECT = 'object';
    /**
     * This array represents the DOM schema. It encodes inheritance, properties, and events.
     *
     * ## Overview
     *
     * Each line represents one kind of element. The `element_inheritance` and properties are joined
     * using `element_inheritance|properties` syntax.
     *
     * ## Element Inheritance
     *
     * The `element_inheritance` can be further subdivided as `element1,element2,...^parentElement`.
     * Here the individual elements are separated by `,` (commas). Every element in the list
     * has identical properties.
     *
     * An `element` may inherit additional properties from `parentElement` If no `^parentElement` is
     * specified then `""` (blank) element is assumed.
     *
     * NOTE: The blank element inherits from root `[Element]` element, the super element of all
     * elements.
     *
     * NOTE an element prefix such as `:svg:` has no special meaning to the schema.
     *
     * ## Properties
     *
     * Each element has a set of properties separated by `,` (commas). Each property can be prefixed
     * by a special character designating its type:
     *
     * - (no prefix): property is a string.
     * - `*`: property represents an event.
     * - `!`: property is a boolean.
     * - `#`: property is a number.
     * - `%`: property is an object.
     *
     * ## Query
     *
     * The class creates an internal squas representation which allows to easily answer the query of
     * if a given property exist on a given element.
     *
     * NOTE: We don't yet support querying for types or events.
     * NOTE: This schema is auto extracted from `schema_extractor.ts` located in the test folder,
     *       see dom_element_schema_registry_spec.ts
     */
    // =================================================================================================
    // =================================================================================================
    // =========== S T O P   -  S T O P   -  S T O P   -  S T O P   -  S T O P   -  S T O P  ===========
    // =================================================================================================
    // =================================================================================================
    //
    //                       DO NOT EDIT THIS DOM SCHEMA WITHOUT A SECURITY REVIEW!
    //
    // Newly added properties must be security reviewed and assigned an appropriate SecurityContext in
    // dom_security_schema.ts. Reach out to mprobst & rjamet for details.
    //
    // =================================================================================================
    var SCHEMA = [
        '[Element]|textContent,%classList,className,id,innerHTML,*beforecopy,*beforecut,*beforepaste,*copy,*cut,*paste,*search,*selectstart,*webkitfullscreenchange,*webkitfullscreenerror,*wheel,outerHTML,#scrollLeft,#scrollTop,slot' +
            /* added manually to avoid breaking changes */
            ',*message,*mozfullscreenchange,*mozfullscreenerror,*mozpointerlockchange,*mozpointerlockerror,*webglcontextcreationerror,*webglcontextlost,*webglcontextrestored',
        '[HTMLElement]^[Element]|accessKey,contentEditable,dir,!draggable,!hidden,innerText,lang,*abort,*auxclick,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*cuechange,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*seeked,*seeking,*select,*show,*stalled,*submit,*suspend,*timeupdate,*toggle,*volumechange,*waiting,outerText,!spellcheck,%style,#tabIndex,title,!translate',
        'abbr,address,article,aside,b,bdi,bdo,cite,code,dd,dfn,dt,em,figcaption,figure,footer,header,i,kbd,main,mark,nav,noscript,rb,rp,rt,rtc,ruby,s,samp,section,small,strong,sub,sup,u,var,wbr^[HTMLElement]|accessKey,contentEditable,dir,!draggable,!hidden,innerText,lang,*abort,*auxclick,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*cuechange,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*seeked,*seeking,*select,*show,*stalled,*submit,*suspend,*timeupdate,*toggle,*volumechange,*waiting,outerText,!spellcheck,%style,#tabIndex,title,!translate',
        'media^[HTMLElement]|!autoplay,!controls,%controlsList,%crossOrigin,#currentTime,!defaultMuted,#defaultPlaybackRate,!disableRemotePlayback,!loop,!muted,*encrypted,*waitingforkey,#playbackRate,preload,src,%srcObject,#volume',
        ':svg:^[HTMLElement]|*abort,*auxclick,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*cuechange,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*seeked,*seeking,*select,*show,*stalled,*submit,*suspend,*timeupdate,*toggle,*volumechange,*waiting,%style,#tabIndex',
        ':svg:graphics^:svg:|',
        ':svg:animation^:svg:|*begin,*end,*repeat',
        ':svg:geometry^:svg:|',
        ':svg:componentTransferFunction^:svg:|',
        ':svg:gradient^:svg:|',
        ':svg:textContent^:svg:graphics|',
        ':svg:textPositioning^:svg:textContent|',
        'a^[HTMLElement]|charset,coords,download,hash,host,hostname,href,hreflang,name,password,pathname,ping,port,protocol,referrerPolicy,rel,rev,search,shape,target,text,type,username',
        'area^[HTMLElement]|alt,coords,download,hash,host,hostname,href,!noHref,password,pathname,ping,port,protocol,referrerPolicy,rel,search,shape,target,username',
        'audio^media|',
        'br^[HTMLElement]|clear',
        'base^[HTMLElement]|href,target',
        'body^[HTMLElement]|aLink,background,bgColor,link,*beforeunload,*blur,*error,*focus,*hashchange,*languagechange,*load,*message,*offline,*online,*pagehide,*pageshow,*popstate,*rejectionhandled,*resize,*scroll,*storage,*unhandledrejection,*unload,text,vLink',
        'button^[HTMLElement]|!autofocus,!disabled,formAction,formEnctype,formMethod,!formNoValidate,formTarget,name,type,value',
        'canvas^[HTMLElement]|#height,#width',
        'content^[HTMLElement]|select',
        'dl^[HTMLElement]|!compact',
        'datalist^[HTMLElement]|',
        'details^[HTMLElement]|!open',
        'dialog^[HTMLElement]|!open,returnValue',
        'dir^[HTMLElement]|!compact',
        'div^[HTMLElement]|align',
        'embed^[HTMLElement]|align,height,name,src,type,width',
        'fieldset^[HTMLElement]|!disabled,name',
        'font^[HTMLElement]|color,face,size',
        'form^[HTMLElement]|acceptCharset,action,autocomplete,encoding,enctype,method,name,!noValidate,target',
        'frame^[HTMLElement]|frameBorder,longDesc,marginHeight,marginWidth,name,!noResize,scrolling,src',
        'frameset^[HTMLElement]|cols,*beforeunload,*blur,*error,*focus,*hashchange,*languagechange,*load,*message,*offline,*online,*pagehide,*pageshow,*popstate,*rejectionhandled,*resize,*scroll,*storage,*unhandledrejection,*unload,rows',
        'hr^[HTMLElement]|align,color,!noShade,size,width',
        'head^[HTMLElement]|',
        'h1,h2,h3,h4,h5,h6^[HTMLElement]|align',
        'html^[HTMLElement]|version',
        'iframe^[HTMLElement]|align,!allowFullscreen,frameBorder,height,longDesc,marginHeight,marginWidth,name,referrerPolicy,%sandbox,scrolling,src,srcdoc,width',
        'img^[HTMLElement]|align,alt,border,%crossOrigin,#height,#hspace,!isMap,longDesc,lowsrc,name,referrerPolicy,sizes,src,srcset,useMap,#vspace,#width',
        'input^[HTMLElement]|accept,align,alt,autocapitalize,autocomplete,!autofocus,!checked,!defaultChecked,defaultValue,dirName,!disabled,%files,formAction,formEnctype,formMethod,!formNoValidate,formTarget,#height,!incremental,!indeterminate,max,#maxLength,min,#minLength,!multiple,name,pattern,placeholder,!readOnly,!required,selectionDirection,#selectionEnd,#selectionStart,#size,src,step,type,useMap,value,%valueAsDate,#valueAsNumber,#width',
        'li^[HTMLElement]|type,#value',
        'label^[HTMLElement]|htmlFor',
        'legend^[HTMLElement]|align',
        'link^[HTMLElement]|as,charset,%crossOrigin,!disabled,href,hreflang,integrity,media,referrerPolicy,rel,%relList,rev,%sizes,target,type',
        'map^[HTMLElement]|name',
        'marquee^[HTMLElement]|behavior,bgColor,direction,height,#hspace,#loop,#scrollAmount,#scrollDelay,!trueSpeed,#vspace,width',
        'menu^[HTMLElement]|!compact',
        'meta^[HTMLElement]|content,httpEquiv,name,scheme',
        'meter^[HTMLElement]|#high,#low,#max,#min,#optimum,#value',
        'ins,del^[HTMLElement]|cite,dateTime',
        'ol^[HTMLElement]|!compact,!reversed,#start,type',
        'object^[HTMLElement]|align,archive,border,code,codeBase,codeType,data,!declare,height,#hspace,name,standby,type,useMap,#vspace,width',
        'optgroup^[HTMLElement]|!disabled,label',
        'option^[HTMLElement]|!defaultSelected,!disabled,label,!selected,text,value',
        'output^[HTMLElement]|defaultValue,%htmlFor,name,value',
        'p^[HTMLElement]|align',
        'param^[HTMLElement]|name,type,value,valueType',
        'picture^[HTMLElement]|',
        'pre^[HTMLElement]|#width',
        'progress^[HTMLElement]|#max,#value',
        'q,blockquote,cite^[HTMLElement]|',
        'script^[HTMLElement]|!async,charset,%crossOrigin,!defer,event,htmlFor,integrity,src,text,type',
        'select^[HTMLElement]|!autofocus,!disabled,#length,!multiple,name,!required,#selectedIndex,#size,value',
        'shadow^[HTMLElement]|',
        'slot^[HTMLElement]|name',
        'source^[HTMLElement]|media,sizes,src,srcset,type',
        'span^[HTMLElement]|',
        'style^[HTMLElement]|!disabled,media,type',
        'caption^[HTMLElement]|align',
        'th,td^[HTMLElement]|abbr,align,axis,bgColor,ch,chOff,#colSpan,headers,height,!noWrap,#rowSpan,scope,vAlign,width',
        'col,colgroup^[HTMLElement]|align,ch,chOff,#span,vAlign,width',
        'table^[HTMLElement]|align,bgColor,border,%caption,cellPadding,cellSpacing,frame,rules,summary,%tFoot,%tHead,width',
        'tr^[HTMLElement]|align,bgColor,ch,chOff,vAlign',
        'tfoot,thead,tbody^[HTMLElement]|align,ch,chOff,vAlign',
        'template^[HTMLElement]|',
        'textarea^[HTMLElement]|autocapitalize,!autofocus,#cols,defaultValue,dirName,!disabled,#maxLength,#minLength,name,placeholder,!readOnly,!required,#rows,selectionDirection,#selectionEnd,#selectionStart,value,wrap',
        'title^[HTMLElement]|text',
        'track^[HTMLElement]|!default,kind,label,src,srclang',
        'ul^[HTMLElement]|!compact,type',
        'unknown^[HTMLElement]|',
        'video^media|#height,poster,#width',
        ':svg:a^:svg:graphics|',
        ':svg:animate^:svg:animation|',
        ':svg:animateMotion^:svg:animation|',
        ':svg:animateTransform^:svg:animation|',
        ':svg:circle^:svg:geometry|',
        ':svg:clipPath^:svg:graphics|',
        ':svg:defs^:svg:graphics|',
        ':svg:desc^:svg:|',
        ':svg:discard^:svg:|',
        ':svg:ellipse^:svg:geometry|',
        ':svg:feBlend^:svg:|',
        ':svg:feColorMatrix^:svg:|',
        ':svg:feComponentTransfer^:svg:|',
        ':svg:feComposite^:svg:|',
        ':svg:feConvolveMatrix^:svg:|',
        ':svg:feDiffuseLighting^:svg:|',
        ':svg:feDisplacementMap^:svg:|',
        ':svg:feDistantLight^:svg:|',
        ':svg:feDropShadow^:svg:|',
        ':svg:feFlood^:svg:|',
        ':svg:feFuncA^:svg:componentTransferFunction|',
        ':svg:feFuncB^:svg:componentTransferFunction|',
        ':svg:feFuncG^:svg:componentTransferFunction|',
        ':svg:feFuncR^:svg:componentTransferFunction|',
        ':svg:feGaussianBlur^:svg:|',
        ':svg:feImage^:svg:|',
        ':svg:feMerge^:svg:|',
        ':svg:feMergeNode^:svg:|',
        ':svg:feMorphology^:svg:|',
        ':svg:feOffset^:svg:|',
        ':svg:fePointLight^:svg:|',
        ':svg:feSpecularLighting^:svg:|',
        ':svg:feSpotLight^:svg:|',
        ':svg:feTile^:svg:|',
        ':svg:feTurbulence^:svg:|',
        ':svg:filter^:svg:|',
        ':svg:foreignObject^:svg:graphics|',
        ':svg:g^:svg:graphics|',
        ':svg:image^:svg:graphics|',
        ':svg:line^:svg:geometry|',
        ':svg:linearGradient^:svg:gradient|',
        ':svg:mpath^:svg:|',
        ':svg:marker^:svg:|',
        ':svg:mask^:svg:|',
        ':svg:metadata^:svg:|',
        ':svg:path^:svg:geometry|',
        ':svg:pattern^:svg:|',
        ':svg:polygon^:svg:geometry|',
        ':svg:polyline^:svg:geometry|',
        ':svg:radialGradient^:svg:gradient|',
        ':svg:rect^:svg:geometry|',
        ':svg:svg^:svg:graphics|#currentScale,#zoomAndPan',
        ':svg:script^:svg:|type',
        ':svg:set^:svg:animation|',
        ':svg:stop^:svg:|',
        ':svg:style^:svg:|!disabled,media,title,type',
        ':svg:switch^:svg:graphics|',
        ':svg:symbol^:svg:|',
        ':svg:tspan^:svg:textPositioning|',
        ':svg:text^:svg:textPositioning|',
        ':svg:textPath^:svg:textContent|',
        ':svg:title^:svg:|',
        ':svg:use^:svg:graphics|',
        ':svg:view^:svg:|#zoomAndPan',
        'data^[HTMLElement]|value',
        'keygen^[HTMLElement]|!autofocus,challenge,!disabled,form,keytype,name',
        'menuitem^[HTMLElement]|type,label,icon,!disabled,!checked,radiogroup,!default',
        'summary^[HTMLElement]|',
        'time^[HTMLElement]|dateTime',
        ':svg:cursor^:svg:|',
    ];
    var _ATTR_TO_PROP = {
        'class': 'className',
        'for': 'htmlFor',
        'formaction': 'formAction',
        'innerHtml': 'innerHTML',
        'readonly': 'readOnly',
        'tabindex': 'tabIndex',
    };
    var DomElementSchemaRegistry = /** @class */ (function (_super) {
        tslib_1.__extends(DomElementSchemaRegistry, _super);
        function DomElementSchemaRegistry() {
            var _this = _super.call(this) || this;
            _this._schema = {};
            SCHEMA.forEach(function (encodedType) {
                var type = {};
                var _a = tslib_1.__read(encodedType.split('|'), 2), strType = _a[0], strProperties = _a[1];
                var properties = strProperties.split(',');
                var _b = tslib_1.__read(strType.split('^'), 2), typeNames = _b[0], superName = _b[1];
                typeNames.split(',').forEach(function (tag) { return _this._schema[tag.toLowerCase()] = type; });
                var superType = superName && _this._schema[superName.toLowerCase()];
                if (superType) {
                    Object.keys(superType).forEach(function (prop) { type[prop] = superType[prop]; });
                }
                properties.forEach(function (property) {
                    if (property.length > 0) {
                        switch (property[0]) {
                            case '*':
                                // We don't yet support events.
                                // If ever allowing to bind to events, GO THROUGH A SECURITY REVIEW, allowing events
                                // will
                                // almost certainly introduce bad XSS vulnerabilities.
                                // type[property.substring(1)] = EVENT;
                                break;
                            case '!':
                                type[property.substring(1)] = BOOLEAN;
                                break;
                            case '#':
                                type[property.substring(1)] = NUMBER;
                                break;
                            case '%':
                                type[property.substring(1)] = OBJECT;
                                break;
                            default:
                                type[property] = STRING;
                        }
                    }
                });
            });
            return _this;
        }
        DomElementSchemaRegistry.prototype.hasProperty = function (tagName, propName, schemaMetas) {
            if (schemaMetas.some(function (schema) { return schema.name === core_1.NO_ERRORS_SCHEMA.name; })) {
                return true;
            }
            if (tagName.indexOf('-') > -1) {
                if (tags_1.isNgContainer(tagName) || tags_1.isNgContent(tagName)) {
                    return false;
                }
                if (schemaMetas.some(function (schema) { return schema.name === core_1.CUSTOM_ELEMENTS_SCHEMA.name; })) {
                    // Can't tell now as we don't know which properties a custom element will get
                    // once it is instantiated
                    return true;
                }
            }
            var elementProperties = this._schema[tagName.toLowerCase()] || this._schema['unknown'];
            return !!elementProperties[propName];
        };
        DomElementSchemaRegistry.prototype.hasElement = function (tagName, schemaMetas) {
            if (schemaMetas.some(function (schema) { return schema.name === core_1.NO_ERRORS_SCHEMA.name; })) {
                return true;
            }
            if (tagName.indexOf('-') > -1) {
                if (tags_1.isNgContainer(tagName) || tags_1.isNgContent(tagName)) {
                    return true;
                }
                if (schemaMetas.some(function (schema) { return schema.name === core_1.CUSTOM_ELEMENTS_SCHEMA.name; })) {
                    // Allow any custom elements
                    return true;
                }
            }
            return !!this._schema[tagName.toLowerCase()];
        };
        /**
         * securityContext returns the security context for the given property on the given DOM tag.
         *
         * Tag and property name are statically known and cannot change at runtime, i.e. it is not
         * possible to bind a value into a changing attribute or tag name.
         *
         * The filtering is white list based. All attributes in the schema above are assumed to have the
         * 'NONE' security context, i.e. that they are safe inert string values. Only specific well known
         * attack vectors are assigned their appropriate context.
         */
        DomElementSchemaRegistry.prototype.securityContext = function (tagName, propName, isAttribute) {
            if (isAttribute) {
                // NB: For security purposes, use the mapped property name, not the attribute name.
                propName = this.getMappedPropName(propName);
            }
            // Make sure comparisons are case insensitive, so that case differences between attribute and
            // property names do not have a security impact.
            tagName = tagName.toLowerCase();
            propName = propName.toLowerCase();
            var ctx = dom_security_schema_1.SECURITY_SCHEMA()[tagName + '|' + propName];
            if (ctx) {
                return ctx;
            }
            ctx = dom_security_schema_1.SECURITY_SCHEMA()['*|' + propName];
            return ctx ? ctx : core_1.SecurityContext.NONE;
        };
        DomElementSchemaRegistry.prototype.getMappedPropName = function (propName) { return _ATTR_TO_PROP[propName] || propName; };
        DomElementSchemaRegistry.prototype.getDefaultComponentElementName = function () { return 'ng-component'; };
        DomElementSchemaRegistry.prototype.validateProperty = function (name) {
            if (name.toLowerCase().startsWith('on')) {
                var msg = "Binding to event property '" + name + "' is disallowed for security reasons, " +
                    ("please use (" + name.slice(2) + ")=...") +
                    ("\nIf '" + name + "' is a directive input, make sure the directive is imported by the") +
                    " current module.";
                return { error: true, msg: msg };
            }
            else {
                return { error: false };
            }
        };
        DomElementSchemaRegistry.prototype.validateAttribute = function (name) {
            if (name.toLowerCase().startsWith('on')) {
                var msg = "Binding to event attribute '" + name + "' is disallowed for security reasons, " +
                    ("please use (" + name.slice(2) + ")=...");
                return { error: true, msg: msg };
            }
            else {
                return { error: false };
            }
        };
        DomElementSchemaRegistry.prototype.allKnownElementNames = function () { return Object.keys(this._schema); };
        DomElementSchemaRegistry.prototype.normalizeAnimationStyleProperty = function (propName) {
            return util_1.dashCaseToCamelCase(propName);
        };
        DomElementSchemaRegistry.prototype.normalizeAnimationStyleValue = function (camelCaseProp, userProvidedProp, val) {
            var unit = '';
            var strVal = val.toString().trim();
            var errorMsg = null;
            if (_isPixelDimensionStyle(camelCaseProp) && val !== 0 && val !== '0') {
                if (typeof val === 'number') {
                    unit = 'px';
                }
                else {
                    var valAndSuffixMatch = val.match(/^[+-]?[\d\.]+([a-z]*)$/);
                    if (valAndSuffixMatch && valAndSuffixMatch[1].length == 0) {
                        errorMsg = "Please provide a CSS unit value for " + userProvidedProp + ":" + val;
                    }
                }
            }
            return { error: errorMsg, value: strVal + unit };
        };
        return DomElementSchemaRegistry;
    }(element_schema_registry_1.ElementSchemaRegistry));
    exports.DomElementSchemaRegistry = DomElementSchemaRegistry;
    function _isPixelDimensionStyle(prop) {
        switch (prop) {
            case 'width':
            case 'height':
            case 'minWidth':
            case 'minHeight':
            case 'maxWidth':
            case 'maxHeight':
            case 'left':
            case 'top':
            case 'bottom':
            case 'right':
            case 'fontSize':
            case 'outlineWidth':
            case 'outlineOffset':
            case 'paddingTop':
            case 'paddingLeft':
            case 'paddingBottom':
            case 'paddingRight':
            case 'marginTop':
            case 'marginLeft':
            case 'marginBottom':
            case 'marginRight':
            case 'borderRadius':
            case 'borderWidth':
            case 'borderTopWidth':
            case 'borderLeftWidth':
            case 'borderRightWidth':
            case 'borderBottomWidth':
            case 'textIndent':
                return true;
            default:
                return false;
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX2VsZW1lbnRfc2NoZW1hX3JlZ2lzdHJ5LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLyIsInNvdXJjZXMiOlsicGFja2FnZXMvY29tcGlsZXIvc3JjL3NjaGVtYS9kb21fZWxlbWVudF9zY2hlbWFfcmVnaXN0cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7O0lBRUgsbURBQWtHO0lBRWxHLDZEQUE2RDtJQUM3RCxtREFBNEM7SUFFNUMsd0ZBQXNEO0lBQ3RELGdHQUFnRTtJQUVoRSxJQUFNLE9BQU8sR0FBRyxTQUFTLENBQUM7SUFDMUIsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDO0lBQ3hCLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQztJQUN4QixJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUM7SUFFeEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUNHO0lBRUgsb0dBQW9HO0lBQ3BHLG9HQUFvRztJQUNwRyxvR0FBb0c7SUFDcEcsb0dBQW9HO0lBQ3BHLG9HQUFvRztJQUNwRyxFQUFFO0lBQ0YsK0VBQStFO0lBQy9FLEVBQUU7SUFDRixrR0FBa0c7SUFDbEcscUVBQXFFO0lBQ3JFLEVBQUU7SUFDRixvR0FBb0c7SUFFcEcsSUFBTSxNQUFNLEdBQWE7UUFDdkIsZ09BQWdPO1lBQzVOLDhDQUE4QztZQUM5QyxrS0FBa0s7UUFDdEsscTFCQUFxMUI7UUFDcjFCLG9nQ0FBb2dDO1FBQ3BnQywrTkFBK047UUFDL04sMHVCQUEwdUI7UUFDMXVCLHNCQUFzQjtRQUN0QiwwQ0FBMEM7UUFDMUMsc0JBQXNCO1FBQ3RCLHVDQUF1QztRQUN2QyxzQkFBc0I7UUFDdEIsaUNBQWlDO1FBQ2pDLHdDQUF3QztRQUN4QyxrTEFBa0w7UUFDbEwsNkpBQTZKO1FBQzdKLGNBQWM7UUFDZCx3QkFBd0I7UUFDeEIsZ0NBQWdDO1FBQ2hDLGdRQUFnUTtRQUNoUSx3SEFBd0g7UUFDeEgscUNBQXFDO1FB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QixLQUFLLFlBQVk7Z0JBQ2YsT0FBTyxJQUFJLENBQUM7WUFFZDtnQkFDRSxPQUFPLEtBQUssQ0FBQztTQUNoQjtJQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q1VTVE9NX0VMRU1FTlRTX1NDSEVNQSwgTk9fRVJST1JTX1NDSEVNQSwgU2NoZW1hTWV0YWRhdGEsIFNlY3VyaXR5Q29udGV4dH0gZnJvbSAnLi4vY29yZSc7XG5cbmltcG9ydCB7aXNOZ0NvbnRhaW5lciwgaXNOZ0NvbnRlbnR9IGZyb20gJy4uL21sX3BhcnNlci90YWdzJztcbmltcG9ydCB7ZGFzaENhc2VUb0NhbWVsQ2FzZX0gZnJvbSAnLi4vdXRpbCc7XG5cbmltcG9ydCB7U0VDVVJJVFlfU0NIRU1BfSBmcm9tICcuL2RvbV9zZWN1cml0eV9zY2hlbWEnO1xuaW1wb3J0IHtFbGVtZW50U2NoZW1hUmVnaXN0cnl9IGZyb20gJy4vZWxlbWVudF9zY2hlbWFfcmVnaXN0cnknO1xuXG5jb25zdCBCT09MRUFOID0gJ2Jvb2xlYW4nO1xuY29uc3QgTlVNQkVSID0gJ251bWJlcic7XG5jb25zdCBTVFJJTkcgPSAnc3RyaW5nJztcbmNvbnN0IE9CSkVDVCA9ICdvYmplY3QnO1xuXG4vKipcbiAqIFRoaXMgYXJyYXkgcmVwcmVzZW50cyB0aGUgRE9NIHNjaGVtYS4gSXQgZW5jb2RlcyBpbmhlcml0YW5jZSwgcHJvcGVydGllcywgYW5kIGV2ZW50cy5cbiAqXG4gKiAjIyBPdmVydmlld1xuICpcbiAqIEVhY2ggbGluZSByZXByZXNlbnRzIG9uZSBraW5kIG9mIGVsZW1lbnQuIFRoZSBgZWxlbWVudF9pbmhlcml0YW5jZWAgYW5kIHByb3BlcnRpZXMgYXJlIGpvaW5lZFxuICogdXNpbmcgYGVsZW1lbnRfaW5oZXJpdGFuY2V8cHJvcGVydGllc2Agc3ludGF4LlxuICpcbiAqICMjIEVsZW1lbnQgSW5oZXJpdGFuY2VcbiAqXG4gKiBUaGUgYGVsZW1lbnRfaW5oZXJpdGFuY2VgIGNhbiBiZSBmdXJ0aGVyIHN1YmRpdmlkZWQgYXMgYGVsZW1lbnQxLGVsZW1lbnQyLC4uLl5wYXJlbnRFbGVtZW50YC5cbiAqIEhlcmUgdGhlIGluZGl2aWR1YWwgZWxlbWVudHMgYXJlIHNlcGFyYXRlZCBieSBgLGAgKGNvbW1hcykuIEV2ZXJ5IGVsZW1lbnQgaW4gdGhlIGxpc3RcbiAqIGhhcyBpZGVudGljYWwgcHJvcGVydGllcy5cbiAqXG4gKiBBbiBgZWxlbWVudGAgbWF5IGluaGVyaXQgYWRkaXRpb25hbCBwcm9wZXJ0aWVzIGZyb20gYHBhcmVudEVsZW1lbnRgIElmIG5vIGBecGFyZW50RWxlbWVudGAgaXNcbiAqIHNwZWNpZmllZCB0aGVuIGBcIlwiYCAoYmxhbmspIGVsZW1lbnQgaXMgYXNzdW1lZC5cbiAqXG4gKiBOT1RFOiBUaGUgYmxhbmsgZWxlbWVudCBpbmhlcml0cyBmcm9tIHJvb3QgYFtFbGVtZW50XWAgZWxlbWVudCwgdGhlIHN1cGVyIGVsZW1lbnQgb2YgYWxsXG4gKiBlbGVtZW50cy5cbiAqXG4gKiBOT1RFIGFuIGVsZW1lbnQgcHJlZml4IHN1Y2ggYXMgYDpzdmc6YCBoYXMgbm8gc3BlY2lhbCBtZWFuaW5nIHRvIHRoZSBzY2hlbWEuXG4gKlxuICogIyMgUHJvcGVydGllc1xuICpcbiAqIEVhY2ggZWxlbWVudCBoYXMgYSBzZXQgb2YgcHJvcGVydGllcyBzZXBhcmF0ZWQgYnkgYCxgIChjb21tYXMpLiBFYWNoIHByb3BlcnR5IGNhbiBiZSBwcmVmaXhlZFxuICogYnkgYSBzcGVjaWFsIGNoYXJhY3RlciBkZXNpZ25hdGluZyBpdHMgdHlwZTpcbiAqXG4gKiAtIChubyBwcmVmaXgpOiBwcm9wZXJ0eSBpcyBhIHN0cmluZy5cbiAqIC0gYCpgOiBwcm9wZXJ0eSByZXByZXNlbnRzIGFuIGV2ZW50LlxuICogLSBgIWA6IHByb3BlcnR5IGlzIGEgYm9vbGVhbi5cbiAqIC0gYCNgOiBwcm9wZXJ0eSBpcyBhIG51bWJlci5cbiAqIC0gYCVgOiBwcm9wZXJ0eSBpcyBhbiBvYmplY3QuXG4gKlxuICogIyMgUXVlcnlcbiAqXG4gKiBUaGUgY2xhc3MgY3JlYXRlcyBhbiBpbnRlcm5hbCBzcXVhcyByZXByZXNlbnRhdGlvbiB3aGljaCBhbGxvd3MgdG8gZWFzaWx5IGFuc3dlciB0aGUgcXVlcnkgb2ZcbiAqIGlmIGEgZ2l2ZW4gcHJvcGVydHkgZXhpc3Qgb24gYSBnaXZlbiBlbGVtZW50LlxuICpcbiAqIE5PVEU6IFdlIGRvbid0IHlldCBzdXBwb3J0IHF1ZXJ5aW5nIGZvciB0eXBlcyBvciBldmVudHMuXG4gKiBOT1RFOiBUaGlzIHNjaGVtYSBpcyBhdXRvIGV4dHJhY3RlZCBmcm9tIGBzY2hlbWFfZXh0cmFjdG9yLnRzYCBsb2NhdGVkIGluIHRoZSB0ZXN0IGZvbGRlcixcbiAqICAgICAgIHNlZSBkb21fZWxlbWVudF9zY2hlbWFfcmVnaXN0cnlfc3BlYy50c1xuICovXG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vID09PT09PT09PT09IFMgVCBPIFAgICAtICBTIFQgTyBQICAgLSAgUyBUIE8gUCAgIC0gIFMgVCBPIFAgICAtICBTIFQgTyBQICAgLSAgUyBUIE8gUCAgPT09PT09PT09PT1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgICAgRE8gTk9UIEVESVQgVEhJUyBET00gU0NIRU1BIFdJVEhPVVQgQSBTRUNVUklUWSBSRVZJRVchXG4vL1xuLy8gTmV3bHkgYWRkZWQgcHJvcGVydGllcyBtdXN0IGJlIHNlY3VyaXR5IHJldmlld2VkIGFuZCBhc3NpZ25lZCBhbiBhcHByb3ByaWF0ZSBTZWN1cml0eUNvbnRleHQgaW5cbi8vIGRvbV9zZWN1cml0eV9zY2hlbWEudHMuIFJlYWNoIG91dCB0byBtcHJvYnN0ICYgcmphbWV0IGZvciBkZXRhaWxzLlxuLy9cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgU0NIRU1BOiBzdHJpbmdbXSA9IFtcbiAgJ1tFbGVtZW50XXx0ZXh0Q29udGVudCwlY2xhc3NMaXN0LGNsYXNzTmFtZSxpZCxpbm5lckhUTUwsKmJlZm9yZWNvcHksKmJlZm9yZWN1dCwqYmVmb3JlcGFzdGUsKmNvcHksKmN1dCwqcGFzdGUsKnNlYXJjaCwqc2VsZWN0c3RhcnQsKndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UsKndlYmtpdGZ1bGxzY3JlZW5lcnJvciwqd2hlZWwsb3V0ZXJIVE1MLCNzY3JvbGxMZWZ0LCNzY3JvbGxUb3Asc2xvdCcgK1xuICAgICAgLyogYWRkZWQgbWFudWFsbHkgdG8gYXZvaWQgYnJlYWtpbmcgY2hhbmdlcyAqL1xuICAgICAgJywqbWVzc2FnZSwqbW96ZnVsbHNjcmVlbmNoYW5nZSwqbW96ZnVsbHNjcmVlbmVycm9yLCptb3pwb2ludGVybG9ja2NoYW5nZSwqbW96cG9pbnRlcmxvY2tlcnJvciwqd2ViZ2xjb250ZXh0Y3JlYXRpb25lcnJvciwqd2ViZ2xjb250ZXh0bG9zdCwqd2ViZ2xjb250ZXh0cmVzdG9yZWQnLFxuICAnW0hUTUxFbGVtZW50XV5bRWxlbWVudF18YWNjZXNzS2V5LGNvbnRlbnRFZGl0YWJsZSxkaXIsIWRyYWdnYWJsZSwhaGlkZGVuLGlubmVyVGV4dCxsYW5nLCphYm9ydCwqYXV4Y2xpY2ssKmJsdXIsKmNhbmNlbCwqY2FucGxheSwqY2FucGxheXRocm91Z2gsKmNoYW5nZSwqY2xpY2ssKmNsb3NlLCpjb250ZXh0bWVudSwqY3VlY2hhbmdlLCpkYmxjbGljaywqZHJhZywqZHJhZ2VuZCwqZHJhZ2VudGVyLCpkcmFnbGVhdmUsKmRyYWdvdmVyLCpkcmFnc3RhcnQsKmRyb3AsKmR1cmF0aW9uY2hhbmdlLCplbXB0aWVkLCplbmRlZCwqZXJyb3IsKmZvY3VzLCpnb3Rwb2ludGVyY2FwdHVyZSwqaW5wdXQsKmludmFsaWQsKmtleWRvd24sKmtleXByZXNzLCprZXl1cCwqbG9hZCwqbG9hZGVkZGF0YSwqbG9hZGVkbWV0YWRhdGEsKmxvYWRzdGFydCwqbG9zdHBvaW50ZXJjYXB0dXJlLCptb3VzZWRvd24sKm1vdXNlZW50ZXIsKm1vdXNlbGVhdmUsKm1vdXNlbW92ZSwqbW91c2VvdXQsKm1vdXNlb3ZlciwqbW91c2V1cCwqbW91c2V3aGVlbCwqcGF1c2UsKnBsYXksKnBsYXlpbmcsKnBvaW50ZXJjYW5jZWwsKnBvaW50ZXJkb3duLCpwb2ludGVyZW50ZXIsKnBvaW50ZXJsZWF2ZSwqcG9pbnRlcm1vdmUsKnBvaW50ZXJvdXQsKnBvaW50ZXJvdmVyLCpwb2ludGVydXAsKnByb2dyZXNzLCpyYXRlY2hhbmdlLCpyZXNldCwqcmVzaXplLCpzY3JvbGwsKnNlZWtlZCwqc2Vla2luZywqc2VsZWN0LCpzaG93LCpzdGFsbGVkLCpzdWJtaXQsKnN1c3BlbmQsKnRpbWV1cGRhdGUsKnRvZ2dsZSwqdm9sdW1lY2hhbmdlLCp3YWl0aW5nLG91dGVyVGV4dCwhc3BlbGxjaGVjaywlc3R5bGUsI3RhYkluZGV4LHRpdGxlLCF0cmFuc2xhdGUnLFxuICAnYWJicixhZGRyZXNzLGFydGljbGUsYXNpZGUsYixiZGksYmRvLGNpdGUsY29kZSxkZCxkZm4sZHQsZW0sZmlnY2FwdGlvbixmaWd1cmUsZm9vdGVyLGhlYWRlcixpLGtiZCxtYWluLG1hcmssbmF2LG5vc2NyaXB0LHJiLHJwLHJ0LHJ0YyxydWJ5LHMsc2FtcCxzZWN0aW9uLHNtYWxsLHN0cm9uZyxzdWIsc3VwLHUsdmFyLHdicl5bSFRNTEVsZW1lbnRdfGFjY2Vzc0tleSxjb250ZW50RWRpdGFibGUsZGlyLCFkcmFnZ2FibGUsIWhpZGRlbixpbm5lclRleHQsbGFuZywqYWJvcnQsKmF1eGNsaWNrLCpibHVyLCpjYW5jZWwsKmNhbnBsYXksKmNhbnBsYXl0aHJvdWdoLCpjaGFuZ2UsKmNsaWNrLCpjbG9zZSwqY29udGV4dG1lbnUsKmN1ZWNoYW5nZSwqZGJsY2xpY2ssKmRyYWcsKmRyYWdlbmQsKmRyYWdlbnRlciwqZHJhZ2xlYXZlLCpkcmFnb3ZlciwqZHJhZ3N0YXJ0LCpkcm9wLCpkdXJhdGlvbmNoYW5nZSwqZW1wdGllZCwqZW5kZWQsKmVycm9yLCpmb2N1cywqZ290cG9pbnRlcmNhcHR1cmUsKmlucHV0LCppbnZhbGlkLCprZXlkb3duLCprZXlwcmVzcywqa2V5dXAsKmxvYWQsKmxvYWRlZGRhdGEsKmxvYWRlZG1ldGFkYXRhLCpsb2Fkc3RhcnQsKmxvc3Rwb2ludGVyY2FwdHVyZSwqbW91c2Vkb3duLCptb3VzZWVudGVyLCptb3VzZWxlYXZlLCptb3VzZW1vdmUsKm1vdXNlb3V0LCptb3VzZW92ZXIsKm1vdXNldXAsKm1vdXNld2hlZWwsKnBhdXNlLCpwbGF5LCpwbGF5aW5nLCpwb2ludGVyY2FuY2VsLCpwb2ludGVyZG93biwqcG9pbnRlcmVudGVyLCpwb2ludGVybGVhdmUsKnBvaW50ZXJtb3ZlLCpwb2ludGVyb3V0LCpwb2ludGVyb3ZlciwqcG9pbnRlcnVwLCpwcm9ncmVzcywqcmF0ZWNoYW5nZSwqcmVzZXQsKnJlc2l6ZSwqc2Nyb2xsLCpzZWVrZWQsKnNlZWtpbmcsKnNlbGVjdCwqc2hvdywqc3RhbGxlZCwqc3VibWl0LCpzdXNwZW5kLCp0aW1ldXBkYXRlLCp0b2dnbGUsKnZvbHVtZWNoYW5nZSwqd2FpdGluZyxvdXRlclRleHQsIXNwZWxsY2hlY2ssJXN0eWxlLCN0YWJJbmRleCx0aXRsZSwhdHJhbnNsYXRlJyxcbiAgJ21lZGlhXltIVE1MRWxlbWVudF18IWF1dG9wbGF5LCFjb250cm9scywlY29udHJvbHNMaXN0LCVjcm9zc09yaWdpbiwjY3VycmVudFRpbWUsIWRlZmF1bHRNdXRlZCwjZGVmYXVsdFBsYXliYWNrUmF0ZSwhZGlzYWJsZVJlbW90ZVBsYXliYWNrLCFsb29wLCFtdXRlZCwqZW5jcnlwdGVkLCp3YWl0aW5nZm9ya2V5LCNwbGF5YmFja1JhdGUscHJlbG9hZCxzcmMsJXNyY09iamVjdCwjdm9sdW1lJyxcbiAgJzpzdmc6XltIVE1MRWxlbWVudF18KmFib3J0LCphdXhjbGljaywqYmx1ciwqY2FuY2VsLCpjYW5wbGF5LCpjYW5wbGF5dGhyb3VnaCwqY2hhbmdlLCpjbGljaywqY2xvc2UsKmNvbnRleHRtZW51LCpjdWVjaGFuZ2UsKmRibGNsaWNrLCpkcmFnLCpkcmFnZW5kLCpkcmFnZW50ZXIsKmRyYWdsZWF2ZSwqZHJhZ292ZXIsKmRyYWdzdGFydCwqZHJvcCwqZHVyYXRpb25jaGFuZ2UsKmVtcHRpZWQsKmVuZGVkLCplcnJvciwqZm9jdXMsKmdvdHBvaW50ZXJjYXB0dXJlLCppbnB1dCwqaW52YWxpZCwqa2V5ZG93biwqa2V5cHJlc3MsKmtleXVwLCpsb2FkLCpsb2FkZWRkYXRhLCpsb2FkZWRtZXRhZGF0YSwqbG9hZHN0YXJ0LCpsb3N0cG9pbnRlcmNhcHR1cmUsKm1vdXNlZG93biwqbW91c2VlbnRlciwqbW91c2VsZWF2ZSwqbW91c2Vtb3ZlLCptb3VzZW91dCwqbW91c2VvdmVyLCptb3VzZXVwLCptb3VzZXdoZWVsLCpwYXVzZSwqcGxheSwqcGxheWluZywqcG9pbnRlcmNhbmNlbCwqcG9pbnRlcmRvd24sKnBvaW50ZXJlbnRlciwqcG9pbnRlcmxlYXZlLCpwb2ludGVybW92ZSwqcG9pbnRlcm91dCwqcG9pbnRlcm92ZXIsKnBvaW50ZXJ1cCwqcHJvZ3Jlc3MsKnJhdGVjaGFuZ2UsKnJlc2V0LCpyZXNpemUsKnNjcm9sbCwqc2Vla2VkLCpzZWVraW5nLCpzZWxlY3QsKnNob3csKnN0YWxsZWQsKnN1Ym1pdCwqc3VzcGVuZCwqdGltZXVwZGF0ZSwqdG9nZ2xlLCp2b2x1bWVjaGFuZ2UsKndhaXRpbmcsJXN0eWxlLCN0YWJJbmRleCcsXG4gICc6c3ZnOmdyYXBoaWNzXjpzdmc6fCcsXG4gICc6c3ZnOmFuaW1hdGlvbl46c3ZnOnwqYmVnaW4sKmVuZCwqcmVwZWF0JyxcbiAgJzpzdmc6Z2VvbWV0cnleOnN2Zzp8JyxcbiAgJzpzdmc6Y29tcG9uZW50VHJhbnNmZXJGdW5jdGlvbl46c3ZnOnwnLFxuICAnOnN2ZzpncmFkaWVudF46c3ZnOnwnLFxuICAnOnN2Zzp0ZXh0Q29udGVudF46c3ZnOmdyYXBoaWNzfCcsXG4gICc6c3ZnOnRleHRQb3NpdGlvbmluZ146c3ZnOnRleHRDb250ZW50fCcsXG4gICdhXltIVE1MRWxlbWVudF18Y2hhcnNldCxjb29yZHMsZG93bmxvYWQsaGFzaCxob3N0LGhvc3RuYW1lLGhyZWYsaHJlZmxhbmcsbmFtZSxwYXNzd29yZCxwYXRobmFtZSxwaW5nLHBvcnQscHJvdG9jb2wscmVmZXJyZXJQb2xpY3kscmVsLHJldixzZWFyY2gsc2hhcGUsdGFyZ2V0LHRleHQsdHlwZSx1c2VybmFtZScsXG4gICdhcmVhXltIVE1MRWxlbWVudF18YWx0LGNvb3Jkcyxkb3dubG9hZCxoYXNoLGhvc3QsaG9zdG5hbWUsaHJlZiwhbm9IcmVmLHBhc3N3b3JkLHBhdGhuYW1lLHBpbmcscG9ydCxwcm90b2NvbCxyZWZlcnJlclBvbGljeSxyZWwsc2VhcmNoLHNoYXBlLHRhcmdldCx1c2VybmFtZScsXG4gICdhdWRpb15tZWRpYXwnLFxuICAnYnJeW0hUTUxFbGVtZW50XXxjbGVhcicsXG4gICdiYXNlXltIVE1MRWxlbWVudF18aHJlZix0YXJnZXQnLFxuICAnYm9keV5bSFRNTEVsZW1lbnRdfGFMaW5rLGJhY2tncm91bmQsYmdDb2xvcixsaW5rLCpiZWZvcmV1bmxvYWQsKmJsdXIsKmVycm9yLCpmb2N1cywqaGFzaGNoYW5nZSwqbGFuZ3VhZ2VjaGFuZ2UsKmxvYWQsKm1lc3NhZ2UsKm9mZmxpbmUsKm9ubGluZSwqcGFnZWhpZGUsKnBhZ2VzaG93LCpwb3BzdGF0ZSwqcmVqZWN0aW9uaGFuZGxlZCwqcmVzaXplLCpzY3JvbGwsKnN0b3JhZ2UsKnVuaGFuZGxlZHJlamVjdGlvbiwqdW5sb2FkLHRleHQsdkxpbmsnLFxuICAnYnV0dG9uXltIVE1MRWxlbWVudF18IWF1dG9mb2N1cywhZGlzYWJsZWQsZm9ybUFjdGlvbixmb3JtRW5jdHlwZSxmb3JtTWV0aG9kLCFmb3JtTm9WYWxpZGF0ZSxmb3JtVGFyZ2V0LG5hbWUsdHlwZSx2YWx1ZScsXG4gICdjYW52YXNeW0hUTUxFbGVtZW50XXwjaGVpZ2h0LCN3aWR0aCcsXG4gICdjb250ZW50XltIVE1MRWxlbWVudF18c2VsZWN0JyxcbiAgJ2RsXltIVE1MRWxlbWVudF18IWNvbXBhY3QnLFxuICAnZGF0YWxpc3ReW0hUTUxFbGVtZW50XXwnLFxuICAnZGV0YWlsc15bSFRNTEVsZW1lbnRdfCFvcGVuJyxcbiAgJ2RpYWxvZ15bSFRNTEVsZW1lbnRdfCFvcGVuLHJldHVyblZhbHVlJyxcbiAgJ2Rpcl5bSFRNTEVsZW1lbnRdfCFjb21wYWN0JyxcbiAgJ2Rpdl5bSFRNTEVsZW1lbnRdfGFsaWduJyxcbiAgJ2VtYmVkXltIVE1MRWxlbWVudF18YWxpZ24saGVpZ2h0LG5hbWUsc3JjLHR5cGUsd2lkdGgnLFxuICAnZmllbGRzZXReW0hUTUxFbGVtZW50XXwhZGlzYWJsZWQsbmFtZScsXG4gICdmb250XltIVE1MRWxlbWVudF18Y29sb3IsZmFjZSxzaXplJyxcbiAgJ2Zvcm1eW0hUTUxFbGVtZW50XXxhY2NlcHRDaGFyc2V0LGFjdGlvbixhdXRvY29tcGxldGUsZW5jb2RpbmcsZW5jdHlwZSxtZXRob2QsbmFtZSwhbm9WYWxpZGF0ZSx0YXJnZXQnLFxuICAnZnJhbWVeW0hUTUxFbGVtZW50XXxmcmFtZUJvcmRlcixsb25nRGVzYyxtYXJnaW5IZWlnaHQsbWFyZ2luV2lkdGgsbmFtZSwhbm9SZXNpemUsc2Nyb2xsaW5nLHNyYycsXG4gICdmcmFtZXNldF5bSFRNTEVsZW1lbnRdfGNvbHMsKmJlZm9yZXVubG9hZCwqYmx1ciwqZXJyb3IsKmZvY3VzLCpoYXNoY2hhbmdlLCpsYW5ndWFnZWNoYW5nZSwqbG9hZCwqbWVzc2FnZSwqb2ZmbGluZSwqb25saW5lLCpwYWdlaGlkZSwqcGFnZXNob3csKnBvcHN0YXRlLCpyZWplY3Rpb25oYW5kbGVkLCpyZXNpemUsKnNjcm9sbCwqc3RvcmFnZSwqdW5oYW5kbGVkcmVqZWN0aW9uLCp1bmxvYWQscm93cycsXG4gICdocl5bSFRNTEVsZW1lbnRdfGFsaWduLGNvbG9yLCFub1NoYWRlLHNpemUsd2lkdGgnLFxuICAnaGVhZF5bSFRNTEVsZW1lbnRdfCcsXG4gICdoMSxoMixoMyxoNCxoNSxoNl5bSFRNTEVsZW1lbnRdfGFsaWduJyxcbiAgJ2h0bWxeW0hUTUxFbGVtZW50XXx2ZXJzaW9uJyxcbiAgJ2lmcmFtZV5bSFRNTEVsZW1lbnRdfGFsaWduLCFhbGxvd0Z1bGxzY3JlZW4sZnJhbWVCb3JkZXIsaGVpZ2h0LGxvbmdEZXNjLG1hcmdpbkhlaWdodCxtYXJnaW5XaWR0aCxuYW1lLHJlZmVycmVyUG9saWN5LCVzYW5kYm94LHNjcm9sbGluZyxzcmMsc3JjZG9jLHdpZHRoJyxcbiAgJ2ltZ15bSFRNTEVsZW1lbnRdfGFsaWduLGFsdCxib3JkZXIsJWNyb3NzT3JpZ2luLCNoZWlnaHQsI2hzcGFjZSwhaXNNYXAsbG9uZ0Rlc2MsbG93c3JjLG5hbWUscmVmZXJyZXJQb2xpY3ksc2l6ZXMsc3JjLHNyY3NldCx1c2VNYXAsI3ZzcGFjZSwjd2lkdGgnLFxuICAnaW5wdXReW0hUTUxFbGVtZW50XXxhY2NlcHQsYWxpZ24sYWx0LGF1dG9jYXBpdGFsaXplLGF1dG9jb21wbGV0ZSwhYXV0b2ZvY3VzLCFjaGVja2VkLCFkZWZhdWx0Q2hlY2tlZCxkZWZhdWx0VmFsdWUsZGlyTmFtZSwhZGlzYWJsZWQsJWZpbGVzLGZvcm1BY3Rpb24sZm9ybUVuY3R5cGUsZm9ybU1ldGhvZCwhZm9ybU5vVmFsaWRhdGUsZm9ybVRhcmdldCwjaGVpZ2h0LCFpbmNyZW1lbnRhbCwhaW5kZXRlcm1pbmF0ZSxtYXgsI21heExlbmd0aCxtaW4sI21pbkxlbmd0aCwhbXVsdGlwbGUsbmFtZSxwYXR0ZXJuLHBsYWNlaG9sZGVyLCFyZWFkT25seSwhcmVxdWlyZWQsc2VsZWN0aW9uRGlyZWN0aW9uLCNzZWxlY3Rpb25FbmQsI3NlbGVjdGlvblN0YXJ0LCNzaXplLHNyYyxzdGVwLHR5cGUsdXNlTWFwLHZhbHVlLCV2YWx1ZUFzRGF0ZSwjdmFsdWVBc051bWJlciwjd2lkdGgnLFxuICAnbGleW0hUTUxFbGVtZW50XXx0eXBlLCN2YWx1ZScsXG4gICdsYWJlbF5bSFRNTEVsZW1lbnRdfGh0bWxGb3InLFxuICAnbGVnZW5kXltIVE1MRWxlbWVudF18YWxpZ24nLFxuICAnbGlua15bSFRNTEVsZW1lbnRdfGFzLGNoYXJzZXQsJWNyb3NzT3JpZ2luLCFkaXNhYmxlZCxocmVmLGhyZWZsYW5nLGludGVncml0eSxtZWRpYSxyZWZlcnJlclBvbGljeSxyZWwsJXJlbExpc3QscmV2LCVzaXplcyx0YXJnZXQsdHlwZScsXG4gICdtYXBeW0hUTUxFbGVtZW50XXxuYW1lJyxcbiAgJ21hcnF1ZWVeW0hUTUxFbGVtZW50XXxiZWhhdmlvcixiZ0NvbG9yLGRpcmVjdGlvbixoZWlnaHQsI2hzcGFjZSwjbG9vcCwjc2Nyb2xsQW1vdW50LCNzY3JvbGxEZWxheSwhdHJ1ZVNwZWVkLCN2c3BhY2Usd2lkdGgnLFxuICAnbWVudV5bSFRNTEVsZW1lbnRdfCFjb21wYWN0JyxcbiAgJ21ldGFeW0hUTUxFbGVtZW50XXxjb250ZW50LGh0dHBFcXVpdixuYW1lLHNjaGVtZScsXG4gICdtZXRlcl5bSFRNTEVsZW1lbnRdfCNoaWdoLCNsb3csI21heCwjbWluLCNvcHRpbXVtLCN2YWx1ZScsXG4gICdpbnMsZGVsXltIVE1MRWxlbWVudF18Y2l0ZSxkYXRlVGltZScsXG4gICdvbF5bSFRNTEVsZW1lbnRdfCFjb21wYWN0LCFyZXZlcnNlZCwjc3RhcnQsdHlwZScsXG4gICdvYmplY3ReW0hUTUxFbGVtZW50XXxhbGlnbixhcmNoaXZlLGJvcmRlcixjb2RlLGNvZGVCYXNlLGNvZGVUeXBlLGRhdGEsIWRlY2xhcmUsaGVpZ2h0LCNoc3BhY2UsbmFtZSxzdGFuZGJ5LHR5cGUsdXNlTWFwLCN2c3BhY2Usd2lkdGgnLFxuICAnb3B0Z3JvdXBeW0hUTUxFbGVtZW50XXwhZGlzYWJsZWQsbGFiZWwnLFxuICAnb3B0aW9uXltIVE1MRWxlbWVudF18IWRlZmF1bHRTZWxlY3RlZCwhZGlzYWJsZWQsbGFiZWwsIXNlbGVjdGVkLHRleHQsdmFsdWUnLFxuICAnb3V0cHV0XltIVE1MRWxlbWVudF18ZGVmYXVsdFZhbHVlLCVodG1sRm9yLG5hbWUsdmFsdWUnLFxuICAncF5bSFRNTEVsZW1lbnRdfGFsaWduJyxcbiAgJ3BhcmFtXltIVE1MRWxlbWVudF18bmFtZSx0eXBlLHZhbHVlLHZhbHVlVHlwZScsXG4gICdwaWN0dXJlXltIVE1MRWxlbWVudF18JyxcbiAgJ3ByZV5bSFRNTEVsZW1lbnRdfCN3aWR0aCcsXG4gICdwcm9ncmVzc15bSFRNTEVsZW1lbnRdfCNtYXgsI3ZhbHVlJyxcbiAgJ3EsYmxvY2txdW90ZSxjaXRlXltIVE1MRWxlbWVudF18JyxcbiAgJ3NjcmlwdF5bSFRNTEVsZW1lbnRdfCFhc3luYyxjaGFyc2V0LCVjcm9zc09yaWdpbiwhZGVmZXIsZXZlbnQsaHRtbEZvcixpbnRlZ3JpdHksc3JjLHRleHQsdHlwZScsXG4gICdzZWxlY3ReW0hUTUxFbGVtZW50XXwhYXV0b2ZvY3VzLCFkaXNhYmxlZCwjbGVuZ3RoLCFtdWx0aXBsZSxuYW1lLCFyZXF1aXJlZCwjc2VsZWN0ZWRJbmRleCwjc2l6ZSx2YWx1ZScsXG4gICdzaGFkb3deW0hUTUxFbGVtZW50XXwnLFxuICAnc2xvdF5bSFRNTEVsZW1lbnRdfG5hbWUnLFxuICAnc291cmNlXltIVE1MRWxlbWVudF18bWVkaWEsc2l6ZXMsc3JjLHNyY3NldCx0eXBlJyxcbiAgJ3NwYW5eW0hUTUxFbGVtZW50XXwnLFxuICAnc3R5bGVeW0hUTUxFbGVtZW50XXwhZGlzYWJsZWQsbWVkaWEsdHlwZScsXG4gICdjYXB0aW9uXltIVE1MRWxlbWVudF18YWxpZ24nLFxuICAndGgsdGReW0hUTUxFbGVtZW50XXxhYmJyLGFsaWduLGF4aXMsYmdDb2xvcixjaCxjaE9mZiwjY29sU3BhbixoZWFkZXJzLGhlaWdodCwhbm9XcmFwLCNyb3dTcGFuLHNjb3BlLHZBbGlnbix3aWR0aCcsXG4gICdjb2wsY29sZ3JvdXBeW0hUTUxFbGVtZW50XXxhbGlnbixjaCxjaE9mZiwjc3Bhbix2QWxpZ24sd2lkdGgnLFxuICAndGFibGVeW0hUTUxFbGVtZW50XXxhbGlnbixiZ0NvbG9yLGJvcmRlciwlY2FwdGlvbixjZWxsUGFkZGluZyxjZWxsU3BhY2luZyxmcmFtZSxydWxlcyxzdW1tYXJ5LCV0Rm9vdCwldEhlYWQsd2lkdGgnLFxuICAndHJeW0hUTUxFbGVtZW50XXxhbGlnbixiZ0NvbG9yLGNoLGNoT2ZmLHZBbGlnbicsXG4gICd0Zm9vdCx0aGVhZCx0Ym9keV5bSFRNTEVsZW1lbnRdfGFsaWduLGNoLGNoT2ZmLHZBbGlnbicsXG4gICd0ZW1wbGF0ZV5bSFRNTEVsZW1lbnRdfCcsXG4gICd0ZXh0YXJlYV5bSFRNTEVsZW1lbnRdfGF1dG9jYXBpdGFsaXplLCFhdXRvZm9jdXMsI2NvbHMsZGVmYXVsdFZhbHVlLGRpck5hbWUsIWRpc2FibGVkLCNtYXhMZW5ndGgsI21pbkxlbmd0aCxuYW1lLHBsYWNlaG9sZGVyLCFyZWFkT25seSwhcmVxdWlyZWQsI3Jvd3Msc2VsZWN0aW9uRGlyZWN0aW9uLCNzZWxlY3Rpb25FbmQsI3NlbGVjdGlvblN0YXJ0LHZhbHVlLHdyYXAnLFxuICAndGl0bGVeW0hUTUxFbGVtZW50XXx0ZXh0JyxcbiAgJ3RyYWNrXltIVE1MRWxlbWVudF18IWRlZmF1bHQsa2luZCxsYWJlbCxzcmMsc3JjbGFuZycsXG4gICd1bF5bSFRNTEVsZW1lbnRdfCFjb21wYWN0LHR5cGUnLFxuICAndW5rbm93bl5bSFRNTEVsZW1lbnRdfCcsXG4gICd2aWRlb15tZWRpYXwjaGVpZ2h0LHBvc3Rlciwjd2lkdGgnLFxuICAnOnN2ZzphXjpzdmc6Z3JhcGhpY3N8JyxcbiAgJzpzdmc6YW5pbWF0ZV46c3ZnOmFuaW1hdGlvbnwnLFxuICAnOnN2ZzphbmltYXRlTW90aW9uXjpzdmc6YW5pbWF0aW9ufCcsXG4gICc6c3ZnOmFuaW1hdGVUcmFuc2Zvcm1eOnN2ZzphbmltYXRpb258JyxcbiAgJzpzdmc6Y2lyY2xlXjpzdmc6Z2VvbWV0cnl8JyxcbiAgJzpzdmc6Y2xpcFBhdGheOnN2ZzpncmFwaGljc3wnLFxuICAnOnN2ZzpkZWZzXjpzdmc6Z3JhcGhpY3N8JyxcbiAgJzpzdmc6ZGVzY146c3ZnOnwnLFxuICAnOnN2ZzpkaXNjYXJkXjpzdmc6fCcsXG4gICc6c3ZnOmVsbGlwc2VeOnN2ZzpnZW9tZXRyeXwnLFxuICAnOnN2ZzpmZUJsZW5kXjpzdmc6fCcsXG4gICc6c3ZnOmZlQ29sb3JNYXRyaXheOnN2Zzp8JyxcbiAgJzpzdmc6ZmVDb21wb25lbnRUcmFuc2Zlcl46c3ZnOnwnLFxuICAnOnN2ZzpmZUNvbXBvc2l0ZV46c3ZnOnwnLFxuICAnOnN2ZzpmZUNvbnZvbHZlTWF0cml4Xjpzdmc6fCcsXG4gICc6c3ZnOmZlRGlmZnVzZUxpZ2h0aW5nXjpzdmc6fCcsXG4gICc6c3ZnOmZlRGlzcGxhY2VtZW50TWFwXjpzdmc6fCcsXG4gICc6c3ZnOmZlRGlzdGFudExpZ2h0Xjpzdmc6fCcsXG4gICc6c3ZnOmZlRHJvcFNoYWRvd146c3ZnOnwnLFxuICAnOnN2ZzpmZUZsb29kXjpzdmc6fCcsXG4gICc6c3ZnOmZlRnVuY0FeOnN2Zzpjb21wb25lbnRUcmFuc2ZlckZ1bmN0aW9ufCcsXG4gICc6c3ZnOmZlRnVuY0JeOnN2Zzpjb21wb25lbnRUcmFuc2ZlckZ1bmN0aW9ufCcsXG4gICc6c3ZnOmZlRnVuY0deOnN2Zzpjb21wb25lbnRUcmFuc2ZlckZ1bmN0aW9ufCcsXG4gICc6c3ZnOmZlRnVuY1JeOnN2Zzpjb21wb25lbnRUcmFuc2ZlckZ1bmN0aW9ufCcsXG4gICc6c3ZnOmZlR2F1c3NpYW5CbHVyXjpzdmc6fCcsXG4gICc6c3ZnOmZlSW1hZ2VeOnN2Zzp8JyxcbiAgJzpzdmc6ZmVNZXJnZV46c3ZnOnwnLFxuICAnOnN2ZzpmZU1lcmdlTm9kZV46c3ZnOnwnLFxuICAnOnN2ZzpmZU1vcnBob2xvZ3leOnN2Zzp8JyxcbiAgJzpzdmc6ZmVPZmZzZXReOnN2Zzp8JyxcbiAgJzpzdmc6ZmVQb2ludExpZ2h0Xjpzdmc6fCcsXG4gICc6c3ZnOmZlU3BlY3VsYXJMaWdodGluZ146c3ZnOnwnLFxuICAnOnN2ZzpmZVNwb3RMaWdodF46c3ZnOnwnLFxuICAnOnN2ZzpmZVRpbGVeOnN2Zzp8JyxcbiAgJzpzdmc6ZmVUdXJidWxlbmNlXjpzdmc6fCcsXG4gICc6c3ZnOmZpbHRlcl46c3ZnOnwnLFxuICAnOnN2Zzpmb3JlaWduT2JqZWN0Xjpzdmc6Z3JhcGhpY3N8JyxcbiAgJzpzdmc6Z146c3ZnOmdyYXBoaWNzfCcsXG4gICc6c3ZnOmltYWdlXjpzdmc6Z3JhcGhpY3N8JyxcbiAgJzpzdmc6bGluZV46c3ZnOmdlb21ldHJ5fCcsXG4gICc6c3ZnOmxpbmVhckdyYWRpZW50Xjpzdmc6Z3JhZGllbnR8JyxcbiAgJzpzdmc6bXBhdGheOnN2Zzp8JyxcbiAgJzpzdmc6bWFya2VyXjpzdmc6fCcsXG4gICc6c3ZnOm1hc2teOnN2Zzp8JyxcbiAgJzpzdmc6bWV0YWRhdGFeOnN2Zzp8JyxcbiAgJzpzdmc6cGF0aF46c3ZnOmdlb21ldHJ5fCcsXG4gICc6c3ZnOnBhdHRlcm5eOnN2Zzp8JyxcbiAgJzpzdmc6cG9seWdvbl46c3ZnOmdlb21ldHJ5fCcsXG4gICc6c3ZnOnBvbHlsaW5lXjpzdmc6Z2VvbWV0cnl8JyxcbiAgJzpzdmc6cmFkaWFsR3JhZGllbnReOnN2ZzpncmFkaWVudHwnLFxuICAnOnN2ZzpyZWN0Xjpzdmc6Z2VvbWV0cnl8JyxcbiAgJzpzdmc6c3ZnXjpzdmc6Z3JhcGhpY3N8I2N1cnJlbnRTY2FsZSwjem9vbUFuZFBhbicsXG4gICc6c3ZnOnNjcmlwdF46c3ZnOnx0eXBlJyxcbiAgJzpzdmc6c2V0Xjpzdmc6YW5pbWF0aW9ufCcsXG4gICc6c3ZnOnN0b3BeOnN2Zzp8JyxcbiAgJzpzdmc6c3R5bGVeOnN2Zzp8IWRpc2FibGVkLG1lZGlhLHRpdGxlLHR5cGUnLFxuICAnOnN2Zzpzd2l0Y2heOnN2ZzpncmFwaGljc3wnLFxuICAnOnN2ZzpzeW1ib2xeOnN2Zzp8JyxcbiAgJzpzdmc6dHNwYW5eOnN2Zzp0ZXh0UG9zaXRpb25pbmd8JyxcbiAgJzpzdmc6dGV4dF46c3ZnOnRleHRQb3NpdGlvbmluZ3wnLFxuICAnOnN2Zzp0ZXh0UGF0aF46c3ZnOnRleHRDb250ZW50fCcsXG4gICc6c3ZnOnRpdGxlXjpzdmc6fCcsXG4gICc6c3ZnOnVzZV46c3ZnOmdyYXBoaWNzfCcsXG4gICc6c3ZnOnZpZXdeOnN2Zzp8I3pvb21BbmRQYW4nLFxuICAnZGF0YV5bSFRNTEVsZW1lbnRdfHZhbHVlJyxcbiAgJ2tleWdlbl5bSFRNTEVsZW1lbnRdfCFhdXRvZm9jdXMsY2hhbGxlbmdlLCFkaXNhYmxlZCxmb3JtLGtleXR5cGUsbmFtZScsXG4gICdtZW51aXRlbV5bSFRNTEVsZW1lbnRdfHR5cGUsbGFiZWwsaWNvbiwhZGlzYWJsZWQsIWNoZWNrZWQscmFkaW9ncm91cCwhZGVmYXVsdCcsXG4gICdzdW1tYXJ5XltIVE1MRWxlbWVudF18JyxcbiAgJ3RpbWVeW0hUTUxFbGVtZW50XXxkYXRlVGltZScsXG4gICc6c3ZnOmN1cnNvcl46c3ZnOnwnLFxuXTtcblxuY29uc3QgX0FUVFJfVE9fUFJPUDoge1tuYW1lOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAnY2xhc3MnOiAnY2xhc3NOYW1lJyxcbiAgJ2Zvcic6ICdodG1sRm9yJyxcbiAgJ2Zvcm1hY3Rpb24nOiAnZm9ybUFjdGlvbicsXG4gICdpbm5lckh0bWwnOiAnaW5uZXJIVE1MJyxcbiAgJ3JlYWRvbmx5JzogJ3JlYWRPbmx5JyxcbiAgJ3RhYmluZGV4JzogJ3RhYkluZGV4Jyxcbn07XG5cbmV4cG9ydCBjbGFzcyBEb21FbGVtZW50U2NoZW1hUmVnaXN0cnkgZXh0ZW5kcyBFbGVtZW50U2NoZW1hUmVnaXN0cnkge1xuICBwcml2YXRlIF9zY2hlbWE6IHtbZWxlbWVudDogc3RyaW5nXToge1twcm9wZXJ0eTogc3RyaW5nXTogc3RyaW5nfX0gPSB7fTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIFNDSEVNQS5mb3JFYWNoKGVuY29kZWRUeXBlID0+IHtcbiAgICAgIGNvbnN0IHR5cGU6IHtbcHJvcGVydHk6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgICAgIGNvbnN0IFtzdHJUeXBlLCBzdHJQcm9wZXJ0aWVzXSA9IGVuY29kZWRUeXBlLnNwbGl0KCd8Jyk7XG4gICAgICBjb25zdCBwcm9wZXJ0aWVzID0gc3RyUHJvcGVydGllcy5zcGxpdCgnLCcpO1xuICAgICAgY29uc3QgW3R5cGVOYW1lcywgc3VwZXJOYW1lXSA9IHN0clR5cGUuc3BsaXQoJ14nKTtcbiAgICAgIHR5cGVOYW1lcy5zcGxpdCgnLCcpLmZvckVhY2godGFnID0+IHRoaXMuX3NjaGVtYVt0YWcudG9Mb3dlckNhc2UoKV0gPSB0eXBlKTtcbiAgICAgIGNvbnN0IHN1cGVyVHlwZSA9IHN1cGVyTmFtZSAmJiB0aGlzLl9zY2hlbWFbc3VwZXJOYW1lLnRvTG93ZXJDYXNlKCldO1xuICAgICAgaWYgKHN1cGVyVHlwZSkge1xuICAgICAgICBPYmplY3Qua2V5cyhzdXBlclR5cGUpLmZvckVhY2goKHByb3A6IHN0cmluZykgPT4geyB0eXBlW3Byb3BdID0gc3VwZXJUeXBlW3Byb3BdOyB9KTtcbiAgICAgIH1cbiAgICAgIHByb3BlcnRpZXMuZm9yRWFjaCgocHJvcGVydHk6IHN0cmluZykgPT4ge1xuICAgICAgICBpZiAocHJvcGVydHkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHN3aXRjaCAocHJvcGVydHlbMF0pIHtcbiAgICAgICAgICAgIGNhc2UgJyonOlxuICAgICAgICAgICAgICAvLyBXZSBkb24ndCB5ZXQgc3VwcG9ydCBldmVudHMuXG4gICAgICAgICAgICAgIC8vIElmIGV2ZXIgYWxsb3dpbmcgdG8gYmluZCB0byBldmVudHMsIEdPIFRIUk9VR0ggQSBTRUNVUklUWSBSRVZJRVcsIGFsbG93aW5nIGV2ZW50c1xuICAgICAgICAgICAgICAvLyB3aWxsXG4gICAgICAgICAgICAgIC8vIGFsbW9zdCBjZXJ0YWlubHkgaW50cm9kdWNlIGJhZCBYU1MgdnVsbmVyYWJpbGl0aWVzLlxuICAgICAgICAgICAgICAvLyB0eXBlW3Byb3BlcnR5LnN1YnN0cmluZygxKV0gPSBFVkVOVDtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICchJzpcbiAgICAgICAgICAgICAgdHlwZVtwcm9wZXJ0eS5zdWJzdHJpbmcoMSldID0gQk9PTEVBTjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcjJzpcbiAgICAgICAgICAgICAgdHlwZVtwcm9wZXJ0eS5zdWJzdHJpbmcoMSldID0gTlVNQkVSO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJyUnOlxuICAgICAgICAgICAgICB0eXBlW3Byb3BlcnR5LnN1YnN0cmluZygxKV0gPSBPQkpFQ1Q7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgdHlwZVtwcm9wZXJ0eV0gPSBTVFJJTkc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGhhc1Byb3BlcnR5KHRhZ05hbWU6IHN0cmluZywgcHJvcE5hbWU6IHN0cmluZywgc2NoZW1hTWV0YXM6IFNjaGVtYU1ldGFkYXRhW10pOiBib29sZWFuIHtcbiAgICBpZiAoc2NoZW1hTWV0YXMuc29tZSgoc2NoZW1hKSA9PiBzY2hlbWEubmFtZSA9PT0gTk9fRVJST1JTX1NDSEVNQS5uYW1lKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRhZ05hbWUuaW5kZXhPZignLScpID4gLTEpIHtcbiAgICAgIGlmIChpc05nQ29udGFpbmVyKHRhZ05hbWUpIHx8IGlzTmdDb250ZW50KHRhZ05hbWUpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNjaGVtYU1ldGFzLnNvbWUoKHNjaGVtYSkgPT4gc2NoZW1hLm5hbWUgPT09IENVU1RPTV9FTEVNRU5UU19TQ0hFTUEubmFtZSkpIHtcbiAgICAgICAgLy8gQ2FuJ3QgdGVsbCBub3cgYXMgd2UgZG9uJ3Qga25vdyB3aGljaCBwcm9wZXJ0aWVzIGEgY3VzdG9tIGVsZW1lbnQgd2lsbCBnZXRcbiAgICAgICAgLy8gb25jZSBpdCBpcyBpbnN0YW50aWF0ZWRcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZWxlbWVudFByb3BlcnRpZXMgPSB0aGlzLl9zY2hlbWFbdGFnTmFtZS50b0xvd2VyQ2FzZSgpXSB8fCB0aGlzLl9zY2hlbWFbJ3Vua25vd24nXTtcbiAgICByZXR1cm4gISFlbGVtZW50UHJvcGVydGllc1twcm9wTmFtZV07XG4gIH1cblxuICBoYXNFbGVtZW50KHRhZ05hbWU6IHN0cmluZywgc2NoZW1hTWV0YXM6IFNjaGVtYU1ldGFkYXRhW10pOiBib29sZWFuIHtcbiAgICBpZiAoc2NoZW1hTWV0YXMuc29tZSgoc2NoZW1hKSA9PiBzY2hlbWEubmFtZSA9PT0gTk9fRVJST1JTX1NDSEVNQS5uYW1lKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRhZ05hbWUuaW5kZXhPZignLScpID4gLTEpIHtcbiAgICAgIGlmIChpc05nQ29udGFpbmVyKHRhZ05hbWUpIHx8IGlzTmdDb250ZW50KHRhZ05hbWUpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2NoZW1hTWV0YXMuc29tZSgoc2NoZW1hKSA9PiBzY2hlbWEubmFtZSA9PT0gQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQS5uYW1lKSkge1xuICAgICAgICAvLyBBbGxvdyBhbnkgY3VzdG9tIGVsZW1lbnRzXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAhIXRoaXMuX3NjaGVtYVt0YWdOYW1lLnRvTG93ZXJDYXNlKCldO1xuICB9XG5cbiAgLyoqXG4gICAqIHNlY3VyaXR5Q29udGV4dCByZXR1cm5zIHRoZSBzZWN1cml0eSBjb250ZXh0IGZvciB0aGUgZ2l2ZW4gcHJvcGVydHkgb24gdGhlIGdpdmVuIERPTSB0YWcuXG4gICAqXG4gICAqIFRhZyBhbmQgcHJvcGVydHkgbmFtZSBhcmUgc3RhdGljYWxseSBrbm93biBhbmQgY2Fubm90IGNoYW5nZSBhdCBydW50aW1lLCBpLmUuIGl0IGlzIG5vdFxuICAgKiBwb3NzaWJsZSB0byBiaW5kIGEgdmFsdWUgaW50byBhIGNoYW5naW5nIGF0dHJpYnV0ZSBvciB0YWcgbmFtZS5cbiAgICpcbiAgICogVGhlIGZpbHRlcmluZyBpcyB3aGl0ZSBsaXN0IGJhc2VkLiBBbGwgYXR0cmlidXRlcyBpbiB0aGUgc2NoZW1hIGFib3ZlIGFyZSBhc3N1bWVkIHRvIGhhdmUgdGhlXG4gICAqICdOT05FJyBzZWN1cml0eSBjb250ZXh0LCBpLmUuIHRoYXQgdGhleSBhcmUgc2FmZSBpbmVydCBzdHJpbmcgdmFsdWVzLiBPbmx5IHNwZWNpZmljIHdlbGwga25vd25cbiAgICogYXR0YWNrIHZlY3RvcnMgYXJlIGFzc2lnbmVkIHRoZWlyIGFwcHJvcHJpYXRlIGNvbnRleHQuXG4gICAqL1xuICBzZWN1cml0eUNvbnRleHQodGFnTmFtZTogc3RyaW5nLCBwcm9wTmFtZTogc3RyaW5nLCBpc0F0dHJpYnV0ZTogYm9vbGVhbik6IFNlY3VyaXR5Q29udGV4dCB7XG4gICAgaWYgKGlzQXR0cmlidXRlKSB7XG4gICAgICAvLyBOQjogRm9yIHNlY3VyaXR5IHB1cnBvc2VzLCB1c2UgdGhlIG1hcHBlZCBwcm9wZXJ0eSBuYW1lLCBub3QgdGhlIGF0dHJpYnV0ZSBuYW1lLlxuICAgICAgcHJvcE5hbWUgPSB0aGlzLmdldE1hcHBlZFByb3BOYW1lKHByb3BOYW1lKTtcbiAgICB9XG5cbiAgICAvLyBNYWtlIHN1cmUgY29tcGFyaXNvbnMgYXJlIGNhc2UgaW5zZW5zaXRpdmUsIHNvIHRoYXQgY2FzZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIGF0dHJpYnV0ZSBhbmRcbiAgICAvLyBwcm9wZXJ0eSBuYW1lcyBkbyBub3QgaGF2ZSBhIHNlY3VyaXR5IGltcGFjdC5cbiAgICB0YWdOYW1lID0gdGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIHByb3BOYW1lID0gcHJvcE5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICBsZXQgY3R4ID0gU0VDVVJJVFlfU0NIRU1BKClbdGFnTmFtZSArICd8JyArIHByb3BOYW1lXTtcbiAgICBpZiAoY3R4KSB7XG4gICAgICByZXR1cm4gY3R4O1xuICAgIH1cbiAgICBjdHggPSBTRUNVUklUWV9TQ0hFTUEoKVsnKnwnICsgcHJvcE5hbWVdO1xuICAgIHJldHVybiBjdHggPyBjdHggOiBTZWN1cml0eUNvbnRleHQuTk9ORTtcbiAgfVxuXG4gIGdldE1hcHBlZFByb3BOYW1lKHByb3BOYW1lOiBzdHJpbmcpOiBzdHJpbmcgeyByZXR1cm4gX0FUVFJfVE9fUFJPUFtwcm9wTmFtZV0gfHwgcHJvcE5hbWU7IH1cblxuICBnZXREZWZhdWx0Q29tcG9uZW50RWxlbWVudE5hbWUoKTogc3RyaW5nIHsgcmV0dXJuICduZy1jb21wb25lbnQnOyB9XG5cbiAgdmFsaWRhdGVQcm9wZXJ0eShuYW1lOiBzdHJpbmcpOiB7ZXJyb3I6IGJvb2xlYW4sIG1zZz86IHN0cmluZ30ge1xuICAgIGlmIChuYW1lLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCgnb24nKSkge1xuICAgICAgY29uc3QgbXNnID0gYEJpbmRpbmcgdG8gZXZlbnQgcHJvcGVydHkgJyR7bmFtZX0nIGlzIGRpc2FsbG93ZWQgZm9yIHNlY3VyaXR5IHJlYXNvbnMsIGAgK1xuICAgICAgICAgIGBwbGVhc2UgdXNlICgke25hbWUuc2xpY2UoMil9KT0uLi5gICtcbiAgICAgICAgICBgXFxuSWYgJyR7bmFtZX0nIGlzIGEgZGlyZWN0aXZlIGlucHV0LCBtYWtlIHN1cmUgdGhlIGRpcmVjdGl2ZSBpcyBpbXBvcnRlZCBieSB0aGVgICtcbiAgICAgICAgICBgIGN1cnJlbnQgbW9kdWxlLmA7XG4gICAgICByZXR1cm4ge2Vycm9yOiB0cnVlLCBtc2c6IG1zZ307XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7ZXJyb3I6IGZhbHNlfTtcbiAgICB9XG4gIH1cblxuICB2YWxpZGF0ZUF0dHJpYnV0ZShuYW1lOiBzdHJpbmcpOiB7ZXJyb3I6IGJvb2xlYW4sIG1zZz86IHN0cmluZ30ge1xuICAgIGlmIChuYW1lLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCgnb24nKSkge1xuICAgICAgY29uc3QgbXNnID0gYEJpbmRpbmcgdG8gZXZlbnQgYXR0cmlidXRlICcke25hbWV9JyBpcyBkaXNhbGxvd2VkIGZvciBzZWN1cml0eSByZWFzb25zLCBgICtcbiAgICAgICAgICBgcGxlYXNlIHVzZSAoJHtuYW1lLnNsaWNlKDIpfSk9Li4uYDtcbiAgICAgIHJldHVybiB7ZXJyb3I6IHRydWUsIG1zZzogbXNnfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtlcnJvcjogZmFsc2V9O1xuICAgIH1cbiAgfVxuXG4gIGFsbEtub3duRWxlbWVudE5hbWVzKCk6IHN0cmluZ1tdIHsgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX3NjaGVtYSk7IH1cblxuICBub3JtYWxpemVBbmltYXRpb25TdHlsZVByb3BlcnR5KHByb3BOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBkYXNoQ2FzZVRvQ2FtZWxDYXNlKHByb3BOYW1lKTtcbiAgfVxuXG4gIG5vcm1hbGl6ZUFuaW1hdGlvblN0eWxlVmFsdWUoY2FtZWxDYXNlUHJvcDogc3RyaW5nLCB1c2VyUHJvdmlkZWRQcm9wOiBzdHJpbmcsIHZhbDogc3RyaW5nfG51bWJlcik6XG4gICAgICB7ZXJyb3I6IHN0cmluZywgdmFsdWU6IHN0cmluZ30ge1xuICAgIGxldCB1bml0OiBzdHJpbmcgPSAnJztcbiAgICBjb25zdCBzdHJWYWwgPSB2YWwudG9TdHJpbmcoKS50cmltKCk7XG4gICAgbGV0IGVycm9yTXNnOiBzdHJpbmcgPSBudWxsICE7XG5cbiAgICBpZiAoX2lzUGl4ZWxEaW1lbnNpb25TdHlsZShjYW1lbENhc2VQcm9wKSAmJiB2YWwgIT09IDAgJiYgdmFsICE9PSAnMCcpIHtcbiAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgICAgICB1bml0ID0gJ3B4JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHZhbEFuZFN1ZmZpeE1hdGNoID0gdmFsLm1hdGNoKC9eWystXT9bXFxkXFwuXSsoW2Etel0qKSQvKTtcbiAgICAgICAgaWYgKHZhbEFuZFN1ZmZpeE1hdGNoICYmIHZhbEFuZFN1ZmZpeE1hdGNoWzFdLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgZXJyb3JNc2cgPSBgUGxlYXNlIHByb3ZpZGUgYSBDU1MgdW5pdCB2YWx1ZSBmb3IgJHt1c2VyUHJvdmlkZWRQcm9wfToke3ZhbH1gO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7ZXJyb3I6IGVycm9yTXNnLCB2YWx1ZTogc3RyVmFsICsgdW5pdH07XG4gIH1cbn1cblxuZnVuY3Rpb24gX2lzUGl4ZWxEaW1lbnNpb25TdHlsZShwcm9wOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgc3dpdGNoIChwcm9wKSB7XG4gICAgY2FzZSAnd2lkdGgnOlxuICAgIGNhc2UgJ2hlaWdodCc6XG4gICAgY2FzZSAnbWluV2lkdGgnOlxuICAgIGNhc2UgJ21pbkhlaWdodCc6XG4gICAgY2FzZSAnbWF4V2lkdGgnOlxuICAgIGNhc2UgJ21heEhlaWdodCc6XG4gICAgY2FzZSAnbGVmdCc6XG4gICAgY2FzZSAndG9wJzpcbiAgICBjYXNlICdib3R0b20nOlxuICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICBjYXNlICdmb250U2l6ZSc6XG4gICAgY2FzZSAnb3V0bGluZVdpZHRoJzpcbiAgICBjYXNlICdvdXRsaW5lT2Zmc2V0JzpcbiAgICBjYXNlICdwYWRkaW5nVG9wJzpcbiAgICBjYXNlICdwYWRkaW5nTGVmdCc6XG4gICAgY2FzZSAncGFkZGluZ0JvdHRvbSc6XG4gICAgY2FzZSAncGFkZGluZ1JpZ2h0JzpcbiAgICBjYXNlICdtYXJnaW5Ub3AnOlxuICAgIGNhc2UgJ21hcmdpbkxlZnQnOlxuICAgIGNhc2UgJ21hcmdpbkJvdHRvbSc6XG4gICAgY2FzZSAnbWFyZ2luUmlnaHQnOlxuICAgIGNhc2UgJ2JvcmRlclJhZGl1cyc6XG4gICAgY2FzZSAnYm9yZGVyV2lkdGgnOlxuICAgIGNhc2UgJ2JvcmRlclRvcFdpZHRoJzpcbiAgICBjYXNlICdib3JkZXJMZWZ0V2lkdGgnOlxuICAgIGNhc2UgJ2JvcmRlclJpZ2h0V2lkdGgnOlxuICAgIGNhc2UgJ2JvcmRlckJvdHRvbVdpZHRoJzpcbiAgICBjYXNlICd0ZXh0SW5kZW50JzpcbiAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19