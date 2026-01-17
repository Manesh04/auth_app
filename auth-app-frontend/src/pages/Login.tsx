import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2Icon, Github, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import type LoginData from "@/models/LoginData";
import toast from "react-hot-toast";
import { LoginUser } from "@/services/AuthService";
import { useNavigate } from "react-router";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import useAuth from "@/auth/Store";

function Login() {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false); // Placeholder for potential future use
  const [error, setError] = useState<any>(null); // Placeholder for potential future use

  const navigate = useNavigate(); 
  const login = useAuth((state) => state.login);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async(event: FormEvent) => {
    event.preventDefault();

    // Validation: you should use react library for validation in production environment
    if (loginData.email.trim() === "") {
      toast.error("Email is required !");
      return;
    }
    if (loginData.password.trim() === "") {
      toast.error("Password is required !");
      return;
    }
    //server call for Login
    // console.log(event.target);
    // console.log(loginData);
    try {
      setLoading(true);
      // const userInfo = await LoginUser(loginData);

      //login function: useAuth
       await login(loginData);

      toast.success("Login Successful !");
      // console.log(userInfo);
      navigate("/dashboard");
      //save the current user logged in information to the local storage
      //localstorage 
    } catch (error: any) {
      console.log(error);
      setError(error);
      toast.error("Login Failed ! Please try again.");
      if(error?.status===400){
        setError(error);
    }else{
      setError(error);
    }
  }finally{
      setLoading(false);
    }
  };
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
              Welcome Back on Login Page
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              Login in to securely access your account
            </p>
          

          {/* error section  */}
         { error && (
           <div className="mt-4">
            <Alert variant={"destructive"}>
              <CheckCircle2Icon />
              <AlertTitle>{
                error?.response ? error?.response?.data?.message : error?.message}
                </AlertTitle>
            </Alert>
          </div>
         )}
        </CardHeader>
          {/* Form */}
          <form onSubmit={handleFormSubmit} className="mt-1 space-y-6">
            <CardContent className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  name="email"
                  value={loginData.email}
                  onChange={handleInputChange}
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  name="password"
                  value={loginData.password}
                  onChange={handleInputChange}
                />
              </div>

              {/* Login Button */}
              <Button disabled={loading} className="w-full cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground">
               {loading ?(
               <>
               <Spinner/>
               Please wait...
               </>  
               ):(
                "Login"
                )}
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
          </form>
        </Card>
      </motion.div>
    </div>
  );
}

export default Login;