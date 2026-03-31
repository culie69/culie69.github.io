# GitHub Pages 发布（用户名：culie69）

## 推荐仓库名
- `culie69.github.io`

这样最终网址就是：
- `https://culie69.github.io`

## 一次性发布命令（PowerShell）
```powershell
cd C:\Users\LiLinfeng\personal-academic-site
git init
git branch -M main
git add .
git commit -m "feat: personal academic website"
git remote add origin https://github.com/culie69/culie69.github.io.git
git push -u origin main
```

## GitHub 页面设置
1. 打开仓库 `https://github.com/culie69/culie69.github.io`
2. 进入 `Settings` -> `Pages`
3. `Source` 选择 `Deploy from a branch`
4. 分支选 `main`，目录选 `/(root)`
5. 保存，等待 1-3 分钟

## 上线后访问
- `https://culie69.github.io`

## 本地预览
```powershell
cd C:\Users\LiLinfeng\personal-academic-site
node serve.js
```
- 浏览器打开 `http://localhost:8080`

## 说明
- 网站已改为单页结构：顶部导航点击后直接跳转到对应模块。
- 页面自带管理员编辑面板（右下角 `⚙`），可在线填写并实时应用。
- 为保证“别人不允许编辑源站”，请理解：静态站无法让访客改你的仓库内容；他们最多改自己本地浏览器缓存，不会影响你线上源文件。
