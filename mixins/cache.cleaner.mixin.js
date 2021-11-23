"use strict";

module.exports = function(eventNames) {
	const events = {};

	eventNames.forEach(name => {
		events[`cache.clean.${name}`] = function() {
			if (this.broker.cacher) {
				this.logger.debug(`Clear local '${this.name}' cache`);
				this.broker.cacher.clean(`${this.name}.*`);
			}
		};
	});

	return {
		events
	};
};