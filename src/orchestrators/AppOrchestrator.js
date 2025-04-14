"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationOrchestrator = void 0;
class ApplicationOrchestrator {
    constructor(services, config) {
        this.matchService = services.matchService;
        this.presenter = services.presenter;
        this.whatsAppService = services.whatsAppService;
        this.config = config;
    }
    fetchMatchesFromAllCompetitions() {
        return __awaiter(this, void 0, void 0, function* () {
            let allMatches = [];
            for (let competitionId of this.config.competitionIds) {
                try {
                    const matches = yield this.matchService.getUpcomingMatches(competitionId, this.config.daysAhead);
                    if (matches.length > 0) {
                        const matchesWithCompetition = matches.map((match) => (Object.assign(Object.assign({}, match), { competitionName: this.config.competitionNames[competitionId] ||
                                "Competição Desconhecida" })));
                        allMatches = [...allMatches, ...matchesWithCompetition];
                        console.log(`Found ${matches.length} matches for ${this.config.competitionNames[competitionId] || competitionId}`);
                    }
                }
                catch (error) {
                    console.error(`Error getting matches for competition ${competitionId}:`, error.message);
                }
            }
            if (allMatches.length > 0) {
                allMatches.sort((a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime());
            }
            return allMatches;
        });
    }
    sendFormattedMatches(matches_1) {
        return __awaiter(this, arguments, void 0, function* (matches, testMode = false) {
            const formattedMatches = this.presenter.formatMatchesMultipleCompetitions(matches);
            try {
                const results = yield this.whatsAppService.sendMessage(formattedMatches, testMode);
                console.log(`Messages sent to ${results.filter((r) => r.success).length} of ${results.length} numbers.`);
                return results;
            }
            catch (error) {
                console.error("WhatsApp message sending failed:", error.message);
                throw error;
            }
        });
    }
    fetchAndSendMatches() {
        return __awaiter(this, arguments, void 0, function* (testMode = false) {
            console.log(`Executando busca de partidas em ${new Date().toLocaleString("pt-BR")}`);
            try {
                const allMatches = yield this.fetchMatchesFromAllCompetitions();
                if (allMatches.length === 0) {
                    console.log("Nenhuma partida encontrada para o período em nenhuma competição.");
                    return;
                }
                yield this.sendFormattedMatches(allMatches, testMode);
            }
            catch (error) {
                console.error("Error fetching and sending matches:", error.message);
            }
        });
    }
    testSendToOneNumber() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("=== TEST SEND TO ONE NUMBER ===");
            try {
                yield this.fetchAndSendMatches(true);
                console.log("Test send completed successfully!");
            }
            catch (error) {
                console.error("Error in test send:", error.message);
            }
        });
    }
}
exports.ApplicationOrchestrator = ApplicationOrchestrator;
