# YoudaoJS

> Node.js 有道翻译模块

- 开发日期：2023 年 4 月 11 日
- 作者：欧阳鹏

## 安装

```bash
npm install youdaojs
```

## 导入

- TypeScript

    ```typescript
    import YouDaoJS from './main'
    ```
- JavaScript

    ```javascript
    const YouDaoJS = require("./main").default
    ```

## 使用

```javascript
const fanyi = new YouDaoJS()
fanyi.getResult('你好').then(data => {
    console.log(data)
})
fanyi.getResult('hello', 2, 1).then(data => {
    console.log(data)
})
```

## 语言代码列表

参见：[https://github.com/oyps/apee-fanyi#语言代码列表](https://github.com/oyps/apee-fanyi#%E8%AF%AD%E8%A8%80%E5%88%97%E8%A1%A8)