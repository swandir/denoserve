/// <reference lib="dom" />

const { default: message } = await import("./module.ts");

document.body.innerText += " " + message();
