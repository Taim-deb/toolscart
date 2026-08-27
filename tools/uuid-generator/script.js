const $ = s => document.querySelector(s);
const T = window.ToolScart;

$("#process").onclick = () => {
  const count = Math.max(1, Math.min(100, Number($("#count").value) || 1));
  $("#out").innerHTML = [...Array(count)]
    .map(() => '<div class="preview" style="min-height:auto;padding:10px">' + crypto.randomUUID() + "</div>")
    .join("");
  T.setStatus("status", "Generated.", "ok");
};

$("#copy").onclick = () => T.copy(
  [...$("#out").querySelectorAll(".preview")].map(x => x.textContent).join("\n"),
  "status"
);
$("#export").onclick = () => T.download(
  "uuids.txt",
  [...$("#out").querySelectorAll(".preview")].map(x => x.textContent).join("\n")
);
$("#clear").onclick = clearAll;
