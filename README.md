# Cheems

Cheems is a communication platform allowing the users to connect via video conferencing
and text messaging. The project was built as a solution to the challenge described
during [Microsoft Engage 2021](https://microsoft.acehacker.com/engage2021/).

## Tech Stack

Cheems is built primarily on JavaScript. The following technologies were used to prepare
the whole project:

1. **Front-end**

   - [TypeScript](https://www.typescriptlang.org/)
   - [React.js](https://reactjs.org/)
   - [Chakra UI](https://chakra-ui.com/)
   - [Framer Motion](https://www.framer.com/motion/)
   
2. **Back-end**

   - JavaScript
   - Node.js
   - MongoDB (for database)
   
A few helper libraries such as [Socket.IO](https://socket.io/) were used to deal with
connection failures between server and client and between users. To maintain the code
quality and standards, developer tools (linters, formatters, and parsers) such as
[Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) were set up in place.

## Installation

Follow the steps below to run the project locally:

1. Download or clone the project.

2. Set up a MongoDB cluster.

   1. Create a remote MongoDB cluster ([*read more*](https://www.mongodb.com/cloud/atlas/register)).
   
   2. Once a cluster is created, navigate to the **Database Deployments section** (see
      below).

      ![Database Deployments Section](https://i.postimg.cc/8kdzNgV5/Screenshot-2021-09-05-at-12-51-54-AM.png)
      
   3. Click on **Connect** button on the right of your cluster name. This will open a new
      dialog window. Select **Connect your application** and copy the connection string.

3. Navigate to the `backend` directory.

   1. Install all dependencies:

      ```bash
      npm install
      ```
      
   2. Create a copy of the `.env.template` file and rename the copy as `.env`.
   
   3. Open the `.env` file. Paste the MongoDB cluster connection string (copied in step
      2.3) as value of the `MONGODB_URI` environment variable.
      
   4. Type any random string as value of the `JWT_SECRET` variable in the same file.
      Make sure to store this somewhere for future references.
      
   5. Set the port number on which the backend should run (by setting the value of `PORT`
      variable). Default port number is 9000.
      
      ***Important***: Avoid port 3000 since app's front-end runs on the same port.

3. Setup a Google Firebase project for the chat to work correctly.
   
   1. Follow **only Step 1** from [this article](https://firebase.google.com/docs/web/setup#create-firebase-project-and-app)
      to obtain your Firebase credentials.
      
   2. Save the Firebase credentials for use in front-end setup.

4. Register your application on Microsoft Azure Portal for sign-in to work correctly.
   
   1. Navigate to [Microsoft Azure Portal](https://portal.azure.com/) and sign in.

   2. Search **App Services** in the search bar on top of the page and open it.

   3. Click on **Create** button. Follow through the steps to register your web application.

<!-- TODO: Complete from here. -->

5. Navigate to the `frontend` directory.

   1. Install all dependencies:

      ```bash
      npm install
      ```
