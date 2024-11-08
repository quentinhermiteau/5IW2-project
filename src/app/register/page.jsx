"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { PASSWORD_REGEX } from "@/lib/utils";
import Link from "next/link";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().regex(PASSWORD_REGEX, {
    message:
      "Le mot de passe doit contenir au moins 10 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
  }),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const { toast } = useToast();

  const handleRegister = async (data) => {
    const response = await api.post("/auth/register", data);

    if (response.status !== 200) {
      toast({ title: "Une erreur est survenue", variant: "destructive" });
    }

    localStorage.setItem("token", response.data.token);
    toast({ title: "Création de compte réussie", variant: "primary" });
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <Card>
          <CardHeader>
            <CardTitle>Création de compte</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-2" onSubmit={handleSubmit(handleRegister)}>
              <div>
                <Label>Email</Label>
                <Input type="email" {...register("email")} />
              </div>
              <div>
                <Label>Mot de passe</Label>
                <Input type="password" {...register("password")} />
                {errors.password?.message && <p>{errors.password?.message}</p>}
              </div>
              <div>
                <Button type="submit">Créer mon compte</Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            Vous avez déjà un compte? <Link href={"/login"}>Se connecter</Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
