define(['module', './currentModule'], function(module, currentModule) {
	'use strict';
	
	/** RequireJS module loader entry point. */
	function load(name, parentRequire, onload, config) {
		var index = name.indexOf('|'), templateUrl = name, templatePath = name;

		if( index > 0 ) {
			templatePath = name.substring(0,index);
			templateUrl = name.substring(index+1) || templatePath;
		}

		parentRequire(['text!' + templatePath], function(t) {
			if( !config || !config.isBuild ) {
				currentModule.run(['$templateCache', function($templateCache) {
					$templateCache.put(templateUrl, t);
				}]);
			}
			onload({
				text: t,
				path: templateUrl
			});
		});
	}
	
	return {
		load: load
	};
});
