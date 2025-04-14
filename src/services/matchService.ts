import { IMatchService } from "../interfaces/IMatchService";
import { IApiClient } from "../interfaces/IApiClient";
import { IDateUtil } from "../interfaces/IDateUtil";
import { Match } from "../types";

export class MatchService implements IMatchService {
  private apiClient: IApiClient;
  private dateUtil: IDateUtil;

  constructor(apiClient: IApiClient, dateUtil: IDateUtil) {
    this.apiClient = apiClient;
    this.dateUtil = dateUtil;
  }

  async getUpcomingMatches(
    competitionId: string,
    daysAhead: number
  ): Promise<Match[]> {
    try {
      const today = this.dateUtil.getFormattedDate(new Date());
      const futureDate = this.dateUtil.getFormattedDate(
        this.dateUtil.addDays(new Date(), daysAhead)
      );

      const response = await this.apiClient.fetchMatches(
        competitionId,
        today,
        futureDate
      );

      if (!response.matches || response.matches.length === 0) {
        return [];
      }

      return response.matches;
    } catch (error) {
      console.error(
        `Error getting matches for competition ${competitionId}:`,
        error
      );
      throw error;
    }
  }
}
