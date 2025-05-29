FROM node:23-alpine AS pnpm
WORKDIR /app

COPY package.json package.json

RUN npm i -g pnpm && pnpm i

FROM pnpm AS build
WORKDIR /app

COPY . .

ARG VITE_API_HOST
ENV VITE_API_HOST=${VITE_API_HOST}

ARG VITE_BACK_HOST
ENV VITE_BACK_HOST=${VITE_BACK_HOST}

ARG VITE_ADMIN_EMAIL
ENV VITE_ADMIN_EMAIL=${VITE_ADMIN_EMAIL}
ARG VITE_ADMIN_PASS
ENV VITE_ADMIN_PASS=${VITE_ADMIN_PASS}

ARG VITE_REDIS_HOST
ENV VITE_REDIS_HOST=${VITE_REDIS_HOST}

RUN pnpm run build && pnpm prune --prod

FROM node:23-alpine
WORKDIR /app

COPY --from=build /app/build .

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/pnpm-lock.yaml ./pnpm-lock.yaml

ENV PORT=3001
EXPOSE 3001
CMD ["node", "."]