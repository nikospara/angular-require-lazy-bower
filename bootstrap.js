define(['angular', './lazyAngularUtils', './promiseAdaptorAngular', './currentModule'], function(angular, lazyAngularUtils, promiseAdaptorAngular, currentModule) {
	'use strict';

	function bootstrap(element, mainModule) {
		var injector;
		mainModule.config(lazyAngularUtils.cacheInternals);
		mainModule.run(['$q', promiseAdaptorAngular.setQ]);
		currentModule.resolveWith(mainModule);
		lazyAngularUtils.makeLazyAngular();
		injector = angular.bootstrap(element, [mainModule.name]);
		promiseAdaptorAngular.setInjector(injector);
		bootstrap.injector = injector;
		return injector;
	}
	
	return bootstrap;
});
