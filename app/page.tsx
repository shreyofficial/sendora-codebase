import { redirect } from "next/navigation"

export default function Home() {
  // Redirect to the launchpad page
  redirect("/launchpad")
}
