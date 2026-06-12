const SCIENCE_BRIEFS = [
  {
    title: "Disordered Protein LAT Encodes Signal Balance in T Cell Activation",
    summary: "A single-cell mutational screen shows how the disordered adapter LAT tunes T cell signaling through distributed sequence elements.",
    topic: "Immunology",
    readTime: "6 min read",
    date: "2026-01-01",
    dateLabel: "2026",
    journal: "Science, 2026",
    href: "lat-tcell.html",
    image: "tcell_dual_editorial_art.png",
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
    image: "ML_protein.png",
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
    image: "DJprotein.png",
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
    image: "Stepwise_slime.png",
    alt: "Illustrated slime mould network spreading across a geographic map"
  }
].sort((a, b) => new Date(b.date) - new Date(a.date));

function renderRecentBriefs(containerId, limit = 4) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = SCIENCE_BRIEFS.slice(0, limit).map((brief) => `
    <a href="${brief.href}" class="group bg-surface-container rounded-xl shadow-lg overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
      <div class="aspect-video overflow-hidden bg-surface-container-low">
        <img src="${brief.image}" alt="${brief.alt}" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"/>
      </div>
      <div class="p-6">
        <div class="flex items-center gap-2 mb-3">
          <span class="font-label text-xs tracking-[0.05em] text-primary uppercase">${brief.topic}</span>
          <span class="text-outline text-xs">&bull;</span>
          <span class="font-label text-xs text-on-surface-variant">${brief.readTime}</span>
        </div>
        <h3 class="font-headline text-xl text-primary leading-tight mb-4 group-hover:text-teal-700 transition-colors">${brief.title}</h3>
        <p class="font-body text-sm text-secondary leading-relaxed mb-5">${brief.summary}</p>
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
    <a href="${brief.href}" data-date="${brief.date}" class="group block bg-white rounded-2xl border border-surface-container-high shadow-sm hover:shadow-md transition-all overflow-hidden">
      <article class="grid gap-0 md:grid-cols-[220px_1fr]">
        <div class="aspect-video md:aspect-square bg-surface-container overflow-hidden">
          <img src="${brief.image}" alt="${brief.alt}" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"/>
        </div>
        <div class="p-7 flex flex-col justify-center">
          <div class="flex flex-wrap items-center gap-2 text-xs font-label uppercase tracking-[0.2em] mb-3">
            <span class="text-primary">${brief.topic}</span>
            <span class="text-slate-300">&bull;</span>
            <span class="text-slate-400">${brief.readTime}</span>
            <span class="text-slate-300">&bull;</span>
            <span class="text-slate-400">${brief.dateLabel}</span>
            ${index === 0 ? '<span class="rounded-full bg-teal-50 border border-teal-200 px-2 py-0.5 text-teal-800">New</span>' : ''}
          </div>
          <h2 class="font-headline text-2xl md:text-3xl text-primary leading-snug group-hover:text-teal-700 transition-colors">${brief.title}</h2>
          <p class="mt-3 text-sm md:text-base text-secondary leading-relaxed">${brief.summary}</p>
          <div class="mt-5 flex items-center justify-between gap-4">
            <span class="text-xs text-on-surface-variant font-label italic">${brief.journal}</span>
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
