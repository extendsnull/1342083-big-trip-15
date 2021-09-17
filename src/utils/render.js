import AbstractView from '../view/abstract';
import {RenderPosition} from '../const';

export const createElement = (html) => {
  const templateParent = document.createElement('div');
  templateParent.innerHTML = html;

  return templateParent.firstElementChild;
};

export const render = (parent, child, where = RenderPosition.BEFORE_END) => {
  if (parent instanceof AbstractView) {
    parent = parent.getElement();
  }

  if (child instanceof AbstractView) {
    child = child.getElement();
  }

  switch (where) {
    case RenderPosition.AFTER_BEGIN: {
      parent.prepend(child);
      break;
    }
    case RenderPosition.BEFORE_END: {
      parent.append(child);
      break;
    }
  }
};

export const replace = (newChild, oldChild) => {
  if (newChild instanceof AbstractView) {
    newChild = newChild.getElement();
  }

  if (oldChild instanceof AbstractView) {
    oldChild = oldChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};
