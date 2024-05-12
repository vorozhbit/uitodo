# To-Do Manager API

An API for the To-Do Manager web application

### Prerequisites

[Docker](https://docs.docker.com/engine/install/) is required to run the PostgreSQL database. 

## Installation
1. Clone the project and go to the project directory


2. Install PostgreSQL as a Docker container
    ```bash
    docker-compose up -d
    ```
3. Create `.env` file in the root directory
    ```
    DATABASE_URL="postgresql://postgres:postgres@localhost:5432/uidb?schema=public"
    ```
4. Install the dependencies
    ```bash
    npm install
    ```
5. Run dev server
    ```bash
    npm start
    ```