const _users = require('./users.json');
const _stories = require('./stories.json');
const _reels = require('./reels.json');

export const users = _users;

export const stories = _stories.map(story => ({
  ...story,
  user: _users.find(user => user.id === story.userId),
}));

export const reels = _reels.map(reel => ({
  ...reel,
  user: _users.find(user => user.id === reel.userId),
}));
