"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, ChevronDown, Clock } from "lucide-react";
import { restaurant } from "@/data/mockData";
import { useLang } from "@/context/LanguageContext";
import Link from "next/link";

interface Particle {
    id: number;
    size: number;
    left: number;
    duration: number;
    delay: number;
}

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 36 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.14, duration: 0.7, ease: [0.22, 1, 0.36, 1] as any },
    }),
};

export default function HeroSection() {
    const { t } = useLang();
    const [mounted, setMounted] = useState(false);
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        setMounted(true);
        setParticles(
            Array.from({ length: 10 }, (_, i) => ({
                id: i,
                size: Math.random() * 6 + 3,
                left: Math.random() * 100,
                duration: Math.random() * 22 + 18,
                delay: Math.random() * 12,
            }))
        );
    }, []);

    return (
        <section className="hero" id="home">
            <div className="hero-bg" />
            <div className="hero-particles">
                {mounted && particles.map((p) => (
                    <div key={p.id} className="particle" style={{
                        width: p.size, height: p.size, left: `${p.left}%`,
                        animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s`,
                    }} />
                ))}
            </div>

            <div className="hero-content">
                <div className="hero-text">
                    <motion.div className="hero-badge" custom={0} variants={fadeUp} initial="hidden" animate="visible">
                        {t("hero_badge")}
                    </motion.div>

                    <motion.h1 className="hero-title" custom={1} variants={fadeUp} initial="hidden" animate="visible">
                        {t("hero_title")}
                    </motion.h1>
                    <motion.span className="hero-title-italic" custom={2} variants={fadeUp} initial="hidden" animate="visible">
                        {t("hero_subtitle")}
                    </motion.span>

                    <motion.p className="hero-description" custom={3} variants={fadeUp} initial="hidden" animate="visible">
                        {t("hero_desc")}
                    </motion.p>

                    <motion.div custom={3.5} variants={fadeUp} initial="hidden" animate="visible"
                        style={{ color: "var(--primary)", letterSpacing: "0.5em", fontSize: "0.8rem", marginBottom: 28, opacity: 0.6 }}>
                        {t("hero_divider")}
                    </motion.div>

                    <motion.div className="hero-stats" custom={4} variants={fadeUp} initial="hidden" animate="visible">
                        {[
                            { value: restaurant.rating + " ★", label: t("hero_stat1") },
                            { value: restaurant.deliveryTime, label: t("hero_stat2") },
                            { value: "₹" + restaurant.minOrder, label: t("hero_stat3") },
                        ].map((s) => (
                            <div className="hero-stat" key={s.label}>
                                <div className="hero-stat-value">{s.value}</div>
                                <div className="hero-stat-label">{s.label}</div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div className="hero-cta" custom={5} variants={fadeUp} initial="hidden" animate="visible">
                        <Link href="/menu" className="btn-primary">
                            {t("hero_cta1")} <ArrowRight size={15} />
                        </Link>
                        <a href="#about" className="btn-secondary" onClick={(e) => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }}>
                            {t("hero_cta2")} <ChevronDown size={15} />
                        </a>
                    </motion.div>
                </div>

                {/* Right Visual */}
                <motion.div className="hero-visual"
                    initial={{ opacity: 0, scale: 0.93 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                    <div className="hero-image-stack">
                        <div className="hero-main-image-wrap">
                            <img
                                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&q=90&fit=crop"
                                alt="Agora restaurant interior"
                                className="hero-main-image"
                            />
                        </div>

                        <motion.div style={{
                            position: "absolute", bottom: 18, left: -38,
                            width: 136, height: 136,
                            border: "1px solid var(--border-strong)", overflow: "hidden",
                            boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
                        }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}>
                            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=280&q=85&fit=crop"
                                alt="Mediterranean plating"
                                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "sepia(15%) contrast(1.05)" }} />
                        </motion.div>

                        <motion.div className="hero-floating-card hero-card-rating" style={{ bottom: 168, left: -46 }}
                            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }}>
                            <div style={{ fontSize: "1.6rem" }}>★</div>
                            <div>
                                <div style={{ fontWeight: 700, fontFamily: "'Cinzel', serif", fontSize: "0.9rem" }}>4.8 Rating</div>
                                <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontFamily: "'Cinzel', serif", letterSpacing: "0.06em" }}>12.4K+ {t("hero_stat1")}</div>
                            </div>
                        </motion.div>

                        <motion.div className="hero-floating-card hero-card-delivery"
                            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.95 }}>
                            <Clock size={18} style={{ color: "var(--primary)", margin: "0 auto 5px" }} />
                            <div className="hero-card-value">25min</div>
                            <div className="hero-card-label">{t("hero_stat2")}</div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
