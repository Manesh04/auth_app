import React from 'react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Github, Mail } from "lucide-react";
import { motion } from "framer-motion";

function Login() {
 return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/40 to-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-card/70 backdrop-blur-xl border-border shadow-xl">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-3xl font-bold tracking-tight">
              Welcome Back
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              Sign in to securely access your account
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
              />
            </div>

            {/* Login Button */}
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Login
            </Button>

            {/* Divider */}
            <div className="relative">
              <Separator />
              <span className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground bg-card px-2">
                OR CONTINUE WITH
              </span>
            </div>

            {/* OAuth Buttons */}
            <div className="grid grid-cols-1 gap-3">
              <Button variant="outline" className="w-full gap-2">
                <Mail className="h-4 w-4" />
                Continue with Google
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Github className="h-4 w-4" />
                Continue with GitHub
              </Button>
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-muted-foreground">
              Don’t have an account?{" "}
              <span className="text-primary hover:underline cursor-pointer">
                Sign up
              </span>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default Login;