const $ = s => document.querySelector(s);
const T = window.ToolScart;

const loadFile = async () => {
  const f = $("#file").files[0];
  if (!f) return;
  try {
    $("#in").value = await T.readFile(f, [".css", ".txt"]);
    $("#filemeta").textContent = "Selected file: " + f.name;
    T.setStatus("status", "Loaded " + f.name, "ok");
  } catch (e) {
    T.setStatus("status", e.message, "error");
  }
};

let mode = "format";

$("#modeA").onclick = () => {
  mode = "format";
  $("#modeA").classList.add("active");
  $("#modeB").classList.remove("active");
};

$("#modeB").onclick = () => {
  mode = "minify";
  $("#modeB").classList.add("active");
  $("#modeA").classList.remove("active");
};

if ($("#file")) $("#file").addEventListener("change", loadFile);

$("#process").onclick = () => {
  const v = $("#in").value;
  $("#out").value = mode === "format"
    ? v
        .replace(/\s+/g, " ")
        .replace(/\s*{\s*/g, " {\n  ")
        .replace(/;\s*/g, ";\n  ")
        .replace(/\s*}\s*/g, "\n}\n")
        .trim()
    : v
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\s+/g, " ")
        .replace(/\s*([{}:;,])\s*/g, "$1")
        .replace(/;}/g, "}")
        .trim();
  T.setStatus("status", mode === "format" ? "Formatted." : "Minified.", "ok");
};

$("#copy").onclick = () => T.copy($("#out").value, "status");
$("#export").onclick = () => T.download("style.css", $("#out").value || $("#in").value);
$("#clear").onclick = clearAll;
