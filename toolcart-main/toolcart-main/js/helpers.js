window.ToolScart = {
  qs: (s, el=document) => el.querySelector(s),
  qsa: (s, el=document) => [...el.querySelectorAll(s)],
  esc: s => String(s ?? "").replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])),
  setStatus(id, msg, kind="") { const el=document.getElementById(id); if(el){ el.className=`status ${kind}`.trim(); el.textContent=msg; } },
  copy(text, statusId) { navigator.clipboard.writeText(text ?? "").then(()=>this.setStatus(statusId,"Copied.","ok")).catch(()=>this.setStatus(statusId,"Copy failed.","error")); },
  download(name, text) { const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob([text],{type:"text/plain"})); a.download=name; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),1000); },
  readFile(file, allowed) {
    return new Promise((resolve, reject) => {
      const ext = "." + file.name.split(".").pop().toLowerCase();
      if (allowed && !allowed.includes(ext)) {
        reject(new Error("Unsupported file type."));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ""));
      reader.onerror = () => reject(new Error("Could not read file."));
      reader.readAsText(file);
    });
  },
  extFromName(name) {
    const parts = String(name || "").split(".");
    return parts.length > 1 ? "." + parts.pop().toLowerCase() : "";
  },
  baseName(name) {
    const parts = String(name || "").split(".");
    return parts.length > 1 ? parts.slice(0, -1).join(".") : String(name || "output");
  },
  slugify(text){ return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9\s-]/g,"").trim().replace(/\s+/g,"-").replace(/-+/g,"-"); },
  hash(text, algo){ return crypto.subtle.digest(algo,new TextEncoder().encode(text)).then(buf=>[...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,"0")).join("")); },
  formatJson(text){ return JSON.stringify(JSON.parse(text),null,2); },
  minifyJson(text){ return JSON.stringify(JSON.parse(text)); },
  toCsv(arr){ const keys=[...new Set(arr.flatMap(o=>Object.keys(o||{})))]; return [keys.join(","),...arr.map(o=>keys.map(k=>{ const v=String(o?.[k]??""); return /[",\n]/.test(v)?`"${v.replace(/"/g,'""')}"`:v; }).join(","))].join("\n"); },
  csvToRows(text){ const rows=[]; let row=[], val="", q=false; for(let i=0;i<text.length;i++){ const c=text[i], n=text[i+1]; if(q){ if(c=='"'&&n=='"'){ val+='"'; i++; } else if(c=='"'){ q=false; } else val+=c; } else if(c=='"') q=true; else if(c===','){ row.push(val); val=""; } else if(c==='\n'){ row.push(val); rows.push(row); row=[]; val=""; } else if(c!=='\r') val+=c; } row.push(val); rows.push(row); return rows.filter(r=>r.length>1 || r[0] !== ""); },
  md(text){ let h=this.esc(text); h=h.replace(/^###### (.*)$/gm,"<h6>$1</h6>").replace(/^##### (.*)$/gm,"<h5>$1</h5>").replace(/^#### (.*)$/gm,"<h4>$1</h4>").replace(/^### (.*)$/gm,"<h3>$1</h3>").replace(/^## (.*)$/gm,"<h2>$1</h2>").replace(/^# (.*)$/gm,"<h1>$1</h1>"); h=h.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/`(.*?)`/g,"<code>$1</code>"); return `<p>${h.replace(/\n\n+/g,"</p><p>").replace(/\n/g,"<br>")}</p>`; }
};

function clearAll() {
  const ids = ['in', 'out', 'status', 'filemeta', 'header', 'payload', 'preview'];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') el.value = '';
    else if (id === 'preview') el.innerHTML = '';
    else el.textContent = '';
  });
  const file = document.getElementById('file');
  if (file) file.value = '';
}
