FROM node:23-alpine AS build
WORKDIR /app

COPY . .

RUN npm i -g pnpm && pnpm i && pnpm run build

FROM node:23-alpine
WORKDIR /app

COPY --from=build /app/build .

ENV PORT=3001
EXPOSE 3001
CMD ["node", "."]