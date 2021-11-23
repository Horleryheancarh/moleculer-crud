/* eslint-disable no-mixed-spaces-and-tabs */
"use strict";


const DbMixin = require("../mixins/db.mixin");
const CacheCleanerMixin = require("../mixins/cache.cleaner.mixin");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "todo",

	/**
	 * Settings
	 */
	settings: {

	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
     * Mixins
     */
	 mixins: [
		DbMixin("todo-items"),
		CacheCleanerMixin(["todo-item"])
	],


	/**
	 * Actions
	 */
	actions: {

		/**
		 * Get all todo items
		 *
		 * @returns array
		 */
		list: {
			rest: "GET /",
			async handler(ctx) {
				return ctx.params;
			}
		},

		/**
		 * Get single todo items
		 *
		 * @returns array
		 */
		get: {
			rest: "GET /:id",
			params: {
				id: { type: "uuid" }
			},
			async handler(ctx) {
				return `Hello ${ctx.params.id}`;
			}
		},
		

		/**
		 * Post single todo item
		 *
		 * @param {String} title - Todo title/id
		 */
		create: {
			rest: "POST /",
			async handler(ctx) {
				return `Post, ${ctx.body}`;
			}
		},

		/**
		 * Update single todo item
		 * 
		 * @returns array
		 */
		update: {
			rest: "PUT /:id",
			params: {
				id: { type: "uuid" }
			},
			async handler(ctx) {
				return `Put, ${ctx.params.id}`;
			}
		},

		/**
		 * Delte single todo item
		 * 
		 * @returns string
		 */
		remove: {
			rest: "DELETE /:id",
			params: {
				id: { type: "uuid" }
			},
			async handler(ctx) {
				return `Delete, ${ctx.params.id}`;
			}
		},

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
		console.log("TODO service created");
	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {
		console.log("TODO service started");
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {
		console.log("TODO service stopped");
	}
};
