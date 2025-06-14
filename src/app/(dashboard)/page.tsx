import { auth } from "@/lib/auth";
import { HomeView } from "@/modules/home/ui/views/home-view"
// import { caller } from "@/trpc/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const HomePage = async () => {
  // const data = await caller.hello({text: "Jacob server..."});
  // return <p>{data.greeting}</p>
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col p-4 gap-y-4">
      <HomeView />
    </div>
  )
};

export default HomePage