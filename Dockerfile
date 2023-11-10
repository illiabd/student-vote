# Step 1: Build the application
FROM node:alpine AS builder
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

# Step 2: Set up the production environment
FROM nginx:alpine

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]