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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FootballDataApiClient = void 0;
const axios_1 = __importDefault(require("axios"));
class FootballDataApiClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.football-data.org/v4';
    }
    fetchMatches(competitionId, dateFrom, dateTo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `${this.baseUrl}/competitions/${competitionId}/matches`;
                const response = yield axios_1.default.get(url, {
                    headers: {
                        'X-Auth-Token': this.apiKey
                    },
                    params: {
                        dateFrom,
                        dateTo,
                        status: 'SCHEDULED'
                    }
                });
                return response.data;
            }
            catch (error) {
                console.error('Error fetching matches from API:', error);
                throw error;
            }
        });
    }
}
exports.FootballDataApiClient = FootballDataApiClient;
