import Player from './Player';

export default function DeepCopy(players: Player[]): Player[] {
  let newPlayers: Player[] = [];

  players.forEach((player, i) => {
    newPlayers.push({
      name: player.name,
      role: player.role,
      alive: player.alive,
    } as Player);
  });

  return newPlayers;
}
