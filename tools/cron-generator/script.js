const $ = s => document.querySelector(s);
const T = window.ToolScart;

$("#process").onclick = () => {
  $("#out").value = [...document.querySelectorAll("[data-cron]")]
    .map(i => i.value.trim() || "*")
    .join(" ");
  T.setStatus("status", "Generated.", "ok");
};

$("#copy").onclick = () => T.copy($("#out").value, "status");
$("#export").onclick = () => T.download("cron.txt", $("#out").value);
$("#clear").onclick = clearAll;
