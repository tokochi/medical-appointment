import StoreInit from "@components/utils/StoreInit";
import PostsTable from "@components/table/templates/PostsTable";
import { useStore } from "@context/serverStore";

async function page() {
  const { fetchPosts } = useStore.getState();
    const data = {
      posts: JSON.stringify(await fetchPosts()) || [],
    };
  return (
    <div className=''>
      {data?.posts && <StoreInit {...data} />}
      <PostsTable />
    </div>
  );
}

export default page;
