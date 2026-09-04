// Static highlight strip under the header. On the original artifact this
// was populated by JS from a hardcoded facts array — here it's just server
// rendered once, which is simpler and just as accurate for a short list of
// season highlights. Update the FACTS array as the season moves on, or wire
// it up to a small "highlights" table later if it needs to change often.
const FACTS = [
  <span key="1">
    <b>VALORANT</b> Karmine Corp championne VCT EMEA Stage 2
  </span>,
  <span key="2">
    <b>LFL</b> Galions sacrés champions de France 2026
  </span>,
  <span key="3">
    <b>EWC 2026</b> finale CS2 à l&apos;Accor Arena le 23 août
  </span>,
  <span key="4">
    <b>LEC</b> Karmine Corp invaincue à domicile depuis janvier
  </span>,
  <span key="5">
    <b>ZEVENT 2026</b> 3–6 septembre à Montpellier
  </span>
];

export default function Ticker() {
  const sequence = [...FACTS, ...FACTS];
  return (
    <div className="ticker-wrap" aria-hidden="true">
      <div className="ticker-track">
        {sequence.map((fact, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
            {fact}
            <span style={{ opacity: 0.4 }}>&nbsp;/&nbsp;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
