/* eslint-disable no-mixed-spaces-and-tabs */
"use strict";

const DbMixin = require("../mixins/db.mixin");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "blog",

	/**
	 * Settings
	 */
	settings: {

	},

	/**
     * Mixins
     */
	mixins: [DbMixin("postSchema")],

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {

	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {
		console.log("BLOG service created");
	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {
		console.log("BLOG service started");
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {
		console.log("BLOG service stopped");
	}
};
