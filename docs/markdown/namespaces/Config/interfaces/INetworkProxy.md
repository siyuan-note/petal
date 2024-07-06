[**SiYuan Plugin API v1.0.2**](../../../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../../../README.md) / [Config](../README.md) / INetworkProxy

# Interface: INetworkProxy

SiYuan Network proxy configuration

## Properties

| Property | Type                                                                        | Description                                                                                                                            | Defined in                                                                                       |
| -------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `host`   | `string`                                                                    | Host name or host address                                                                                                              | [types/config.d.ts:1456](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1456) |
| `port`   | `string`                                                                    | Proxy server port number                                                                                                               | [types/config.d.ts:1460](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1460) |
| `scheme` | [`TSystemNetworkProxyScheme`](../type-aliases/TSystemNetworkProxyScheme.md) | The protocol used by the proxy server - Empty String: Use the system proxy settings - `http`: HTTP - `https`: HTTPS - `socks5`: SOCKS5 | [types/config.d.ts:1468](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1468) |
