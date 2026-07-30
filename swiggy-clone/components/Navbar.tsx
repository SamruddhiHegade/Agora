"use client";

import { useState, useEffect, useRef } from "react";
import { ShoppingBag, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLang, languages } from "@/context/LanguageContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const { totalItems, setIsOpen } = useCart();
    const { lang, setLang, t } = useLang();
    const [scrolled, setScrolled] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const dropRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    const handleStoryClick = (e: React.MouseEvent) => {
        if (pathname === "/") {
            e.preventDefault();
            const el = document.getElementById("about");
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
                setLangOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const currentLang = languages.find((l) => l.code === lang)!;

    return (
        <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
            <div className="navbar-inner">
                {/* Logo */}
                <Link href="/" className="navbar-logo">
                    <div className="navbar-logo-icon">𓂀</div>
                    <div>
                        <span className="navbar-logo-text">AGORA</span>
                        <span className="navbar-logo-subtitle">{t("nav_est")}</span>
                    </div>
                </Link>

                {/* Nav links */}
                <div className="navbar-nav">
                    <Link href="/" className="navbar-link">{t("nav_home")}</Link>
                    <Link href="/menu" className="navbar-link">{t("nav_menu")}</Link>
                    <Link href="/#about" onClick={handleStoryClick} className="navbar-link">{t("nav_story")}</Link>
                    <a href="#contact" className="navbar-link">{t("nav_contact")}</a>
                </div>

                <div className="navbar-actions">
                    {/* Language Switcher */}
                    <div ref={dropRef} style={{ position: "relative" }}>
                        <button
                            onClick={() => setLangOpen(!langOpen)}
                            style={{
                                display: "flex", alignItems: "center", gap: 6,
                                background: "transparent",
                                border: "1.5px solid var(--border-strong)",
                                color: "var(--text-secondary)",
                                fontFamily: "'Cinzel', serif",
                                fontSize: "0.65rem", letterSpacing: "0.12em",
                                padding: "7px 13px", cursor: "pointer",
                                transition: "all 0.25s",
                            }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--primary)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--primary)"; }}
                            onMouseLeave={(e) => { if (!langOpen) { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-strong)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)"; } }}
                        >
                            <span style={{ fontSize: "1rem" }}>{currentLang.flag}</span>
                            {currentLang.code.toUpperCase()}
                            <ChevronDown size={11} style={{ transform: langOpen ? "rotate(180deg)" : "none", transition: "transform 0.25s" }} />
                        </button>

                        {langOpen && (
                            <div style={{
                                position: "absolute", top: "calc(100% + 6px)", right: 0,
                                background: "var(--bg-card)",
                                border: "1px solid var(--border-strong)",
                                minWidth: 150,
                                zIndex: 2000,
                                boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                            }}>
                                {languages.map((l) => (
                                    <button
                                        key={l.code}
                                        onClick={() => { setLang(l.code); setLangOpen(false); }}
                                        style={{
                                            display: "flex", alignItems: "center", gap: 10,
                                            width: "100%", textAlign: "left",
                                            padding: "10px 16px",
                                            background: l.code === lang ? "rgba(200,151,58,0.08)" : "transparent",
                                            border: "none", cursor: "pointer",
                                            fontFamily: "'Cinzel', serif",
                                            fontSize: "0.7rem", letterSpacing: "0.08em",
                                            color: l.code === lang ? "var(--primary)" : "var(--text-secondary)",
                                            borderLeft: l.code === lang ? "2px solid var(--primary)" : "2px solid transparent",
                                            transition: "all 0.2s",
                                        }}
                                        onMouseEnter={(e) => { if (l.code !== lang) { (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)"; (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-elevated)"; } }}
                                        onMouseLeave={(e) => { if (l.code !== lang) { (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)"; (e.currentTarget as HTMLButtonElement).style.background = "transparent"; } }}
                                    >
                                        <span style={{ fontSize: "1.1rem" }}>{l.flag}</span>
                                        {l.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Cart */}
                    <button className="cart-btn" onClick={() => setIsOpen(true)} id="cart-button">
                        <ShoppingBag size={15} />
                        <span>{t("nav_order")}</span>
                        {totalItems > 0 && (
                            <span className="cart-badge">{totalItems > 99 ? "99+" : totalItems}</span>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
}
