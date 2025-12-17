# 🎯 快速開始

## 檔案清單

1. **blog-frontend.jsx** - React 前端（放在專案根目錄）
2. **functions/** - Cloudflare Pages Functions API
   - api/posts.js - 文章列表與創建
   - api/posts/[id].js - 文章更新與刪除
   - api/upload.js - 圖片上傳
3. **schema.sql** - D1 資料庫結構
4. **wrangler.toml** - Cloudflare 配置文件
5. **DEPLOYMENT.md** - 完整部署指南

## ⚡ 最快部署方式

### 1. 安裝工具
```bash
npm install -g wrangler
wrangler login
```

### 2. 創建資料庫
```bash
wrangler d1 create blog-database
# 複製輸出的 database_id 到 wrangler.toml
```

### 3. 初始化資料庫
```bash
wrangler d1 execute blog-database --remote --file=./schema.sql
```

### 4. 創建圖片儲存
```bash
wrangler r2 bucket create blog-images
```

### 5. 修改密碼
編輯 `wrangler.toml` 和 `blog-frontend.jsx`，將密碼改為相同的強密碼。

### 6. 部署
推送到 GitHub，然後在 Cloudflare Dashboard 連接儲存庫並配置綁定。

## 🔑 重要提醒

1. **前後端密碼必須一致**
   - wrangler.toml: `ADMIN_PASSWORD = "YourPassword"`
   - blog-frontend.jsx 第15行: `const ADMIN_PASSWORD = 'YourPassword';`

2. **R2 公開 URL 設定**
   - 在 Cloudflare Dashboard 設定 R2 公開訪問
   - 將 URL 填入 `wrangler.toml` 的 `R2_PUBLIC_URL`

3. **環境變數綁定**
   - Cloudflare Pages → Settings → Functions
   - 綁定 D1 (DB) 和 R2 (BLOG_IMAGES)
   - 設定環境變數

詳細步驟請參考 **DEPLOYMENT.md**

---

有任何問題請參考 DEPLOYMENT.md 的常見問題章節！
