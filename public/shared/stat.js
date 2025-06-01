
const STAT = {
    HEALTH: 'health',   // Default: 20
    DEFENSE: 'defense', // Damage reduction per hit, flat.
    EVASION: 'evasion', // 0.9 * (1 - exp(-0.05 * evasion))

    DAMAGE: 'damage',               // Damage dealt per hit, flat.
    ATTACK_SPEED: 'attack-speed',   // Attacks per second
    CRIT_CHANCE: 'crit-chance',     // Chance to deal critical damage
    CRIT_DAMAGE: 'crit-damage',     // Critical damage multiplier on top of normal damage, default: 1.0
    KNOCKBACK: 'knockback',         // Default: 1.0 (?)

    MOVE_SPEED: 'move-speed',   // Default: 100
    LUCK: 'luck',               // Reroll chance for loot, default: 0.0 (0-1.0). Above 1 additional rolls are made.

    getAll() {
        return Object.values(this).filter(value => typeof value === 'string');
    }
};


function isValidStat(stat) {
    return STAT.getAll().includes(stat);
}


export {
    STAT,
    isValidStat
}
