import { toast } from 'react-toastify';
import { Check, Close } from '@mui/icons-material';
import { useContext, useRef, useState } from 'react';
import { SharedDatabase } from '@/app/shared/shared';
import { Question } from '@/app/shared/types/Question';
import { Difficulties, Subjects } from '@/app/shared/types/questionTypes';
import { addQuestion, generateDatabaseMetaData } from '@/server/firebase';
import { Button, Dialog, IconButton, MenuItem, Select, SelectChangeEvent } from '@mui/material';

export default function QuestionDialog() {
    let { user, questions, questionDialogOpen, setQuestionDialogOpen } = useContext<any>(SharedDatabase);

    let formRef = useRef(null);

    let [answer, setAnswer] = useState(`A`);
    let [subject, setSubject] = useState<any>(Subjects.Math);
    let [difficulty, setDifficulty] = useState(Difficulties.Easy);
    let [topics, setTopics] = useState(subject.topics.slice(0, 2));
    let [difficulties, setDifficulties] = useState(Object.values(Difficulties));
    let [subjects, setSubjects] = useState(Object.values(Subjects)?.map(s => s?.name));

    const onDifficultyChange = (e: SelectChangeEvent) => {
        setDifficulty(e?.target?.value as string);
    }

    const clearForm = () => {
        if (formRef && formRef.current) {
            let form: HTMLFormElement = formRef?.current;
            form?.reset();
        }
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

        let { A, B, C, D, question } = formValues;

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
                explanation: `No Explanation Yet`,
            })
    
            addQuestion(newQuestionToStore);
    
            toast.success(`Successfully Added Question`);
            form.reset();
            setQuestionDialogOpen(!questionDialogOpen);

            // console.log(`onFormSubmit`, {newQuestionToStore, formValues});
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
                    <IconButton className={`dialogButton`} onClick={() => setQuestionDialogOpen(!questionDialogOpen)}>
                        <Close />
                    </IconButton>
               </div>
               <div className={`questionDialogContent`}>
                    <form ref={formRef} className={`questionForm`} onSubmit={(e) => onFormSubmit(e)}>
                        <div className={`selectorFields`}>
                            <div className={`formField formFieldCol`}>
                                <span className={`formFieldText`}>
                                    Enter Difficulty
                                </span>    
                                <Select className={`selectorField difficultySelector`} value={difficulty} onChange={(e) => onDifficultyChange(e)}>
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
                                <Select className={`selectorField subjectSelector`} value={subject.name} onChange={(e) => onSubjectChange(e)}>
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
                        <div className={`formField`}>
                            <span className={`formFieldText`}>
                                Enter Question
                            </span>
                            <input name={`question`} type={`text`} className={`questionFormField`} placeholder={`Enter Question`} />
                        </div>
                        <div className={`formField formFieldCol`}>
                            <span className={`formFieldText`}>
                                Enter Choices
                            </span>
                           <div className={`formFieldGroup`}>
                                <div className={`formField`}>
                                    <span className={`formFieldText`}>
                                       A)
                                    </span>
                                    <input name={`A`} className={`choiceAField`} type={`text`} placeholder={`Choice A`} />
                                    <Button value={`A`} onClick={() => setAnswer(`A`)} endIcon={answer == `A` ? <Check className={`checkIcon`} /> : undefined} className={`questionButton questionButtonAlt`}>
                                        <strong>Correct{answer == `A` ? `` : `?`}</strong>
                                    </Button>
                                </div>
                                <div className={`formField`}>
                                    <span className={`formFieldText`}>
                                       B)
                                    </span>
                                    <input name={`B`} className={`choiceBField`} type={`text`} placeholder={`Choice B`} />
                                    <Button value={`B`} onClick={() => setAnswer(`B`)} endIcon={answer == `B` ? <Check className={`checkIcon`} /> : undefined} className={`questionButton questionButtonAlt`}>
                                        <strong>Correct{answer == `B` ? `` : `?`}</strong>
                                    </Button>
                                </div>
                           </div>
                            <div className={`formFieldGroup`}>
                                <div className={`formField`}>
                                    <span className={`formFieldText`}>
                                       C)
                                    </span>
                                    <input name={`C`} className={`choiceCField`} type={`text`} placeholder={`Choice C`} />
                                    <Button value={`C`} onClick={() => setAnswer(`C`)} endIcon={answer == `C` ? <Check className={`checkIcon`} /> : undefined} className={`questionButton questionButtonAlt`}>
                                        <strong>Correct{answer == `C` ? `` : `?`}</strong>
                                    </Button>
                                </div>
                                <div className={`formField`}>
                                    <span className={`formFieldText`}>
                                       D)
                                    </span>
                                    <input name={`D`} className={`choiceDField`} type={`text`} placeholder={`Choice D`} />
                                    <Button value={`D`} onClick={() => setAnswer(`D`)} endIcon={answer == `D` ? <Check className={`checkIcon`} /> : undefined} className={`questionButton questionButtonAlt`}>
                                        <strong>Correct{answer == `D` ? `` : `?`}</strong>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <Button className={`questionButton questionButtonAlt`} type={`submit`}>
                            + Create Question
                        </Button>
                    </form>
               </div>
            </div>
        </Dialog>
    )
}