/// <reference lib="deno.unstable" />

import * as http from "https://deno.land/std@0.134.0/http/mod.ts";
import { serveFile } from "https://deno.land/std@0.134.0/http/file_server.ts";

const handler = async (req: Request) => {
  const url = new URL(req.url);
  if (/\.(ts|tsx$)/.test(url.pathname)) {
    const fileUrl = new URL(`file://${Deno.cwd()}${url.pathname}`);
    const result = await Deno.emit(fileUrl, { check: false });
    return new Response(result.files[`${fileUrl}.js`], {
      headers: {
        "Content-Type": "application/javascript",
      },
    });
  }
  return serveFile(req, "index.html");
};

const listener = Deno.listen({
  hostname: "0.0.0.0",
  port: 80,
});

http.serveListener(listener, handler);
