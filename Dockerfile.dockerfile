# Use a specific version of the Node.js Alpine image for a smaller footprint and more security
FROM node:14-alpine as build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) for better cache utilization
COPY package*.json ./

# Install only production dependencies and use npm ci for faster, reliable installs
RUN npm ci --only=production

# Copy the application source code
COPY . .

# Use a multi-stage build to keep the final image as small and secure as possible
FROM node:14-alpine

# Set the working directory in the new build stage
WORKDIR /usr/src/app

# Copy the built node modules and compiled code from the previous stage
COPY --from=build /usr/src/app .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to start the application
CMD ["node", "app.js"]
