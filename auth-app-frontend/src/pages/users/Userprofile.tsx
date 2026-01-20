import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, User as UserIcon, ShieldCheck, Calendar, Pencil, Save, X } from "lucide-react";
import { motion } from "framer-motion";
import useAuth from "@/auth/store";

// ===== User Type =====
export interface User {
  id: string;
  email: string;
  name?: string;
  enabled: boolean;
  image?: string;
  updatedAt?: Date;
  createdAt?: Date;
  provider: string;
}

// ===== Dummy User (fallback only) =====
const fallbackUser: User = {
  id: "u-101",
  email: "manesh@example.com",
  name: "Manesh Thokale",
  enabled: true,
  image: "https://i.pravatar.cc/300",
  provider: "credentials",
  createdAt: new Date("2026-01-01"),
  updatedAt: new Date(),
};


export default function Userprofile({

      currentUser,
}: {
  currentUser?: User;
}) {
  const [user, setUser] = useState<User>(currentUser ?? fallbackUser);
  const [isEditing, setIsEditing] = useState(false);
    const userFromStore = useAuth((state) => state.user);

  

  const handleChange = (key: keyof User, value: any) => {
    setUser((prev) => ({ ...prev, [key]: value }));
  };


 return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold">User Profile</h1>
            <p className="text-muted-foreground">
              View and manage your account information
            </p>
          </div>

          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="gap-2">
              <Pencil className="h-4 w-4" /> Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="gap-2"
              >
                <X className="h-4 w-4" /> Cancel
              </Button>
              <Button onClick={() => setIsEditing(false)} className="gap-2">
                <Save className="h-4 w-4" /> Save
              </Button>
            </div>
          )}
        </div>

        {/* Profile Card */}
        <Card className="bg-card/70 backdrop-blur-xl border-border">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar */}
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={user.image} alt={userFromStore?.name} />
                  <AvatarFallback>
                    {userFromStore?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Badge variant={user.enabled ? "outline" : "secondary"}>
                  {user.enabled ? "Active" : "Disabled"}
                </Badge>
              </div>

              {/* Info */}
              <div className="flex-1 space-y-6">
                {!isEditing ? (
                  <>
                    <div>
                      <h2 className="text-2xl font-semibold">
                        {userFromStore?.name || "Unnamed User"}
                      </h2>
                      <p className="text-muted-foreground capitalize">
                        Provider: {userFromStore?.provider}
                      </p>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InfoItem
                        icon={<Mail className="h-4 w-4" />}
                        label="Email"
                        value={userFromStore?.email}
                      />
                      <InfoItem
                        icon={<UserIcon className="h-4 w-4" />}
                        label="User ID"
                        value={userFromStore?.id}
                      />
                      <InfoItem
                        icon={<ShieldCheck className="h-4 w-4" />}
                        label="Status"
                        value={userFromStore?.enabled ? "Disabled" : "Enabled"}
                      />
                      <InfoItem
                        icon={<Calendar className="h-4 w-4" />}
                        label="Joined"
                        // value={user.createdAt?.toDateString()}
                        value={userFromStore?.createdAt?.toString()}
                      />
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input
                        value={user.name || ""}
                        onChange={(e) => handleChange("name", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input value={user.email} disabled />
                    </div>

                    <div className="space-y-2">
                      <Label>Provider</Label>
                      <Input value={user.provider} disabled />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function InfoItem({ icon, label, value }: any) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 text-muted-foreground">{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium break-all">{value}</p>
      </div>
    </div>
  );
}

// export default Userprofile