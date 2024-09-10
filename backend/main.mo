import Char "mo:base/Char";
import Hash "mo:base/Hash";
import Option "mo:base/Option";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

actor {
  // Stable variables
  stable let gameInfo : Text = "Doom is a groundbreaking first-person shooter game released in 1993 by id Software. It revolutionized the gaming industry with its immersive 3D graphics and intense gameplay.";

  stable let characters : [Text] = [
    "Doomguy: The unnamed space marine protagonist.",
    "Imp: A common demon enemy that throws fireballs.",
    "Cacodemon: A floating, one-eyed red monster.",
    "Cyberdemon: A large, cybernetic demon with a rocket launcher."
  ];

  stable let weapons : [Text] = [
    "Pistol: The starting weapon with unlimited ammo.",
    "Shotgun: A powerful close-range weapon.",
    "Chainsaw: A melee weapon for close encounters.",
    "Rocket Launcher: Fires explosive rockets.",
    "BFG 9000: The ultimate weapon, firing huge energy balls."
  ];

  stable let levels : [Text] = [
    "E1M1: Hangar",
    "E1M2: Nuclear Plant",
    "E1M3: Toxin Refinery",
    "E1M4: Command Control",
    "E1M5: Phobos Lab"
  ];

  // Mutable variable
  var levelVotes = HashMap.HashMap<Nat, Nat>(5, Nat.equal, Nat.hash);

  // Initialize votes
  public func init() : async () {
    for (i in Iter.range(0, levels.size() - 1)) {
      levelVotes.put(i, 0);
    };
  };

  // Query functions
  public query func getGameInfo() : async Text {
    gameInfo
  };

  public query func getCharacters() : async [Text] {
    characters
  };

  public query func getWeapons() : async [Text] {
    weapons
  };

  public query func getLevels() : async [Text] {
    levels
  };

  public query func getLevelVotes() : async [(Text, Nat)] {
    let voteCounts = Array.tabulate<(Text, Nat)>(levels.size(), func (i) {
      (levels[i], Option.get(levelVotes.get(i), 0))
    });
    voteCounts
  };

  // Update function
  public func voteForLevel(levelId : Nat) : async () {
    if (levelId < levels.size()) {
      let currentVotes = Option.get(levelVotes.get(levelId), 0);
      levelVotes.put(levelId, currentVotes + 1);
    };
  };
}
