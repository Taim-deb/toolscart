const $ = s => document.querySelector(s);
const T = window.ToolScart;

const loadFile = async () => {
  const f = $("#file").files[0];
  if (!f) return;
  try {
    $("#in").value = await T.readFile(f, [".txt", ".md"]);
    $("#filemeta").textContent = "Selected file: " + f.name;
    T.setStatus("status", "Loaded " + f.name, "ok");
  } catch (e) {
    T.setStatus("status", e.message, "error");
  }
};

if ($("#file")) $("#file").addEventListener("change", loadFile);

$("#process").onclick = () => {
  $("#out").value = T.slugify($("#in").value);
  T.setStatus("status", "Generated.", "ok");
};

$("#copy").onclick = () => T.copy($("#out").value, "status");
$("#export").onclick = () => T.download("slug.txt", $("#out").value);
$("#clear").onclick = clearAll;
