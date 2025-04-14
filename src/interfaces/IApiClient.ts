export interface IApiClient {
  fetchMatches(
    competitionId: string,
    dateFrom: string,
    dateTo: string
  ): Promise<any>;
}
