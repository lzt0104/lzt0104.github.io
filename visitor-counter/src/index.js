export default {
  async fetch(request, env, ctx) {
    // 從 KV 命名空間 PAGE_VIEWS 中讀取 'count' 這個 key
    let count = await env.PAGE_VIEWS.get('count');

    // 如果是第一次，計數為 null，我們將其初始化為 1
    // 否則，將字串轉為數字並加 1
    let newCount = count === null ? 1 : parseInt(count) + 1;

    // 將新的計數寫回 KV
    // 我們使用 ctx.waitUntil 來確保即使請求結束，這個寫入操作也會完成
    ctx.waitUntil(env.PAGE_VIEWS.put('count', newCount.toString()));

    // 準備回傳給前端的資料
    const data = {
      count: newCount
    };

    // 設定 CORS 標頭，允許任何來源的網站請求這個 API
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
      'Access-Control-Max-Age': '86400',
      'Content-Type': 'application/json'
    };
    
    return new Response(JSON.stringify(data), {
      headers: corsHeaders
    });
  },
};