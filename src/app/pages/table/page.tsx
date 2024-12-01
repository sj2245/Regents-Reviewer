'use client';

import Page from "@/app/components/page/page";
import QuestionTable from "@/app/components/questions/questions-table/question-table";

export default function QuestionsTable() {
  // new page with the title and description
  return (
    // we always need to do return if we are using only page
    <Page title={`Questions Database`} desc={`This is the Questions Database Page`} showSidebar={true}>
      <QuestionTable />
    </Page>
  )
}