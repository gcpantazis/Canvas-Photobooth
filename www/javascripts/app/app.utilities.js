/*
 * app.utilities.js
 *
 */

window.log = function() {
/*@cc_on
  return;
  @*/
	if (window.isDebugMode) {
		log.history = log.history || []; // store logs to an array for reference
		log.history.push(arguments);
		if (this.console) {
			console.log(Array.prototype.slice.call(arguments));
		}
		if (typeof App !== 'undefined' && typeof App.trigger === 'function') {
			App.trigger('log', arguments);
		}
	} else {
		log.history = log.history || []; // store logs to an array for reference
		log.history.push(arguments);
	}
};
