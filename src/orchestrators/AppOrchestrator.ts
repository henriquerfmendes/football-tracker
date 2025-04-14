import {
    IMatchService,
    IMatchPresenter,
    IWhatsAppService,
  } from "../interfaces/index";
  import { Match, Config, Services, SendResult } from "../types";
  
  export class ApplicationOrchestrator {
    private matchService: IMatchService;
    private presenter: IMatchPresenter;
    private whatsAppService: IWhatsAppService;
    private config: Config;
  
    constructor(services: Services, config: Config) {
      this.matchService = services.matchService;
      this.presenter = services.presenter;
      this.whatsAppService = services.whatsAppService;
      this.config = config;
    }
  
    async fetchMatchesFromAllCompetitions(): Promise<Match[]> {
      let allMatches: Match[] = [];
  
      for (let competitionId of this.config.competitionIds) {
        try {
          const matches = await this.matchService.getUpcomingMatches(
            competitionId,
            this.config.daysAhead
          );
  
          if (matches.length > 0) {
            const matchesWithCompetition = matches.map((match) => ({
              ...match,
              competitionName:
                this.config.competitionNames[competitionId] ||
                "Unknown Competition",
            }));
  
            allMatches = [...allMatches, ...matchesWithCompetition];
            console.log(
              `Found ${matches.length} matches for ${
                this.config.competitionNames[competitionId] || competitionId
              }`
            );
          }
        } catch (error) {
          console.error(
            `Error getting matches for competition ${competitionId}:`,
            (error as Error).message
          );
        }
      }
  
      if (allMatches.length > 0) {
        allMatches.sort(
          (a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime()
        );
      }
  
      return allMatches;
    }
  
    async sendFormattedMatches(
      matches: Match[],
      testMode: boolean = false
    ): Promise<SendResult[]> {
      const formattedMatches =
        this.presenter.formatMatchesMultipleCompetitions(matches);
  
      try {
        const results = await this.whatsAppService.sendMessage(
          formattedMatches,
          testMode
        );
        console.log(
          `Messages sent to ${
            results.filter((r) => r.success).length
            } of ${results.length} numbers.`
        );
        return results;
      } catch (error) {
        console.error(
          "WhatsApp message sending failed:",
          (error as Error).message
        );
        throw error;
      }
    }
  
    async fetchAndSendMatches(testMode: boolean = false): Promise<void> {
      console.log(
        `Looking for matches in ${new Date().toLocaleString("pt-BR")}`
      );
  
      try {
        const allMatches = await this.fetchMatchesFromAllCompetitions();
  
        if (allMatches.length === 0) {
          console.log(
            "No matches found for the period in any competition."
          );
          return;
        }
  
        await this.sendFormattedMatches(allMatches, testMode);
      } catch (error) {
        console.error(
          "Error fetching and sending matches:",
          (error as Error).message
        );
      }
    }
  
    async testSendToOneNumber(): Promise<void> {
      console.log("=== TEST SEND TO ONE NUMBER ===");
      try {
        await this.fetchAndSendMatches(true);
        console.log("Test send completed successfully!");
      } catch (error) {
        console.error("Error in test send:", (error as Error).message);
      }
    }
  }