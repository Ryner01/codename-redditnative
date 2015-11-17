import extend from 'extend';

let API = {
  URL: 'http://www.reddit.com/',

  subreddit(subreddit, options) {
    options = extend(true, {
      lastId: '',
      sort: 'hot'
    }, options);

    return fetch(API.URL + 'r/' + subreddit + '/' + options.sort + '.json?after=' + options.lastId)
      .then(res => res.json())
      .then((data) => {
        return {
          lastId: data.data.after,
          items: data.data.children.map(API._formatTopic)
        };
      });
  },

  _formatTopic(item) {
    var record = item.data;
    return {
      id: record.id,
      pinned: record.stickied,
      seen: record.visited,
      nsfw: record.over_18,
      name: record.name,
      image: record.thumbnail,
      domain: record.domain,
      text: record.selftext,
      subreddit: record.subreddit,
      url: record.url,
      author: record.author,
      commentCounts: record.num_comments,
      score: record.score,
      title: record.title,
      created: record.created_utc,
      external: !record.is_self
    };
  }
};

module.exports = API;
