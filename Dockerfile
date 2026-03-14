# Use Node.js 20 slim image
FROM node:20-slim AS base

# Set working directory
WORKDIR /app

# Set environment variable to prevent interactive prompts and install OpenSSL
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production stage
FROM node:20-slim AS production

# Set working directory
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set environment variable to prevent interactive prompts and install OpenSSL
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy built application from base stage
COPY --from=base --chown=nextjs:nodejs /app/.next ./.next
COPY --from=base --chown=nextjs:nodejs /app/public ./public
COPY --from=base --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=base --chown=nextjs:nodejs /app/next.config.js ./
COPY --from=base --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=base --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["npm", "start"]