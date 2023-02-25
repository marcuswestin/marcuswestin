FROM node:12.18.1

WORKDIR /app

RUN curl -fsSL https://bun.sh/install | bash

COPY . .

ENTRYPOINT [ "/root/.bun/bin/bun", "index.ts" ]
