// functions/api/upload.js
// 上傳圖片到 R2
export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    
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
    
    const formData = await request.formData();
    const file = formData.get('image');
    
    if (!file) {
      return new Response(JSON.stringify({ error: '沒有上傳檔案' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 生成唯一檔名
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const extension = file.name.split('.').pop();
    const fileName = `${timestamp}-${randomStr}.${extension}`;
    
    // 上傳到 R2
    const bucket = env.BLOG_IMAGES; // R2 bucket 綁定
    await bucket.put(fileName, file.stream(), {
      httpMetadata: {
        contentType: file.type,
      },
    });
    
    // 返回公開 URL (需要配置 R2 的公開域名)
    const publicUrl = `${env.R2_PUBLIC_URL}/${fileName}`;
    
    return new Response(JSON.stringify({ 
      success: true, 
      url: publicUrl 
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}