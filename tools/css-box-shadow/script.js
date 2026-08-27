const $ = s => document.querySelector(s);
const T = window.ToolScart;

const rgb = hex => {
  const n = hex.slice(1);
  const s = n.length === 3 ? n.split("").map(x => x + x).join("") : n;
  return parseInt(s.slice(0, 2), 16) + "," +
         parseInt(s.slice(2, 4), 16) + "," +
         parseInt(s.slice(4, 6), 16);
};

const update = () => {
  const val = ($("#inset").checked ? "inset " : "") +
    $("#x").value + "px " +
    $("#y").value + "px " +
    $("#blur").value + "px " +
    $("#spread").value + "px rgba(" +
    rgb($("#color").value) + "," +
    $("#opacity").value + ")";
  $("#box").style.boxShadow = val;
  $("#out").value = "box-shadow: " + val + ";";
};

["x", "y", "blur", "spread", "opacity", "color", "inset"]
  .forEach(id => $("#" + id).addEventListener("input", update));

$("#process").onclick = update;
$("#copy").onclick = () => T.copy($("#out").value, "status");
$("#export").onclick = () => T.download("box-shadow.css", $("#out").value);
$("#clear").onclick = clearAll;

update();
