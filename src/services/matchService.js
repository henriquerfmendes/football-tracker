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
exports.MatchService = void 0;
class MatchService {
    constructor(apiClient, dateUtil) {
        this.apiClient = apiClient;
        this.dateUtil = dateUtil;
    }
    getUpcomingMatches(competitionId, daysAhead) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const today = this.dateUtil.getFormattedDate(new Date());
                const futureDate = this.dateUtil.getFormattedDate(this.dateUtil.addDays(new Date(), daysAhead));
                const response = yield this.apiClient.fetchMatches(competitionId, today, futureDate);
                if (!response.matches || response.matches.length === 0) {
                    return [];
                }
                return response.matches;
            }
            catch (error) {
                console.error(`Error getting matches for competition ${competitionId}:`, error);
                throw error;
            }
        });
    }
}
exports.MatchService = MatchService;
