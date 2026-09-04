import Ticker from "./Ticker";
import PageTabs from "./PageTabs";

export default function Header() {
  return (
    <>
      <Ticker />
      <header>
        <div className="header-inner">
          <div className="brand-block">
            <div className="brand">
              LA RIPOSTE<span className="dot">.</span>
            </div>
            <div className="brand-sub">Actu esport français</div>
          </div>
          <div className="status">
            <span className="blip"></span>
            <span>fil en direct</span>
          </div>
        </div>
        <PageTabs />
      </header>
    </>
  );
}
