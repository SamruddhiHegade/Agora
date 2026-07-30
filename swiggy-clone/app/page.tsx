"use client";

import HeroSection from "@/components/HeroSection";
import { menuItems } from "@/data/mockData";
import { useLang } from "@/context/LanguageContext";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const bestsellers = menuItems.filter((m) => m.isBestseller).slice(0, 6);

export default function HomePage() {
  const { t } = useLang();

  const highlights = [
    { icon: "🔥", titleKey: "h1_title", descKey: "h1_desc" },
    { icon: "🫒", titleKey: "h2_title", descKey: "h2_desc" },
    { icon: "🏛️", titleKey: "h3_title", descKey: "h3_desc" },
    { icon: "🍃", titleKey: "h4_title", descKey: "h4_desc" },
  ];

  return (
    <>
      <HeroSection />

      {/* ── About ── */}
      <section id="about" style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border-strong)", borderBottom: "1px solid var(--border-strong)", padding: "90px 32px" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          {/* Image collage */}
          <div style={{ position: "relative" }}>
            <div style={{ border: "1px solid var(--border-strong)", overflow: "hidden", height: 440 }}>
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=90&fit=crop"
                alt="Agora kitchen" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "sepia(12%) contrast(1.04)" }} />
            </div>
            <div style={{ position: "absolute", top: -10, left: -10, width: 30, height: 30, borderTop: "2px solid var(--primary)", borderLeft: "2px solid var(--primary)" }} />
            <div style={{ position: "absolute", bottom: -10, right: -10, width: 30, height: 30, borderBottom: "2px solid var(--primary)", borderRight: "2px solid var(--primary)" }} />
            <div style={{ position: "absolute", bottom: 24, left: 24, background: "rgba(16,12,7,0.94)", backdropFilter: "blur(14px)", border: "1px solid var(--border-strong)", padding: "14px 20px" }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.4rem", fontWeight: 700, color: "var(--primary)" }}>{t("about_img_est")}</div>
              <div style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", fontSize: "0.85rem", color: "var(--text-muted)", marginTop: 2 }}>{t("about_img_tagline")}</div>
            </div>
            <div style={{ position: "absolute", top: 24, right: -32, width: 120, height: 120, border: "1px solid var(--border-strong)", overflow: "hidden", boxShadow: "var(--shadow-card)" }}>
              <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=240&q=85&fit=crop"
                alt="Agora ambiance" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "sepia(15%)" }} />
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="section-label">{t("about_label")}</div>
            <div style={{ color: "var(--primary)", letterSpacing: "0.4em", fontSize: "1rem", marginBottom: 20, opacity: 0.7 }}>— ✦ —</div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.7rem, 2.8vw, 2.3rem)", fontWeight: 700, letterSpacing: "0.04em", marginBottom: 12, lineHeight: 1.2 }}>
              {t("about_title1")}
            </h2>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.5rem", color: "var(--primary)", marginBottom: 24, fontWeight: 400 }}>
              {t("about_title2")}
            </h3>
            <p style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", color: "var(--text-secondary)", lineHeight: 1.85, marginBottom: 16, fontSize: "1.05rem" }}>
              {t("about_p1")}
            </p>
            <p style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", color: "var(--text-secondary)", lineHeight: 1.85, marginBottom: 36, fontSize: "1.05rem" }}>
              {t("about_p2")}
            </p>
            <Link href="/menu" className="btn-primary" style={{ display: "inline-flex" }}>
              {t("about_cta")} <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Highlights ── */}
      <section style={{ padding: "90px 32px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div className="section-header">
            <div className="section-label">{t("highlights_label")}</div>
            <div style={{ color: "var(--primary)", letterSpacing: "0.4em", fontSize: "0.9rem", marginBottom: 16, opacity: 0.65 }}>— ✦ —</div>
            <h2 className="section-title">{t("highlights_title")}</h2>
            <p className="section-subtitle">{t("highlights_subtitle")}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {highlights.map((h, i) => (
              <div key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", padding: "32px 26px", position: "relative", transition: "border-color 0.3s, transform 0.3s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                <div style={{ position: "absolute", top: -1, left: -1, width: 16, height: 16, borderTop: "2px solid var(--primary)", borderLeft: "2px solid var(--primary)", opacity: 0.7 }} />
                <div style={{ fontSize: "1.8rem", marginBottom: 18 }}>{h.icon}</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>{t(h.titleKey)}</div>
                <p style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.75 }}>{t(h.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bestsellers ── */}
      <section style={{ padding: "90px 32px", background: "var(--bg-card)", borderTop: "1px solid var(--border-strong)" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
            <div>
              <div className="section-label">{t("best_label")}</div>
              <h2 className="section-title" style={{ marginBottom: 0 }}>{t("best_title")}</h2>
            </div>
            <Link href="/menu" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--primary)", fontFamily: "'Cinzel', serif", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              {t("best_link")} <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 14 }}>
            {bestsellers.map((item) => (
              <div key={item.id} style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", display: "flex", gap: 14, padding: 14, position: "relative", transition: "border-color 0.3s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}>
                <img src={item.image} alt={t(item.id + "_name")}
                  style={{ width: 80, height: 80, objectFit: "cover", flexShrink: 0, filter: "sepia(12%) contrast(1.04)" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.04em", marginBottom: 5 }}>{t(item.id + "_name")}</div>
                  <div style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: 8, lineHeight: 1.4 }}>
                    {t(item.id + "_desc").slice(0, 58)}…
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: "0.9rem" }}>₹{item.price}</span>
                    <Link href="/menu" style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem", color: "var(--primary)", letterSpacing: "0.1em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 3 }}>
                      {t("nav_order")} <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ padding: "90px 32px", background: "linear-gradient(160deg, #0E0A06 0%, #1C1208 50%, #0E0A06 100%)", borderTop: "1px solid var(--border-strong)", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, var(--primary), transparent)", opacity: 0.4 }} />
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--primary)", marginBottom: 20 }}>{t("cta_eyebrow")}</div>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, letterSpacing: "0.04em", marginBottom: 8 }}>{t("cta_title")}</h2>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.6rem", color: "var(--primary)", marginBottom: 24 }}>{t("cta_subtitle")}</div>
          <p style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: 36 }}>{t("cta_desc")}</p>
          <Link href="/menu" className="btn-primary" style={{ display: "inline-flex" }}>
            {t("cta_btn")} <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
