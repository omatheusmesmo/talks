const TALKS = [
  {
    slug: "de-ze-ninguem-a-referencia",
    date: "2026",
    title: { pt: "De Zé-Ninguém a Referência", en: "From Nobody to Go-To" },
    summary: {
      pt: "Por que você deveria contribuir para o open source. De uma menção ao pt.quarkus.io num encontro ao palco, passando por reviews e pessoas.",
      en: "Why you should contribute to open source. From a mention of pt.quarkus.io at a meetup to the stage, through reviews and people.",
    },
    speakers: "Matheus Oliveira",
  },
  {
    slug: "o-poder-do-foco",
    date: "2026",
    title: { pt: "O Poder do Foco", en: "The Power of Focus" },
    summary: {
      pt: "Crescendo através de open source e comunidade. Como código, comunidade e presença em eventos viram carreira.",
      en: "Growing through open source and community. How code, community and event presence turn into a career.",
    },
    speakers: "Matheus Oliveira · Luiz Real",
  },
  {
    slug: "demo",
    date: "Template",
    title: { pt: "Deck de exemplo", en: "Sample deck" },
    summary: {
      pt: "Estrutura mínima para começar uma talk nova. Copie esta pasta, renomeie e edite os slides.",
      en: "Minimal structure to start a new talk. Copy this folder, rename it and edit the slides.",
    },
    speakers: { pt: "Ponto de partida", en: "Starting point" },
    tag: "template",
  },
];

const esc = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char],
  );

const pick = (value, lang) => (typeof value === "string" ? value : value[lang]);

function renderTalks(lang) {
  const deckPath = (slug) => (lang === "en" ? `${slug}/en.html` : `${slug}/`);

  document.getElementById("talks").innerHTML = TALKS.map((talk) => {
    const slug = esc(talk.slug);
    const tag = talk.tag ? `<span class="tag">${esc(talk.tag)}</span>` : "";
    return `
      <div class="talk">
        <span class="date">${esc(talk.date)}</span>
        <span>
          <h2><a href="${esc(deckPath(talk.slug))}">${esc(pick(talk.title, lang))}</a>${tag}</h2>
          <p>${esc(pick(talk.summary, lang))}</p>
          <span class="who">${esc(pick(talk.speakers, lang))}</span>
        </span>
        <span class="langs">
          <a href="${slug}/">PT</a>
          <a href="${slug}/en.html">EN</a>
        </span>
      </div>`;
  }).join("");
}
