const SCIENCE_BRIEFS = [
  {
    title: "Atom-level enzyme active site scaffolding using RFdiffusion2",
    summary: "A generative protein-design model builds enzyme scaffolds directly around atomic active-site geometries, reducing a major bottleneck in de novo enzyme design.",
    topic: "Protein Design",
    readTime: "6 min read",
    date: "2025-12-03",
    dateLabel: "Dec 3, 2025",
    journal: "Nature Methods",
    href: "atom-level-enzyme.html",
    image: "atom-level-enzyme.webp",
    alt: "Scientific illustration of a protein scaffold forming around an atom-level enzyme active site"
  },
  {
    title: "The emerging landscape of engineered bacteria cancer therapies",
    summary: "Engineered bacteria are moving from a historical curiosity toward programmable tumor-targeting medicines, but clinical efficacy remains the central test.",
    topic: "Cancer Bioengineering",
    readTime: "6 min read",
    date: "2025-04-01",
    dateLabel: "Apr 1, 2025",
    journal: "Nature Biotechnology",
    href: "engineered-bacteria-cancer-therapies.html",
    image: "engineered-bacteria-cancer-therapies.webp",
    alt: "Editorial illustration of engineered bacteria colonizing a tumor and delivering therapeutic payloads"
  },
  {
    title: "Disordered Protein LAT Encodes Signal Balance in T Cell Activation",
    summary: "A single-cell mutational screen shows how the disordered adapter LAT tunes T cell signaling through distributed sequence elements.",
    topic: "Immunology",
    readTime: "6 min read",
    date: "2026-01-01",
    dateLabel: "2026",
    journal: "Science, 2026",
    href: "lat-tcell.html",
    image: "tcell_dual_editorial_art.webp",
    alt: "Abstract editorial illustration of T cells with surface receptors and signal particles"
  },
  {
    title: "Best Practices for Machine Learning-Assisted Protein Engineering",
    summary: "A practical roadmap for building reliable ML-guided protein engineering workflows through stronger data, validation, code, and deployment standards.",
    topic: "Machine Learning",
    readTime: "6 min read",
    date: "2025-11-17",
    dateLabel: "Nov 17, 2025",
    journal: "J. Chem. Inf. Model., 2025",
    href: "ml-protein-engineering.html",
    image: "ML_protein.webp",
    alt: "Machine learning workflow for protein engineering with proteins, DNA, validation, and optimization"
  },
  {
    title: "ProteinDJ: Scaling Protein Design with HPC Pipelines",
    summary: "A modular HPC pipeline integrates protein design tools into a parallelized workflow for faster generation and evaluation of candidate designs.",
    topic: "Bioinformatics",
    readTime: "5 min read",
    date: "2024-10-24",
    dateLabel: "Oct 24, 2024",
    journal: "Protein Science, 2024",
    href: "proteindj.html",
    image: "DJprotein.webp",
    alt: "Abstract molecular network visualization"
  },
  {
    title: "Stepwise Slime Mould Growth as a Template for Urban Design",
    summary: "A two-phase <em>Physarum</em>-inspired model separates network growth from refinement, giving designers control over cost, travel time, and vulnerability.",
    topic: "Bio-inspired Design",
    readTime: "5 min read",
    date: "2022-01-19",
    dateLabel: "Jan 19, 2022",
    journal: "Scientific Reports, 2022",
    href: "stepwise-slime.html",
    image: "Stepwise_slime.webp",
    alt: "Illustrated slime mould network spreading across a geographic map"
  }
].sort((a, b) => new Date(b.date) - new Date(a.date));

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderBriefSummary(summary) {
  return escapeHtml(summary)
    .replace(/&lt;em&gt;/g, "<em>")
    .replace(/&lt;\/em&gt;/g, "</em>");
}

function renderRecentBriefs(containerId, limit = 4) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = SCIENCE_BRIEFS.slice(0, limit).map((brief) => `
    <a href="${escapeHtml(brief.href)}" class="group bg-surface-container rounded-xl shadow-lg overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
      <div class="aspect-video overflow-hidden bg-surface-container-low">
        <img src="${escapeHtml(brief.image)}" alt="${escapeHtml(brief.alt)}" loading="lazy" decoding="async" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"/>
      </div>
      <div class="p-6">
        <div class="flex items-center gap-2 mb-3">
          <span class="font-label text-xs tracking-[0.05em] text-primary uppercase">${escapeHtml(brief.topic)}</span>
          <span class="text-outline text-xs">&bull;</span>
          <span class="font-label text-xs text-on-surface-variant">${escapeHtml(brief.readTime)}</span>
        </div>
        <h3 class="font-headline text-xl text-primary leading-tight mb-4 group-hover:text-teal-700 transition-colors">${escapeHtml(brief.title)}</h3>
        <p class="font-body text-sm text-secondary leading-relaxed mb-5">${renderBriefSummary(brief.summary)}</p>
        <span class="text-primary font-label text-sm uppercase tracking-wider inline-flex items-center gap-1">
          Read Brief
          <span class="material-symbols-outlined text-sm">arrow_forward</span>
        </span>
      </div>
    </a>
  `).join("");
}

function renderLatestNotes(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = SCIENCE_BRIEFS.map((brief, index) => `
    <a href="${escapeHtml(brief.href)}" data-date="${escapeHtml(brief.date)}" class="group block bg-white rounded-2xl border border-surface-container-high shadow-sm hover:shadow-md transition-all overflow-hidden">
      <article class="grid gap-0 md:grid-cols-[220px_1fr]">
        <div class="aspect-video md:aspect-square bg-surface-container overflow-hidden">
          <img src="${escapeHtml(brief.image)}" alt="${escapeHtml(brief.alt)}" loading="lazy" decoding="async" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"/>
        </div>
        <div class="p-7 flex flex-col justify-center">
          <div class="flex flex-wrap items-center gap-2 text-xs font-label uppercase tracking-[0.2em] mb-3">
            <span class="text-primary">${escapeHtml(brief.topic)}</span>
            <span class="text-slate-300">&bull;</span>
            <span class="text-slate-400">${escapeHtml(brief.readTime)}</span>
            <span class="text-slate-300">&bull;</span>
            <span class="text-slate-400">${escapeHtml(brief.dateLabel)}</span>
            ${index === 0 ? '<span class="rounded-full bg-teal-50 border border-teal-200 px-2 py-0.5 text-teal-800">New</span>' : ''}
          </div>
          <h2 class="font-headline text-2xl md:text-3xl text-primary leading-snug group-hover:text-teal-700 transition-colors">${escapeHtml(brief.title)}</h2>
          <p class="mt-3 text-sm md:text-base text-secondary leading-relaxed">${renderBriefSummary(brief.summary)}</p>
          <div class="mt-5 flex items-center justify-between gap-4">
            <span class="text-xs text-on-surface-variant font-label italic">${escapeHtml(brief.journal)}</span>
            <span class="inline-flex items-center gap-2 text-primary font-semibold text-sm">
              Read Brief
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </span>
          </div>
        </div>
      </article>
    </a>
  `).join("");
}
