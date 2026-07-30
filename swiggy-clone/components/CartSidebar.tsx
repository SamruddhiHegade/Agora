"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LanguageContext";
import { useState } from "react";

export default function CartSidebar() {
    const { items, isOpen, setIsOpen, subtotal, totalItems, removeItem, updateQuantity, clearCart } = useCart();
    const { t } = useLang();
    const [ordered, setOrdered] = useState(false);

    const deliveryFee = subtotal > 0 ? 29 : 0;
    const taxes = Math.round(subtotal * 0.05);
    const total = subtotal + deliveryFee + taxes;

    const handleOrder = () => {
        setOrdered(true);
        setTimeout(() => { clearCart(); setOrdered(false); setIsOpen(false); }, 3200);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div className="cart-overlay"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)} />

                    <motion.div className="cart-sidebar"
                        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}>

                        <div className="cart-header">
                            <div>
                                <div className="cart-title">{t("cart_title")}</div>
                                {totalItems > 0 && (
                                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 2, fontFamily: "'IM Fell English', serif", fontStyle: "italic" }}>
                                        {totalItems} {t("cart_from")}
                                    </div>
                                )}
                            </div>
                            <button className="cart-close-btn" onClick={() => setIsOpen(false)}><X size={18} /></button>
                        </div>

                        {ordered ? (
                            <motion.div className="cart-empty"
                                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                                <div style={{ fontSize: "3.5rem" }}>🏛️</div>
                                <div className="cart-empty-text" style={{ color: "var(--primary)", fontSize: "1.05rem" }}>{t("order_placed")}</div>
                                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", textAlign: "center", fontFamily: "'IM Fell English', serif", fontStyle: "italic", lineHeight: 1.7 }}>
                                    {t("order_msg")}
                                </p>
                            </motion.div>
                        ) : items.length === 0 ? (
                            <div className="cart-empty">
                                <div className="cart-empty-icon" style={{ fontSize: "2.5rem" }}>🏺</div>
                                <div className="cart-empty-text">{t("cart_empty")}</div>
                                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", textAlign: "center", fontFamily: "'IM Fell English', serif", fontStyle: "italic" }}>
                                    {t("cart_empty_sub")}
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="cart-items">
                                    <AnimatePresence initial={false}>
                                        {items.map((item) => (
                                            <motion.div key={item.id} className="cart-item" layout
                                                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 30, height: 0 }} transition={{ duration: 0.2 }}>
                                                <img src={item.image} alt={t(item.id + "_name")} className="cart-item-image" />
                                                <div className="cart-item-info">
                                                    <div className="cart-item-name">{t(item.id + "_name")}</div>
                                                    <div className="cart-item-price">₹{item.price} {t("cart_from").split(" ")[0]}</div>
                                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                        <div className="quantity-control">
                                                            <button className="qty-btn" onClick={() => removeItem(item.id)}><Minus size={14} /></button>
                                                            <span className="qty-value">{item.quantity}</span>
                                                            <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
                                                        </div>
                                                        <div style={{ fontWeight: 700, fontSize: "0.95rem", fontFamily: "'Cinzel', serif" }}>₹{item.price * item.quantity}</div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>

                                <div className="cart-footer">
                                    <div className="cart-summary">
                                        <div className="cart-summary-row"><span>{t("cart_subtotal")}</span><span>₹{subtotal}</span></div>
                                        <div className="cart-summary-row"><span>{t("cart_delivery")}</span><span>₹{deliveryFee}</span></div>
                                        <div className="cart-summary-row"><span>{t("cart_taxes")}</span><span>₹{taxes}</span></div>
                                        <div className="cart-summary-row total"><span>{t("cart_total")}</span><span>₹{total}</span></div>
                                    </div>
                                    <button className="checkout-btn" onClick={handleOrder}>
                                        {t("place_order")} • ₹{total}
                                    </button>
                                    <button onClick={clearCart} style={{
                                        width: "100%", marginTop: 10, padding: 8,
                                        background: "transparent", border: "none",
                                        color: "var(--text-muted)", fontSize: "0.75rem",
                                        cursor: "pointer", display: "flex", alignItems: "center",
                                        justifyContent: "center", gap: 6,
                                        fontFamily: "'Cinzel', serif", letterSpacing: "0.08em",
                                    }}>
                                        <Trash2 size={13} /> {t("clear_cart")}
                                    </button>
                                </div>
                            </>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
