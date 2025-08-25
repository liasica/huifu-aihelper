# 汇付天下斗拱平台AI助手

### 帮助

#### 获取API文档
```javascript
import {  getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()!
const doc = await proxy!.$interceptor.getApiDoc()
console.info(doc)
```
