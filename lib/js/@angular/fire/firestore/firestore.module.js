var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { AngularFirestore, EnablePersistenceToken, PersistenceSettingsToken } from './firestore';
import 'firebase/firestore';
var AngularFirestoreModule = (function () {
    function AngularFirestoreModule() {
    }
    AngularFirestoreModule_1 = AngularFirestoreModule;
    AngularFirestoreModule.enablePersistence = function (persistenceSettings) {
        return {
            ngModule: AngularFirestoreModule_1,
            providers: [
                { provide: EnablePersistenceToken, useValue: true },
                { provide: PersistenceSettingsToken, useValue: persistenceSettings },
            ]
        };
    };
    var AngularFirestoreModule_1;
    AngularFirestoreModule = AngularFirestoreModule_1 = __decorate([
        NgModule({
            providers: [AngularFirestore]
        })
    ], AngularFirestoreModule);
    return AngularFirestoreModule;
}());
export { AngularFirestoreModule };
//# sourceMappingURL=firestore.module.js.map