# 本地服务器启动指南

## 方法一：使用Python脚本（推荐）

1. 双击运行 `start_server.bat` 文件
2. 或者在终端中运行：`python start_server.py`
3. 服务器将在端口8080启动，并自动打开浏览器

## 方法二：使用VS Code Live Server扩展

1. 安装 Live Server 扩展
2. 右键点击 `index.html` 文件
3. 选择 "Open with Live Server"

## 方法三：使用Node.js http-server

1. 安装Node.js
2. 运行：`npx http-server -p 8080`

## 方法四：直接打开HTML文件

1. 在VS Code中按F5
2. 选择 "Launch HTML File in Firefox (Direct)" 配置
3. 这将直接在Firefox中打开HTML文件（不需要服务器）

## 调试配置说明

- **Launch HTML File in Firefox (Direct)**: 直接打开HTML文件，适用于简单的静态页面
- **Launch with Live Server**: 需要Live Server扩展，适用于需要HTTP协议的项目

## 故障排除

如果遇到端口占用问题：
- Python脚本会自动尝试下一个端口
- 或者手动修改 `start_server.py` 中的 PORT 变量