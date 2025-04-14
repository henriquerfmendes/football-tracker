import { IMatchPresenter } from "../interfaces/IMatchPresenter";
import { Match } from "../types";

export class MatchPresenter implements IMatchPresenter {
  formatMatchesMultipleCompetitions(matches: Match[]): string {
    if (matches.length === 0) {
      return "Nenhuma partida encontrada para os próximos dias.";
    }

    const sortedMatches = [...matches].sort(
      (a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime()
    );

    let message = "⚽ *Partidas dos próximos 7 dias*\n\n";

    const matchesByDate = this.groupMatchesByDate(sortedMatches);

    for (const [dateStr, dateMatches] of Object.entries(matchesByDate)) {
      message += `📅 Dia *${dateStr}*\n\n`;

      dateMatches.forEach((match) => {
        const time = this.formatTime(match.utcDate);
        const competition = this.formatCompetitionName(match.competitionName);
        const competitionEmoji = this.getCompetitionEmoji(
          match.competitionName
        );

        message += `*${time}* - ${competitionEmoji} ${competition}: ${match.homeTeam.shortName} x ${match.awayTeam.shortName}\n`;
      });

      message += "\n\n";
    }

    return message;
  }

  private groupMatchesByDate(matches: Match[]): Record<string, Match[]> {
    const groups: Record<string, Match[]> = {};

    matches.forEach((match) => {
      const dateKey = this.formatDate(match.utcDate);

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(match);
    });

    return groups;
  }

  private formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  private formatTime(dateString: string): string {
    return new Date(dateString).toLocaleTimeString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  private formatCompetitionName(name?: string): string {
    const competitionName = name || "Competição Desconhecida";
    if (competitionName === "UEFA Champions League") return "Champions League";
    return competitionName;
  }

  private getCompetitionEmoji(name?: string): string {
    if (!name) return "🏆";

    const emojiMap: Record<string, string> = {
      "Premier League": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      "La Liga": "🇪🇸",
      "UEFA Champions League": "🇪🇺",
    };

    return emojiMap[name] || "🏆";
  }
}
