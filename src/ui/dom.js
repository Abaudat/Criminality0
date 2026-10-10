export function h(tag, props, ...children) {
  const [name, ...classes] = tag.split('.');
  const element = document.createElement(name || 'div');
  if (classes.length) element.className = classes.join(' ');
  if (props) {
    for (const key in props) {
      const value = props[key];
      if (value === undefined || value === null || value === false) continue;
      if (key === 'class') element.className += ` ${value}`;
      else if (key === 'style' && typeof value === 'object') Object.assign(element.style, value);
      else if (key.startsWith('on')) element.addEventListener(key.slice(2).toLowerCase(), value);
      else if (key === 'html') element.innerHTML = value;
      else if (key in element && key !== 'list' && key !== 'type') element[key] = value;
      else element.setAttribute(key, value === true ? '' : value);
    }
  }
  append(element, children);
  return element;
}

export function append(element, children) {
  for (const child of children.flat(Infinity)) {
    if (child === null || child === undefined || child === false) continue;
    element.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return element;
}

export function clear(element) {
  while (element.firstChild) element.firstChild.remove();
  return element;
}

export function replace(element, ...children) {
  clear(element);
  return append(element, children);
}

export function svg(markup) {
  const holder = document.createElement('div');
  holder.innerHTML = markup.trim();
  return holder.firstChild;
}

export function icon(name) {
  return h('span.icon', { 'aria-hidden': 'true', html: ICONS[name] ?? '' });
}

const ICONS = {
  briefing: '<svg viewBox="0 0 24 24"><path d="M5 3h10l4 4v14H5z M14 3v5h5 M8 12h8 M8 16h8"/></svg>',
  inbox: '<svg viewBox="0 0 24 24"><path d="M3 6h18v12H3z M3 6l9 7 9-7"/></svg>',
  shift: '<svg viewBox="0 0 24 24"><path d="M3 4h18v12H3z M8 20h8 M12 16v4 M6 8h5 M6 11h8"/></svg>',
  home: '<svg viewBox="0 0 24 24"><path d="M3 11l9-7 9 7 M6 9v11h12V9 M10 20v-6h4v6"/></svg>',
  undo: '<svg viewBox="0 0 24 24"><path d="M9 7L4 12l5 5 M4 12h11a5 5 0 0 1 0 10h-3"/></svg>',
  redo: '<svg viewBox="0 0 24 24"><path d="M15 7l5 5-5 5 M20 12H9a5 5 0 0 0 0 10h3"/></svg>',
  menu: '<svg viewBox="0 0 24 24"><path d="M4 7h16 M4 12h16 M4 17h16"/></svg>',
  close: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12 M18 6L6 18"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14 M5 12h14"/></svg>',
  trash: '<svg viewBox="0 0 24 24"><path d="M5 7h14 M9 7V4h6v3 M7 7l1 13h8l1-13"/></svg>',
  filter: '<svg viewBox="0 0 24 24"><path d="M4 5h16l-6 8v6l-4 2v-8z"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6"/><path d="M16 16l5 5"/></svg>',
  sound: '<svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z M16 9a4 4 0 0 1 0 6 M18.5 6.5a8 8 0 0 1 0 11"/></svg>',
  mute: '<svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z M16 9l5 6 M21 9l-5 6"/></svg>',
  share: '<svg viewBox="0 0 24 24"><path d="M12 3v12 M7 8l5-5 5 5 M5 13v8h14v-8"/></svg>',
  eye: '<svg viewBox="0 0 24 24"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  rule: '<svg viewBox="0 0 24 24"><path d="M4 6h16 M4 12h10 M4 18h6"/></svg>',
  person: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-5 4-7 8-7s7 2 8 7"/></svg>',
  arrow: '<svg viewBox="0 0 24 24"><path d="M5 12h14 M13 6l6 6-6 6"/></svg>',
  lock: '<svg viewBox="0 0 24 24"><path d="M6 11h12v10H6z M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
};
