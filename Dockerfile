FROM node AS build
WORKDIR /usr/local/src/dad-reads
COPY . .
RUN corepack enable &&\
    corepack prepare pnpm@latest --activate &&\
    pnpm build

FROM caddy:alpine
COPY ./Caddyfile /etc/caddy/Caddyfile
COPY --from=build /usr/local/src/dad-reads/dist /srv