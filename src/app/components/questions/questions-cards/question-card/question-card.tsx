import { useContext } from "react";
import { Roles } from "@/app/shared/types/User";
import { Delete, Edit } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { SharedDatabase } from "@/app/shared/shared";
import { Question } from "@/app/shared/types/Question";

export default function QuestionCard({ quesIndex, ques }: any) {
  let { user, setQuestions } = useContext<any>(SharedDatabase);

  const editQuestion = (question: Question) => {
    console.log(`Simulate On Edit Question`, question);
    // Fill in this logic later
  }

  const deleteQuestion = (questionID: any) => {
    setQuestions((prevQuestions: any) => prevQuestions.filter((q: Question) => q.id != questionID));
    // ^ This just simulates delete
    // Fill in this logic to save deletions later
  }

  const onAnswerClick = (question: Question, choice: any, quesIndex: number) => {
    let isValidAnswer = choice == question.answer;
    if (isValidAnswer) {
      console.log(`Correct! You answered Question ${quesIndex + 1} Correct!`);
      console.log(`You selected ${choice}, and the correct answer is ${question.answer}`);
    } else {
      console.log(`Wrong! You got Question ${quesIndex + 1} Wrong!`);
      console.log(`You selected ${choice}, but the correct answer was ${question.answer}`);
    }
    // Fill in this logic later
  }

  return (
    <div key={quesIndex} className={`questionCard questionCardComponent`} style={{ background: `var(--cardBg)` }}>
      <div className={`questionAndTopics`} style={{ background: `var(--${ques.difficulty})` }}>
        <div className={`questionIndexRow`}>
          <div className={`questionIndexColumn`}>
            Q{quesIndex + 1}.
          </div>
          <div className={`questionSubjectColumn`}>
            {ques.subject}
          </div>
          {user != null && user.level > Roles.Quiz_Taker.level ? (
            <div className={`questionAdminColumn`}>
              <IconButton className={`editButton`} size={`small`} onClick={(e: any) => editQuestion(ques)}>
                <Edit style={{ color: `white` }} />  
              </IconButton>
              <IconButton className={`deleteButton`} size={`small`} onClick={(e: any) => deleteQuestion(ques.id)}>
                <Delete style={{ color: `white` }} />  
              </IconButton>
            </div>
          ) : <></>}
        </div>
        <div className={`question`}>
          {ques.question}
        </div>
        <div className={`questionTopics`}>
          {ques.topics.join(`, `)}
        </div>
      </div>
      <div className={`questionChoices`}>
        {ques.choices.map((ch: any, chIndex: any) => {
          return (
            <Button key={chIndex} className={`choiceButton`} style={{ background: `var(--${ques.difficulty})`, color: `white`, borderRadius: 6 }}
              onClick={(e: any) => onAnswerClick(ques, ch, quesIndex)}>
              {ch}
            </Button>
          )
        })}
      </div>
    </div>
  )
}