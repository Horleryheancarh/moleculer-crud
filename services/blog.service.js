/* eslint-disable no-mixed-spaces-and-tabs */
"use strict";

const { MoleculerClientError } = require("moleculer").Errors;

const DbMixin = require("../mixins/db.mixin");
const CacheCleanerMixin = require("../mixins/cache.cleaner.mixin");

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
	mixins: [
		DbMixin("posts"),
		CacheCleanerMixin(["posts"])
	],

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
		read: {
			// rest: "GET /",
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
				
				const post = await this.adapter.insert(newPost);

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
		send: {
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
				if (checkPost > 0) {
					if (newPost.author === checkPost.author){
						let updatedPost = await this.adapter.updateById(newPost.id, { $set: { newPost } });

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
		 * @todo
		 * Add filters
		 */
		crap: {
			async handler() {
				const allPosts = await this.adapter.find({});
				return allPosts;
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
