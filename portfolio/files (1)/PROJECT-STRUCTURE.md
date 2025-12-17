# 📁 專案結構

```
blog-portfolio/
│
├── blog-frontend.jsx          # 🎨 React 前端主文件
│                              # 包含所有頁面組件和 UI
│
├── functions/                 # ⚙️ Cloudflare Pages Functions (後端 API)
│   └── api/
│       ├── posts.js          # 📝 GET /api/posts - 獲取所有文章
│       │                     # 📝 POST /api/posts - 創建新文章
│       │
│       ├── posts/
│       │   └── [id].js       # ✏️ PUT /api/posts/:id - 更新文章
│       │                     # 🗑️ DELETE /api/posts/:id - 刪除文章
│       │
│       └── upload.js         # 📸 POST /api/upload - 上傳圖片到 R2
│
├── schema.sql                 # 🗄️ D1 資料庫結構定義
│
├── wrangler.toml             # ⚙️ Cloudflare 配置文件
│                              # 包含 D1、R2 綁定和環境變數
│
├── DEPLOYMENT.md             # 📖 詳細部署指南（必讀！）
│
└── START-HERE.md             # 🚀 快速開始指南

```

## 🔄 資料流程

### 訪客瀏覽文章
```
用戶瀏覽器
    ↓
blog-frontend.jsx (GET /api/posts)
    ↓
functions/api/posts.js
    ↓
D1 Database → 返回文章列表
    ↓
顯示在前端
```

### 管理員新增文章（含圖片）
```
管理員登入
    ↓
上傳圖片 (POST /api/upload)
    ↓
functions/api/upload.js → R2 Storage
    ↓
獲得圖片 URL
    ↓
填寫文章內容 + 圖片 URL
    ↓
提交 (POST /api/posts)
    ↓
functions/api/posts.js → 儲存到 D1
    ↓
完成發布！
```

## 🎯 快速修改指南

### 修改管理員密碼
1. **wrangler.toml** 第 18 行
   ```toml
   ADMIN_PASSWORD = "your_new_password"
   ```

2. **blog-frontend.jsx** 第 15 行
   ```javascript
   const ADMIN_PASSWORD = 'your_new_password';
   ```
   
   ⚠️ **兩處密碼必須相同！**

### 修改網站標題
**blog-frontend.jsx** 導航欄部分（約第 50-60 行）
```javascript
<span style={{ color: COLORS.highlight }}>你的名字</span>
<span style={{ color: COLORS.primary }}>@</span>
<span style={{ color: COLORS.secondary }}>blog</span>
```

### 修改個人資訊
**blog-frontend.jsx** HomePage 組件中（約第 450-460 行）
```javascript
{ label: '身份', value: '你的學校/公司' },
{ label: '現職', value: '你的職位' },
// ...
```

### 新增或修改頁面
在 **blog-frontend.jsx** 中：
1. 新增 `Navbar` 中的 `items` 陣列
2. 創建新的頁面組件
3. 在 `App` 組件的 routing 中新增對應頁面

## 🐛 除錯技巧

### 前端除錯
打開瀏覽器開發者工具 (F12)：
- Console: 查看錯誤訊息
- Network: 查看 API 請求狀態
- Application → Local Storage: 查看管理員登入狀態

### 後端除錯
在 Cloudflare Dashboard:
1. Workers & Pages → 你的專案
2. 選擇部署版本
3. View details → Logs
4. 查看 Functions 執行日誌

### 常見錯誤
| 錯誤訊息 | 原因 | 解決方法 |
|---------|------|---------|
| 401 Unauthorized | 密碼錯誤 | 檢查前後端密碼是否一致 |
| 500 Internal Error | D1 未初始化 | 執行 schema.sql |
| 圖片上傳失敗 | R2 未設定公開訪問 | 設定 R2 Public Access |
| CORS 錯誤 | API 響應頭設定問題 | 檢查 Functions 中的 CORS 頭 |

## 📚 推薦閱讀

- [Cloudflare D1 文件](https://developers.cloudflare.com/d1/)
- [Cloudflare R2 文件](https://developers.cloudflare.com/r2/)
- [Pages Functions 文件](https://developers.cloudflare.com/pages/functions/)

## 💡 進階功能建議

想要擴展功能？可以考慮：

1. **Markdown 支援** - 使用 marked.js
2. **程式碼高亮** - 使用 highlight.js
3. **留言系統** - 整合 Disqus 或自建
4. **SEO 優化** - 添加 meta tags
5. **RSS 訂閱** - 生成 RSS feed
6. **多用戶系統** - 擴展資料庫加入用戶表
7. **草稿功能** - 新增 draft 欄位
8. **文章搜尋** - 使用 D1 的 LIKE 查詢

需要幫助實作這些功能嗎？歡迎聯繫！

---

© 2025 Liu Zheng-Ting
