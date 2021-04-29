const CHOOSE_NUMBER_OF_CARD_PAIRS = 6;

const generatePairNumberList = (numberOfPairs = 6) => {
    let listOfRamdomPairs = [];
    for(let i=0; i<numberOfPairs; i++) {
        //Generate Random number between 0 - 99
        const randomNumber = Math.floor(Math.random() * 100);
        listOfRamdomPairs.push(randomNumber, randomNumber);
    }
    return getShuffledListOfPairs(listOfRamdomPairs);
}

const getShuffledListOfPairs = (listOfRamdomPairs = []) => {
    for (let i = listOfRamdomPairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [listOfRamdomPairs[i], listOfRamdomPairs[j]] = [listOfRamdomPairs[j], listOfRamdomPairs[i]];
    }
    return listOfRamdomPairs;
}

export {
    generatePairNumberList,
    getShuffledListOfPairs,
    CHOOSE_NUMBER_OF_CARD_PAIRS
}