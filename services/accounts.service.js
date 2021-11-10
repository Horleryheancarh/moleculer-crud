/* eslint-disable no-mixed-spaces-and-tabs */
"use strict";

const { MoleculerClientError } = require("moleculer").Errors;

const { sign } = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");

const DbMixin = require("../mixins/db.mixin");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "accounts",

	/**
     * Mixins
     */
	mixins: [DbMixin("userSchema")],

	/**
	 * Settings
	 */
	settings: {
		// REST Basepath
		rest: "/",

		// Secret for JWT
		JWT_SECRET: process.env.JWT_SECRET || "Some long crap as secret IYKYK",

		// Output fields
		fields: ["id", "username", "email"],

		// Validator Schema
		userValidator: {
			firstname: { type: "string" },
			lastname: { type: "string" },
			username: { type: "string" },
			email: { type: "email" },
			password: { type: "string" },
			role: { type: "enum" },
		}
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
         * Register new user
         * 
         * @actions
         * @param {Object} user - User
         * 
         * @returns {Object} created user and token
         */
		create: {
			rest: "POST /user",
			params: {
				// user: { type: "object" }
			},
			async handler(ctx) {
				let user = ctx.params;
				await this.validateEntity(user);

				if (user.username) {
					const found = await this.adapter.find({ username: user.username });
					if (found.length !== 0)
						throw new MoleculerClientError("Username exists", 422, "", [{ field: "Username", message: "exists" }]);
				}

				if (user.email) {
					const found = await this.adapter.find({ email: user.email });
					if (found.length !== 0)
						throw new MoleculerClientError("Email exists", 422, "", [{ field: "email", message: "exists" }]);
				}

				user.password = await hash(user.password, 10);
				const doc = await this.adapter.insert(user);

				return this.generateJWT(doc);
			}
		},

		/**
         * Login user
         * 
         * @actions
         * @param {Object} user - user credentials
         * 
         * @returns {Object} Logged in user with token
         */
		login: {
			rest: "POST /user/login",
			params: {
				email: { type: "string" },
				password: { type: "string" }
			},
			async handler(ctx) {
				const { email, password } = ctx.params;

				// this.logger.info(email);
				const user = await this.adapter.find({ limit: 1, email });
				if (!user)
					throw new MoleculerClientError("Invalid Credentials", 422, "", [{ field: "email", message: "not found" }]);

				
				const res = await compare(password, user[0].password);
				this.logger.info( "Response\n", res );
				if (!res)
					throw new MoleculerClientError("Wrong password", 422, "", [{ field: "email", message: "not found" }]);
                
				return this.generateJWT(res);
			}
		},

		/**
         * Get all user
         * 
         * 
         */
		list: {
			rest: "GET /user",
			async handler(ctx) {
				const all = await this.adapter.find();
				this.logger.info(all);
				return all;
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
		/**
         * Generate JWT Token from user
         * 
         * @param {Object} user
         */
		generateJWT(user) {
			const today = new Date();
			const time = new Date(today);
			time.setDate(today.getDate() + 60);
			return sign({
				id: user.id,
				username: user.username,
				exp: Math.floor(time.getTime() / 1000)
			}, this.settings.JWT_SECRET);
		}
	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {
		console.log("ACCOUNTS service created");
	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {
		console.log("ACCOUNTS service started");
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {
		console.log("ACCOUNTS service stopped");
	}
};
