FROM node:22-slim AS build
WORKDIR /app

COPY . .

RUN npm i -g pnpm && pnpm i && pnpm run build

FROM node:22-slim
WORKDIR /app

COPY --from=build /app/build .

ENV PORT=3001
EXPOSE 3001
CMD ["node", "."]