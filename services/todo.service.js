"use strict";


const { MoleculerClientError } = require("moleculer").Errors;

const DbMixin = require("../mixins/db.mixin");

module.exports = {
	name: "todo",

	mixins: [DbMixin("todoItems")],

	actions: {

		/**
         * Get All Items
         * 
         * @returns array
         */
		list: {
			auth: "required",
			async handler(ctx) {
				const todoItems = await this.adapter.find({ query : { username: ctx.meta.user.username } });
				return todoItems;
			}
		},

		/**
         * Get single 
         * 
         * @param {Object} object -
         * 
         * @returns 
         */
		get: {
			auth: "required",
			rest: "GET /:id",
			params: {
				id: "uuid"
			},
			async handler (ctx) {
				let params = ctx.params;
				params.username = ctx.meta.user.username;

				let check = await this.adapter.find({ query: { id: params.id, username: params.username }});

				if (check.length == 1 ) {
					let todoItem = await this._get(ctx, ctx.params);
					return todoItem;
				} else {
					throw new MoleculerClientError("TodoItem does not exist");
				}
			}
		},

		/**
         * Post single
         * 
         * @param {Object} object
         * 
         * @returns item
         */
		create: {
			auth: "required",
			params: {
				done: "boolean",
				details: "string",
				dueDate: "string"
			},
			async handler(ctx) {
				const newTodoItem = ctx.params;
				newTodoItem.username = ctx.meta.user.username;
				await this.validateEntity(newTodoItem);

				this.logger.info(newTodoItem);

				const newItem = await this._create(ctx, newTodoItem);

				return newItem;
			}
		},

		/**
         * Update single
         * 
         * @param {Object} object -
         * 
         * @returns
         */
		update: {
			auth: "required",
			rest: "PUT /:id",
			params: {
				id: "uuid"
			},
			async handler(ctx) {
				const todoItem = ctx.params;
				todoItem.username = ctx.meta.user.username;

				let check = await this.adapter.find({ query : { id: todoItem.id, username: todoItem.username } });

				if (check.length > 0 && check.length < 2) {
					const updatedTodoItem = await this._update(ctx, ctx.params);
					return updatedTodoItem;
				} else {
					throw new MoleculerClientError("TodoItem does not exist");
				}
			}
		},

		/**
         * Delete single
         * 
         */
		remove: {
			auth: "required",
			rest: "DELETE /:id",
			params: {
				id: "uuid"
			},
			async handler(ctx) {
				const delItem = ctx.params;
				delItem.username = ctx.meta.user.username;

				let check = await this.adapter.find({ query : { id: delItem.id, username: delItem.username } });

				this.logger.info(check);

				if (check.length == 1) {
					const item = await this._remove(ctx, delItem);
					return item;
				} else {
					throw new MoleculerClientError("TodoItem does not exist");
				}
			}
		},
	}
};