
import {displayNavigationBar} from "./navbar.js";
import {addPlanetStatListener, controlVoteButtons} from "./vote.js";


function main() {
    //localStorage.clear();
    displayNavigationBar();
    addPlanetStatListener();
    controlVoteButtons()

}



main();