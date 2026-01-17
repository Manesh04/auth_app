"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Fingerprint, Lock, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background text-foreground">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
        >
          Secure Authentication, Reinvented
        </motion.h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          A next-generation authentication platform with blazing fast login,
          biometric support, and enterprise-grade security.
        </p>
        <div className="mt-10 flex gap-4">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="border-border text-foreground">
            View Docs
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className=" px-6 py-5 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-semibold text-center mb-10">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <Card
              key={i}
              className="bg-card/60 border-border backdrop-blur-xl"
            >
              <CardHeader>
                <feature.icon className="h-10 w-10 text-cyan-400 mb-4" />
                <CardTitle className="text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-400">
                {feature.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Security Section */}
      <section className="px-6 py-24 bg-gradient-to-r from-muted/40 to-background">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Enterprise-Grade Security
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Built with zero-trust architecture, encrypted tokens, OAuth2, JWT,
            and optional MFA to keep your users safe at all times.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-28 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Start Securing Your App Today
        </h2>
        <p className="text-muted-foreground mb-10">
          Integrate in minutes. Scale effortlessly. Sleep peacefully.
        </p>
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          Create Free Account
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-muted-foreground">
        © 2026 AuthX. All rights reserved.
      </footer>
    </div>
  );
}

const features = [
  {
    title: "Biometric Login",
    description: "Support for fingerprint and face authentication out of the box.",
    icon: Fingerprint,
  },
  {
    title: "Advanced Encryption",
    description: "State-of-the-art encryption for tokens, sessions, and data.",
    icon: Lock,
  },
  {
    title: "Fast & Scalable",
    description: "Optimized for high traffic with ultra-low latency.",
    icon: Zap,
  },
  {
    title: "Compliance Ready",
    description: "Designed to meet enterprise and regulatory standards.",
    icon: ShieldCheck,
  },
];
