import { toast } from 'react-toastify';
import { Check, Close } from '@mui/icons-material';
import { SharedDatabase } from '@/app/shared/shared';
import { Question } from '@/app/shared/types/Question';
import { useContext, useEffect, useRef, useState } from 'react';
import { Difficulties, Subjects } from '@/app/shared/types/questionTypes';
import { addQuestion, generateDatabaseMetaData, updateQuestionInDB } from '@/server/firebase';
import { Button, Dialog, IconButton, MenuItem, Select, SelectChangeEvent } from '@mui/material';

export default function QuestionDialog() {
    let { user, questions, questionDialogOpen, setQuestionDialogOpen, setQuestionToEdit, questionToEdit} = useContext<any>(SharedDatabase);

    let formRef = useRef(null);

    let subjectsArr = Object.values(Subjects);
    let [difficulty, setDifficulty] = useState(questionToEdit == null ? Difficulties.Easy : questionToEdit.difficulty);
    let [answer, setAnswer] = useState(questionToEdit == null ? `A` : questionToEdit.choices[0]);
    let [subject, setSubject] = useState<any>(questionToEdit == null ? Subjects.Math : subjectsArr?.find(subj => subj.name == questionToEdit.subject));
    let [topics, setTopics] = useState(questionToEdit == null ? subject.topics.slice(0, 2) : questionToEdit?.topics);
    let [difficulties, setDifficulties] = useState(Object.values(Difficulties));
    let [subjects, setSubjects] = useState(subjectsArr?.map(s => s?.name));

    const setDefault = () => {
        setAnswer(`A`);
        setSubject(Subjects.Math);
        setDifficulty(Difficulties.Easy);
        setTopics(Subjects.Math.topics.slice(0, 2));
    }

    useEffect(() => {
        if (questionToEdit == null) {
            setDefault();
        } else {
            setDifficulty(questionToEdit.difficulty);
            setSubject(subjectsArr?.find(subj => subj.name == questionToEdit.subject));
            setTopics(questionToEdit?.topics ?? subject?.topics?.slice(0, 1));

            let [A, B, C, D] = questionToEdit?.choices;
            let choices = { A, B, C, D };
            let choiceEntries = Object.entries(choices);
            let answerChoice = choiceEntries.filter(ce => ce[1] == questionToEdit.answer);
            let answr = answerChoice[0][0];

            setAnswer(answr);
        }
    }, [questionToEdit, formRef])

    const onDifficultyChange = (e: SelectChangeEvent) => {
        setDifficulty(e?.target?.value as string);
    }

    const clearForm = () => {
        if (formRef && formRef.current) {
            let form: HTMLFormElement = formRef?.current;
            form?.reset();
        }
    }

    const onCloseButtonLogic = () => {
        setQuestionToEdit(null);
        setQuestionDialogOpen(!questionDialogOpen);
    }

    const onSubjectChange = (e: any) => {
        let { value } = e?.target;
        let newSubject = value?.replaceAll(` `, `_`);
        let subjectToSet: any = Subjects[newSubject as keyof typeof Subjects];
        if (subjectToSet) {
            setSubject(subjectToSet);
            setTopics(subjectToSet?.topics?.slice(0, 1));
        }
    }
    
    const onTopicsChange = (e: any) => {
        const { target: { value } } = e;
        let topicsToSet: any = typeof value === `string` ? value?.split(`,`) : value;
        setTopics(topicsToSet);
    }

    const onFormSubmit = (onFormSubmitEvent: any) => {
        onFormSubmitEvent?.preventDefault();

        let form = onFormSubmitEvent?.target;
        const formData = new FormData(form);
        let formValues = Object.fromEntries(formData?.entries());

        let { A, B, C, D, question, explanation } = formValues;

        let choices = [A, B, C, D];
        let filledChoices = choices?.filter(v => v != ``);

        let formIsValid = question != `` && filledChoices?.length >= 4;

        if (formIsValid) {
            let questionIDs = questions?.map((q: Question) => parseFloat(q.id?.split(`Question_`)[1][0]));
            questionIDs?.sort()?.reverse();
    
            let nextQuestionNumber = questionIDs[0] + 1;
    
            let metaData = generateDatabaseMetaData(`Question`, nextQuestionNumber);
            let { uuid, uniqueID } = metaData;
    
            let newQuestionToStore = new Question({
                uuid,
                topics,
                choices,
                difficulty,
                id: uniqueID,
                user_id: user?.id,
                subject: subject?.name,
                user_email: user?.email,
                answer: formValues[answer],
                question: String(question),
                explanation: (questionToEdit == null || explanation == ``) ? `No Explanation Yet` : String(explanation),
            })
    
            if (questionToEdit == null) {
                addQuestion(newQuestionToStore);
            } else {
                let { question, subject, topics, choices, difficulty, answer, explanation } = newQuestionToStore;
                updateQuestionInDB(questionToEdit, { question, subject, topics, choices, difficulty, answer, explanation });
                setQuestionToEdit(null);
            }

            toast.success(`Successfully ${questionToEdit == null ? `Added` : `Updated`} Question`);
            form.reset();
            setQuestionDialogOpen(!questionDialogOpen);
        } else {
            toast.error(`Please Fill Out Form`);
            return;
        }
    }

    return (
        <Dialog open={questionDialogOpen}>
            <div className={`questionDialog`}>
               <div className={`questionDialogTopContent`}>
                    Question Form
                    <Button className={`dialogButton`} onClick={() => clearForm()}>
                        Clear
                    </Button>
                    <IconButton className={`dialogButton`} onClick={() => onCloseButtonLogic()}>
                        <Close />
                    </IconButton>
               </div>
               <div className={`questionDialogContent`}>
                    <form ref={formRef} className={`questionForm`} onSubmit={(e) => onFormSubmit(e)}>
                        <div className={`formField`}>
                            <span className={`formFieldText`}>
                                Enter Question
                            </span>
                            <input name={`question`} type={`text`} className={`questionFormField`} placeholder={`Enter Question`} defaultValue={questionToEdit == null ? `` : questionToEdit.question} />
                        </div>
                        <div className={`selectorFields`}>
                            <div className={`formField formFieldCol`}>
                                <span className={`formFieldText`}>
                                    Enter Difficulty
                                </span>    
                                <Select className={`selectorField difficultySelector`} value={difficulty} defaultValue={questionToEdit == null ? difficulty : questionToEdit?.difficulty} onChange={(e) => onDifficultyChange(e)}>
                                    {difficulties?.map((diff, diffI) => (
                                        <MenuItem key={diffI} className={`selectorFieldOption`} value={diff}>
                                            {diff}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </div>
                        <div className={`selectorFields selectorFieldGrid`}>
                            <div className={`formField formFieldCol`}>
                                <span className={`formFieldText`}>
                                    Enter Subject
                                </span>    
                                <Select className={`selectorField subjectSelector`} value={questionToEdit == null ? subject.name : questionToEdit.subject} onChange={(e) => onSubjectChange(e)}>
                                    {subjects?.map((subj, subI) => (
                                        <MenuItem key={subI} className={`selectorFieldOption`} value={subj}>
                                            {subj}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                            <div className={`formField formFieldCol`}>
                                <span className={`formFieldText`}>
                                    Enter Topics
                                </span>    
                                <Select multiple className={`selectorField topicSelector`} value={topics} onChange={(e) => onTopicsChange(e)}>
                                    {subject?.topics?.map((topc: any, topcI: any) => (
                                        <MenuItem key={topcI} value={topc} className={`selectorFieldOption`} disabled={topics?.length == 1 && topics?.includes(topc)}>
                                            {topc}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </div>
                        
                        <div className={`formField formFieldCol`}>
                            <span className={`formFieldText`}>
                                Enter Choices
                            </span>
                           <div className={`formFieldGroup`}>
                                <div className={`formField`}>
                                    <span className={`formFieldText`}>
                                       1)
                                    </span>
                                    <input name={`A`} className={`choiceAField`} type={`text`} placeholder={`Choice 1`} defaultValue = {questionToEdit == null ? `` : questionToEdit.choices[0]} />
                                    <Button value={`A`} onClick={() => setAnswer(`A`)} endIcon={answer == `A` ? <Check className={`checkIcon`} /> : undefined} className={`questionButton questionButtonAlt`}>
                                        <strong>Correct{answer == `A` ? `` : `?`}</strong>
                                    </Button>
                                </div>
                                <div className={`formField`}>
                                    <span className={`formFieldText`}>
                                       2)
                                    </span>
                                    <input name={`B`} className={`choiceBField`} type={`text`} placeholder={`Choice 2`} defaultValue = {questionToEdit == null ? `` : questionToEdit.choices[1]}/>
                                    <Button value={`B`} onClick={() => setAnswer(`B`)} endIcon={answer == `B` ? <Check className={`checkIcon`} /> : undefined} className={`questionButton questionButtonAlt`}>
                                        <strong>Correct{answer == `B` ? `` : `?`}</strong>
                                    </Button>
                                </div>
                           </div>
                            <div className={`formFieldGroup`}>
                                <div className={`formField`}>
                                    <span className={`formFieldText`}>
                                       3)
                                    </span>
                                    <input name={`C`} className={`choiceCField`} type={`text`} placeholder={`Choice 3`} defaultValue = {questionToEdit == null ? `` : questionToEdit.choices[2]}/>
                                    <Button value={`C`} onClick={() => setAnswer(`C`)} endIcon={answer == `C` ? <Check className={`checkIcon`} /> : undefined} className={`questionButton questionButtonAlt`}>
                                        <strong>Correct{answer == `C` ? `` : `?`}</strong>
                                    </Button>
                                </div>
                                <div className={`formField`}>
                                    <span className={`formFieldText`}>
                                       4)
                                    </span>
                                    <input name={`D`} className={`choiceDField`} type={`text`} placeholder={`Choice 4`} defaultValue = {questionToEdit == null ? `` : questionToEdit.choices[3]}/>
                                    <Button value={`D`} onClick={() => setAnswer(`D`)} endIcon={answer == `D` ? <Check className={`checkIcon`} /> : undefined} className={`questionButton questionButtonAlt`}>
                                        <strong>Correct{answer == `D` ? `` : `?`}</strong>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className={`formField`}>
                            <span className={`formFieldText`}>
                                Enter Explanation
                            </span>
                            <input name={`explanation`} type={`text`} className={`questionFormField`} placeholder={`Enter Explanation`} defaultValue={questionToEdit == null ? `` : questionToEdit.explanation} />
                        </div>
                        <Button className={`questionButton questionButtonAlt`} type={`submit`}>
                            {questionToEdit == null ? `+ Create` : `Update`} Question
                        </Button>
                    </form>
               </div>
            </div>
        </Dialog>
    )
}