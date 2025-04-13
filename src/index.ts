#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

async function featchApi(url: string): Promise<Response> {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "X-hojinInfo-api-token": process.env.GBIZ_INFO_API_KEY || ""
    }
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed with status: ${response.status}, body: ${errorText}`);
  }

  return response;
}

const server = new McpServer(
  {
    name: "mcp-gbiz-info",
    version: "0.0.1",
  }
);

server.tool(
  "search_gbiz_info_from_name",
  "gBiz Infoで法人名から法人情報を検索する",
  { 
    name: z.string()
  },
  async ({ name }) => {
    const params = { name: name };
    const query = new URLSearchParams(params);
    const response = await featchApi(`https://info.gbiz.go.jp/hojin/v1/hojin?${query}`);
    const responseData = await response.json();
    return {
      content: [
        {
          type: "text",
          text: `Search result for ${name}: ${JSON.stringify(responseData, null, 2)}`,
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
