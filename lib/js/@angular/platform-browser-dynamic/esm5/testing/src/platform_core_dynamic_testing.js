/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { COMPILER_OPTIONS, CompilerFactory, Injector, createPlatformFactory } from '@angular/core';
import { ɵTestingCompilerFactory as TestingCompilerFactory } from '@angular/core/testing';
import { ɵplatformCoreDynamic as platformCoreDynamic } from '@angular/platform-browser-dynamic';
import { COMPILER_PROVIDERS, TestingCompilerFactoryImpl } from './compiler_factory';
/**
 * Platform for dynamic tests
 *
 * @publicApi
 */
export var platformCoreDynamicTesting = createPlatformFactory(platformCoreDynamic, 'coreDynamicTesting', [
    { provide: COMPILER_OPTIONS, useValue: { providers: COMPILER_PROVIDERS }, multi: true }, {
        provide: TestingCompilerFactory,
        useClass: TestingCompilerFactoryImpl,
        deps: [Injector, CompilerFactory]
    }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fY29yZV9keW5hbWljX3Rlc3RpbmcuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMvdGVzdGluZy9zcmMvcGxhdGZvcm1fY29yZV9keW5hbWljX3Rlc3RpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQWUscUJBQXFCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUcsT0FBTyxFQUFDLHVCQUF1QixJQUFJLHNCQUFzQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDeEYsT0FBTyxFQUFDLG9CQUFvQixJQUFJLG1CQUFtQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFFOUYsT0FBTyxFQUFDLGtCQUFrQixFQUFFLDBCQUEwQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFbEY7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxJQUFNLDBCQUEwQixHQUNuQyxxQkFBcUIsQ0FBQyxtQkFBbUIsRUFBRSxvQkFBb0IsRUFBRTtJQUMvRCxFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsRUFBQyxTQUFTLEVBQUUsa0JBQWtCLEVBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLEVBQUU7UUFDbkYsT0FBTyxFQUFFLHNCQUFzQjtRQUMvQixRQUFRLEVBQUUsMEJBQTBCO1FBQ3BDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUM7S0FDbEM7Q0FDRixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q09NUElMRVJfT1BUSU9OUywgQ29tcGlsZXJGYWN0b3J5LCBJbmplY3RvciwgUGxhdGZvcm1SZWYsIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge8m1VGVzdGluZ0NvbXBpbGVyRmFjdG9yeSBhcyBUZXN0aW5nQ29tcGlsZXJGYWN0b3J5fSBmcm9tICdAYW5ndWxhci9jb3JlL3Rlc3RpbmcnO1xuaW1wb3J0IHvJtXBsYXRmb3JtQ29yZUR5bmFtaWMgYXMgcGxhdGZvcm1Db3JlRHluYW1pY30gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljJztcblxuaW1wb3J0IHtDT01QSUxFUl9QUk9WSURFUlMsIFRlc3RpbmdDb21waWxlckZhY3RvcnlJbXBsfSBmcm9tICcuL2NvbXBpbGVyX2ZhY3RvcnknO1xuXG4vKipcbiAqIFBsYXRmb3JtIGZvciBkeW5hbWljIHRlc3RzXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgcGxhdGZvcm1Db3JlRHluYW1pY1Rlc3Rpbmc6IChleHRyYVByb3ZpZGVycz86IGFueVtdKSA9PiBQbGF0Zm9ybVJlZiA9XG4gICAgY3JlYXRlUGxhdGZvcm1GYWN0b3J5KHBsYXRmb3JtQ29yZUR5bmFtaWMsICdjb3JlRHluYW1pY1Rlc3RpbmcnLCBbXG4gICAgICB7cHJvdmlkZTogQ09NUElMRVJfT1BUSU9OUywgdXNlVmFsdWU6IHtwcm92aWRlcnM6IENPTVBJTEVSX1BST1ZJREVSU30sIG11bHRpOiB0cnVlfSwge1xuICAgICAgICBwcm92aWRlOiBUZXN0aW5nQ29tcGlsZXJGYWN0b3J5LFxuICAgICAgICB1c2VDbGFzczogVGVzdGluZ0NvbXBpbGVyRmFjdG9yeUltcGwsXG4gICAgICAgIGRlcHM6IFtJbmplY3RvciwgQ29tcGlsZXJGYWN0b3J5XVxuICAgICAgfVxuICAgIF0pO1xuIl19