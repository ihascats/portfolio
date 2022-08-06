import items from './showcase';

export default function popup(position) {
  const show = items[position];

  // create elements
  const div = document.createElement('div');
  const container = document.createElement('header');
  const h1 = document.createElement('h1');
  const buttons = document.createElement('div');
  const repoLink = document.createElement('a');
  const repo = document.createElement('button');
  const liveLink = document.createElement('a');
  const live = document.createElement('button');
  const img = document.createElement('img');

  // add text content
  h1.textContent = show.projectName;
  live.textContent = 'Live';
  repo.textContent = 'Repo';

  // add classes
  div.classList.add('wrapper');

  // add links
  liveLink.href = show.liveLink;
  repoLink.href = show.repoLink;
  img.src = show.projectImage;

  // append elements
  container.appendChild(h1);
  liveLink.appendChild(live);
  repoLink.appendChild(repo);
  buttons.appendChild(liveLink);
  buttons.appendChild(repoLink);
  container.appendChild(buttons);
  div.appendChild(container);
  div.appendChild(img);
  document.querySelector('body').appendChild(div);
}
