import DATABASE from "./database.js";

function getItemImageUrl(material) {
// https://github.com/Owen1212055/mc-assets/blob/main/assets/ACACIA_BOAT.png?raw=true
    return `https://github.com/Owen1212055/mc-assets/blob/main/assets/${material.toUpperCase()}.png?raw=true`
}

///--- HTML Utility

function html(tag, classList = '', extra = {}, ...children) {
    const element = document.createElement(tag);

    if (classList) {
        const classes = Array.isArray(classList) ? classList : classList.split(' ');
        classes.forEach(cls => element.classList.add(cls));
    }

    if (extra.attributes) {
        for (const [key, value] of Object.entries(extra.attributes)) {
            element.setAttribute(key, value);
        }
    }
    for (const [key, value] of Object.entries(extra)) {
        if (key !== 'attributes') {
            element[key] = value;
        }
    }


    children.forEach(child => {
        if (child instanceof HTMLElement) {
            element.appendChild(child);
        } else if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        }
    });

    return element;
}

function div(classList = '', ...children) {
    return html('div', classList, {}, ...children);
}

function p(classList = '', text = '') {
    return html('p', classList, { textContent: text });
}

function button(classList = '', text = '', onClick = null) {
    const btn = html('button', classList, { textContent: text });
    if (onClick) {
        btn.onclick = onClick;
    }
    return btn;
}


///---

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
        super();
        this.item = item;
    }

    toHTML() {
        const card = super.toHTML();

        const url = getItemImageUrl(this.item.material);

        const selection = div('selection');
        card.onclick = () => {
            selection.classList.toggle('selected');
        }
        selection.setAttribute('data-id', this.item.id);

        card.append(
            div('row',
                p('id', `${this.item.rarity}`),
                selection
            ),
            html('img', '', { src: url, alt: this.item.name } ),
            html('h3', '', { textContent: this.item.name } ),
            html('p', '', { textContent: this.item.description } ),
            div('row', 
                p('id', `${this.item.id}`),
                p('id', `${this.item.itemType}`),
            )
        )

        return card;
    }
}

class AttributeCard extends Card {
    /**
     * 
     * @param {Attribute} attribute 
     */

    constructor(attribute) {
        super();
        this.attribute = attribute;
        console.log(attribute)
    }

    toHTML() {
        const card = super.toHTML();
        card.classList.add('attribute');

        const selection = div('selection');
        card.onclick = () => {
            selection.classList.toggle('selected');
        }
        selection.setAttribute('data-id', this.attribute.id);

        const url = getItemImageUrl(this.attribute.material);
        card.append(
            div('row',
                p('id', `${this.attribute.rarity}`),
                selection
            ),
            html('img', '', { src: url, alt: this.attribute.name }),
            html('h3', '', { textContent: this.attribute.name }),
            html('p', '', { textContent: this.attribute.description }),
            div('row',
                p('id', `${this.attribute.id}`),
                p('id', `${this.attribute.type}`)
            ),
            div('row',
                p('id', `${this.attribute.target}`),
                p('id', `${this.attribute.triggers.join(', ')}`)
            )
        );

        return card;
    }
}



export {
    Card,
    ItemCard,
    AttributeCard
}