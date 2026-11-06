@echo off
cd /d "%~dp0"
echo Abrindo o catalogo local em http://localhost:8080  (feche esta janela para parar)
start "" http://localhost:8080
py -m http.server 8080 || python -m http.server 8080
pause
