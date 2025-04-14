import { Config } from '../types';

export class ConfigValidator {
  static validate(config: Partial<Config>): Config {
    const errors: string[] = [];

    if (!config.apiKey) {
      errors.push("API_KEY not defined");
    }

    if (!config.competitionIds || config.competitionIds.length === 0) {
      errors.push("COMPETITION_IDS not defined or empty");
    }

    if (isNaN(config.daysAhead as number)) {
      errors.push("DAYS_AHEAD must be a number");
    }

    if (!config.phoneNumbers || config.phoneNumbers.length === 0) {
      errors.push("PHONE_NUMBERS not defined or empty");
    }

    if (errors.length > 0) {
      throw new Error(`Invalid configuration: ${errors.join(", ")}`);
    }

    return config as Config;
  }

  static loadFromEnvironment(): Config {
    const apiKey = process.env.API_KEY as string;
    const competitionIdsStr = process.env.COMPETITION_IDS;
    const daysAheadStr = process.env.DAYS_AHEAD;
    const phoneNumbersStr = process.env.PHONE_NUMBERS;

    const competitionIds = competitionIdsStr ? competitionIdsStr.split(',').map(id => id.trim()) : [];
    const daysAhead = parseInt(daysAheadStr || '7', 10);
    const phoneNumbers = phoneNumbersStr ? phoneNumbersStr.split(',').map(num => num.trim()) : [];

    const competitionNames: Record<string, string> = {
      '2014': 'La Liga',
      '2021': 'Premier League',
      '2001': 'UEFA Champions League'
    };

    const config: Config = {
      apiKey,
      competitionIds,
      daysAhead,
      phoneNumbers,
      competitionNames
    };

    return this.validate(config);
  }
} 
