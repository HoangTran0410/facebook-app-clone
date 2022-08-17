const _users = require('./users.json');
const _stories = require('./stories.json');
const _reels = require('./reels.json');
const _posts = require('./posts.json');

export const me = {
  id: -1,
  name: 'Hoang Tran',
  avatar: 'https://i.pravatar.cc/200',
  // 'https://scontent-sin6-3.xx.fbcdn.net/v/t39.30808-6/273025268_1947369458767978_3353626377569094262_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=kCroS7oJZY4AX9OMVpc&_nc_ht=scontent-sin6-3.xx&oh=00_AT_7CJixhq_Nc89zzJMxDve5pKIEGwukZmsbfSbHaezafQ&oe=62F131E2',
  hasStory: false,
};

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
  user: users.find(user => user.id === reel.userId),
}));

export const posts = _posts.map(post => ({
  ...post,
  user: users.find(user => user.id === post.userId),
}));
