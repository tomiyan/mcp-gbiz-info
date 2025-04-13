# mcp-gbiz-info

gBizInfo 法人番号 MCPサーバー
経済産業省の[gBizInfo API](https://info.gbiz.go.jp/api/index.html)を利用して法人番号を取得するためのMCPです

[利用申請](https://info.gbiz.go.jp/hojin/api_registration/form)をしてアクセストークンを発行して利用してください

## 機能

- `search_gbiz_info_from_name`
  - 法人名から法人番号を検索します
- ``search_gbiz_info_from_number`
  - 法人番号から法人情報を取得します

## VSCodeでの利用方法

`settings.json` に以下のように記述してください

```json
{
  "mcp": {
        "inputs": [],
        "servers": {
            "gbiz-info": {
                "command": "npx",
                "args": [
                    "mcp-gbiz-info@latest",
                ],
                "env": {
                    "GBIZ_INFO_API_KEY": "YOUR_API_TOKEN",
                }
            }
        }
  }
}
```
