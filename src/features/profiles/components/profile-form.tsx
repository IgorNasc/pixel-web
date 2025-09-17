"use client"

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

const profileSchema = z.object({
    name: z.string().min(2, "Informe seu nome completo"),
    email: z.string().email("Informe um e-mail válido"),
    companyName: z.string().min(2, "Informe o nome da empresa"),
    phone: z
        .string()
        .min(7, "Informe um telefone válido")
        .regex(/^[+]?[\d\s().-]{7,}$/, "Informe um telefone válido"),
})

type ProfileValues = z.infer<typeof profileSchema>

export default function ProfileForm() {
    const form = useForm<ProfileValues>({
        resolver: zodResolver(profileSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            companyName: "",
            phone: "",
        },
    })

    const onSubmit = (values: ProfileValues) => {
        console.log("Profile form submit", values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="Seu nome" autoComplete="name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="seu@email.com" autoComplete="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Empresa</FormLabel>
                            <FormControl>
                                <Input placeholder="Nome da empresa" autoComplete="organization" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                                <Input type="tel" placeholder="+55 11 99999-9999" autoComplete="tel" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-3">
                    <Button type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Salvando..." : "Salvar"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}