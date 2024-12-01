'use client';

import { useContext } from "react";
import { SharedDatabase } from "@/app/shared/shared";
import { Question } from "@/app/shared/types/Question";

export default function QuestionCards() {
  let { questions } = useContext<any>(SharedDatabase);

  // Whenever we map over something, we need to include a Key property
  // Also include a return
  return (
    <div className={`questionCards`}>
      {questions.map((ques: Question, quesIndex: any) => {
        return (
          <div key={quesIndex} className={`questionCard`}>
            <div className={`questionAndTopics`} style={{ background: `var(--${ques.difficulty})` }}>
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
                  <button className={`choiceButton`} key={chIndex}>
                    {ch}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}