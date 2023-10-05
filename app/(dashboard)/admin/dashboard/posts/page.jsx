import StoreInit from "@components/StoreInit";
import PostsTable from "@components/table/templates/PostsTable";
import { useStore } from "@context/serverStore";


async function page() {
  const { fetchPosts } = useStore.getState();
    const data = {
      posts: JSON.stringify(await fetchPosts()) || [],
    };
  return (
    <div className=''>
      {data && <StoreInit {...data} />}
<PostsTable/>
    </div>
  );
}

export default page;
