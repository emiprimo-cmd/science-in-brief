// Reactions system for Science In Brief articles
// Stores user reactions in localStorage and displays counts

const GITHUB_DISCUSSIONS_URL = 'https://github.com/emiprimo-cmd/science-in-brief/discussions';

class ReactionsManager {
  constructor(articleId) {
    this.articleId = articleId;
    this.storageKey = `reactions_${articleId}`;
    this.reactions = this.loadReactions();
    this.init();
  }

  loadReactions() {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : { like: 0, interesting: 0, notRelevant: 0 };
  }

  saveReactions() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.reactions));
  }

  addReaction(type) {
    if (type === 'like') this.reactions.like++;
    if (type === 'interesting') this.reactions.interesting++;
    if (type === 'notRelevant') this.reactions.notRelevant++;
    this.saveReactions();
    this.updateDisplay();
  }

  updateDisplay() {
    const likeBtn = document.querySelector('.like-btn');
    const interestingBtn = document.querySelector('.interesting-btn');
    const notRelevantBtn = document.querySelector('.not-relevant-btn');

    if (likeBtn) likeBtn.textContent = `👍 Like (${this.reactions.like})`;
    if (interestingBtn) interestingBtn.textContent = `💡 Interesting (${this.reactions.interesting})`;
    if (notRelevantBtn) notRelevantBtn.textContent = `❌ Not Relevant (${this.reactions.notRelevant})`;
  }

  init() {
    const likeBtn = document.querySelector('.like-btn');
    const interestingBtn = document.querySelector('.interesting-btn');
    const notRelevantBtn = document.querySelector('.not-relevant-btn');

    if (likeBtn) {
      likeBtn.textContent = `👍 Like (${this.reactions.like})`;
      likeBtn.addEventListener('click', () => {
        this.addReaction('like');
      });
    }

    if (interestingBtn) {
      interestingBtn.textContent = `💡 Interesting (${this.reactions.interesting})`;
      interestingBtn.addEventListener('click', () => {
        this.addReaction('interesting');
      });
    }

    if (notRelevantBtn) {
      notRelevantBtn.textContent = `❌ Not Relevant (${this.reactions.notRelevant})`;
      notRelevantBtn.addEventListener('click', () => {
        this.addReaction('notRelevant');
      });
    }
  }
}

// Initialize reactions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const reactionsContainer = document.getElementById('reactions-container');
  if (reactionsContainer) {
    const articleId = document.querySelector('h1')?.textContent || 'article';
    new ReactionsManager(articleId);
  }
});
