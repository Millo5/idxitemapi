
const RARITY = {
    COMMON: 'common',
    UNCOMMON: 'uncommon',
    RARE: 'rare',
    EPIC: 'epic',
    LEGENDARY: 'legendary',
    MYTHIC: 'mythic',
    KIT: 'kit',

    getAll() {
        return Object.values(this).filter(value => typeof value === 'string');
    }
};


module.exports = {
    RARITY,

    isValidRarity(rarity) {
        return RARITY.getAll().includes(rarity);
    }
}
