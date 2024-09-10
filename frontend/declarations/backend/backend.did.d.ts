import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'getCharacters' : ActorMethod<[], Array<string>>,
  'getGameInfo' : ActorMethod<[], string>,
  'getLevelVotes' : ActorMethod<[], Array<[string, bigint]>>,
  'getLevels' : ActorMethod<[], Array<string>>,
  'getWeapons' : ActorMethod<[], Array<string>>,
  'init' : ActorMethod<[], undefined>,
  'voteForLevel' : ActorMethod<[bigint], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
