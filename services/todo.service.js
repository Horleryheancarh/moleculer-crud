/* eslint-disable no-mixed-spaces-and-tabs */
"use strict";

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
	 * Actions
	 */
	actions: {

		/**
		 * Get all todo items
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
		 * Get single todo items
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
		 * Post single todo item
		 *
		 * @param {String} title - Todo title/id
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
		 * Update single todo item
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
		 * Delte single todo item
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
