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
	mixins: [DbMixin("posts")],

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {

		/**
		 * Get all blog items
		 *
		 * @returns array
		 */
		getAll: {
			rest: {
				method: "GET",
				path: "/"
			},
			async handler() {
				return "Hello GetAll";
			}
		},

		/**
		 * Get single blog items
		 *
		 * @returns array
		 */
		getOne: {
			rest: {
				method: "GET",
				path: "/:id"
			},
			async handler(ctx) {
				return `Hello ${ctx.params.id}`;
			}
		},
		

		/**
		 * Post single blog item
		 *
		 * @param {String} title - blog title/id
		 */
		postSingle: {
			rest: {
				method: "POST",
				path: "/"
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				return `Post, ${ctx.body}`;
			}
		},

		/**
		 * Update single blog item
		 * 
		 * @returns array
		 */
		updateSingle: {
			rest: {
				method: "PUT",
				path: "/:id",
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				return `Put, ${ctx.params.id}`;
			}
		},

		/**
		 * Delte single blog item
		 * 
		 * @returns string
		 */
		 deleteSingle: {
			 rest: {
				 method: "DELETE",
				 path: "/:id"
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
