FROM node:22
WORKDIR /app

COPY ./build ./

ENV PORT=3001
EXPOSE 3001
CMD ["node", "."]