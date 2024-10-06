import Page from "./components/page/page";
import QuestionTable from "./components/questions/questions-table/question-table";

export default function Home() {
  return (
    <Page title={`Home`} desc={`This is the Home Page`}>
      <QuestionTable />
    </Page>
  )
}