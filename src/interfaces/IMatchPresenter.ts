import { Match } from "../types";

export interface IMatchPresenter {
  formatMatchesMultipleCompetitions(matches: Match[]): string;
}
