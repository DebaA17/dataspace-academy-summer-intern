FROM node:22-slim

# Set environment
ENV NODE_ENV=development

# Install pnpm globally
RUN npm install -g pnpm@11.7.0

WORKDIR /app

# Copy dependency files first for layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./

# Install dependencies
RUN pnpm install --no-frozen-lockfile

# Copy the rest of the frontend files
COPY . .

# Expose the React development server port
EXPOSE 3000

# Start React development server
CMD ["pnpm", "start"]
