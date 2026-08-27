const $ = s => document.querySelector(s);
const T = window.ToolScart;

const loadFile = async () => {
  const f = $("#file").files[0];
  if (!f) return;
  try {
    $("#in").value = await T.readFile(f, [".txt"]);
    $("#filemeta").textContent = "Selected file: " + f.name;
    T.setStatus("status", "Loaded " + f.name, "ok");
  } catch (e) {
    T.setStatus("status", e.message, "error");
  }
};

if ($("#file")) $("#file").addEventListener("change", loadFile);

$("#process").onclick = () => {
  const n = Number($("#in").value);
  if (!Number.isFinite(n)) return T.setStatus("status", "Enter a valid timestamp.", "error");
  const ms = $("#in").value.length > 10 ? n : n * 1000;
  const d = new Date(ms);
  $("#out").value = "Local: " + d.toLocaleString() +
    "\nUTC: " + d.toUTCString() +
    "\nUnix seconds: " + Math.floor(d.getTime() / 1000) +
    "\nUnix ms: " + d.getTime();
  T.setStatus("status", "Converted.", "ok");
};

$("#copy").onclick = () => T.copy($("#out").value, "status");
$("#export").onclick = () => T.download("timestamp.txt", $("#out").value || $("#in").value);
$("#clear").onclick = clearAll;
