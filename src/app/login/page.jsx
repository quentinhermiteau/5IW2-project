"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleLoginSubmit = async (data) => {
    const response = await api.post("/auth/login", data);

    if (response.status !== 200) {
      toast({ title: "Une erreur est survenue", variant: "destructive" });
    }

    localStorage.setItem("token", response.data);
    toast({ title: "Connexion réussie", variant: "primary" });
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <Card>
          <CardHeader>
            <CardTitle>Connexion</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-2"
              onSubmit={handleSubmit(handleLoginSubmit)}
            >
              <div>
                <Label>Email</Label>
                <Input type="email" {...register("email")} />
              </div>
              <div>
                <Label>Mot de passe</Label>
                <Input type="password" {...register("password")} />
                {errors.password?.message && <p>{errors.password?.message}</p>}
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button type="submit">Se connecter</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
