# ---- build ----
FROM node:22-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

# ---- runtime ----
FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000 \
    UPLOAD_DIR=/data/uploads
COPY --from=build /app/.output ./.output
COPY --from=build /app/db ./db
COPY --from=build /app/scripts ./scripts
# The migration scripts use the `postgres` driver (no dependencies of its own).
COPY --from=build /app/node_modules/postgres ./node_modules/postgres
RUN mkdir -p /data/uploads && chown -R node:node /data
USER node
EXPOSE 3000
# Apply pending migrations, then start the server.
CMD ["sh", "-c", "node scripts/migrate.mjs && node .output/server/index.mjs"]
