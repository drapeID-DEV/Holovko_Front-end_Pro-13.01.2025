function HTMLElement(tagName, attributes = {}, childElements = []) {
  this.tagName = tagName;
  this.attributes = attributes;
  this.childElements = childElements;

  this.createCustomElem = function () {
    const element = document.createElement(this.tagName);

    for (let key in this.attributes) {
      element.setAttribute(key, this.attributes[key]);
    }

    this.childElements.forEach(child => {
      if (typeof child === 'string') {
        element.textContent = child;
      } else {
        element.appendChild(child.createCustomElem());
      }
    });

    return element;
  };

  this.appendChild = function (element) {
    this.childElements.push(element);
  };
}

const header = new HTMLElement('h1', { class: 'text', style: 'color: red' }, ['FRONT-END']);
const textContainer = new HTMLElement('div', { class: 'container' }, [header]);

document.body.appendChild(textContainer.createCustomElem());