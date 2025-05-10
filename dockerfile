FROM node:23-alpine AS build
WORKDIR /app

COPY . .

RUN npm i -g pnpm && pnpm i

FROM node:23-alpine AS env
WORKDIR /app

COPY --from=build . .

ARG VITE_API_HOST
ENV VITE_API_HOST=${VITE_API_HOST}

ARG VITE_BACK_HOST
ENV VITE_BACK_HOST=${VITE_BACK_HOST}

RUN pnpm run build

FROM node:23-alpine
WORKDIR /app

COPY --from=env /app/build .

ENV PORT=3001
EXPOSE 3001
CMD ["node", "."]