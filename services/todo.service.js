/* eslint-disable no-mixed-spaces-and-tabs */
"use strict";


const { MoleculerClientError } = require("moleculer").Errors;

const DbMixin = require("../mixins/db.mixin");

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
	 mixins: [DbMixin("todoitems")],


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
			auth: "required",
			rest: "GET /",
			async handler(ctx) {
				const items = this.adapter.find({ query : { username: ctx.meta.user.username } });
				return items;
			}
		},

		/**
		 * Get single todo items
		 *
		 * @returns array
		 */
		get: {
			auth: "required",
			rest: "GET /:id",
			params: {
				id: { type: "uuid" }
			},
			async handler(ctx) {
				const res = await this._get(ctx, ctx.params);
				return res;
			}
		},
		

		/**
		 * Post single todo item
		 *
		 * @param {String} title - Todo title/id
		 */
		create: {
			auth: "required",
			rest: "POST /",
			params: {
				title: "string",
				description: "string",
				todoItems: "array"
			},
			async handler(ctx) {
				const item = ctx.params;
				item.username = ctx.meta.user.username;
				await this.validateEntity(item);

				let checkItem = await this.adapter.find({ query : { title: item.title  } });

				if (checkItem.length > 0)
					throw new MoleculerClientError("Title already exists");
				
				const newItem = await this._create(ctx, item);
				
				return newItem;
			}
		},

		/**
		 * Update single todo item
		 * 
		 * @returns array
		 */
		update: {
			auth: "required",
			rest: "PUT /:id",
			params: {
				id: { type: "uuid" }
			},
			async handler(ctx) {
				const item = ctx.params;
				item.username = ctx.meta.user.username;

				this.logger.info(item);

				let checkItem = await this.adapter.find({ query : { id: item.id, username: item.username }});

				if (checkItem.length > 0) {
					const upItem = await this._update(ctx, ctx.params);
					return upItem;
				} else {
					throw new MoleculerClientError("Unable To Update Item for some reasons");
				}
			}
		},

		/**
		 * Delte single todo item
		 * 
		 * @returns string
		 */
		remove: {
			auth: "required",
			rest: "DELETE /:id",
			params: {
				id: { type: "uuid" }
			},
			async handler(ctx) {
				const item = ctx.params;
				item.username = ctx.meta.user.username;
				return item;
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
