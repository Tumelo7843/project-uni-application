import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { universities, provinces } from "./universities.js";
const regionInfo = {
  "Eastern Cape": "Coastal campuses, rich in history and research.",
  "Free State": "Central South Africa, with a strong campus community.",
  Gauteng: "The country’s largest choice of universities and study paths.",
  "KwaZulu-Natal": "A diverse coastal region with four public universities.",
  Limpopo: "Study in South Africa’s northern province.",
  Mpumalanga: "A growing university destination in the Lowveld.",
  "Northern Cape": "Explore the province’s public university in Kimberley.",
  "North West": "Find programmes across three vibrant campus towns.",
  "Western Cape": "Four universities across the Cape’s academic hubs.",
};
function App() {
  const [province, setProvince] = useState("All provinces"),
    [query, setQuery] = useState(""),
    [selected, setSelected] = useState(null);
  const filtered = useMemo(
    () =>
      universities.filter(
        (u) =>
          (province === "All provinces" || u.province === province) &&
          (!query ||
            [u.name, u.city, u.focus, u.province]
              .join(" ")
              .toLowerCase()
              .includes(query.toLowerCase())),
      ),
    [province, query],
  );
  const grouped = provinces.map((p) => [
    p,
    universities.filter((u) => u.province === p).length,
  ]);
  function dates(u) {
    if (!u.close) return "2027 dates: check official site";
    const close = new Date(u.close + "T23:59:59");
    const status = Date.now() > close ? "Closed" : "Open";
    return (
      status +
      " · 2027 applications: " +
      new Date(u.open + "T00:00:00").toLocaleDateString("en-ZA", {
        day: "numeric",
        month: "short",
      }) +
      " – " +
      new Date(u.close + "T00:00:00").toLocaleDateString("en-ZA", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    );
  }
  return (
    <>
      <header className="topbar">
        <a href="#home" className="brand">
          <span className="brandmark">U</span>
          <span>
            uni<span className="brand-accent">path</span>
            <small> SOUTH AFRICA</small>
          </span>
        </a>
        <nav>
          <a href="#provinces">Explore</a>
          <a href="#universities">Universities</a>
          <a href="#about">How it works</a>
        </nav>
        <a className="nav-cta" href="#universities">
          Find your university <span>↗</span>
        </a>
      </header>
      <main id="home">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="live-dot"></span> YOUR NEXT CHAPTER STARTS HERE
            </div>
            <h1>
              Find your place.
              <br />
              <em>Find your future.</em>
            </h1>
            <p>
              Explore South Africa’s public universities by province, discover
              what they offer and apply through their official portals.
            </p>
            <a className="primary" href="#provinces">
              Explore provinces <span>↓</span>
            </a>
            <div className="hero-proof">
              <div className="avatar-stack">
                <b>EC</b>
                <b>GP</b>
                <b>WC</b>
              </div>
              <span>
                One clear starting point
                <br />
                <strong>for your university journey</strong>
              </span>
            </div>
          </div>
          <div className="hero-art">
            <div className="art-label">
              SOUTH AFRICA <span>09 PROVINCES</span>
            </div>
            <div className="art-orbit orbit-one"></div>
            <div className="art-orbit orbit-two"></div>
            <div className="art-center">
              <div className="sun">+</div>
              <span>
                YOUR
                <br />
                NEXT STEP
              </span>
            </div>
            <div className="art-tag tag-one">✦ 26 public universities</div>
            <div className="art-tag tag-two">↗ Find your direction</div>
            <div className="art-coordinate">29° S&nbsp;&nbsp; 24° E</div>
            <div className="art-lines"></div>
          </div>
          <div className="hero-foot">
            <span>01 / DISCOVER</span>
            <span>MADE FOR THE JOURNEY AHEAD</span>
          </div>
        </section>
        <section id="provinces" className="section provinces-section">
          <div className="section-heading">
            <div>
              <div className="eyebrow">EXPLORE BY LOCATION</div>
              <h2>
                Choose a province<span className="period">.</span>
              </h2>
            </div>
            <p>
              Start close to home, or see what’s waiting
              <br />
              across the country.
            </p>
          </div>
          <div className="province-grid">
            {grouped.map(([p, n], i) => (
              <button
                onClick={() => {
                  setProvince(province === p ? "All provinces" : p);
                  document
                    .getElementById("universities")
                    .scrollIntoView({ behavior: "smooth" });
                }}
                className={
                  "province-card province-" +
                  i +
                  (province === p ? " active" : "")
                }
                key={p}
              >
                <span className="province-num">0{i + 1}</span>
                <span className="province-name">{p}</span>
                <span className="province-meta">
                  {n} {n === 1 ? "UNIVERSITY" : "UNIVERSITIES"}
                </span>
                <span className="province-arrow">↗</span>
              </button>
            ))}
          </div>
          <div className="province-note">
            All nine provinces · 26 public universities{" "}
            <span>Click any province to explore its campuses ↗</span>
          </div>
        </section>
        <section id="universities" className="section directory">
          <div className="section-heading">
            <div>
              <div className="eyebrow">THE DIRECTORY</div>
              <h2>
                Find your university<span className="period">.</span>
              </h2>
            </div>
            <span className="count-pill">{filtered.length} INSTITUTIONS</span>
          </div>
          <div className="filters">
            <div className="searchbox">
              <span>⌕</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search university, city or study area"
                aria-label="Search universities"
              />
            </div>
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              aria-label="Filter by province"
            >
              <option>All provinces</option>
              {provinces.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="university-grid">
            {filtered.map((u, i) => (
              <article className="uni-card" key={u.name}>
                <div className="uni-card-top">
                  <span className="uni-monogram">{u.short}</span>
                  <span className="uni-index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="uni-location">
                  ⌖ &nbsp;{u.city} · {u.province}
                </div>
                <h3>{u.name}</h3>
                <p className="uni-focus">{u.focus}</p>
                <div className="date-row">
                  <span className="date-dot"></span>
                  {dates(u)}
                </div>
                <div className="card-actions">
                  <button
                    className="details-btn"
                    onClick={() => setSelected(u)}
                  >
                    University details <span>↗</span>
                  </button>
                  <a
                    className="apply-btn"
                    href={u.apply}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Apply <span>↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="empty">
              No universities match that search. Try another name or province.
            </div>
          )}
        </section>
        <section id="about" className="how-section">
          <div>
            <div className="eyebrow">A BETTER PLACE TO BEGIN</div>
            <h2>
              From curious
              <br />
              to <em>confident.</em>
            </h2>
          </div>
          <div className="steps">
            <div>
              <span>01</span>
              <section>
                <h3>Pick a province</h3>
                <p>
                  See the public universities in every part of South Africa.
                </p>
              </section>
            </div>
            <div>
              <span>02</span>
              <section>
                <h3>Explore your options</h3>
                <p>
                  Get a quick overview, then follow the official university
                  links for programme and admission details.
                </p>
              </section>
            </div>
            <div>
              <span>03</span>
              <section>
                <h3>Apply at the source</h3>
                <p>
                  Continue straight to the university’s own application page to
                  submit your application.
                </p>
              </section>
            </div>
          </div>
        </section>
        <section className="notice">
          <span>+</span>
          <p>
            <strong>Keep your plans current.</strong> Programme requirements and
            application dates can change by qualification and applicant type.
            Confirm the latest details on the university’s official website
            before applying.
          </p>
        </section>
      </main>
      <footer>
        <a href="#home" className="brand">
          <span className="brandmark">U</span>
          <span>
            uni<span className="brand-accent">path</span>
            <small> SOUTH AFRICA</small>
          </span>
        </a>
        <span>Explore with confidence. Apply at the source.</span>
        <a href="https://www.gov.za/provinces" target="_blank" rel="noreferrer">
          About South Africa ↗
        </a>
        <small>
          © 2026 UNIPATH · UNIVERSITY INFORMATION LINKS TO OFFICIAL SOURCES
        </small>
      </footer>
      {selected && (
        <div
          className="modal-backdrop"
          onMouseDown={(e) => e.target === e.currentTarget && setSelected(null)}
        >
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              className="modal-close"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              ×
            </button>
            <span className="uni-monogram">{selected.short}</span>
            <div className="eyebrow">
              {selected.province} · {selected.city}
            </div>
            <h2 id="modal-title">{selected.name}</h2>
            <p>{selected.focus}</p>
            <div className="modal-info">
              <strong>Programmes & entry requirements</strong>
              <p>
                Requirements vary by qualification and year. Use the
                university’s official study pages to check programme choices,
                subject prerequisites, APS scores and documents.
              </p>
              <strong>2027 application dates</strong>
              <p>
                {dates(selected)}
                {selected.source && (
                  <>
                    {" "}
                    ·{" "}
                    <a href={selected.source} target="_blank" rel="noreferrer">
                      Official date source ↗
                    </a>
                  </>
                )}
              </p>
            </div>
            <div className="modal-actions">
              <a
                className="details-btn"
                href={selected.site}
                target="_blank"
                rel="noreferrer"
              >
                University website ↗
              </a>
              <a
                className="apply-btn"
                href={selected.apply}
                target="_blank"
                rel="noreferrer"
              >
                Go to application portal ↗
              </a>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
