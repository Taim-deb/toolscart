const $ = s => document.querySelector(s);
const T = window.ToolScart;

const loadFile = async () => {
  const f = $("#file").files[0];
  if (!f) return;
  try {
    $("#in").value = await T.readFile(f, [".txt", ".html", ".md"]);
    $("#filemeta").textContent = "Selected file: " + f.name;
    T.setStatus("status", "Loaded " + f.name, "ok");
  } catch (e) {
    T.setStatus("status", e.message, "error");
  }
};

let mode = "encode";

$("#modeA").onclick = () => {
  mode = "encode";
  $("#modeA").classList.add("active");
  $("#modeB").classList.remove("active");
};

$("#modeB").onclick = () => {
  mode = "decode";
  $("#modeB").classList.add("active");
  $("#modeA").classList.remove("active");
};

if ($("#file")) $("#file").addEventListener("change", loadFile);

$("#process").onclick = () => {
  const ta = document.createElement("textarea");
  if (mode === "encode") {
    ta.textContent = $("#in").value;
    $("#out").value = ta.innerHTML;
  } else {
    ta.innerHTML = $("#in").value;
    $("#out").value = ta.value;
  }
  T.setStatus("status", "Done.", "ok");
};

$("#copy").onclick = () => T.copy($("#out").value, "status");
$("#export").onclick = () => T.download("entities.txt", $("#out").value || $("#in").value);
$("#clear").onclick = clearAll;
