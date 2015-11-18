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

  getComments(subreddit, id, options) {
    options = extend(true, {
      sort: 'hot'
    }, options);

    return fetch(API.URL + 'r/' + subreddit + '/comments/' + id + '.json?sort=' + options.sort)
      .then(res => res.json())
      .then(data => {
        return {
          detail: API._formatTopic(data[0].data.children[0]),
          comments: API._mapComments(data[1].data.children)
        };
      });
  },

  _mapComments(data) {
    return data.map(function(item) {
      if (item.kind === 'more') {
        return {
          more: true,
          id: item.data.id,
          name: item.data.name,
          parentId: item.data.parent_id,
          children: item.data.children
        };
      }

      var record = item.data;
      return {
        more: false,
        id: record.id,
        gold: record.gilded,
        author: record.author,
        text: record.body,
        score: record.score,
        created: record.created_utc,
        comments: record.replies ? API._mapComments(record.replies.data.children) : []
      };
    }).filter(item => item);
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
