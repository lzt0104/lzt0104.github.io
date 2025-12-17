// functions/api/posts.js
// 獲取所有文章
export async function onRequestGet(context) {
  try {
    const { env } = context;
    const db = env.DB; // D1 資料庫綁定
    
    const { results } = await db.prepare(
      'SELECT * FROM posts ORDER BY created_at DESC'
    ).all();
    
    return new Response(JSON.stringify({ posts: results }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// 創建新文章
export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const db = env.DB;
    
    // 驗證管理員權限
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: '未授權' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const token = authHeader.substring(7);
    const adminPassword = env.ADMIN_PASSWORD || 'your_secure_password_here';
    
    if (token !== adminPassword) {
      return new Response(JSON.stringify({ error: '密碼錯誤' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const post = await request.json();
    
    const result = await db.prepare(
      'INSERT INTO posts (title, content, tags, images) VALUES (?, ?, ?, ?)'
    ).bind(
      post.title,
      post.content,
      post.tags || '',
      post.images || ''
    ).run();
    
    return new Response(JSON.stringify({ 
      success: true, 
      id: result.meta.last_row_id 
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// OPTIONS 預檢請求
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}