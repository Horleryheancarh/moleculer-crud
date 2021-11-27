/* eslint-disable no-mixed-spaces-and-tabs */
"use strict";


const { MoleculerClientError } = require("moleculer").Errors;

const DbMixin = require("../mixins/db.mixin");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "note",

	/**
     * Mixins
     */
	 mixins: [DbMixin("notes")],


	/**
	 * Actions
	 */
	actions: {

		/**
		 * Get all notes
		 *
		 * @returns array
		 */
		list: {
			auth: "required",
			rest: "GET /",
			async handler(ctx) {
				const notes = await this.adapter.find({ query : { username: ctx.meta.user.username } });
				return notes;
			}
		},

		/**
		 * Get single note
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
				let params = ctx.params;
				params.username = ctx.meta.user.username;

				let check = await this.adapter.find({ query: { id: params.id, username: params.username }});

				if (check.length == 1 ) {
					let note = await this._get(ctx, ctx.params);
					return note;
				} else {
					throw new MoleculerClientError("Unable to get for some reasons");
				}
			}
		},
		

		/**
		 * Post single note
		 *
		 * @param {String} title - Note title/id
		 */
		create: {
			auth: "required",
			rest: "POST /",
			params: {
				title: "string",
				description: "string",
				notes: "string"
			},
			async handler(ctx) {
				const note = ctx.params;
				note.username = ctx.meta.user.username;
				await this.validateEntity(note);

				let check = await this.adapter.find({ query : { title: note.title  } });

				if (check.length == 1)
					throw new MoleculerClientError("Title already exists");
				
				const newNote = await this._create(ctx, note);
				
				return newNote;
			}
		},

		/**
		 * Update single note
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
				const note = ctx.params;
				note.username = ctx.meta.user.username;

				this.logger.info(note);

				let check = await this.adapter.find({ query : { id: note.id, username: note.username }});

				if (check.length == 1) {
					const upNote = await this._update(ctx, ctx.params);
					return upNote;
				} else {
					throw new MoleculerClientError("Unable To Update note for some reasons");
				}
			}
		},

		/**
		 * Delte single  note
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
				const delNote = ctx.params;
				delNote.username = ctx.meta.user.username;

				let check = await this.adapter.find({ query: { id: delNote.id, username: delNote.username} });

				if (check.length == 1) {
					const note = await this._remove(ctx, delNote);
					return note;
				} else {
					throw new MoleculerClientError("Unable to Delete Note");
				}
				
			}
		},

	},


	/**
	 * Service created lifecycle event handler
	 */
	created() {
		console.log("NOTE service created");
	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {
		console.log("NOTE service started");
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {
		console.log("NOTE service stopped");
	}
};
