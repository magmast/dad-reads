FROM node AS build
WORKDIR /opt/dad-reads
COPY . .
RUN corepack enable &&\
    corepack prepare pnpm@latest --activate &&\
    pnpm install &&\
    pnpm build

FROM caddy:alpine
COPY ./Caddyfile /etc/caddy/Caddyfile
COPY --from=build /opt/dad-reads/dist /var/www/html
