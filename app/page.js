import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

export default async function Home() {
  return <>{revalidatePath("/user/home")}</>;
}
