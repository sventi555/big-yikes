# Big Yikes

<img width="1096" alt="Screenshot 2023-02-21 at 3 46 51 PM" src="https://user-images.githubusercontent.com/34760298/220455160-19392c3e-8145-41b7-932c-a316c349006f.png">

Big yikes is a full stack application where you place blocks to try and discover structures that qualify as a "Big Yikes".

It is laid out as a monorepo composed of 3 packages:
- [client](./packages/client/README.md): Frontend application built with [Vite](https://vitejs.dev/)
- [server](./packages/server/README.md): Backend API built with [Fastify](https://www.fastify.io/)
- [lib](./packages/lib/README.md): Library containing shared code used in both the client and server

## Requirements

- Node.js v18+
- Python3 (for running lerna/nx commands)
- Docker (for running database)

## Getting Started

Copy the `.env.example` files in client and server packages and rename the copied files to `.env`.
No changes are required for these files in most cases.

Start a local firestore database:
```
docker run \
  --name firestore \
  --env "FIRESTORE_PROJECT_ID=local" \
  --env "PORT=8080" \
  --publish 8000:8080 \
  mtlynch/firestore-emulator-docker
```

Install dependencies:
```
yarn
```

Start the app in dev mode:
```
yarn dev
```

Now the application can be viewed at http://localhost:3000.

Commands can be run in the package workspaces by prefixing the command with the package name.

For example:
```
yarn client test
```
