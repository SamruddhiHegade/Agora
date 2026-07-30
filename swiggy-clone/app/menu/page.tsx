"use client";

import { useState, useMemo } from "react";
import { Search, Leaf, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MenuItemCard from "@/components/MenuItemCard";
import { menuItems, categories, restaurant } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LanguageContext";

export default function MenuPage() {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [vegOnly, setVegOnly] = useState(false);
    const [bestsellersOnly, setBestsellersOnly] = useState(false);
    const { totalItems, setIsOpen } = useCart();
    const { t } = useLang();

    const filtered = useMemo(() => {
        return menuItems.filter((item) => {
            const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.description.toLowerCase().includes(search.toLowerCase());
            const matchCat = !activeCategory || item.category === activeCategory;
            const matchVeg = !vegOnly || item.isVeg;
            const matchBest = !bestsellersOnly || item.isBestseller;
            return matchSearch && matchCat && matchVeg && matchBest;
        });
    }, [search, activeCategory, vegOnly, bestsellersOnly]);

    const groupedByCategory = useMemo(() => {
        const groups: Record<string, typeof menuItems> = {};
        filtered.forEach((item) => {
            if (!groups[item.category]) groups[item.category] = [];
            groups[item.category].push(item);
        });
        return groups;
    }, [filtered]);

    const catOrder = categories.map((c) => c.id);
    const sortedGroups = catOrder
        .filter((id) => groupedByCategory[id]?.length > 0)
        .map((id) => [id, groupedByCategory[id]] as const);

    const scrollToCategory = (catId: string) => {
        setActiveCategory(catId);
        const el = document.getElementById(`cat-${catId}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div className="page-wrapper">
            {/* ── Menu Hero ── */}
            <div style={{
                background: "var(--bg-card)", borderBottom: "1px solid var(--border-strong)",
                padding: "120px 32px 48px", textAlign: "center",
                position: "relative", overflow: "hidden",
            }}>
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=70&fit=crop')",
                    backgroundSize: "cover", backgroundPosition: "center",
                    filter: "sepia(20%) brightness(0.22)",
                }} />
                <div style={{ position: "relative", zIndex: 2 }}>
                    <div className="section-label">{t("menu_eyebrow")}</div>
                    <div style={{ color: "var(--primary)", letterSpacing: "0.4em", fontSize: "0.9rem", marginBottom: 18, opacity: 0.7 }}>— ✦ —</div>
                    <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, letterSpacing: "0.06em", marginBottom: 10 }}>
                        {t("menu_title")}
                    </h1>
                    <p style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", color: "var(--text-secondary)", fontSize: "1.05rem" }}>
                        {menuItems.length} {t("menu_subtitle")}
                    </p>
                </div>
            </div>

            {/* ── Sticky Info Bar ── */}
            <div className="info-bar">
                <div className="info-bar-inner">
                    <div className="info-chip"><span className="info-chip-icon">★</span>{restaurant.rating} · {restaurant.totalRatings} {t("hero_stat1")}s</div>
                    <div className="info-chip"><span className="info-chip-icon">⏱</span>{restaurant.deliveryTime}</div>
                    <div className="info-chip"><span className="info-chip-icon">🛻</span>₹{restaurant.deliveryFee}</div>
                    <div className="info-chip"><span className="info-chip-icon">🏛</span>{restaurant.openTime} – {restaurant.closeTime}</div>
                    {totalItems > 0 && (
                        <button onClick={() => setIsOpen(true)} style={{
                            marginLeft: "auto", background: "var(--primary)", color: "var(--bg)",
                            fontFamily: "'Cinzel', serif", fontSize: "0.65rem", fontWeight: 700,
                            letterSpacing: "0.12em", textTransform: "uppercase", padding: "8px 18px",
                            border: "none", cursor: "pointer",
                        }}>
                            {t("view_order")} ({totalItems})
                        </button>
                    )}
                </div>
            </div>

            {/* ── Main Grid ── */}
            <div className="menu-section">
                {/* Sidebar */}
                <aside className="menu-sidebar">
                    <div className="sidebar-title">{t("sidebar_title")}</div>
                    <nav className="sidebar-nav">
                        <button className={`sidebar-link ${!activeCategory ? "active" : ""}`} onClick={() => setActiveCategory(null)}>
                            <span className="sidebar-link-icon">📜</span>{t("codex_all")}
                            <span className="sidebar-count">{menuItems.length}</span>
                        </button>
                        {categories.map((cat) => {
                            const count = menuItems.filter((m) => m.category === cat.id).length;
                            return (
                                <button key={cat.id} className={`sidebar-link ${activeCategory === cat.id ? "active" : ""}`} onClick={() => scrollToCategory(cat.id)}>
                                    <span className="sidebar-link-icon">{cat.icon}</span>
                                    {t("cat_" + cat.id)}
                                    <span className="sidebar-count">{count}</span>
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                {/* Content */}
                <div>
                    <div className="menu-controls">
                        <div className="search-box">
                            <Search size={15} className="search-icon" />
                            <input type="text" className="search-input" placeholder={t("search_ph")} value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        <button className={`filter-pill ${vegOnly ? "active" : ""}`} onClick={() => setVegOnly(!vegOnly)}>
                            <Leaf size={12} /> {t("filter_veg")}
                        </button>
                        <button className={`filter-pill ${bestsellersOnly ? "active" : ""}`} onClick={() => setBestsellersOnly(!bestsellersOnly)}>
                            <Star size={12} /> {t("filter_best")}
                        </button>
                    </div>

                    <AnimatePresence>
                        {sortedGroups.length === 0 ? (
                            <div style={{ padding: "60px 0", textAlign: "center", color: "var(--text-muted)" }}>
                                <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.9rem", letterSpacing: "0.1em" }}>{t("no_dishes")}</div>
                                <div style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", marginTop: 8 }}>{t("no_dishes_sub")}</div>
                            </div>
                        ) : (
                            sortedGroups.map(([catId, items]) => {
                                const catInfo = categories.find((c) => c.id === catId);
                                if (!catInfo) return null;
                                return (
                                    <motion.div key={catId} id={`cat-${catId}`} className="category-section"
                                        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                                        <div className="category-header" style={{ borderBottom: "1px solid var(--border-strong)", marginBottom: 24, paddingBottom: 14 }}>
                                            <div className="category-title">
                                                <span className="category-title-icon">{catInfo.icon}</span>
                                                {t("cat_" + catInfo.id).toUpperCase()}
                                            </div>
                                            <div className="category-count">{items.length} {items.length === 1 ? "dish" : "dishes"}</div>
                                        </div>
                                        <div className="menu-grid">
                                            {(items as typeof menuItems).map((item) => (
                                                <MenuItemCard key={item.id} item={item} />
                                            ))}
                                        </div>
                                    </motion.div>
                                );
                            })
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
