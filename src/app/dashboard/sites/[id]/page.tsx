import { redirect } from "next/navigation"

type Params = {
  params: { id: string }
}

export default function SiteRedirectPage({ params }: Params) {
  const id = params.id
  if (!id) {
    redirect("/dashboard/sites")
  }
  redirect(`/dashboard/sites/${id}/pixels`)
}

