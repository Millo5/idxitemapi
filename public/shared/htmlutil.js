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

function getItemImageUrl(material) {
    // https://github.com/Owen1212055/mc-assets/blob/main/assets/ACACIA_BOAT.png?raw=true
    return `https://github.com/Owen1212055/mc-assets/blob/main/assets/${material.toUpperCase()}.png?raw=true`
}
    

export {
    html,
    div,
    p,
    button,
    getItemImageUrl
}