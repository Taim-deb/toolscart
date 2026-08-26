const $ = s => document.querySelector(s), T = window.ToolScart;

const defaults = { tl: "12", tr: "12", br: "12", bl: "12", link: true };

function updatePreview() {
  if ($("#link").checked) {
    const value = $("#tl").value;
    $("#tr").value = value;
    $("#br").value = value;
    $("#bl").value = value;
  }

  const value = `${$("#tl").value}px ${$("#tr").value}px ${$("#br").value}px ${$("#bl").value}px`;
  $("#box").style.borderRadius = value;
  $("#out").value = `border-radius: ${value};`;
}

function resetTool() {
  $("#tl").value = defaults.tl;
  $("#tr").value = defaults.tr;
  $("#br").value = defaults.br;
  $("#bl").value = defaults.bl;
  $("#link").checked = defaults.link;
  updatePreview();
  T.setStatus("status", "Cleared.");
}

["tl", "tr", "br", "bl", "link"].forEach(id => {
  const el = $("#" + id);
  if (el) el.addEventListener("input", updatePreview);
});

$("#link").addEventListener("change", updatePreview);
$("#process").onclick = updatePreview;
$("#copy").onclick = () => T.copy($("#out").value, "status");
$("#export").onclick = () => T.download("border-radius.css", $("#out").value);
$("#clear").onclick = resetTool;

updatePreview();
