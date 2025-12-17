# 🚀 Cloudflare 部落格完整部署指南

這是一個使用 **Cloudflare Pages + D1 Database + R2 Storage** 的全功能部落格系統。

## 📋 系統架構

```
前端 (React)
    ↓
Cloudflare Pages Functions (API)
    ↓
D1 Database (文章數據) + R2 Storage (圖片)
```

## ✨ 功能特色

- ✅ 完整的文章 CRUD (新增、讀取、更新、刪除)
- ✅ 圖片上傳與管理 (使用 R2)
- ✅ 標籤系統與篩選
- ✅ 管理員身份驗證
- ✅ 訪客瀏覽模式
- ✅ 完全響應式設計
- ✅ 完全免費 (Cloudflare 免費方案)

## 🔧 部署步驟

### 步驟 1: 安裝 Wrangler CLI

```bash
npm install -g wrangler
```

### 步驟 2: 登入 Cloudflare

```bash
wrangler login
```

### 步驟 3: 創建 D1 資料庫

```bash
# 創建 D1 資料庫
wrangler d1 create blog-database

# 會輸出 database_id，複製它
# 例如: database_id = "abc123-def456-ghi789"
```

將 `database_id` 填入 `wrangler.toml` 的 `database_id` 欄位。

### 步驟 4: 初始化資料庫結構

```bash
# 使用本地 D1
wrangler d1 execute blog-database --local --file=./schema.sql

# 使用遠端 D1 (正式環境)
wrangler d1 execute blog-database --remote --file=./schema.sql
```

### 步驟 5: 創建 R2 儲存桶

```bash
wrangler r2 bucket create blog-images
```

### 步驟 6: 設定 R2 公開訪問

1. 登入 Cloudflare Dashboard
2. 進入 R2 → blog-images
3. 點擊 "Settings" → "Public Access"
4. 啟用 "Allow Access" 並設定自訂域名
5. 或使用 Cloudflare 提供的 r2.dev 域名

將 R2 的公開 URL 填入 `wrangler.toml` 的 `R2_PUBLIC_URL`。

例如：
```toml
R2_PUBLIC_URL = "https://images.yourdomain.com"
# 或
R2_PUBLIC_URL = "https://pub-xxxxx.r2.dev"
```

### 步驟 7: 修改管理員密碼

在 `wrangler.toml` 中修改：

```toml
ADMIN_PASSWORD = "MySecurePassword2025!"
```

同時在前端 `blog-frontend.jsx` 的第 15 行也要修改：

```javascript
const ADMIN_PASSWORD = 'MySecurePassword2025!';
```

**兩個密碼必須一致！**

### 步驟 8: 部署到 Cloudflare Pages

