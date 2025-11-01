# Aboard
一个简约的web白板，更适合中国宝宝体质 | Just a board.

## 功能特性 Features

### 核心绘图引擎 Core Drawing Engine
- ✅ 实时、连续、低延迟渲染 (Real-time, continuous, low-latency rendering)
- ✅ 笔迹平滑算法，确保线条流畅 (Stroke smoothing for fluid lines)
- ✅ 同时支持鼠标和触控输入 (Mouse and touch input support)
- ✅ 性能优化，目标60fps (Performance optimized for 60fps)
- ✅ 多种笔触类型：普通笔、铅笔、圆珠笔、钢笔、毛笔 (Multiple pen types)

### 工具栏 Toolbar
- **笔工具** (Pen Tool) - 默认选中，支持多种颜色和粗细
- **橡皮擦** (Eraser Tool) - 可调节大小的橡皮擦
- **背景设置** (Background) - 多种背景颜色和图案（空白、点阵、方格、田字格、英语四线、五线谱、坐标系）
- **清空画布** (Clear Canvas) - 一键清空（有确认提示）
- **设置** (Settings) - 分页设置界面

### 动态配置区 Dynamic Configuration
- **笔模式**: 笔触类型、颜色选择器、粗细滑块（3-15px）
- **橡皮模式**: 橡皮擦大小滑块（10-30px）
- **背景模式**: 背景颜色、图案、透明度、图案深浅
- **智能行为**: 绘画后自动关闭，点击工具按钮时显示
- **关闭按钮**: 点击配置面板右上角的 X 按钮关闭面板

### 历史管理 History Management
- ↶ 撤销 (Undo) - 快捷键 Ctrl+Z
- ↷ 重做 (Redo) - 快捷键 Ctrl+Y
- 支持最多50步历史记录

### 设置系统 Settings System
- **分页设置**: 通用、显示、画布三个标签页
- **通用设置**: 边缘吸附、控制按钮位置
- **显示设置**: 工具栏按钮大小、属性栏缩放
- **画布设置**: 无限画布模式/分页系统

## 使用方法 Usage

### 快速开始 Quick Start
1. 打开 `index.html` 文件即可使用
2. 或使用任何HTTP服务器运行：
   ```bash
   python3 -m http.server 8080
   # 然后访问 http://localhost:8080
   ```

### 操作说明 Instructions
- **绘图**: 点击/触摸画布并拖动
- **切换工具**: 点击底部工具栏按钮
- **改变颜色**: 在笔模式下点击颜色按钮
- **调节粗细**: 拖动滑块
- **撤销/重做**: 点击右上角按钮或使用键盘快捷键
- **属性面板**: 点击工具按钮显示，绘画后自动关闭

## 技术栈 Tech Stack
- HTML5 Canvas
- Vanilla JavaScript (无框架依赖，模块化架构)
- CSS3

## 浏览器兼容性 Browser Compatibility
- ✅ Chrome (最新版本)
- ✅ Safari (最新版本)
- ✅ Firefox (最新版本)
- ✅ Edge (最新版本)
- ✅ 移动浏览器 (iOS Safari, Chrome Mobile)

## 项目结构 Project Structure
```
Aboard/
├── index.html          # 主HTML文件
├── css/
│   └── style.css       # 样式表
├── js/
│   ├── drawing.js      # 绘图引擎模块
│   ├── history.js      # 历史记录管理模块
│   ├── background.js   # 背景管理模块
│   ├── settings.js     # 设置管理模块
│   └── main.js         # 主应用入口
└── README.md           # 项目说明
```

## 代码架构 Code Architecture

### 模块化设计 Modular Design
项目采用模块化架构，代码按功能分离到不同的文件中：

- **DrawingEngine**: 处理所有绘图操作、笔触类型和画布交互
- **HistoryManager**: 管理撤销/重做功能
- **BackgroundManager**: 处理背景颜色、图案和渲染
- **SettingsManager**: 管理应用设置和偏好
- **DrawingBoard**: 主应用类，集成所有模块并处理用户交互

### 性能优化 Performance Optimizations
- Canvas context 的 `desynchronized` 模式
- 单路径渲染减少绘制调用
- 高DPI显示屏适配
- 智能状态管理减少不必要的重绘

## License
MIT License - 详见 LICENSE 文件
