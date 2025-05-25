import { useContext } from "react";
import { toast } from "react-toastify";
import { Roles } from "@/app/shared/types/User";
import { Button, IconButton } from "@mui/material";
import { SharedDatabase } from "@/app/shared/shared";
import { Question } from "@/app/shared/types/Question";
import { Close, CopyAll, Delete, Edit } from "@mui/icons-material";
import { addQuestion, DatabaseTableNames, deleteQuestionFromDB } from "@/server/firebase";


export default function QuestionCard({ quesIndex, ques }: any) {
  let { user, questionToEdit, setQuestionToEdit } = useContext<any>(SharedDatabase);

  const cancelEditQuestion = () => {
    setQuestionToEdit(null);
  }

  const editQuestion = (question: Question) => {
    console.log(`On Edit Question, Fill in Logic Later`, question);
    // Fill in this logic later
    setQuestionToEdit(question);
    // Find the question that we are editing
    // first we must find the reference id to the question document in our database
    // enter editing mode, to give the user a gui to edit it
    // border of the question becomes yellow
    // the pencil will become an X to allow the user to exit editing mode

    // listen for changes the user makes
    // when the user hits save, we will save the question to the database
  }

  const cloneQuestion = async (question: Question) => {
    let quesDatabaseToUse = DatabaseTableNames.questions;
    await addQuestion(question, quesDatabaseToUse)?.then(quesRef => {
      toast.success(`Successfully Cloned Question`);
    })?.catch(onAddQuestionError => {
      toast.error(`Failed to Clone Question`);
    });
  }

  const finallyDeleteQuestionFromDatabase = async (questionID: string) => {
    await deleteQuestionFromDB(questionID)?.then(quesRef => {
      toast.success(`Successfully Deleted Question`);
    })?.catch(onDeleteQuestionError => {
      toast.error(`Failed to Delete Question`);
    })
  }

  const deleteQuestion = async (questionID: string) => {
    // Confirm with User then Finally Delete
    // Enhance this by turning it into John Cena later on
    // For now simple Native Javascript Confirm
    let confirmDeleteQuestion = confirm(`Are you sure you would like to delete?`);
    if (confirmDeleteQuestion) await finallyDeleteQuestionFromDatabase(questionID);
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
          {user != null && user.level >= Roles.Quiz_Maker.level ? (
            <div className={`questionAdminColumn`}>
              {/* <IconButton title={`Clone`} className={`cloneButton`} size={`small`} onClick={(e: any) => cloneQuestion(ques)}>
                <CopyAll style={{ color: `white` }} />  
              </IconButton> */}
              {questionToEdit != null && questionToEdit.id == ques.id ? (
                <IconButton title={`Cancel`} className={`cancelEditingButton`} size={`small`} onClick={(e: any) => cancelEditQuestion()}>
                  <Close style={{ color: `white` }} />  
                </IconButton>
                ) : (
                <IconButton title={`Edit`} className={`editButton`} size={`small`} onClick={(e: any) => editQuestion(ques)}>
                  <Edit style={{ color: `white` }} />  
                </IconButton>
                )}
              {/* <IconButton title={`Delete`} className={`deleteButton`} size={`small`} onClick={(e: any) => deleteQuestion(ques.id)}>
                <Delete style={{ color: `white` }} />  
              </IconButton> */}
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