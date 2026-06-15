// Reactions system for Science In Brief articles.
// Stores reactions locally in the visitor's browser and links discussion to GitHub Issues.

const GITHUB_DISCUSSION_BASE_URL = 'https://github.com/emiprimo-cmd/science-in-brief/issues/new';

class ReactionsManager {
  constructor(articleId) {
    this.articleId = articleId;
    this.storageKey = `reactions_${articleId}`;
    this.reactions = this.loadReactions();
    this.init();
  }

  loadReactions() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : { like: 0, interesting: 0, notRelevant: 0 };
    } catch (_error) {
      return { like: 0, interesting: 0, notRelevant: 0 };
    }
  }

  saveReactions() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.reactions));
    } catch (_error) {
      // Browsers can block localStorage in strict privacy modes.
    }
  }

  addReaction(type) {
    if (type === 'like') this.reactions.like += 1;
    if (type === 'interesting') this.reactions.interesting += 1;
    if (type === 'notRelevant') this.reactions.notRelevant += 1;
    this.saveReactions();
    this.updateDisplay();
  }

  updateDisplay() {
    const likeBtn = document.querySelector('.like-btn');
    const interestingBtn = document.querySelector('.interesting-btn');
    const notRelevantBtn = document.querySelector('.not-relevant-btn');

    if (likeBtn) likeBtn.textContent = `\uD83D\uDC4D Like (${this.reactions.like})`;
    if (interestingBtn) interestingBtn.textContent = `\uD83D\uDCA1 Interesting (${this.reactions.interesting})`;
    if (notRelevantBtn) notRelevantBtn.textContent = `\u274C Not Relevant (${this.reactions.notRelevant})`;
  }

  updateDiscussionLinks() {
    const title = document.querySelector('h1')?.textContent?.trim() || 'Science In Brief article';
    const body = `Discussion for: ${title}\n\nArticle: ${window.location.href}`;
    const discussionUrl = `${GITHUB_DISCUSSION_BASE_URL}?title=${encodeURIComponent(`[Discussion] ${title}`)}&body=${encodeURIComponent(body)}`;

    document.querySelectorAll('a[href*="github.com/emiprimo-cmd/science-in-brief"]').forEach((link) => {
      const linkText = link.textContent.toLowerCase();
      if (linkText.includes('discussion') || link.href.includes('/discussions')) {
        link.href = discussionUrl;
      }
    });
  }

  init() {
    const likeBtn = document.querySelector('.like-btn');
    const interestingBtn = document.querySelector('.interesting-btn');
    const notRelevantBtn = document.querySelector('.not-relevant-btn');

    if (likeBtn) {
      likeBtn.textContent = `\uD83D\uDC4D Like (${this.reactions.like})`;
      likeBtn.addEventListener('click', () => {
        this.addReaction('like');
      });
    }

    if (interestingBtn) {
      interestingBtn.textContent = `\uD83D\uDCA1 Interesting (${this.reactions.interesting})`;
      interestingBtn.addEventListener('click', () => {
        this.addReaction('interesting');
      });
    }

    if (notRelevantBtn) {
      notRelevantBtn.textContent = `\u274C Not Relevant (${this.reactions.notRelevant})`;
      notRelevantBtn.addEventListener('click', () => {
        this.addReaction('notRelevant');
      });
    }

    this.updateDiscussionLinks();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const reactionsContainer = document.getElementById('reactions-container');
  if (reactionsContainer) {
    const articleId = document.querySelector('h1')?.textContent?.trim() || 'article';
    new ReactionsManager(articleId);
  }
});
