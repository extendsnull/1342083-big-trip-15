export const getEventListTemplate = (...children) => {
  const template = `
<ul class="trip-events__list">
  ${children.map((child) => `<li class="trip-events__item">${child}</li>`).join('\n')}
</ul>`;

  return template;
};
