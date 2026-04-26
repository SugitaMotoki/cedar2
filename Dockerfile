# ベース
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# ビルド環境のベース
FROM base AS base-builder
WORKDIR /app
COPY . .
RUN pnpm install -g turbo

# portalのビルド環境構築
FROM base-builder AS portal-builder
RUN turbo prune @cedar2/portal --docker

# walletのビルド環境構築
FROM base-builder AS wallet-builder
RUN turbo prune @cedar2/wallet --docker

# portalのビルド
FROM base AS portal-installer
WORKDIR /app
COPY --from=portal-builder /app/out/json/ .
COPY --from=portal-builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY --from=portal-builder /app/out/full/ .
RUN pnpm portal build

# walletのビルド
FROM base AS wallet-installer
WORKDIR /app
COPY --from=wallet-builder /app/out/json/ .
COPY --from=wallet-builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY --from=wallet-builder /app/out/full/ .
RUN pnpm wallet build

FROM base AS portal
WORKDIR /app
COPY --from=portal-installer /app/ .
WORKDIR /app/packages/portal
EXPOSE 3000
CMD [ "pnpm", "start" ]

FROM base AS wallet
WORKDIR /app
COPY --from=wallet-installer /app/ .
WORKDIR /app/packages/wallet
EXPOSE 4000
CMD [ "pnpm", "start" ]
