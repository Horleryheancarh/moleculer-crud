/* eslint-disable no-mixed-spaces-and-tabs */
"use strict";

const { MoleculerClientError } = require("moleculer").Errors;

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

		// Output fields
		fields: ["id", "title", "author"],

		// Validator Schema
		postValidator: {
			title: { type: "string" },
			content: { type: "string" },
			author: { type: "string" }
		}
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
		 * Create New Post
		 * 
		 * @actions
		 * @param {Object} Post - post details
		 * 
		 * @returns {Object} Post created
		 */
		create: {
			rest: "POST /",
			params: {
				author: { type: "string" },
				title: { type: "string" },
				content: { type: "string" },
			},
			async handler(ctx) {
				const newPost = ctx.params;
				await this.validateEntity(newPost);

				const checkPost = await this.adapter.find({ query: { title: newPost.title }});

				if (checkPost.length > 0)
					throw new MoleculerClientError("Title already exists");
				
				// Insert into Database
				// const post = await this.adapter.insert(newPost);

				// Moleculer defined function
				const post = await this._create(ctx, newPost);

				return post;
			}
		},

		/**
		 * Update Post
		 * 
		 * @actions
		 * @param {id} Post Id
		 * @param {Object} Post - post details
		 * 
		 * @returns {Object} Post updated
		 */
		update: {
			// rest: "GET /:id",
			params: {
				id: { type: "uuid" },
				author: { type: "string" },
				title: { type: "string" },
				content: { type: "string" },
			},
			async handler(ctx) {
				const newPost = ctx.params;
				await this.validateEntity(newPost);

				const checkPost = await this.adapter.find({ query: { id: newPost.id } });
				if (checkPost.length > 0) {
					if (newPost.author == checkPost[0].author){
						// Update
						// let updatedPost = await this.adapter.updateById(newPost.id, { $set: { newPost } });

						// Moleculer Defined Function
						let updatedPost = await this._update(ctx, ctx.params);

						return updatedPost;
					} else {
						throw new MoleculerClientError("Only the post author can Edit the post");
					}
				} else {
					throw new MoleculerClientError("Post with Id does not exist");
				}
			}
		},


		/**
		 * Get all Posts
		 * 
		 * 
		 */
		list: {
			cache: {
				keys: ["url"],
				ttl: 60 // A minute
			},
			async handler(ctx) {
				let params = await this.sanitizeParams(ctx, ctx.params);
				const allPosts = await this._list(ctx, params);
				return allPosts;
			}
		},

		/**
		 * Get Single Post
		 * 
		 * @actions
		 * @param {id} Id - Post Id
		 * 
		 * @returns {Object} Post
		 */
		get: {
			cache: {
				keys: ["url"],
				ttl: 60 // A minute
			},
			async handler(ctx) {
				let params = await this.sanitizeParams(ctx, ctx.params);
				const post = await this._get(ctx, params);
				return post;
			}
		},

		/**
		 * Delete Single Post
		 * 
		 * @actions
		 * @param {id} Id - Post Id
		 * 
		 * @returns {Object} Post
		 */
		remove: {
			params: {
				id: { type: "uuid" }
			},
			async handler(ctx) {
				const post = await this._remove(ctx, ctx.params);
				return post;
			}
		}
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
