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

const dec = p => JSON.parse(
  new TextDecoder().decode(
    Uint8Array.from(
      atob(
        p
          .replace(/-/g, "+")
          .replace(/_/g, "/")
          .padEnd(Math.ceil(p.length / 4) * 4, "=")
      ),
      c => c.charCodeAt(0)
    )
  )
);

if ($("#file")) $("#file").addEventListener("change", loadFile);

$("#process").onclick = () => {
  try {
    const p = $("#in").value.split(".");
    if (p.length < 2) throw new Error("JWT must have at least two parts.");
    $("#header").textContent = JSON.stringify(dec(p[0]), null, 2);
    $("#payload").textContent = JSON.stringify(dec(p[1]), null, 2);
    T.setStatus("status", "Decoded. Signature not verified.", "warn");
  } catch (e) {
    T.setStatus("status", e.message, "error");
  }
};

$("#copy").onclick = () => T.copy($("#header").textContent + "\n\n" + $("#payload").textContent, "status");
$("#export").onclick = () => T.download("jwt.txt", $("#header").textContent + "\n\n" + $("#payload").textContent);
$("#clear").onclick = clearAll;
