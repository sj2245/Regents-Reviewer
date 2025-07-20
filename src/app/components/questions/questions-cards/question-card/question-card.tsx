import { toast } from 'react-toastify';
import { useContext, useState } from 'react';
import { Roles } from '@/app/shared/types/User';
import { Button, IconButton } from '@mui/material';
import { SharedDatabase } from '@/app/shared/shared';
import { Question } from '@/app/shared/types/Question';
import { Autorenew, Check, Close, Delete, Edit } from '@mui/icons-material';
import { deleteQuestionFromDB, updateQuestionInDB } from '@/server/firebase';


export default function QuestionCard({ quesIndex, ques }: any) {
  let { user, questionToEdit, setQuestionToEdit, questionDialogOpen, setQuestionDialogOpen } = useContext<any>(SharedDatabase);

  let [questionAnswered, setQuestionAnswered] = useState(``);

  const cancelEditQuestion = () => {
    setQuestionToEdit(null);
  }

  const onTextEditDone = (e: any) => {
    let updatedVal = e.target.textContent;
    updateQuestionInDB(questionToEdit, { question: updatedVal });
    toast.success(`Successfully Edited Question`);
  }

  const editQuestion = (question: Question) => {
    setQuestionToEdit(question);
    setQuestionDialogOpen(!questionDialogOpen);
  }

  // const cloneQuestion = async (question: Question) => {
  //   let quesDatabaseToUse = DatabaseTableNames.questions;
  //   await addQuestion(question, quesDatabaseToUse)?.then(quesRef => {
  //     toast.success(`Successfully Cloned Question`);
  //   })?.catch(onAddQuestionError => {
  //     toast.error(`Failed to Clone Question`);
  //   });
  // }

  const finallyDeleteQuestionFromDatabase = async (questionID: string) => {
    await deleteQuestionFromDB(questionID)?.then(quesRef => {
      toast.success(`Successfully Deleted Question`);
    })?.catch(onDeleteQuestionError => {
      toast.error(`Failed to Delete Question`);
    })
  }

  const deleteQuestion = async (questionID: string) => {
    let confirmDeleteQuestion = confirm(`Are you sure you would like to delete?`);
    if (confirmDeleteQuestion) await finallyDeleteQuestionFromDatabase(questionID);
  }

  const onAnswerClick = (question: Question, choice: any, quesIndex: number) => {
    let isValidAnswer = choice == question.answer;
    if (isValidAnswer) {
      console.log(`Correct! You answered Question ${quesIndex + 1} Correct!`);
      console.log(`You selected ${choice}, and the correct answer is ${question.answer}`);
      setQuestionAnswered(`Correct`);
    } else {
      console.log(`Wrong! You got Question ${quesIndex + 1} Wrong!`);
      console.log(`You selected ${choice}, but the correct answer was ${question.answer}`);
      setQuestionAnswered(`Incorrect`);
    }
    // Fill in this logic later
  }

  return (
    <div key={quesIndex} className={`questionCard questionCardComponent ${questionToEdit != null && questionToEdit.id == ques.id ? `inProcessEditing` : ``}`} style={{ background: `var(--cardBg)` }}>
      <div className={`questionAndTopics`} style={{ background: `var(--${ques.difficulty})` }}>
        <div className={`questionIndexRow`}>
          <div className={`questionIndexColumn`}>
            Q{quesIndex + 1}.
          </div>
          <div className={`questionSubjectColumn`}>
            {ques.subject}
          </div>
          {/* Locked by role */}
          {user != null && user.level >= Roles.Quiz_Maker.level ? (
            <div className={`questionAdminColumn`}>
              {/* <IconButton title={`Clone`} className={`cloneButton`} size={`small`} onClick={(e: any) => cloneQuestion(ques)}>
                <CopyAll style={{ color: `white` }} />  
              </IconButton> */}
              {questionAnswered != `` && (
                <IconButton title={`Reset`} className={`resetButton`} size={`small`} onClick={(e: any) => setQuestionAnswered(``)}>
                  <Autorenew style={{ color: `white` }} />
                </IconButton>
              )}
              {questionToEdit != null && questionToEdit.id == ques.id ? (
                <IconButton title={`Cancel`} className={`cancelEditingButton`} size={`small`} onClick={(e: any) => cancelEditQuestion()}>
                  <Close style={{ color: `white` }} />  
                </IconButton>
                ) : (
                <IconButton title={`Edit`} className={`editButton`} size={`small`} onClick={(e: any) => editQuestion(ques)}>
                  <Edit style={{ color: `white` }} />  
                </IconButton>
              )}
              <IconButton title={`Delete`} className={`deleteButton`} size={`small`} onClick={(e: any) => deleteQuestion(ques.id)}>
                <Delete style={{ color: `white` }} />  
              </IconButton>
            </div>
          ) : <></>}

        </div>
        <div className={`question`} contentEditable={questionToEdit != null && questionToEdit.id == ques.id} suppressContentEditableWarning spellCheck={false} onBlur={(e) => onTextEditDone(e)}>
          {ques.question}
        </div>
        <div className={`questionTopics`}>
          {ques.topics.join(`, `)}
        </div>
      </div>
      {questionAnswered != `` && (
        <div className={`answerExplanationSection`}>
          <div className={`ansExplIconContainer`}>
            {questionAnswered == `Correct` ? <Check color={`success`} /> : <Close color={`error`} />}
          </div>
          <div className={`ansExplanationField`}>
            {questionAnswered}! Explanation: '{ques.explanation}'
          </div>
        </div>
      )}
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