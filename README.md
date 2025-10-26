# Pawradise Inn (Project Title)

This is the official repository for the Pawradise Inn project. Follow the steps below to get the application up and running on your local machine.

## ⚠️ Project Status & Security

* **Prototype Version:** Please note that this is a **prototype** version of the application. The full website, with all services, is scheduled for release at the end of our next sprint (approximately 2 weeks).

* **Security & Limitations:**
    * **Image Uploads (Disabled):** This project is designed to use Google Cloud Storage (GCS). To prevent leaking our sensitive `keyfile.json`, this file is **not** included in the repository. As a result, all image upload functionality is **currently disabled** in this prototype.
    * **Environment Files:** Similarly, to protect all sensitive credentials, only the `.env.test` file is provided for local testing. All other `.env` files are securely excluded from the repository.

## Prerequisites

-   [Git](https://git-scm.com/downloads)
-   [Docker](https://www.docker.com/get-started)
-   [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

Follow these instructions to set up and run the project locally.

1.  **Clone the Repository**

    First, clone this project to your local machine and navigate into the project directory:

    ```bash
    git clone https://github.com/Pawradise-Inn/pawradise-inn.git
    cd pawradise-inn
    ```

2.  **Start the Application**

    Run the following command from the root directory of the project (where the `docker-compose.yaml` file is located). This will build and start all the necessary services (like the web application and the database) in detached mode (running in the background).

    ```bash
    docker compose up -d
    ```

3.  **Access the Website**

    Once the containers are running, your website is live! Open your web browser and navigate to:

    [**http://localhost:3000**](http://localhost:3000)

4.  **Initialize the Database**

    Before registering a new user, you must load the initial database schema. Run this command in your terminal to import the SQL structure:

    ```bash
    docker exec -i pawradise-inn-db-1 psql -U postgres -d mydb < sql_initial.sql
    ```
    *(Note: `pawradise-inn-db-1` is the container name. If your container has a different name, you can find it by running `docker compose ps`.)*

5.  **Register a New User**

    Go back to the website at [http://localhost:3000](http://localhost:3000) and register a new user through the application's sign-up form.

6.  **Apply Post-Registration SQL**

    After successfully registering your user on the website, run the following command to apply additional SQL scripts (this may include setting user roles, adding test data, etc.):

    ```bash
    docker exec -i pawradise-inn-db-1 psql -U postgres -d mydb < sql_after_register.sql
    ```

7.  **Refresh webpage and You're All Set!**

    The application is now fully initialized. You are free to start using and testing the website.
