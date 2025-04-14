# Football Tracker

Um aplicativo Node.js busca as próximas partidas de múltiplas competições de futebol para os próximos dias e envia notificações via WhatsApp para múltiplos números. Originalmente, desenvolvi para buscar as partidas de futebol nos próximos 7 dias das ligas europeias: Premier League, La Liga e UEFA Champions League.

## Funcionalidades

- Busca partidas de futebol das próximas competições configuradas
- Agrupa partidas por data e competição
- Formata as informações de forma amigável com emojis
- Envia mensagens via WhatsApp para os números configurados
- Execução programada (toda segunda-feira às 10h)
- Modo de teste para enviar apenas para um número

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução
- **TypeScript**: Linguagem de programação
- **Venom-bot**: API para interação com WhatsApp
- **Axios**: Cliente HTTP para requisições à API
- **node-cron**: Biblioteca de agendamento de tarefas
- **Football-data.org API**: Fonte de dados sobre partidas

## Estrutura do Projeto

```
.
├── src/
│   ├── clients/         # Clientes para APIs externas
│   ├── interfaces/      # Definições de interfaces
│   ├── orchestrators/   # Orquestradores de fluxos
│   ├── presenters/      # Formatação de dados para apresentação
│   ├── services/        # Serviços de negócio
│   ├── types/           # Definições de tipos
│   ├── utils/           # Utilitários
│   └── index.ts         # Ponto de entrada da aplicação
├── package.json         # Configurações do projeto
├── tsconfig.json        # Configurações do TypeScript
├── .env-example         # Exemplo de variáveis de ambiente
├── .gitignore           # Arquivos ignorados pelo git
├── .env                 # Variáveis de ambiente (não versionado)
├── README.md            # Documentação do projeto
└── package-lock.json    # Lock de dependências
```

## Como Configurar

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Crie um arquivo `.env` na raiz do projeto baseado no `.env-example`
4. Obtenha uma chave de API em [football-data.org](https://www.football-data.org/client/register)

## Como Executar

### Compilar o Projeto

```
npm run build
```

### Executar o Projeto (Modo Agendado - padrão: toda segunda-feira às 10h)

```
npm start schedule
```

### Executar o Projeto em Modo de Teste (envia para o primeiro número do arquivo .env)

```
npm start test
```

### Executar o Projeto em Modo de Execução Única

```
npm start run
```

## Observação

- O projeto utiliza a API do Venom-bot para enviar mensagens via WhatsApp. A Meta não reconhece o Venom-bot como um meio oficial de envio de mensagens WhatsApp. Desta forma, tenha cautela ao utilizar o projeto, evitando o envio de mensagens em massa, caso contrário, sua conta WhatsApp poderá ser bloqueada.

---

# Football Tracker

A Node.js application that fetches upcoming matches from multiple football competitions for the next few days and sends notifications via WhatsApp to multiple phone numbers. Originally, I developed it to fetch football matches for the next 7 days from European leagues: Premier League, La Liga, and UEFA Champions League.

## Features

- Fetches football matches from configured upcoming competitions
- Groups matches by date and competition
- Formats information in a user-friendly way with emojis
- Sends messages via WhatsApp to configured numbers
- Scheduled execution (every Monday at 10 AM)
- Test mode to send only to one number

## Technologies Used

- **Node.js**: Runtime environment
- **TypeScript**: Programming language
- **Venom-bot**: API for WhatsApp interaction
- **Axios**: HTTP client for API requests
- **node-cron**: Task scheduling library
- **Football-data.org API**: Data source for matches

## Project Structure

```
.
├── src/
│ ├── clients/ # Clients for external APIs
│ ├── interfaces/ # Interface definitions
│ ├── orchestrators/ # Flow orchestrators
│ ├── presenters/ # Data formatting for presentation
│ ├── services/ # Business services
│ ├── types/ # Type definitions
│ ├── utils/ # Utilities
│ └── index.ts # Application entry point
├── package.json # Project settings
├── tsconfig.json # TypeScript settings
├── .env-example # Environment variables example
├── .gitignore # Files ignored by git
├── .env # Environment variables (not versioned)
├── README.md # Project documentation
└── package-lock.json # Dependencies lock
```

## How to Configure

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the project root based on `.env-example`
4. Get an API key from [football-data.org](https://www.football-data.org/client/register)

## How to Run

### Build the Project

```
npm run build
```

### Run the Project (Scheduled Mode - default: every Monday at 10 AM)

```
npm start schedule
```

### Run the Project in Test Mode (sends to the first number in the .env file)

```
npm start test
```

### Run the Project in Single Execution Mode

```
npm start run
```

## Note

- The project uses the Venom-bot API to send messages via WhatsApp. Meta does not recognize the Venom-bot as an official WhatsApp messaging medium. Therefore, use the project with caution, avoiding the sending of mass messages, otherwise, your WhatsApp account may be blocked.
