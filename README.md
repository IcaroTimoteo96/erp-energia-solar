# Solar CRM

Um sistema CRM completo feito com .NET 8 e React para empresas de energia solar.

A comprehensive CRM system for solar energy companies built with .NET 8 and React.

Acesse a aplicação: [CRM Solar](https://erpenergiasolarv1.vercel.app/login)

**Credenciais para usuário admin: 
Email: admin@solarcrm.com
Senha: Admin@123**

## Features

✅ **CRM & Lead Management** - Monitorar leads, gerenciar atividades, e serviço personalizado - Track leads, manage interactions, and personalize customer service

✅ **Solar Calculator** - Gerar orçamentos integrado a uma calculadora - Generate accurate quotes with integrated solar calculator

✅ **Project Management** - Monitorar do projeto desde o orçamento até a instalação - Complete project tracking from sizing to installation validation

✅ **Service Orders** - Gerenciar instalações e manutenções com listas de verificação - Manage installations and maintenance with digital checklists

✅ **Inventory Management** - Monitoramento de componentes e manutenção de estoques - Track solar components and maintain stock levels

✅ **Support System** - Gerenciar tickets e suporte técnico - Handle customer tickets and technical support requests

## Tech Stack

**Backend:**
- .NET 8 (Clean Architecture)
- Entity Framework Core
- PostgreSQL
- Docker

**Frontend:**
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

## Prerequisites

- .NET 8 SDK (for local development)
- Node.js 18+ and npm (for local development)
- **Docker Desktop** (for containerized deployment - **RECOMENDADO**)
- Git

## Getting Started

### Opção 1: Docker (Recomendado) 🐳

A forma mais rápida de executar o projeto completo:

```bash
# 1. Clone o repositório
git clone <repository-url>
cd erp-energia-solar

# 2. Inicie todos os serviços (PostgreSQL + Backend + Frontend)
docker-compose up -d --build

# 3. Execute as migrations (primeira vez)
docker-compose exec backend dotnet ef database update

# 4. Acesse a aplicação
# Frontend: http://localhost
# Backend API: http://localhost:5000
```

✅ Tudo pronto! Veja [DOCKER.md](DOCKER.md) para mais detalhes.

### Opção 2: Desenvolvimento Local

Para desenvolvimento local sem Docker:

### 1. Clone the Repository

```bash
git clone <repository-url>
cd erp-energia-solar
```

### 2. Start PostgreSQL Database

Make sure Docker Desktop is running, then:

```bash
docker-compose up -d
```

### 3. Run Database Migrations

```bash
dotnet ef database update -p src/SolarCRM.Infrastructure -s src/SolarCRM.Api
```

### 4. Start the Backend API

```bash
cd src/SolarCRM.Api
dotnet run
```

The API will be available at `http://localhost:5000`

### 5. Start the Frontend

In a new terminal:

```bash
cd client
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Project Structure

```
erp-energia-solar/
├── src/
│   ├── SolarCRM.Domain/         # Domain entities and interfaces
│   ├── SolarCRM.Application/    # Business logic and services
│   ├── SolarCRM.Infrastructure/ # Data access and repositories
│   └── SolarCRM.Api/            # REST API controllers
├── client/                      # React frontend
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   ├── pages/               # Page components
│   │   └── services/            # API client services
│   └── ...
└── docker-compose.yml           # PostgreSQL configuration
```

## API Endpoints

### Leads
- `GET /api/leads` - Buscar todos os leads - Get all leads
- `POST /api/leads` - Criar um novo lead - Create a new lead
- `GET /api/leads/{id}` - Buscar lead por ID - Get lead by ID
- `PUT /api/leads/{id}` - Atualizar lead - Update lead
- `DELETE /api/leads/{id}` - Remover lead - Delete lead

### Quotes
- `GET /api/quotes` - Buscar todos os orçamentos - Get all quotes
- `POST /api/quotes` - Criar um novo orçamento - Create a new quote
- `POST /api/quotes/calculate` - Calcular o tamanho da placa solar - Calculate solar system size

### Projects
- `GET /api/projects` - Buscar todos os projetos - Get all projects
- `POST /api/projects` - Criar um novo projeto - Create a new project
- `POST /api/projects/{id}/documents` - Enviar um documento do projeto - Upload project document

### Service Orders
- `GET /api/serviceorders` - Buscar todas as ordens de serviços - Get all service orders
- `POST /api/serviceorders` - Criar uma nova ordem de serviço - Create a new service order
- `POST /api/serviceorders/{id}/checklist` - Adicionar uma lista de verificação - Add checklist item

### Products (Inventory)
- `GET /api/products` - Buscar todos os produtos - Get all products
- `POST /api/products` - Criar um novo produto - Create a new product
- `PUT /api/products/{id}` - Atualizar um produto - Update product
- `DELETE /api/products/{id}` - Remover um produto - Delete product

### Tickets (Support)
- `GET /api/tickets` - Buscar todos o tickets - Get all tickets
- `POST /api/tickets` - Criar um novo ticket - Create a new ticket
- `PUT /api/tickets/{id}` - Atualizar um ticket - Update ticket

### Interactions
- `GET /api/interactions/lead/{leadId}` - Buscar atividades por lead - Get interactions by lead
- `POST /api/interactions` - Criar uma nova atividade - Create a new interaction

## Database Schema

Main entities:
- **Lead** - Potenciais Clientes - Potential customers
- **Interaction** - Histórico de atividade do cliente - Customer interaction history
- **Quote** - Orçamento com os itens - Solar system quotes with items
- **Product** - Catálogo de componentes - Solar components inventory
- **Project** - Instalação de projetos com documentos - Installation projects with documents
- **ServiceOrder** - Ordem de serviço com lista de verificação - Service orders with checklists
- **Ticket** - Suporte para os tickets - Support tickets

## Development

### Running Migrations

Create a new migration:
```bash
dotnet ef migrations add MigrationName -p src/SolarCRM.Infrastructure -s src/SolarCRM.Api
```

Apply migrations:
```bash
dotnet ef database update -p src/SolarCRM.Infrastructure -s src/SolarCRM.Api
```

### Building for Production

Backend:
```bash
dotnet publish src/SolarCRM.Api -c Release -o ./publish
```

Frontend:
```bash
cd client
npm run build
```

## Environment Variables

### Backend (appsettings.json)
- Database connection string configured for PostgreSQL on port 5432

### Frontend
- API base URL: `http://localhost:5000/api`

## License

MIT

## Support

For issues and questions, please create an issue in the repository.
