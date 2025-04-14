import dotenv from "dotenv";
import cron from "node-cron";
import { MatchService } from "./services/matchService";
import { FootballDataApiClient } from "./clients/footballDataApiClient";
import { MatchPresenter } from "./presenters/matchPresenter";
import { DateUtil } from "./utils/dateUtil";
import { WhatsAppService } from "./services/whatsappService";
import { ApplicationOrchestrator } from "./orchestrators/AppOrchestrator";
import { ConfigValidator } from "./utils/configValidator";
import { Services } from "./types";

dotenv.config();

function initializeApp(): void {
  try {
    const config = ConfigValidator.loadFromEnvironment();

    const dateUtil = new DateUtil();
    const apiClient = new FootballDataApiClient(config.apiKey);
    const matchService = new MatchService(apiClient, dateUtil);
    const presenter = new MatchPresenter();

    const services: Services = {
      matchService,
      presenter,
      whatsAppService: {
        initialize: WhatsAppService.prototype.initialize,
        sendMessage: WhatsAppService.prototype.sendMessage,
      },
    };

    const orchestrator = new ApplicationOrchestrator(services, config);

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
        cron.schedule("0 10 * * 1", () => {
          orchestrator.fetchAndSendMatches();
        });
        break;

      default:
        console.error(`Unknown mode: ${mode}`);
        process.exit(1);
    }
  } catch (error) {
    console.error("Error initializing application:", (error as Error).message);
    process.exit(1);
  }
}

initializeApp();