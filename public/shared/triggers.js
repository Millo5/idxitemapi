
const TRIGGER = {
    HIT: 'hit', // when the player hits something
    HURT: 'hurt',   // when the player is hurt
    USE: 'use', // when the player uses an item (varies by item type)
    SWING: 'swing', // when the player swings a melee weapon

    PASSIVE: 'passive',
    PASSIVESLOW: 'passive-slow',
    DROP: 'drop',
    EAT: 'eat',

    getAll() {
        return Object.values(this).filter(value => typeof value === 'string');
    }
};

function isValidTrigger(trigger) {
    if (Array.isArray(trigger)) {
        return trigger.every(t => TRIGGER.getAll().includes(t));
    }
    return TRIGGER.getAll().includes(trigger);
}

export {
    TRIGGER,
    isValidTrigger
};