import {RenderPosition} from '../const';

export const render = (parent, child, where = RenderPosition.BEFORE_END) => {
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

export const createElement = (html) => {
  const templateParentElement = document.createElement('div');
  templateParentElement.innerHTML = html;
  return templateParentElement.firstElementChild;
};
