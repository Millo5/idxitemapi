
const TRIGGER = {
    HIT: 'hit',
    HURT: 'hurt',
    LEFTCLICK: 'leftclick',
    RIGHTCLICK: 'rightclick',
    PASSIVE: 'passive',
    PASSIVESLOW: 'passive-slow',
    DROP: 'drop',

    getAll() {
        return Object.values(this).filter(value => typeof value === 'string');
    }
};


module.exports = {
    TRIGGER,

    isValidTrigger(trigger) {
        if (Array.isArray(trigger)) {
            return trigger.every(t => TRIGGER.getAll().includes(t));
        }
        return TRIGGER.getAll().includes(trigger);
    },
};