"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { fadeInUp, cardHover } from "@/lib/animations";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  gradient = "from-accent-purple-500 to-accent-blue-500",
}: FeatureCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <motion.div variants={cardHover}>
        <Card variant="glass" className="h-full hover-glow-purple transition-shadow duration-300">
          <CardContent className="pt-6">
            <div
              className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} mb-4`}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {description}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
