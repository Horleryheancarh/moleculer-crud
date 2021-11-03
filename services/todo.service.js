/* eslint-disable no-mixed-spaces-and-tabs */
"use strict";

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "todo-list",

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
		getall: {
			rest: {
				method: "GET",
				path: "/"
			},
			async handler() {
				return "Hello GetAll";
			}
		},

		/**
		 * Post single todo item
		 *
		 * @param {String} title - Todo title/id
		 */
		postsingle: {
			rest: {
				method: "POST",
				path: "/"
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				return `Post, ${ctx.params.name}`;
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
				path: "/",
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				return `Put, ${ctx.params.name}`;
			}
		},

		/**
		 * Delte single todo item
		 * 
		 * @returns string
		 */
		 deletesingle: {
			 rest: {
				 method: "DELETE",
				 path: "/"
			 },
			 async handler(ctx) {
				return `Delete, ${ctx.params.name}`;
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
		console.log("TODO service startde");
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {
		console.log("TODO service stopped");
	}
};
