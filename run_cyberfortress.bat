@echo off
title CyberFortress Sentinel - Launching Prototype
cd /d "%~dp0"
echo ====================================================
echo   Starting CyberFortress Prototype (React + Vite)...
echo ====================================================
echo.
echo Opening browser at http://localhost:5173/ ...
start http://localhost:5173/
call npm.cmd run dev
pause
