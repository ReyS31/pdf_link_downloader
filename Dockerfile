FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install --production

COPY . .
COPY tsconfig.json .
# COPY public public

ENV NODE_ENV production
CMD ["bun", "main.ts"]

EXPOSE 3000