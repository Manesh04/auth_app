import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Github, Mail, User } from "lucide-react";
import { motion } from "framer-motion";
import React, { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import type RegisterData from "../models/RegisterData";
import { registerUser } from "../services/AuthService";
import { useNavigate } from "react-router";

function Signup() {
  const [data, setData] = useState<RegisterData>({
    name: "",
    email: "",
    password: ""
  })

  const [loading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

const navigate = useNavigate();

  //text input, email, password, number, textarea
  //handling form change
   const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
    // console.log(event.target.name);
    // console.log(event.target.value);
    setData((value)=>({
      ...value,
      [event.target.name]:event.target.value
    }));
};

  //handling form submit 
  const handleFormSubmit = async(event:React.FormEvent)=>{
    event.preventDefault();
    console.log(data);

    //validation 
    if(data.name.trim() === ""){
      toast.error("Name is required");
      return;
  }

   if(data.email.trim() === ""){
      toast.error("Email is required");
      return;
  }

   if(data.password.trim() === ""){
      toast.error("Password is required");
      return;
  }

  //Form submit for registration
  try {
    const result = await registerUser(data);
    console.log(result);
    toast.success("User registered successfully...");
    setData({
      name: "",
      email: "",
      password: ""
    });
    //navigate : login page
    navigate('/login');
  } catch (error) {
    console.log(error);
    toast.error("Error while registering user...");
  }

};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/40 to-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-card/70 backdrop-blur-xl border-border shadow-xl">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-3xl font-bold tracking-tight">
              Create your account
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Get started with secure, next‑gen authentication
            </p>
          </CardHeader>

          {/* Form */}
          <form onSubmit={handleFormSubmit}>
          <CardContent className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="pl-9"
                  name="name"
                  value={data.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-9"
                  name="email"
                  value={data.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                name="password"
                value={data.password}
                onChange={handleInputChange}
              />
            </div>

            {/* Signup Button */}
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Sign Up
            </Button>

            {/* Divider */}
            <div className="relative">
              <Separator />
              <span className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground bg-card px-2">
                OR SIGN UP WITH
              </span>
            </div>

            {/* OAuth */}
            <div className="grid gap-3">
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
              Already have an account?{" "}
              <span className="text-primary hover:underline cursor-pointer">
                Sign in
              </span>
            </p>
          </CardContent>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}

export default Signup