import Questions from "@components/cards/Questions";
import { useStore } from "@context/serverStore";
async function page() {
    const { fetchQuestions } = useStore.getState();
  const questions = await fetchQuestions();
  return <Questions data={JSON.stringify(questions)} />;
}
export default page;
