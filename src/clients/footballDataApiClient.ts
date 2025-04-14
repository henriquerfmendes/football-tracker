import axios from 'axios';
import { IApiClient } from '../interfaces/IApiClient';

export class FootballDataApiClient implements IApiClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.football-data.org/v4';
  }

  async fetchMatches(competitionId: string, dateFrom: string, dateTo: string): Promise<any> {
    try {
      const url = `${this.baseUrl}/competitions/${competitionId}/matches`;
      const response = await axios.get(url, {
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
    } catch (error) {
      console.error('Error fetching matches from API:', error);
      throw error;
    }
  }
} 