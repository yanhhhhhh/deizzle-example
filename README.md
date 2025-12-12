# Drizzle + Next.js 项目安装与配置指南

这是一个使用 Next.js、Drizzle ORM、PostgreSQL 和 Tailwind CSS 的全栈项目。

## 📋 项目概述

- **框架**: Next.js 16.0.10
- **数据库 ORM**: Drizzle ORM 0.45.1
- **数据库**: PostgreSQL (使用 Neon 或 Vercel Postgres)
- **样式**: Tailwind CSS 4.x
- **语言**: TypeScript
- **包管理器**: pnpm
- **代码规范**: ESLint

## 🚀 快速开始

### 1. 安装依赖

pnpm install

### 2. 配置环境变量

创建一个 `.env.local` 文件，并添加你的 PostgreSQL 连接字符串：

```env
POSTGRES_URL=你的_postgres_连接字符串
```

### 3. 配置 Drizzle ORM

#### 3.1 在 `src/db/index.ts` 文件中，初始化 Drizzle ORM：

```typescript
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.POSTGRES_URL!);
export const db = drizzle(sql);
```

#### 3.2 在 drizzl.config.ts 中配置 Drizzle：

```typescript
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  out: './drizzle',
});
```

#### 3.3 在 `src/db/schema.ts` 文件中，定义你的数据库模式。

```typescript
import { pgTable, serial, text } from 'drizzle-orm/pg-core';
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});
```

### 4. 运行数据库迁移

```markdown
# 生成迁移文件

pnpm db:generate

# 执行迁移

pnpm db:migrate

# 或者直接推送模式到数据库（开发环境）

pnpm db:push
```

### 5. 启动开发服务器

pnpm dev

## 📁 项目结构

.
├── src/
│ ├── app/ # Next.js App Router
│ │ ├── page.tsx # 首页组件
│ │ └── layout.tsx # 根布局
│ └── db/ # 数据库相关文件
│ ├── schema.ts # 数据库模式定义
│ └── index.ts # 数据库连接
├── drizzle/ # 数据库迁移文件
├── public/ # 静态资源
├── .env # 环境变量
├── drizzle.config.ts # Drizzle 配置
├── eslint.config.mjs # ESLint 配置
├── next.config.ts # Next.js 配置
├── postcss.config.mjs # PostCSS 配置
├── tailwind.config.ts # Tailwind 配置
├── tsconfig.json # TypeScript 配置
└── package.json # 项目依赖和脚本
