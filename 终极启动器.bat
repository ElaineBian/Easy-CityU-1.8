@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion
title 🚀 Easy CityU 终极启动器

:: 获取脚本所在目录
set "SCRIPT_DIR=%~dp0"
set "WEB_ROOT=%SCRIPT_DIR%"

:: 颜色定义
set "GREEN=[92m"
set "BLUE=[94m"
set "YELLOW=[93m"
set "RED=[91m"
set "RESET=[0m"

:: 仅保留开场动画模式（无菜单）
cls
echo.
echo %BLUE%╔══════════════════════════════════════════════════════════════╗%RESET%
echo %BLUE%║                    🚀 Easy CityU 终极启动器                    ║%RESET%
echo %BLUE%║                    Launch: Animation Mode Only                 ║%RESET%
echo %BLUE%╚══════════════════════════════════════════════════════════════╝%RESET%
echo.
echo %GREEN%🎬 正在启动开场动画模式...%RESET%
goto animation_mode



:animation_mode
echo.
echo %GREEN%🎬 启动开场动画模式...%RESET%
echo %YELLOW%✨ 准备展示精彩的开场动画...%RESET%
call :check_python
if !python_available!==1 (
    call :start_python_server 8000
    echo %GREEN%🌟 服务器已启动，正在打开开场动画...%RESET%
    timeout /t 2 >nul
    call :open_browser "http://localhost:8000/splash.html"
) else (
    echo %YELLOW%⚠️ 使用直接文件模式启动开场动画%RESET%
    call :open_browser "%WEB_ROOT%splash.html"
)
goto end_program













:: 函数定义
:check_python
python --version >nul 2>&1
if %errorlevel%==0 (
    set python_available=1
) else (
    set python_available=0
)
goto :eof

:start_python_server
set port=%1
echo %GREEN%🌐 启动HTTP服务器 (端口: %port%)...%RESET%
cd /d "%WEB_ROOT%"
start /min cmd /c "python -m http.server %port%"
timeout /t 3 >nul
goto :eof

:open_browser
set url=%~1
echo %GREEN%🌐 打开浏览器: %url%%RESET%

:: 尝试Edge (首选)
start "" "msedge.exe" "%url%" 2>nul && goto :eof

:: 尝试Chrome
start "" "chrome.exe" "%url%" 2>nul && goto :eof

:: 尝试Firefox
start "" "firefox.exe" "%url%" 2>nul && goto :eof

:: 使用默认浏览器
start "" "%url%" 2>nul
goto :eof

:open_multiple_browsers
set url=%~1
echo %YELLOW%正在Edge中打开 (首选)...%RESET%
start "" "msedge.exe" "%url%" 2>nul
timeout /t 1 >nul

echo %YELLOW%正在Chrome中打开...%RESET%
start "" "chrome.exe" "%url%" 2>nul
timeout /t 1 >nul

echo %YELLOW%正在Firefox中打开...%RESET%
start "" "firefox.exe" "%url%" 2>nul
goto :eof

:direct_file_open
echo %YELLOW%⚠️ Python未安装，使用直接文件模式%RESET%
call :open_browser "%WEB_ROOT%index.html"
goto :eof

:check_browsers
where msedge.exe >nul 2>&1 && echo %GREEN%✅ Edge: 已安装%RESET% || echo %RED%❌ Edge: 未找到%RESET%
where chrome.exe >nul 2>&1 && echo %GREEN%✅ Chrome: 已安装%RESET% || echo %RED%❌ Chrome: 未找到%RESET%
where firefox.exe >nul 2>&1 && echo %GREEN%✅ Firefox: 已安装%RESET% || echo %RED%❌ Firefox: 未找到%RESET%
goto :eof

:end_program
echo.
echo %GREEN%✅ 网站已启动！%RESET%
echo %YELLOW%💡 提示: 关闭此窗口将停止服务器%RESET%
echo.

:exit_program
echo.
echo %GREEN%👋 感谢使用 Easy CityU 终极启动器！%RESET%
timeout /t 2 >nul
exit /b 0