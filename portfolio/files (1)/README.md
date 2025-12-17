# 🚀 個人部落格系統

![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

基於 **Cloudflare Pages + D1 Database + R2 Storage** 的全功能個人部落格系統。

## ✨ 特色功能

- 🎨 **賽博龐克風格** - 獨特的視覺設計
- 📝 **文章管理** - 完整的 CRUD 功能
- 🖼️ **圖片上傳** - 支援多圖上傳到 R2
- 🏷️ **標籤系統** - 分類與篩選
- 🔐 **身份驗證** - 安全的管理員登入
- 👥 **雙重模式** - 訪客瀏覽 + 管理員編輯
- 📱 **響應式設計** - 完美支援各種裝置
- 💰 **完全免費** - 使用 Cloudflare 免費方案

## 🎯 技術棧

### 前端
- React 18
- 純 CSS (Inline Styles)
- 無需打包工具

### 後端
- Cloudflare Pages Functions
- D1 Database (SQLite)
- R2 Object Storage

### 部署
- Cloudflare Pages
- GitHub Actions (可選)

## 📸 預覽

### 訪客模式
- 瀏覽文章列表
- 查看文章內容
- 標籤篩選

### 管理員模式
- 新增文章
- 編輯/刪除文章
- 上傳圖片
- 標籤管理

## 🚀 快速開始

### 1. 克隆專案

```bash
git clone https://github.com/你的用戶名/blog-portfolio.git
cd blog-portfolio
```

### 2. 安裝 Wrangler

```bash
npm install -g wrangler
wrangler login
```

### 3. 創建資源

```bash
# 創建 D1 資料庫
wrangler d1 create blog-database

# 創建 R2 儲存桶
wrangler r2 bucket create blog-images
```

### 4. 配置

1. 將 D1 的 `database_id` 填入 `wrangler.toml`
2. 修改 `wrangler.toml` 和 `blog-frontend.jsx` 中的管理員密碼
3. 初始化資料庫：
   ```bash
   wrangler d1 execute blog-database --remote --file=./schema.sql
   ```

### 5. 部署

推送到 GitHub，然後在 Cloudflare Dashboard 連接儲存庫。

詳細步驟請參考 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📁 專案結構

```
.
├── blog-frontend.jsx          # React 前端
├── functions/
│   └── api/
│       ├── posts.js          # 文章 API
│       ├── posts/[id].js     # 單篇文章 API
│       └── upload.js         # 圖片上傳 API
├── schema.sql                # 資料庫結構
├── wrangler.toml            # Cloudflare 配置
└── package.json             # NPM 腳本
```

## 🔧 配置

### 修改管理員密碼

**wrangler.toml**
```toml
ADMIN_PASSWORD = "你的密碼"
```

**blog-frontend.jsx** (第 15 行)
```javascript
const ADMIN_PASSWORD = '你的密碼';
```

⚠️ 兩處密碼必須一致！

### 修改個人資訊

編輯 `blog-frontend.jsx` 中的：
- 導航欄名稱
- 首頁個人介紹
- About 頁面內容
- Footer 連結

## 💰 成本估算

使用 Cloudflare 免費方案：

| 服務 | 免費額度 | 適用範圍 |
|------|---------|---------|
| Pages | 無限流量 | 靜態網站 |
| D1 | 5GB / 500萬次讀取 | 資料庫 |
| R2 | 10GB / 100萬次讀取 | 圖片存儲 |
| Functions | 10萬次請求/天 | API |

**結論：完全免費！** 足夠個人部落格使用。

## 🛠️ 開發

### 本地開發

```bash
npm run dev
```

### 初始化資料庫

```bash
# 本地
npm run db:local

# 遠端
npm run db:init
```

### 備份資料

```bash
npm run db:backup
```

## 📖 文件

- [快速開始](./START-HERE.md)
- [完整部署指南](./DEPLOYMENT.md)
- [專案結構說明](./PROJECT-STRUCTURE.md)

## 🐛 常見問題

### Q: 出現 "未授權" 錯誤？
A: 檢查前後端密碼是否一致。

### Q: 圖片上傳失敗？
A: 確認 R2 已設定公開訪問。

### Q: 無法創建文章？
A: 確認 D1 資料庫已初始化。

更多問題請查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🤝 貢獻

歡迎 Pull Requests！

## 📄 授權

MIT License

## 👤 作者

**劉政廷**

- 📧 Email: zhengtingliu0104@gmail.com
- 🐙 GitHub: [@lzt0104](https://github.com/lzt0104)
- 📘 Facebook: [@zhengting0104](https://facebook.com/zhengting0104)
- 📷 Instagram: [@lie.1131](https://instagram.com/lie.1131)

## 🙏 致謝

- [Cloudflare](https://cloudflare.com) - 提供免費的基礎設施
- [React](https://react.dev) - UI 框架

---

⭐ 如果這個專案對你有幫助，請給個星星！

Made with ❤️ by Liu Zheng-Ting
