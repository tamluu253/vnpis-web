/**
 * @file auto_inject_real_photos.js
 * @description Bridges to the semantic matcher match_and_inject_photos.js
 */

const { runMatchingAndInjection } = require('./match_and_inject_photos');

function injectPhotosIntoArticles() {
  console.log('[IMAGE INJECTOR] Running semantic topic-matching algorithm across all articles...');
  runMatchingAndInjection();
}

if (require.main === module) {
  injectPhotosIntoArticles();
}

module.exports = { injectPhotosIntoArticles };
