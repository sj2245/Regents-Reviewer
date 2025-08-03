'use client';

import { useContext } from 'react';
import { Button } from '@mui/material';
import { Roles } from '@/app/shared/types/User';
import { SharedDatabase } from '@/app/shared/shared';
import { Question } from '@/app/shared/types/Question';
import QuestionCard from './question-card/question-card';
import LoadingSpinner from '../../loader/loading-spinner';

export default function QuestionCards() {
  let { user, questions, questionsLoading, questionDialogOpen, setQuestionDialogOpen } = useContext<any>(SharedDatabase);

  // Whenever we map over something, we need to include a Key property
  // Also include a return

  return <>
   {(user != null && user.level >= Roles.Quiz_Maker.level) && !questionsLoading && (
      <div className={`questionsTopContent`}>
        <Button className={`questionButton createQuestionButton`} onClick={() => setQuestionDialogOpen(!questionDialogOpen)}>
          + Create Question Form
        </Button>
      </div>
   )}
    {questionsLoading ? (
      <LoadingSpinner label={`Question(s)`} extraClasses={`questionsLoadingSpinner`} />
    ) : (
      questions.length > 0 ? (
        <div className={`questionCards`}>
          {questions.map((ques: Question, quesIndex: any) => (
            <QuestionCard key={quesIndex} quesIndex={quesIndex} ques={ques} />
          ))}
        </div>
      ) : `No Questions`
    )}
  </>
}