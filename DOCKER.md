# Docker Deployment Guide

## Arquitetura

O projeto agora está totalmente containerizado com três serviços:

```
┌─────────────────┐
│   Frontend      │  Porta 80 (Nginx)
│   (React)       │
└────────┬────────┘
         │
         ↓ /api proxy
┌─────────────────┐
│   Backend       │  Porta 5000 (.NET)
│   (.NET 8 API)  │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   PostgreSQL    │  Porta 5432
│   (Database)    │
└─────────────────┘
```

## Pré-requisitos

- Docker Desktop instalado e rodando
- Windows com WSL2 habilitado

## Como executar

### 1. Build e Start (Primeira execução)

```bash
docker-compose up -d --build
```

Este comando irá:
- Construir as imagens do backend e frontend
- Iniciar o PostgreSQL
- Aguardar o PostgreSQL estar saudável
- Iniciar o backend
- Iniciar o frontend

### 2. Migrations Automáticas

As migrations são aplicadas automaticamente quando o backend inicia! 🎉

Você pode verificar se rodaram com sucesso:
```bash
docker-compose logs backend | grep "migrations"
```

Se precisar rodar manualmente ou verificar status:
```bash
# Verificar status do banco
docker-compose exec-backend ps aux
```

### 3. Acessar a aplicação

- **Frontend**: http://localhost
- **Backend API**: http://localhost:5000
- **PostgreSQL**: localhost:5432

## Comandos Úteis

### Visualizar logs
```bash
# Todos os serviços
docker-compose logs -f

# Apenas backend
docker-compose logs -f backend

# Apenas frontend
docker-compose logs -f frontend
```

### Parar os containers
```bash
docker-compose down
```

### Parar e remover volumes (limpa o banco)
```bash
docker-compose down -v
```

### Rebuild de um serviço específico
```bash
docker-compose up -d --build backend
docker-compose up -d --build frontend
```

### Acessar shell do container
```bash
# Backend
docker-compose exec backend sh

# Frontend
docker-compose exec frontend sh

# PostgreSQL
docker-compose exec postgres psql -U admin -d SolarCRM
```

## Estrutura de Arquivos Docker

```
erp-energia-solar/
├── Dockerfile.backend         # Dockerfile do .NET API
├── Dockerfile.frontend        # Dockerfile do React
├── docker-compose.yml         # Orquestração dos serviços
├── .dockerignore             # Arquivos ignorados no build
├── .env.example              # Template de variáveis de ambiente
└── client/
    └── nginx.conf            # Configuração do Nginx
```

## Detalhes Técnicos

### Backend (Dockerfile.backend)
- Multi-stage build para otimizar tamanho
- Stage 1: Build com SDK .NET 8
- Stage 2: Runtime com ASP.NET 8 (mais leve)
- Expõe porta 5000

### Frontend (Dockerfile.frontend)
- Multi-stage build
- Stage 1: Build com Node.js 18
- Stage 2: Servir com Nginx Alpine (muito leve)
- Nginx configurado como reverse proxy para `/api`
- Expõe porta 80

### Networking
- Todos os serviços na mesma rede Docker: `solarcrm-network`
- Frontend se comunica com backend via nome do serviço: `http://backend:5000`
- Backend se comunica com PostgreSQL via: `postgres:5432`

### Health Checks
- PostgreSQL tem health check configurado
- Backend só inicia após PostgreSQL estar saudável

## Troubleshooting

### Container do backend não inicia
```bash
docker-compose logs backend
```
Verifique se o PostgreSQL está rodando e saudável.

### Erro de conexão com o banco
Verifique a connection string no docker-compose.yml:
```yaml
ConnectionStrings__DefaultConnection=Host=postgres;Port=5432;Database=SolarCRM;Username=admin;Password=password
```

### Frontend não conecta no backend
- Verifique se o nginx.conf está correto
- O proxy está configurado para `/api` → `http://backend:5000`
- Verifique logs: `docker-compose logs frontend`

### Rebuild completo
Se algo está muito errado:
```bash
docker-compose down -v
docker system prune -a
docker-compose up -d --build
```

## Produção

Para produção, considere:

1. **Variáveis de ambiente**: Use um arquivo `.env` real (não commitar)
2. **Secrets**: Use Docker secrets ou Azure Key Vault
3. **HTTPS**: Configure certificados SSL
4. **Volumes**: Faça backup do volume postgres_data
5. **Logging**: Configure logging centralizado
6. **Monitoring**: Adicione Prometheus/Grafana
7. **Scaling**: Use Docker Swarm ou Kubernetes

## Performance

### Tamanhos das imagens
- Backend: ~200MB (ASP.NET runtime)
- Frontend: ~50MB (Nginx + arquivos estáticos)
- PostgreSQL: ~250MB

### Recursos recomendados
- Backend: 512MB RAM mínimo
- Frontend: 128MB RAM mínimo
- PostgreSQL: 512MB RAM mínimo
