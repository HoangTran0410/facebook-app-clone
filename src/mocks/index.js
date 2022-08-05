const _users = require('./users.json');
const _stories = require('./stories.json');
const _reels = require('./reels.json');

export const users = _users.map(user => ({
  ...user,
  hasStory: _stories.find(story => story.userId === user.id) !== undefined,
}));

export const stories = _stories.map(story => ({
  ...story,
  user: users.find(user => user.id === story.userId),
}));

export const reels = _reels.map(reel => ({
  ...reel,
  user: _users.find(user => user.id === reel.userId),
}));