```bash
# 初始化 git (如果還沒有)
git init
git add .
git commit -m "Initial commit"

# 推送到 GitHub
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

然後：

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 進入 **Workers & Pages**
3. 點擊 **Create Application** → **Pages** → **Connect to Git**
4. 選擇你的 GitHub 儲存庫
5. 配置建置設定：
   - **Framework preset**: React
   - **Build command**: `npm run build` (如果需要)
   - **Build output directory**: `/` (因為是單檔案)

### 步驟 9: 綁定 D1 和 R2

在 Cloudflare Pages 設定頁面：

1. 進入 **Settings** → **Functions**
2. 在 **D1 database bindings** 區塊：
   - Variable name: `DB`
   - D1 database: 選擇 `blog-database`
3. 在 **R2 bucket bindings** 區塊：
   - Variable name: `BLOG_IMAGES`
   - R2 bucket: 選擇 `blog-images`
4. 在 **Environment variables** 區塊：
   - 新增 `R2_PUBLIC_URL`: 你的 R2 公開 URL
   - 新增 `ADMIN_PASSWORD`: 你的管理員密碼

### 步驟 10: 重新部署

設定完成後，點擊 **Retry deployment** 重新部署。

## 🎯 使用說明

### 訪客模式
- 直接訪問網站即可瀏覽所有文章
- 可以使用標籤篩選
- 無法進行任何編輯操作

### 管理員模式
1. 點擊右上角「管理員」按鈕
2. 輸入密碼登入
3. 可以新增、編輯、刪除文章
4. 可以上傳圖片（最多一次上傳多張）

## 📂 專案結構

```
.
├── blog-frontend.jsx          # React 前端代碼
├── functions/
│   └── api/
│       ├── posts.js          # 文章列表與創建 API
│       ├── posts/
│       │   └── [id].js       # 單篇文章更新/刪除 API
│       └── upload.js         # 圖片上傳 API
├── schema.sql                # D1 資料庫結構
├── wrangler.toml            # Cloudflare 配置
└── README.md                # 本檔案
```

## 🔒 安全建議

1. **使用強密碼**
   - 至少 12 個字元
   - 包含大小寫字母、數字、符號

2. **定期更換密碼**
   - 建議每 3-6 個月更換

3. **不要將密碼推送到 GitHub**
   - 使用 Cloudflare 的環境變數
   - 前端密碼可以混淆（但最終仍需後端驗證）

4. **啟用 Cloudflare 的安全功能**
   - WAF (Web Application Firewall)
   - DDoS 防護
   - Rate Limiting

## 💰 成本估算

使用 Cloudflare 免費方案：

| 服務 | 免費額度 | 說明 |
|------|---------|------|
| Pages | 無限流量 | 靜態網站託管 |
| D1 | 5GB 存儲 / 500萬次讀取 | 足夠個人部落格 |
| R2 | 10GB 存儲 / 每月 100萬次讀取 | 約 2000-3000 張圖片 |
| Functions | 10萬次請求/天 | API 調用 |

**結論：完全免費！** 除非你的部落格超級熱門 😊

## 🐛 常見問題

### Q1: 部署後顯示 "未授權" 錯誤
**A:** 檢查 `wrangler.toml` 中的 `ADMIN_PASSWORD` 是否與前端一致。

### Q2: 圖片上傳後看不到
**A:** 
1. 確認 R2 bucket 已設定公開訪問
2. 檢查 `R2_PUBLIC_URL` 是否正確
3. 檢查瀏覽器控制台是否有 CORS 錯誤

### Q3: 無法創建文章
**A:**
1. 確認 D1 資料庫已初始化（執行 schema.sql）
2. 檢查 Cloudflare Pages 是否正確綁定 D1
3. 查看 Functions 日誌找出錯誤

### Q4: 如何備份資料？
**A:**
```bash
# 匯出 D1 資料庫
wrangler d1 export blog-database --remote --output=backup.sql

# 下載 R2 圖片 (使用 rclone)
rclone sync cloudflare:blog-images ./local-backup
```

### Q5: 可以有多個管理員嗎？
**A:** 目前版本是單一密碼制，所有知道密碼的人都有管理權限。如需多用戶系統，需要擴展資料庫結構增加用戶表。

## 📞 技術支援

- 📧 Email: zhengtingliu0104@gmail.com
- 🐙 GitHub: https://github.com/lzt0104
- 📖 Cloudflare Docs: https://developers.cloudflare.com/

## 🎉 部署完成檢查清單

- [ ] D1 資料庫已創建並初始化
- [ ] R2 儲存桶已創建並設定公開訪問
- [ ] 管理員密碼已在前後端設定一致
- [ ] Cloudflare Pages 已綁定 D1 和 R2
- [ ] 環境變數已正確設定
- [ ] 測試訪客瀏覽功能
- [ ] 測試管理員登入功能
- [ ] 測試文章 CRUD 功能
- [ ] 測試圖片上傳功能

完成以上檢查後，你的部落格就可以正式上線了！🎊

---

© 2025 Liu Zheng-Ting. All rights reserved.
