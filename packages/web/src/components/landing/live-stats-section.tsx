"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface CryptoStat {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  icon: string;
}

// Animated counter component
function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const spring = useSpring(0, { duration: 2000 });
  const display = useTransform(spring, (current) => {
    if (value >= 1000000000000) {
      return `${prefix}${(current / 1000000000000).toFixed(2)}T${suffix}`;
    }
    if (value >= 1000000000) {
      return `${prefix}${(current / 1000000000).toFixed(2)}B${suffix}`;
    }
    if (value >= 1000000) {
      return `${prefix}${(current / 1000000).toFixed(2)}M${suffix}`;
    }
    if (value >= 1000) {
      return `${prefix}${current.toLocaleString(undefined, { maximumFractionDigits: 0 })}${suffix}`;
    }
    return `${prefix}${current.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}${suffix}`;
  });

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}

// Fallback data in case API fails
const fallbackStats: CryptoStat[] = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC", price: 43250, change24h: 2.5, icon: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH", price: 2280, change24h: 1.8, icon: "https://assets.coingecko.com/coins/images/279/small/ethereum.png" },
  { id: "binancecoin", name: "BNB", symbol: "BNB", price: 315, change24h: -0.5, icon: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png" },
];

export function LiveStatsSection() {
  const [stats, setStats] = useState<CryptoStat[]>(fallbackStats);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin&vs_currencies=usd&include_24hr_change=true"
        );

        if (response.ok) {
          const data = await response.json();
          setStats([
            {
              id: "bitcoin",
              name: "Bitcoin",
              symbol: "BTC",
              price: data.bitcoin?.usd || 43250,
              change24h: data.bitcoin?.usd_24h_change || 2.5,
              icon: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
            },
            {
              id: "ethereum",
              name: "Ethereum",
              symbol: "ETH",
              price: data.ethereum?.usd || 2280,
              change24h: data.ethereum?.usd_24h_change || 1.8,
              icon: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
            },
            {
              id: "binancecoin",
              name: "BNB",
              symbol: "BNB",
              price: data.binancecoin?.usd || 315,
              change24h: data.binancecoin?.usd_24h_change || -0.5,
              icon: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png",
            },
          ]);
          setLastUpdated(new Date());
        }
      } catch (error) {
        console.error("Failed to fetch crypto stats:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
    const interval = setInterval(fetchStats, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Live Market</span> Data
          </h2>
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            Updated {lastUpdated.toLocaleTimeString()}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {stats.map((stat) => (
            <motion.div key={stat.id} variants={fadeInUp}>
              <Card variant="glass" className="hover-glow-purple transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Image
                      src={stat.icon}
                      alt={stat.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                      unoptimized
                    />
                    <div>
                      <h3 className="font-semibold">{stat.name}</h3>
                      <p className="text-sm text-muted-foreground">{stat.symbol}</p>
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div className="text-2xl font-bold">
                      <AnimatedNumber value={stat.price} prefix="$" />
                    </div>
                    <div
                      className={`flex items-center gap-1 text-sm font-medium ${
                        stat.change24h >= 0
                          ? "text-success-500"
                          : "text-error-500"
                      }`}
                    >
                      {stat.change24h >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {Math.abs(stat.change24h).toFixed(2)}%
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Total Market Cap */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Card variant="gradient" className="inline-block px-8 py-4">
            <p className="text-sm text-muted-foreground mb-1">
              Connect your wallet to see your portfolio value
            </p>
            <p className="text-lg font-semibold gradient-text">
              Start tracking in seconds
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
