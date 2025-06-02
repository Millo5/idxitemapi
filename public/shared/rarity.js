
const RARITY = {
    COMMON: 'common',
    UNCOMMON: 'uncommon',
    RARE: 'rare',
    EPIC: 'epic',
    LEGENDARY: 'legendary',
    MYTHIC: 'mythic',
    KIT: 'kit',
    DEVELOPER: 'developer',

    getAll() {
        return Object.values(this).filter(value => typeof value === 'string');
    }
};


function isValidRarity(rarity) {
    return RARITY.getAll().includes(rarity);
}


export {
    RARITY,
    isValidRarity
}
