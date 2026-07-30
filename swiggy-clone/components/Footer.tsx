"use client";

import Link from "next/link";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { usePathname } from "next/navigation";

export default function Footer() {
    const { t } = useLang();
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

    return (
        <footer className="footer" id="contact">
            <div className="footer-inner">
                <div className="footer-top">
                    {/* Brand */}
                    <div className="footer-brand">
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div className="navbar-logo-icon" style={{ flexShrink: 0 }}>𓂀</div>
                            <div>
                                <div className="navbar-logo-text">AGORA</div>
                                <div className="navbar-logo-subtitle">{t("nav_est")}</div>
                            </div>
                        </div>
                        <p style={{ marginTop: 16 }}>{t("footer_tagline")}</p>

                        {/* Real contact — always visible */}
                        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                            <a href="tel:+917829028436" style={{
                                display: "flex", alignItems: "center", gap: 8,
                                fontFamily: "'Cinzel', serif", fontSize: "0.72rem",
                                letterSpacing: "0.08em", color: "var(--primary)",
                                transition: "opacity 0.2s",
                            }}>
                                📞 +91 78290 28436
                            </a>
                            <a href="mailto:samruddhihegade08@gmail.com" style={{
                                display: "flex", alignItems: "center", gap: 8,
                                fontFamily: "'IM Fell English', serif", fontStyle: "italic",
                                fontSize: "0.9rem", color: "var(--text-secondary)",
                                transition: "color 0.2s",
                            }}>
                                ✉ samruddhihegade08@gmail.com
                            </a>
                        </div>
                    </div>

                    {/* Navigate */}
                    <div>
                        <div className="footer-col-title">{t("footer_nav")}</div>
                        <ul className="footer-links">
                            <li><Link href="/">{t("nav_home")}</Link></li>
                            <li><Link href="/menu">{t("nav_menu")}</Link></li>
                            <li><Link href="/#about" onClick={handleStoryClick}>{t("nav_story")}</Link></li>
                            <li><a href="#contact">{t("nav_contact")}</a></li>
                        </ul>
                    </div>

                    {/* Menu categories */}
                    <div>
                        <div className="footer-col-title">{t("footer_menu_col")}</div>
                        <ul className="footer-links">
                            <li><Link href="/menu#cat-starters">{t("cat_starters")}</Link></li>
                            <li><Link href="/menu#cat-mains">{t("cat_mains")}</Link></li>
                            <li><Link href="/menu#cat-grills">{t("cat_grills")}</Link></li>
                            <li><Link href="/menu#cat-desserts">{t("cat_desserts")}</Link></li>
                        </ul>
                    </div>

                    {/* Find us */}
                    <div>
                        <div className="footer-col-title">{t("footer_find")}</div>
                        <ul className="footer-links">
                            <li><a href="tel:+917829028436">+91 78290 28436</a></li>
                            <li><a href="mailto:samruddhihegade08@gmail.com">samruddhihegade08@gmail.com</a></li>
                            <li><span style={{ color: "var(--text-muted)", fontFamily: "'IM Fell English', serif", fontStyle: "italic" }}>12, Brigade Road, Bengaluru</span></li>
                            <li><span style={{ color: "var(--text-muted)", fontFamily: "'IM Fell English', serif", fontStyle: "italic" }}>{t("footer_open")}</span></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-copy">© {new Date().getFullYear()} {t("footer_copy")}</div>
                    <div className="footer-socials">
                        <a href="#" className="social-link" aria-label="Instagram"><Instagram size={15} /></a>
                        <a href="#" className="social-link" aria-label="Twitter"><Twitter size={15} /></a>
                        <a href="#" className="social-link" aria-label="Facebook"><Facebook size={15} /></a>
                        <a href="#" className="social-link" aria-label="YouTube"><Youtube size={15} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
