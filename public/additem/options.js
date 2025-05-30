import { html, p } from "../shared/htmlutil.js";


export class Option {

    constructor(name, value) {
        this.name = name;
        this.element = html('input', '', {
            type: 'checkbox',
            name: name,
            value: value,
            checked: false
        });
    }

    getValue() {
        return this.element.checked ? this.element.value : null;
    }

    addTo(container) {
        if (!container || !(container instanceof HTMLElement)) {
            throw new Error('Invalid container element');
        }
        
        container.appendChild(html('label', '', {for: this.name,},
            p("", this.name),
            this.element
        ));
    }

}

export class TextOption extends Option {

    constructor(name, value = '') {
        super(name, value);
        this.element.type = 'text';
        this.element.value = value;
    }

    getValue() {
        return this.element.value.trim() || null; // Return null if empty
    }
}

export class SelectOption extends Option {

    constructor(name, options = [], value = '') {
        super(name, value);
        this.element = html('select', '', {
            name: name
        });

        options.forEach(opt => {
            const optionElement = html('option', '', {
                value: opt.value,
                textContent: opt.label
            });
            if (opt.value === value) {
                optionElement.selected = true;
            }
            this.element.appendChild(optionElement);
        });
    }

    getValue() {
        return this.element.value || null; // Return null if no selection
    }
}


