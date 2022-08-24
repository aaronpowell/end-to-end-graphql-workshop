# GraphQL end-to-end sample application

_Note: Readme is still in draft mode._

This is a sample application that shows how you can build an end-to-end GraphQL solution that is then hosted on Azure using Azure Static Web Apps for the front end, Azure Container Apps for the backend and Azure Cosmos DB for data storage.

## Setup

This repo contains a [VS Code remote container](https://code.visualstudio.com/docs/remote/containers) configuration that will provision the local environment (or Codespaces environment if you prefer) which has:

- The required version of Node.js
- The recommended VS Code extensions
- The Cosmos DB emulator (and the connection string set in the `.env` file)
- The required command line tools

When opened, all Node dependencies will be installed.

## Architecture

The application consists of two parts:

- `backend`
  - The GraphQL backend for the application
  - This is an Express.js application, designed to be deployed to Azure Container Apps
- `frontend`
  - A React application that communicates to the backend and is designed to be deployed into Azure Static Web Apps

## Running the application

Before running the application the first time, you'll need to seed the database with the sample data, which can be done from a terminal with `npm run --workspace backend bootstrap`, via the `bootstrap` task, or via the `bootstrap` debugger.

To run the application, use the VS Code debugger and select `launch:all`, which will start both the backend and the frontend as the same time, as well as attach the debuggers.

For manually starting the application, run `npm run dev --workspace <frontend|backend>`, indicating which workspace you want to start.
