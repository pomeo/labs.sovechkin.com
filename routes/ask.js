
/*
 * GET question
 */

exports.index = function(req, res){
  var Twit = require('twit');
  var T = new Twit({
      consumer_key:         process.env.TWITTER_CONSUMER_KEY
    , consumer_secret:      process.env.TWITTER_CONSUMER_KEY_SECRET
    , access_token:         process.env.TWITTER_ACCESS_TOKEN
    , access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET
  });
  T.get('search/tweets', { q: '-RT exclude:replies ?', lang: 'ru', count: '1' }, function(err, reply) {
    console.log(reply);
    T.get('statuses/oembed', { id: reply.statuses[0].id_str, omit_script: 'false', hide_thread: 'true'}, function(err, embed) {
      console.log(embed);
      res.locals.reply_to = reply.statuses[0].id_str;
      res.locals.tweet = embed.html;
      res.render('ask', { title: 'Ответь на вопросы случайных людей из Twitter!' });
    });
  });
};