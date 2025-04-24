import { IMatchService } from "../src/interfaces/IMatchService";
import { IMatchPresenter } from "../src/interfaces/IMatchPresenter";
import { IWhatsAppService } from "../src/interfaces/IWhatsAppService";

export interface Match {
  id: number;
  utcDate: string;
  status: string;
  matchday: number;
  stage: string;
  homeTeam: Team;
  awayTeam: Team;
  competitionName?: string;
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
}

export interface SendResult {
  phone: string;
  success: boolean;
  error?: string;
}

export interface Config {
  apiKey: string;
  competitionIds: string[];
  daysAhead: number;
  phoneNumbers: string[];
  competitionNames: Record<string, string>;
}

export interface Services {
  matchService: IMatchService;
  presenter: IMatchPresenter;
  whatsAppService: IWhatsAppService;
}
