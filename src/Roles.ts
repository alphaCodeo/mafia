import Player from './Player';
import Input from './Input';

interface Role {
  name: string;
  description: string;
  affiliation: string;
  role?: string;
  input: Input[];
  action: (players: Player[], input: (number | boolean)[]) => Player[] | void;
}

const Roles: any = {
  Villager: {
    name: 'Villager',
    description: 'You are a regular Villager. You don’t have any special actions.',
    affiliation: 'Town',
    input: [],
    action: (players: Player[], input: (number | boolean)[]) => {},
  } as Role,

  Mafioso: {
    name: 'Mafioso',
    description: 'Each night you may vote alongside the rest of the mafia on who to kill.',
    affiliation: 'Mafia',
    input: [Input.Player],//, Input.Boolean],
    action: (players: Player[], input: (number | boolean)[]) => {
      // TODO: deep copy?
      const newPlayers: Player[] = players.slice();
      const index: number = typeof input === 'boolean' ? input[0] : 0;

      newPlayers[index].alive = false;
      return newPlayers;
    },
  } as Role,

  Sheriff: {
    name: 'Sheriff',
    description: 'Once per night you may check a player to determine whether they are suspicious.',
    affiliation: 'Town',
  } as Role,

  Investigator: {
    name: 'Investigator',
    description: 'Twice per game you may choose to find out the exact role of another player.',
    affiliation: 'Town',
  } as Role,

  Vigilante: {
    name: 'Vigilante',
    description: 'You have two bullets. Once per night you may choose to shoot a bullet at someone. If you shoot an innocent person you will die from guilt the following night',
    affiliation: 'Town',
  } as Role,

  Veteran: {
    name: 'Veteran',
    description: 'You may go on Alert twice per game. While on Alert you gain night immunity and will kill anyone visiting you.',
    affiliation: 'Town',
  } as Role,

  Doctor: {
    name: 'Doctor',
    description: 'Each night pick someone to visit. If they are harmed in any way you will prevent them from dying.',
    affiliation: 'Town',
  } as Role,

  Escort: {
    name: 'Escort',
    description: 'Each night, you may prevent any other person from performing their night action.',
    affiliation: 'Town',
  } as Role,

  Spy: {
    name: 'Spy',
    description: 'You can see who the Mafia visit each night.',
    affiliation: 'Town',
  } as Role,

  Lookout: {
    name: 'Lookout',
    description: 'Each night you may camp outside someone’s house to determine who visited them throughout the night.',
    affiliation: 'Town',
  } as Role,

  Framer: {
    name: 'Framer',
    description: 'Each night you may pick someone to frame, if the target picked is investigated, they will show up to be suspicious. If you instead pick a fellow Mafia, they will show up as not suspicious when investigated.',
    affiliation: 'Mafia',
  } as Role,

  Janitor: {
    name: 'Janitor',
    description: 'Twice per game, while the Mafia is deciding who to kill, you may choose to clean the body afterwards, which prevents the target’s role from being shared publicly and allows you to see it the next night.',
    affiliation: 'Mafia',
  } as Role,

  Godfather: {
    name: 'Godfather',
    description: 'Each night you may vote alongside the rest of the mafia on who to kill. If there is a tie vote your vote is the deciding vote. (You cannot be killed at night) (You will appear to be “Not Suspicious” to the Sheriff).',
    affiliation: 'Mafia',
  } as Role,

  Consort: {
    name: 'Consort',
    description: 'Each night, you may prevent any other person from performing their night action.',
    affiliation: 'Mafia',
  } as Role,

  Consigliere: {
    name: 'Consigliere',
    description: 'Each night you may choose to find out the exact role of another player.',
    affiliation: 'Mafia',
  } as Role,

  Disguiser: {
    name: 'Disguiser',
    description: 'Each night you may choose to disguise as another player’s role, if you are killed you will appear to be that role..',
    affiliation: 'Mafia',
  } as Role,

  Jester: {
    name: 'Jester',
    description: 'If you get executed during the day you win.',
    affiliation: 'Neutral',
  } as Role,

  SerialKiller: {
    name: 'Serial Killer',
    description: 'Each night, pick someone to kill. (You cannot be killed at night) (If you are roleblocked by the Escort or Consort you will kill them instead).',
    affiliation: 'Neutral',
    role: 'Killing',
  } as Role,

  Executioner: {
    name: 'Executioner',
    description: 'You will be assigned a target at the start of the game. If you get them executed during the day you win. Your target will always be (Town).',
    affiliation: 'Neutral',
  } as Role,

  Witch: {
    name: 'Witch',
    description: 'Each night you can force another person to use their night action on another person. You will also learn their role whilst doing so. (You win if the town loses) (You will appear to be “Not Suspicious” to the Sheriff).',
    affiliation: 'Neutral',
  } as Role,

  Medium: {
    name: 'Medium',
    description: 'Each night you can select a dead person to receive one of three people who could have killed them.',
    affiliation: 'Town',
  } as Role,

  Mayor: {
    name: 'Mayor',
    description: 'At any point during the game, you may flip this card over to “reveal” yourself as the mayor of the town. After you reveal yourself as the mayor, you votes are tripled during the day.',
    affiliation: 'Town',
  } as Role,

  Amnesiac: {
    name: 'Amnesiac',
    description: 'Once during the game, you can attempt to remember your role by selecting a dead players role.  If you do not die during that night you will take that players role..',
    affiliation: 'Neutral',
  } as Role,

  Werewolf: {
    name: 'Werewolf',
    description: 'On alternate nights, you may choose to rampage at any persons house (Including your own), killing the person and anyone who visits them. (Will kill both the doctor and the target if the doctor visits them).',
    affiliation: 'Neutral',
    role: 'Killing',
  } as Role,

  Psychic: {
    name: 'Psychic',
    description: 'On Odd Nights, you will receive the names of 3 people, one of whom is definitely evil. On Even Nights, you will receive the names of 2 people, one of whom is definitely good.',
    affiliation: 'Town',
    role: 'Investigative',
  } as Role,

  Armourer: {
    name: 'Armourer',
    description: 'You have 3 Disposable Armour Vest. Each night, you may choose to wear a Vest, give a vest to someone, or both..',
    affiliation: 'Town',
    role: 'Protective',
  } as Role,

  Locksmith: {
    name: 'Locksmith',
    description: 'At Night, place a lock on another person’s house. That person may not visit or be visited that night. You will be alerted if your target tries to leave home or someone tries to visit your target. You may not be roleblocked.',
    affiliation: 'Town',
    role: 'Protective',
  } as Role,

  Trapper: {
    name: 'Trapper',
    description: 'At Night, you may place a trap outside someone’s house. If they are visited, you will be alerted as to who visited them. It takes one night to build a trap before you can place it Your target is immune to attacks while the trap is placed.',
    affiliation: 'Town',
    role: 'Protective',
  } as Role,

  Blackmailer: {
    name: 'Blackmailer',
    description: 'At night, select a person. They will be unable to speak for the next day.',
    affiliation: 'Mafia',
  } as Role,

  Tracker: {
    name: 'Tracker',
    description: 'Pick a person each night, at the end of the night you will learn whom they visited.',
    affiliation: 'Town',
    role: 'Investigative',
  } as Role,

  Transporter: {
    name: 'Transporter',
    description: 'Pick two people each night (You may pick yourself). You swap places for that night. You cannot be roleblocked.',
    affiliation: 'Town',
    role: 'Support',
  } as Role,

  Pacifist: {
    name: 'Pacifist',
    description: 'You may pick a person each night. Their vote will not count for the next day.',
    affiliation: 'Town',
    role: 'Support',
  } as Role,

  Bodyguard: {
    name: 'Bodyguard',
    description: 'You may pick a person to protect each night. If they are attacked you will kill the attacker but will die in the process. If you successfully protect someone you can still be healed.',
    affiliation: 'Town',
    role: 'Protective',
  } as Role,

  Pirate: {
    name: 'Pirate',
    description: 'Pick a person to duel each night for their treasure. Play scissors paper stone with them. If you win you will kill them and loot their treasure. If you loot the treasure from 2 people, you win.',
    affiliation: 'Neutral',
    role: 'Evil',
  } as Role,

  Detective: {
    name: 'Detective',
    description: 'Pick two players at night to visit at night. You will find out if they are on the same team. Teams: (Town, Neutral, Mafia).',
    affiliation: 'Town',
    role: 'Investigative',
  } as Role,

  GuardianAngel: {
    name: 'Guardian Angel',
    description: 'You win if your target survives. You may protect your target twice throughout the game. If your target dies you become a survivor with no vests.',
    affiliation: 'Neutral',
  } as Role,

  Fogger: {
    name: 'Fogger',
    description: 'Each night you may choose to fog a person’s house. Any person visiting them will be unable to perform their night action on that person.',
    affiliation: 'Mafia',
    role: 'Support',
  } as Role,
};

/* Prosecutor (Town)

Defense Attorney (Town)

Good King (Town)
You are the King

Evil King (uh…not town?)

Suspicious

Not Suspicious

You were roleblocked!

Your target is Immume
You have received a Vest from the Armourer

You have been blackmailed! You will be unable to talk for the next day

You can’t see your target with all this fog in their house! */

export default Roles;
