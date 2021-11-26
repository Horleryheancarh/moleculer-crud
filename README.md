[![Moleculer](https://badgen.net/badge/Powered%20by/Moleculer/0e83cd)](https://moleculer.services)

# moleculer-crud
This is my first microservice project. It is built using [Moleculer](https://moleculer.services/). Generated with the [Moleculer CLI](https://moleculer.services/docs/0.14/moleculer-cli.html).

## Usage
Start the project with `npm run dev` command.
After starting, open the http://localhost:3000/ URL in your browser. 
On the welcome page you can test the generated services via API Gateway and check the nodes & services.
There are test routes available in the `test.http` file do well to update the token by logging first


## Services
- **api**: API Gateway services with `Authentication` and `Authorization`
- **blog**: Simple blog service with `create`, `update`, `list` and `get` actions.
- **account**: Simple user management service with `create`, `login`, `update` and `get profile` actions.
- **note**: Simple note service with `create`, `update`, `list` and `get` actions.
- **todo list**: Simple todo service with `create`, `update` and `list` actions.


## Useful links

* Moleculer website: https://moleculer.services/
* Moleculer Documentation: https://moleculer.services/docs/0.14/


## NPM scripts

- `npm run dev`: Start development mode (load all services locally with hot-reload & REPL)
- `npm run start`: Start production mode (set `SERVICES` env variable to load certain services)
- `npm run cli`: Start a CLI and connect to production. Don't forget to set production namespace with `--ns` argument in script
- `npm run lint`: Run ESLint
- `npm run ci`: Run continuous test mode with watching
- `npm test`: Run tests & generate coverage report
