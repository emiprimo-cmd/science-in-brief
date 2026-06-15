// Reactions system for Science In Brief articles.
// Reactions are stored locally in the visitor's browser. They are not global totals.

const GITHUB_DISCUSSION_BASE_URL = "https://github.com/emiprimo-cmd/science-in-brief/issues/new";

const REACTION_OPTIONS = {
  like: { label: "Like", icon: "\uD83D\uDC4D", selector: ".like-btn" },
  interesting: { label: "Interesting", icon: "\uD83D\uDCA1", selector: ".interesting-btn" },
  notRelevant: { label: "Not Relevant", icon: "\u274C", selector: ".not-relevant-btn" },
};

class ReactionsManager {
  constructor(articleId) {
    this.articleId = articleId;
    this.storageKey = `reactions_${articleId}`;
    this.reactions = this.loadReactions();
    this.init();
  }

  defaultState() {
    return { userReaction: null };
  }

  loadReactions() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      const parsed = stored ? JSON.parse(stored) : {};
      return { ...this.defaultState(), ...parsed };
    } catch (_error) {
      return this.defaultState();
    }
  }

  saveReactions() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.reactions));
    } catch (_error) {
      // Browsers can block localStorage in strict privacy modes.
    }
  }

  setReaction(type) {
    if (!REACTION_OPTIONS[type]) return;

    if (this.reactions.userReaction === type) {
      return;
    }

    this.reactions.userReaction = type;
    this.saveReactions();
    this.updateDisplay();
  }

  updateDisplay() {
    Object.entries(REACTION_OPTIONS).forEach(([type, option]) => {
      const button = document.querySelector(option.selector);
      if (!button) return;

      const isSelected = this.reactions.userReaction === type;
      button.textContent = `${isSelected ? "\u2713 " : ""}${option.icon} ${option.label}`;
      button.setAttribute("aria-pressed", isSelected ? "true" : "false");
      button.setAttribute("aria-label", isSelected ? `${option.label} selected` : option.label);
      button.classList.toggle("bg-primary", isSelected);
      button.classList.toggle("text-on-primary", isSelected);
      button.classList.toggle("bg-slate-100", !isSelected);
      button.classList.toggle("text-primary", !isSelected);
    });
  }

  addLocalNotice() {
    const container = document.getElementById("reactions-container");
    if (!container || container.querySelector("[data-reactions-note]")) return;

    const note = document.createElement("p");
    note.dataset.reactionsNote = "true";
    note.className = "text-xs leading-5 text-slate-500";
    note.textContent = "Your reaction is saved on this device only.";
    container.insertBefore(note, container.firstChild);
  }

  updateDiscussionLinks() {
    const title = document.querySelector("h1")?.textContent?.trim() || "Science In Brief article";
    const body = `Discussion for: ${title}\n\nArticle: ${window.location.href}`;
    const discussionUrl = `${GITHUB_DISCUSSION_BASE_URL}?title=${encodeURIComponent(`[Discussion] ${title}`)}&body=${encodeURIComponent(body)}`;

    document.querySelectorAll('a[href*="github.com/emiprimo-cmd/science-in-brief"]').forEach((link) => {
      const linkText = link.textContent.toLowerCase();
      if (linkText.includes("discussion") || link.href.includes("/discussions")) {
        link.href = discussionUrl;
      }
    });
  }

  init() {
    Object.entries(REACTION_OPTIONS).forEach(([type, option]) => {
      const button = document.querySelector(option.selector);
      if (!button) return;

      button.type = "button";
      button.addEventListener("click", () => {
        this.setReaction(type);
      });
    });

    this.addLocalNotice();
    this.updateDisplay();
    this.updateDiscussionLinks();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const reactionsContainer = document.getElementById("reactions-container");
  if (reactionsContainer) {
    const articleId = document.querySelector("h1")?.textContent?.trim() || "article";
    new ReactionsManager(articleId);
  }
});
