# Easy CityU - 最终版使用说明（权威 README）

本 README 汇总了多次迭代后的最终结论与操作方式，统一启动体验为“单标签页 + 开场动画模式 + Edge 优先”，并整合全部新增特性与注意事项。历史文档已迁移至 docs/ 保留查阅。

一、项目简介
- 开场动画：City University of Hong Kong（splash.html，动画结束后无缝进入主页）
- 主页：main.html（完整功能页面）
- 目标：提供统一、稳定、无二次弹窗的启动体验

二、快速开始（唯一推荐入口）
- 步骤：
  1) 双击 终极启动器.bat
  2) 启动器将自动：
     - 启动本地静态服务器（默认端口 8000，若占用将自动递增重试）
     - 仅打开 splash.html（开场动画），动画结束后在同一标签通过 window.location.replace 跳转至 main.html
  3) 浏览器优先级：Edge（首选）→ Chrome → Firefox（若 Edge 不存在自动回退）
- 停止：关闭终端窗口或 Ctrl + C 结束 Python 进程
- 备用（极端情况）：如未自动打开浏览器，可手动访问 http://localhost:8000/splash.html

三、网站功能概览（新增与核心）
- 开场动画（splash.html）
  - City University of Hong Kong 品牌动画
  - 结束/跳过后使用 window.location.replace 进入主页，确保浏览器仅有一个标签页
  - 交互去抖：事件监听 once + clearTimeout，杜绝同时触发导致的重复跳转
- 主页（main.html）
  - 多语言与本地化（language.js，localStorage 保存语言偏好）
  - 主题切换与持久化（theme.js，localStorage 保存主题）
  - 搜索与自动完成（search.js、course-autocomplete.js）
  - 论坛模块（forum-*.js：发帖、回复、上传、通知）
  - 资源与滑块展示（resources.js、slider/hero-slider）
  - 相机/拍照搜索（camera.js）
  - 通知/提示与动效（notification.js、CSS 动画）
  - 其他：登录/注册页、课程笔记页、响应式导航与页头/页脚
- 性能与体验
  - 单标签策略：由动画页 replace 到主页，避免多标签/“二次弹窗”
  - 禁用缓存头：start_server.py 对静态资源发送 no-cache 标头，避免动画或主页资源缓存异常
  - 浏览器优先 Edge：系统存在 Edge 时优先调用 msedge.exe 打开
  - 直接文件备用模式：Python 不可用时，启动器回退为本地文件方式打开（功能可能受限，作为应急）

四、启动器与服务器行为（最终定稿）
- 终极启动器.bat（唯一启动脚本）
  - 仅“开场动画模式”，无菜单与其他选项
  - 只打开 splash.html，不会延时再打开首页或其它页面
  - 浏览器检测顺序：Edge → Chrome → Firefox → 系统默认
  - Python 不存在时：使用直接文件模式，仅打开 splash.html（file://），仍保持单标签
- start_server.py（可选）
  - 默认端口 8000，如端口占用则自增重试（兼容 Windows 10048 与通用 EADDRINUSE）
  - 发送 Cache-Control/Pragma/Expires 禁用缓存
  - 不再自动打开浏览器（避免与启动器重复打开）
  - 脚本工作目录自动切换至项目根目录

五、目录结构（核心项）
- splash.html：开场动画（结束/跳过后 replace → main.html）
- main.html：主功能页面（语言、主题、搜索、论坛、资源、相机等）
- 终极启动器.bat：默认仅开动画页（Edge 优先），全程单标签
- start_server.py：本地服务器（端口 8000，自增重试，禁用缓存，不开浏览器）
- css/、js/、images/：站点静态资源
- 其余历史/说明文档：docs/ 与 docs/archive/ 下保留

六、浏览器与兼容性
- 推荐使用 Edge（首选），兼容 Chrome/Firefox；未安装 Edge 时自动回退
- 若浏览器阻止本地弹窗，请允许 http://localhost
- 深入说明参阅：docs/README-浏览器兼容性.md

七、本地服务器（可选）
- 推荐使用“终极启动器.bat”自动启动 Python 服务器
- 或手动运行：python -m http.server 8000
- 服务端特性：统一端口 8000（自增重试）、禁用缓存、不自动开浏览器
- 深入说明参阅：docs/README_SERVER.md

八、常见问题（FAQ）
- 每次为何只有一个标签页？
  - 采用“开场动画 → replace 主页”的单标签策略，严格避免多标签或二次弹窗
- 如何直接进入主页而不看动画？
  - 手动访问 http://localhost:8000/main.html（不作为默认入口）
- 没有 Edge 怎么办？
  - 启动器会自动回退到 Chrome 或 Firefox
- 端口 8000 被占用怎么办？
  - 启动器/脚本会自动尝试下一个端口；也可先关闭占用该端口的进程后重试
- 直接文件模式会有什么影响？
  - 某些功能可能受限（如相对路径/跨源限制）。建议尽量使用本地服务器

九、变更摘要（本次迭代要点）
- 启动器精简为“单模式”：仅开场动画 → 主页（单标签、无二次弹窗）
- 浏览器首选改为 Edge（msedge.exe），自动回退到 Chrome/Firefox
- 彻底去除对 launch.json / JSON 启动配置的依赖，采用批处理与纯前端方案
- start_server.py：统一端口为 8000、禁用缓存、移除自动打开浏览器、端口占用自增重试
- 文档合并与归档：根 README 作为唯一权威入口；历史/扩展说明迁移至 docs/

十、历史文档与更多说明
- 历史与扩展说明：
  - docs/README-浏览器兼容性.md
  - docs/README_SERVER.md
  - docs/使用说明.md
  - docs/批处理启动器使用说明.md
- 过程性报告（存档）：
  - docs/archive/方案C实施完成报告.md
  - docs/archive/项目启动解决方案总结.md
  - docs/archive/JSON文件安全删除报告.md

如需新增截图/Logo、端口自定义或打包分发说明，请提出具体需求，我将补充相应章节。