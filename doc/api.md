## 导入Api

```js
import { Plugin, Menu, Dialog, clientApi, serverApi } from 'siyuan'
```

或者

```js
const { Plugin, Menu, Dialog, clientApi, serverApi } = require（'siyuan'）
```

## 使用Api

### serverApi

#### 获取文档 markdown

```js
fileId = "20200813093015-u6bopdt"
import { serverApi } from 'siyuan'
let res = await serverApi.exportMdContent(fileId)

// arg: fileId，string类型，目标文档的id
// return: res = \{
//     "hPath": "",
//     "content": ""
//   }
 
//  * hPath：人类可读的路径
//  * content：Markdown 内容
```
