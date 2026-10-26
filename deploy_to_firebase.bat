@echo off
title Deploy Naeem Portfolio to Firebase
cd /d "%~dp0"

echo ===================================================
echo   Deploying Portfolio to Firebase Hosting
echo   Project: naeem-portfolio-2eea7
echo ===================================================
echo.

call firebase deploy --only hosting
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [Step 1/2] Firebase login is required. Opening Google Login...
    call firebase login
    echo.
    echo [Step 2/2] Deploying files to Firebase Hosting...
    call firebase deploy --only hosting
)

echo.
echo ===================================================
echo   Live Website URL:
echo   https://naeem-portfolio-2eea7.web.app
echo   https://naeem-portfolio-2eea7.firebaseapp.com
echo ===================================================
echo.
pause
