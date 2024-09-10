export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getCharacters' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'getGameInfo' : IDL.Func([], [IDL.Text], ['query']),
    'getLevelVotes' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))],
        ['query'],
      ),
    'getLevels' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'getWeapons' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'init' : IDL.Func([], [], []),
    'voteForLevel' : IDL.Func([IDL.Nat], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
