const $ = s => document.querySelector(s);
const T = window.ToolScart;

const loadFile = async () => {
  const f = $("#file").files[0];
  if (!f) return;
  try {
    $("#in").value = await T.readFile(f, [".json", ".csv", ".txt"]);
    $("#filemeta").textContent = "Selected file: " + f.name;
    T.setStatus("status", "Loaded " + f.name, "ok");
  } catch (e) {
    T.setStatus("status", e.message, "error");
  }
};

let mode = "json";

const setMode = m => {
  mode = m;
  $("#modeA").classList.toggle("active", m === "json");
  $("#modeB").classList.toggle("active", m === "csv");
};

$("#modeA").onclick = () => setMode("json");
$("#modeB").onclick = () => setMode("csv");

if ($("#file")) $("#file").addEventListener("change", loadFile);

$("#process").onclick = () => {
  try {
    if (mode === "json") {
      const v = JSON.parse($("#in").value);
      const arr = Array.isArray(v) ? v : [v];
      $("#out").value = T.toCsv(arr);
      $("#export").dataset.ext = ".csv";
    } else {
      const rows = T.csvToRows($("#in").value);
      const h = rows[0] || [];
      $("#out").value = JSON.stringify(
        rows.slice(1)
          .filter(r => r.some(Boolean))
          .map(r => Object.fromEntries(h.map((k, i) => [k, r[i] ?? ""]))),
        null,
        2
      );
      $("#export").dataset.ext = ".json";
    }
    T.setStatus("status", "Converted.", "ok");
  } catch (e) {
    T.setStatus("status", e.message, "error");
  }
};

$("#copy").onclick = () => T.copy($("#out").value, "status");
$("#export").onclick = () => T.download(
  T.baseName($("#file").files[0]?.name || "input") + "-converted" + ($("#export").dataset.ext || ".txt"),
  $("#out").value
);
$("#clear").onclick = clearAll;
