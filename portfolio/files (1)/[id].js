// functions/api/posts/[id].js
// 更新文章
export async function onRequestPut(context) {
  try {
    const { request, env, params } = context;
    const db = env.DB;
    const postId = params.id;
    
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
    
    await db.prepare(
      'UPDATE posts SET title = ?, content = ?, tags = ?, images = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).bind(
      post.title,
      post.content,
      post.tags || '',
      post.images || '',
      postId
    ).run();
    
    return new Response(JSON.stringify({ success: true }), {
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

// 刪除文章
export async function onRequestDelete(context) {
  try {
    const { request, env, params } = context;
    const db = env.DB;
    const postId = params.id;
    
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
    
    await db.prepare('DELETE FROM posts WHERE id = ?').bind(postId).run();
    
    return new Response(JSON.stringify({ success: true }), {
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