const $=s=>document.querySelector(s), T=window.ToolScart;
const loadFile=async()=>{const f=$('#file').files[0]; if(!f) return; try { $('#in').value = await T.readFile(f,[".txt",".md",".html",".css",".js",".json",".csv",".sql"]); $('#filemeta').textContent = 'Selected file: ' + f.name; T.setStatus('status','Loaded ' + f.name,'ok'); } catch (e) { T.setStatus('status', e.message, 'error'); } };
if($('#file')) $('#file').addEventListener('change', loadFile);
$('#process').onclick=()=>{
  try{
    const re = new RegExp($('#pattern').value, $('#flags').value || 'g');
    const text = $('#in').value;
    const matches = [...text.matchAll(re)];
    $('#out').innerHTML = matches.length
      ? matches.map(m=>'<div class="preview" style="min-height:auto;padding:10px"><strong>'+T.esc(m[0])+'</strong><div class="tiny">Index: '+m.index+'</div></div>').join('')
      : '<div class="preview" style="min-height:auto;padding:10px">No matches.</div>';
    T.setStatus('status', matches.length+' match(es).', 'ok');
  }catch(e){
    $('#out').innerHTML = '';
    T.setStatus('status', e.message, 'error');
  }
};
$('#copy').onclick=()=>T.copy($('#out').innerText,'status');
$('#export').onclick=()=>T.download('regex-results.txt', $('#out').innerText);
$('#clear').onclick=clearAll;
