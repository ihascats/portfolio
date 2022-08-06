import items from './showcase';

export default function popup(position) {
  const show = items[position];

  // create elements
  const div = document.createElement('div');
  const title = document.createElement('div');
  const container = document.createElement('header');
  const h1 = document.createElement('h1');
  const buttons = document.createElement('div');
  const repoLink = document.createElement('a');
  const repo = document.createElement('button');
  const liveLink = document.createElement('a');
  const live = document.createElement('button');
  const img = document.createElement('img');
  const description = document.createElement('div');
  const p = document.createElement('p');

  // add text content
  h1.textContent = show.projectName;
  live.textContent = 'Live';
  repo.textContent = 'Repo';
  // eslint-disable-next-line operator-linebreak
  p.textContent =
    '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."';

  // add classes
  div.classList.add('wrapper');
  description.classList.add('description');

  // add links
  liveLink.href = show.liveLink;
  repoLink.href = show.repoLink;
  img.src = show.projectImage;

  // append elements
  description.appendChild(p);
  title.appendChild(h1);
  container.appendChild(title);
  liveLink.appendChild(live);
  repoLink.appendChild(repo);
  buttons.appendChild(liveLink);
  buttons.appendChild(repoLink);
  container.appendChild(buttons);
  div.appendChild(container);
  div.appendChild(img);
  div.appendChild(description);
  document.querySelector('.showcase').appendChild(div);
}
