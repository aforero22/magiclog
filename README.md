# MagicLog

## Description
MagicLog is a Node.js application using Express to provide an endpoint that calculates age from a given birthday.

## Features
- **`/birthday` Endpoint**: Accepts `name` and `date` in DD-MM-YYYY format as POST request body and returns the calculated age in years.

## Technologies Used
- Node.js
- Express
- Docker

## Installation and Usage
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the server with `node app.js`.

## Docker
- Use the included `Dockerfile` to build a Docker image of the server.

## GitHub Actions Workflow
- The CI/CD pipeline, defined in `.github/workflows/ci-cd.yml`, is named "CI/CD Pipeline".
- **Trigger**: Manually triggered using `workflow_dispatch`.  Commented for Push in Main Branch
- **Jobs**: 
  - **build-and-deploy**: Executes on an Ubuntu-based runner.
  - **Steps**:
    - **Checkout Repository**: Uses `actions/checkout@v2` to check out the code repository.
    - **Build Docker Image**: Builds the Docker image from the code.
    - **Log in to Docker Hub**: Logs into Docker Hub using provided secrets for username and access token.
    - **Push Image to Docker Hub**: Pushes the Docker image to Docker Hub.
    - **Deploy to Azure Container Instances**: Deploys the Docker image to Azure Container Instances (ACI). This includes:
        - Logging in to Azure using a service principal.
        - Creating an ACI container with the specified image, resource group, and other parameters.
        - Checking and waiting for the container's state to reach "Running".
        - Waiting for the container to be fully deployed.
        - Indicating completion of the deployment process.

## Contributions
Contributions are welcome. Please send a pull request or open an issue to discuss proposed changes.

## License
[Include license details here, if applicable]
