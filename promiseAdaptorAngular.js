define(['angular'], function() {
	'use strict';

	var $q = null, $injector = null;

	function makeCallback(originalCallback, propName) {
		return function() {
			if( originalCallback ) {
				var result, props;
				if( Array.isArray(originalCallback) || originalCallback.$inject ) {
					props = {};
					props[propName] = arguments[0];
					result = $injector.invoke(originalCallback, null, props);
				}
				else {
					result = originalCallback(arguments[0]);
				}
				return result;
			}
		}
	}

	function makeInjectablePromise(deferred) {
		return {
			then: function(cb, eb, pb) {
				return deferred.promise.then(
					makeCallback(cb, '$lazyLoadedModule'),
					makeCallback(cb, '$lazyLoadedModuleError'),
					makeCallback(cb, '$lazyLoadedModuleProgress')
				);
			}
		};
	}

	return {
		makeDeferred: function() {
			return $q.defer();
		},
		makePromise: function(deferred) {
			return makeInjectablePromise(deferred);
		},
		all: function(promises) {
			return $q.all(promises);
		},
		setQ: function(value) {
			$q = value;
		},
		setInjector: function(injector) {
			$injector = injector;
		}
	};
});
