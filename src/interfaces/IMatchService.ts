import { Match } from "../types";

export interface IMatchService {
  getUpcomingMatches(
    competitionId: string,
    daysAhead: number
  ): Promise<Match[]>;
}
