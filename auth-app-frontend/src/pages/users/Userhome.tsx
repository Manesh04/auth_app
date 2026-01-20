import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
Activity,
ShieldCheck,
Users,
Clock,
LogOut,
} from "lucide-react";
import { motion } from "framer-motion";
import { getCurrentUser } from '@/services/AuthService';
import type { User } from './Userprofile';
import toast from 'react-hot-toast';
import useAuth from '@/auth/store';

function Userhome() {


  const user = useAuth((state) => state.user);
  const[user1, setUser1] = useState<User | null>(null);

  const getUserData = async () => {
    try {
     
      const user1 = await getCurrentUser(user?.email);
      setUser1(user1);
      toast.success("User data fetched successfully");

    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch user data");
    }
  }


 return (
    <div className="min-h-screen bg-background text-foreground p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here’s a quick overview of your account.
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <LogOut className="h-4 w-4" /> Logout
        </Button>
      </div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          title="Total Logins"
          value="1,248"
          icon={<Activity className="h-5 w-5" />}
          note="+12% this week"
        />
        <StatCard
          title="Active Sessions"
          value="3"
          icon={<Users className="h-5 w-5" />}
          note="Across devices"
        />
        <StatCard
          title="Security Status"
          value="Secure"
          icon={<ShieldCheck className="h-5 w-5" />}
          note="No threats detected"
        />
        <StatCard
          title="Last Login"
          value="2 hrs ago"
          icon={<Clock className="h-5 w-5" />}
          note="Mumbai, India"
        />
      </motion.div>

      {/* Activity & Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activities.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-border pb-3 last:border-none"
              >
                <div>
                  <p className="font-medium">{item.action}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.time}
                  </p>
                </div>
                <Badge variant="outline">{item.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Security Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Security Setup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm mb-2">Profile Completion</p>
              <Progress value={80} />
            </div>
            <div className="space-y-2 text-sm">
              <p>✔ Email verified</p>
              <p>✔ Strong password</p>
              <p className="text-muted-foreground">✖ Enable MFA</p>
            </div>
            <Button onClick={getUserData} size="sm" className="w-full">
              Get Current User
            </Button>
            <p>{user1?.name}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, note }: any) {
  return (
    <Card className="bg-card/70 backdrop-blur">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{note}</p>
      </CardContent>
    </Card>
  );
}

const activities = [
  {
    action: "Logged in from Chrome",
    time: "2 hours ago",
    status: "Success",
  },
  {
    action: "Password changed",
    time: "Yesterday",
    status: "Security",
  },
  {
    action: "New device detected",
    time: "2 days ago",
    status: "Alert",
  },
];

export default Userhome