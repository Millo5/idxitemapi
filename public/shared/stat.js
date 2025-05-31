
const STAT = {
    DAMAGE: 'damage',
    DEFENSE: 'defense',
    ATTACK_SPEED: 'attack-speed',
    MOVE_SPEED: 'move-speed',
    EVASION: 'evasion',

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
