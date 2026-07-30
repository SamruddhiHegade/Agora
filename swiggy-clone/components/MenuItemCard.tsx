"use client";

import { motion } from "framer-motion";
import { Plus, Minus, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { MenuItem } from "@/types";
import { useLang } from "@/context/LanguageContext";

interface MenuItemCardProps {
    item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
    const { items, addItem, removeItem } = useCart();
    const { t } = useLang();
    const cartItem = items.find((i) => i.id === item.id);
    const qty = cartItem?.quantity ?? 0;

    return (
        <motion.div
            className="menu-card"
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="menu-card-image-wrap">
                <img
                    src={item.image}
                    alt={t(item.id + "_name")}
                    className="menu-card-image"
                    loading="lazy"
                />
                {item.isBestseller && (
                    <div className="menu-card-badge">⭐ {t("bestseller")}</div>
                )}
                <div className={`veg-indicator ${item.isVeg ? "veg" : "non-veg"}`}>
                    <div className="veg-dot" />
                </div>
            </div>

            <div className="menu-card-body">
                <div className="menu-card-name">{t(item.id + "_name")}</div>
                <div className="menu-card-desc">{t(item.id + "_desc")}</div>

                <div className="menu-card-meta">
                    {item.rating && (
                        <div className="menu-card-rating">
                            <Star size={12} fill="currentColor" />
                            {item.rating}
                        </div>
                    )}
                    {item.calories && (
                        <>
                            <div className="menu-divider" />
                            <div className="menu-card-calories">{item.calories} kcal</div>
                        </>
                    )}
                </div>

                <div className="menu-card-footer">
                    <div className="menu-price">
                        <span>₹</span>{item.price}
                    </div>

                    {qty === 0 ? (
                        <motion.button
                            className="add-btn"
                            onClick={() => addItem(item)}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Plus size={14} /> {t("add_btn")}
                        </motion.button>
                    ) : (
                        <div className="quantity-control">
                            <button className="qty-btn" onClick={() => removeItem(item.id)}>
                                <Minus size={14} />
                            </button>
                            <span className="qty-value">{qty}</span>
                            <button className="qty-btn" onClick={() => addItem(item)}>
                                <Plus size={14} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
