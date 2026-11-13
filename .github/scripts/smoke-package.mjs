import assert from "node:assert/strict";
import { join } from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const packageDirectory = process.argv[2];
const transport = new StdioClientTransport({
  command: join(packageDirectory, "node_modules", ".bin", "mcp-gbiz-info"),
  cwd: packageDirectory,
  env: { GBIZ_INFO_API_KEY: "" },
});
const client = new Client({ name: "package-smoke-test", version: "1.0.0" });

try {
  await client.connect(transport, { timeout: 5_000 });
  assert.equal(client.getServerVersion()?.name, "mcp-gbiz-info");

  const { tools } = await client.listTools({}, { timeout: 5_000 });
  const names = tools.map((tool) => tool.name);
  assert.ok(names.includes("search_gbiz_info_from_name"));
  assert.ok(names.includes("get_gbiz_info_from_corporate_number"));
} finally {
  await transport.close();
}
