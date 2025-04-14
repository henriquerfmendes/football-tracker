"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchPresenter = void 0;
class MatchPresenter {
    formatMatchesMultipleCompetitions(matches) {
        if (matches.length === 0) {
            return "Nenhuma partida encontrada para os próximos dias.";
        }
        const sortedMatches = [...matches].sort((a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime());
        let message = "⚽ *Partidas dos próximos 7 dias*\n\n";
        const matchesByDate = this.groupMatchesByDate(sortedMatches);
        for (const [dateStr, dateMatches] of Object.entries(matchesByDate)) {
            message += `📅 Dia *${dateStr}*\n\n`;
            dateMatches.forEach((match) => {
                const time = this.formatTime(match.utcDate);
                const competition = this.formatCompetitionName(match.competitionName);
                const competitionEmoji = this.getCompetitionEmoji(match.competitionName);
                message += `*${time}* - ${competitionEmoji} ${competition}: ${match.homeTeam.shortName} x ${match.awayTeam.shortName}\n`;
            });
            message += "\n\n";
        }
        return message;
    }
    groupMatchesByDate(matches) {
        const groups = {};
        matches.forEach((match) => {
            const dateKey = this.formatDate(match.utcDate);
            if (!groups[dateKey]) {
                groups[dateKey] = [];
            }
            groups[dateKey].push(match);
        });
        return groups;
    }
    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString("pt-BR", {
            timeZone: "America/Sao_Paulo",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    }
    formatTime(dateString) {
        return new Date(dateString).toLocaleTimeString("pt-BR", {
            timeZone: "America/Sao_Paulo",
            hour: "2-digit",
            minute: "2-digit",
        });
    }
    formatCompetitionName(name) {
        const competitionName = name || "Competição Desconhecida";
        if (competitionName === "UEFA Champions League")
            return "Champions League";
        return competitionName;
    }
    getCompetitionEmoji(name) {
        if (!name)
            return "🏆";
        const emojiMap = {
            "Premier League": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
            "La Liga": "🇪🇸",
            "UEFA Champions League": "🇪🇺",
        };
        return emojiMap[name] || "🏆";
    }
}
exports.MatchPresenter = MatchPresenter;
