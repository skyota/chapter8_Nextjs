import { redirect } from "next/navigation";

export default function AdminPage() {
  redirect("/admin/posts"); // /adminにアクセスしたときは/admin/postsにリダイレクト
}
