/* eslint-disable no-mixed-spaces-and-tabs */
"use strict";

const { MoleculerClientError } = require("moleculer").Errors;

const { sign, verify } = require("jsonwebtoken");
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
	mixins: [DbMixin("users")],

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
				firstname: { type: "string", min: 2},
				lastname: { type: "string", min: 2},
				username: { type: "string", min: 2},
				email: "email",
				password: { type: "string", min: 2},
				role: { type: "string", items: "string", enum: [ "admin", "user", "quest" ] }
			},
			async handler(ctx) {
				let user = ctx.params;
				await this.validateEntity(user);

				if (user.username) {
					const found = await this.adapter.find({ query: { username: user.username } });
					if (found.length > 0)
						throw new MoleculerClientError("Username exists", 422, "", [{ field: "Username", message: "exists" }]);
				}

				if (user.email) {
					const found = await this.adapter.find({ query: { email: user.email } });
					if (found.length !== 0)
						throw new MoleculerClientError("Email exists", 422, "", [{ field: "email", message: "exists" }]);
				}

				user.password = await hash(user.password, 10);
				const doc = await this.adapter.insert(user);

				return this.createToken(doc);
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
				email: { type: "email" },
				password: { type: "string" }
			},
			async handler(ctx) {
				const { email, password } = ctx.params;

				const user = await this.adapter.find({ query: { email } });
				if (user.length == 0)
					throw new MoleculerClientError("Invalid Credentials", 422, "", [{ field: "email", message: "not found" }]);

				
				const res = await compare(password, user[0].password);
				if (!res)
					throw new MoleculerClientError("Invalid Credentials", 422, "", [{ field: "email", message: "not found" }]);
                
				// const doc = await this.transformDocuments(ctx, {}, user[0]);
				return this.createToken(user[0]);
			}
		},

		/**
         * Get all user
         * 
         * Add AUTHENTICATION
         */
		getall: {
			auth: "required",
			rest: "GET /users",
			async handler() {
				const all = await this.adapter.find({});
				return all;
			}
		},

		/**
         * Get Single user
         * 
         * Add AUTHENTICATION
         */
		profile: {
			auth: "required",
			rest: "GET /user",
			cache: {
				keys: ["token"],
				ttl: 30 * 60 // half hour
			},
			async handler(ctx) {
				try {
					// this.logger.info(ctx.param.token);
					let username = ctx.meta.user.username;
					const user = await this.adapter.find({ query: { username } });
					return user;
				} catch (error) {
					return error;
				}
			}
		},

		/**
		 * Admin Test
		 */
		adminTest: {
			auth: "required",
			admin: "required",
			rest: "GET /admintest",
			async handler(ctx) {
				let user = ctx.meta.user;
				return user;
			}
		},

		/**
		 * User Test
		 */
		 userTest: {
			auth: "required",
			user: "required",
			rest: "GET /usertest",
			async handler(ctx) {
				let user = ctx.meta.user;
				return user;
			}
		},

		/**
         * Decode JWT Token
         * 
         * @param {String} token
         */
		 decodeToken: {
			params: {
				token: "string"
			},
			async handler(ctx) {
				try {
					let decodedToken = verify(ctx.params.token, this.settings.JWT_SECRET);
					return decodedToken;
				} catch (error) {
					this.logger.info("decodeToken error");
					return error;
				}
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
         * Create JWT Token from user
         * 
         * @param {Object} user
         */
		createToken(user) {
			return sign({
				username: user.username,
				role: user.role
			}, this.settings.JWT_SECRET, { expiresIn: 60*60 });
		},
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


