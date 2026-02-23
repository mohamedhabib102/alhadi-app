import PostsDashboard from "@/components/Posts/PostsDashboard";

export const metadata = {
  title: "المنشورات - لوحة التحكم - جمعية الهدى النبوي الخيرية الدعوية",
  description: "تحكم في المنشورات",
};

const PostsPage = async () => {

  return <PostsDashboard />;
};

export default PostsPage;