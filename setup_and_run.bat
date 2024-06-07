@echo off
REM Verificar se o Docker está em execução
docker info >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Docker não está em execução. Por favor, inicie o Docker e tente novamente.
    exit /b 1
)

REM Navegar até o diretório src e instalar as dependências
echo Instalando dependências no diretório src...
cd src
npm install
cd ..

REM Iniciar o Docker Compose
echo Iniciando Docker Compose...
docker-compose up -d

REM Iniciar o SAM CLI
echo Iniciando SAM CLI...
sam local start-api
