import { MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";

export function FloatingActions() {
  return (
    <div className="fixed bottom-6 end-6 z-40 flex flex-col gap-3">
      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.08 }}
        href="https://wa.me/966112309669"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elegant"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.a>
      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.35, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.08 }}
        href="tel:920016546"
        aria-label="Call"
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elegant"
      >
        <Phone className="h-5 w-5" />
      </motion.a>
    </div>
  );
}
