# Use Node.js 20 slim image
FROM node:20-slim AS base

# Set working directory
WORKDIR /app

# Set environment variables to prevent interactive prompts and Next.js issues
ENV DEBIAN_FRONTEND=noninteractive
ENV DEBCONF_NONINTERACTIVE_SEEN=true
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Install OpenSSL with automatic answers to configuration prompts
RUN apt-get update && \
    echo "openssl openssl/config_file_default select true" | debconf-set-selections && \
    apt-get install -y --no-install-recommends -o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold" openssl && \
    rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application with proper environment
RUN NEXT_TELEMETRY_DISABLED=1 npm run build

# Production stage
FROM node:20-slim AS production

# Set working directory
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive
ENV DEBCONF_NONINTERACTIVE_SEEN=true
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Install OpenSSL with automatic answers to configuration prompts
RUN apt-get update && \
    echo "openssl openssl/config_file_default select true" | debconf-set-selections && \
    apt-get install -y --no-install-recommends -o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold" openssl && \
    rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy built application from base stage
COPY --from=base --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=base --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=base --chown=nextjs:nodejs /app/public ./public
COPY --from=base --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=base --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=base --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]