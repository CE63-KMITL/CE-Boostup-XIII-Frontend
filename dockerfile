FROM node:23-alpine AS build
WORKDIR /app

COPY . .

ARG VITE_API_HOST
ENV VITE_API_HOST=${VITE_API_HOST}

ARG VITE_BACK_HOST
ENV VITE_BACK_HOST=${VITE_BACK_HOST}

RUN npm i -g pnpm && pnpm i && pnpm run build

FROM node:23-alpine
WORKDIR /app

COPY --from=build /app/build .

ENV PORT=3001
EXPOSE 3001
CMD ["node", "."]