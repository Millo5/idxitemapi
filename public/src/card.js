

class Card {
    constructor() {
    }

    toHTML() {
        const card = document.createElement('div');
        card.classList.add('card');

        return card;
    }
}

class ItemCard extends Card {

    /**
     * 
     * @param {Item} item 
     */

    constructor(item) {

    }
}

