# Project Summary

## IndexedDB Usages 

* IndexedDB is used to store the data since there is no back-end server.

* The project utilize `dexie` and `dexie-react-hooks` for client-side database management.

### Validation Rules

* Each futsal team must have at least 5 players.

* Example:

* > If there are **9 players** and **2 teams**, an error will occur:

"Each team must have at least 5 players. Please add players or remove a team."
* > he system will automatically assign players to teams if the total number of players is greater than **teams * 5**.
