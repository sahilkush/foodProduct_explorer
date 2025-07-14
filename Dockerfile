# Step 1: Use the official Node.js image as base
FROM node:18-alpine AS build

# Step 2: Set working directory inside container
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Step 4: Copy the rest of the source code
COPY . .

# Step 5: Build the React app
RUN npm run build

# Step 6: Use a minimal image to serve the app
FROM nginx:alpine

# Step 7: Copy built files to nginx public folder
COPY --from=build /app/build /usr/share/nginx/html

# Step 8: Expose port 80 and start nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
