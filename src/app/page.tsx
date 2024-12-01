import Page from "./components/page/page";
import QuestionCards from "./components/questions/questions-cards/question-cards";

export default function Home() {
  return (
    <Page title={`Home`} desc={`This is the Home Page`} showSidebar={true}>
      <QuestionCards />
    </Page>
  )
}