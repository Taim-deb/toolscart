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
  try {
    $("#out").value = mode === "encode"
      ? encodeURIComponent($("#in").value)
      : decodeURIComponent($("#in").value);
    T.setStatus("status", "Done.", "ok");
  } catch (e) {
    T.setStatus("status", "Could not decode.", "error");
  }
};

$("#copy").onclick = () => T.copy($("#out").value, "status");
$("#export").onclick = () => T.download("url.txt", $("#out").value || $("#in").value);
$("#clear").onclick = clearAll;
