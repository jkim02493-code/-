import assert from 'node:assert/strict';
import { handleInquiry as POST } from '../server/inquiries/handler.ts';
const valid = { fullName:'Test Visitor',email:'visitor@example.com',details:'Please share information about celadon.',website:'' };
const request = (body, headers = {}) => new Request('https://gallery.example/api/inquiry',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://gallery.example',...headers},body:typeof body === 'string' ? body : JSON.stringify(body)});
const previous = { key:process.env.NOTION_API_KEY, db:process.env.NOTION_DATABASE_ID, source:process.env.NOTION_DATA_SOURCE_ID, fetch:globalThis.fetch };
try {
  delete process.env.NOTION_API_KEY; delete process.env.NOTION_DATABASE_ID; delete process.env.NOTION_DATA_SOURCE_ID;
  assert.equal((await POST(request(valid))).status,503);
  assert.equal((await POST(request({...valid,email:'invalid'}))).status,400);
  assert.equal((await POST(request({...valid,website:'spam'}))).status,400);
  assert.equal((await POST(request('{'))).status,400);
  assert.equal((await POST(request(valid,{Origin:'https://other.example'}))).status,403);
  assert.equal((await POST(request('x'.repeat(33000)))).status,413);
  assert.equal((await POST(request(valid,{'Content-Type':'text/plain'}))).status,415);
  process.env.NOTION_API_KEY='test-token'; process.env.NOTION_DATABASE_ID='11111111-1111-1111-1111-111111111111';
  const source='22222222-2222-2222-2222-222222222222'; let payload; let writes=0;
  globalThis.fetch=async (url,init) => {
    if(String(url).includes('/databases/')) return Response.json({object:'database',data_sources:[{id:source,name:'Inquiries'}]});
    assert.equal(String(url),'https://api.notion.com/v1/pages'); writes++; payload=JSON.parse(init.body);
    return Response.json({object:'page',id:'test-page'});
  };
  const longText='🌿'.repeat(2000)+' inquiry';
  assert.equal((await POST(request({...valid,details:longText}))).status,201);
  assert.equal(writes,1); assert.equal(payload.parent.data_source_id,source);
  assert.equal(payload.properties.Name.title[0].text.content,valid.fullName);
  assert.equal(payload.properties.Email.email,valid.email);
  assert.equal(payload.properties['Inquiry Details'].rich_text.map(x=>x.text.content).join(''),longText);
  assert.ok(payload.properties['Inquiry Details'].rich_text.every(x=>x.text.content.length<=2000));
  assert.ok(!Number.isNaN(Date.parse(payload.properties['Submission Date/Time'].date.start)));
  globalThis.fetch=async () => { throw new Error('simulated network failure'); };
  assert.equal((await POST(request(valid))).status,502);
  console.log('PASS: validation, origin, size limits, unconfigured endpoint, exact Notion payload, long Unicode text and upstream failure. Notion calls were mocked.');
} finally {
  globalThis.fetch=previous.fetch;
  for (const [key,value] of [['NOTION_API_KEY',previous.key],['NOTION_DATABASE_ID',previous.db],['NOTION_DATA_SOURCE_ID',previous.source]]) { if(value===undefined) delete process.env[key]; else process.env[key]=value; }
}
