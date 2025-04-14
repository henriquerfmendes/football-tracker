"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const node_cron_1 = __importDefault(require("node-cron"));
const matchService_1 = require("./services/matchService");
const footballDataApiClient_1 = require("./clients/footballDataApiClient");
const matchPresenter_1 = require("./presenters/matchPresenter");
const dateUtil_1 = require("./utils/dateUtil");
const whatsappService_1 = require("./services/whatsappService");
const AppOrchestrator_1 = require("./orchestrators/AppOrchestrator");
const configValidator_1 = require("./utils/configValidator");
dotenv_1.default.config();
function initializeApp() {
    try {
        const config = configValidator_1.ConfigValidator.loadFromEnvironment();
        const dateUtil = new dateUtil_1.DateUtil();
        const apiClient = new footballDataApiClient_1.FootballDataApiClient(config.apiKey);
        const matchService = new matchService_1.MatchService(apiClient, dateUtil);
        const presenter = new matchPresenter_1.MatchPresenter();
        const services = {
            matchService,
            presenter,
            whatsAppService: {
                initialize: whatsappService_1.WhatsAppService.prototype.initialize,
                sendMessage: whatsappService_1.WhatsAppService.prototype.sendMessage,
            },
        };
        const orchestrator = new AppOrchestrator_1.ApplicationOrchestrator(services, config);
        const args = process.argv.slice(2);
        const mode = args[0] || "schedule";
        switch (mode) {
            case "test":
                orchestrator.testSendToOneNumber();
                break;
            case "run":
                orchestrator.fetchAndSendMatches();
                break;
            case "schedule":
                node_cron_1.default.schedule("0 10 * * 1", () => {
                    orchestrator.fetchAndSendMatches();
                });
                break;
            default:
                console.error(`Unknown mode: ${mode}`);
                process.exit(1);
        }
    }
    catch (error) {
        console.error("Error initializing application:", error.message);
        process.exit(1);
    }
}
initializeApp();
