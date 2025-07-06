import { useContext, useState } from 'react';
import { Check, Close } from '@mui/icons-material';
import { SharedDatabase } from '@/app/shared/shared';
import { Button, Dialog, IconButton } from '@mui/material';

export default function QuestionDialog() {
    let { questionDialogOpen, setQuestionDialogOpen } = useContext<any>(SharedDatabase);

    let [answer, setAnswer] = useState(`A`);

    const onFormSubmit = (onFormSubmitEvent: any) => {
        onFormSubmitEvent?.preventDefault();
        console.log(`onFormSubmit`, onFormSubmitEvent);
    }

    return (
        <Dialog 
            open={questionDialogOpen} 
            // slotProps={{
            //     paper: {
            //         component: `div`,
            //         className: `questionDialogContainer`,
            //         onSubmit: (event: any) => {
            //             event?.preventDefault();
            //         }
            //     }
            // }}
        >
            <div className={`questionDialog`}>
               <div className={`questionDialogTopContent`}>
                    Question Form
                    <IconButton className={`dialogButton`} onClick={() => setQuestionDialogOpen(!questionDialogOpen)}>
                        <Close />
                    </IconButton>
               </div>
               <div className={`questionDialogContent`}>
                    <form className={`questionForm`} onSubmit={(e) => onFormSubmit(e)}>
                        <div className={`formField`}>
                            <span className={`formFieldText`}>
                                Enter Question
                            </span>
                            <input name={`question`} type={`text`} placeholder={`Enter Question`} />
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
                                    <input name={`choiceA`} type={`text`} placeholder={`Choice A`} />
                                    <Button value={`A`} onClick={() => setAnswer(`A`)} endIcon={answer == `A` ? <Check className={`checkIcon`} /> : undefined} className={`questionButton questionButtonAlt`}>
                                        <strong>Correct{answer == `A` ? `` : `?`}</strong>
                                    </Button>
                                </div>
                                <div className={`formField`}>
                                    <span className={`formFieldText`}>
                                       B)
                                    </span>
                                    <input name={`choiceB`} type={`text`} placeholder={`Choice B`} />
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
                                    <input name={`choiceC`} type={`text`} placeholder={`Choice C`} />
                                    <Button value={`C`} onClick={() => setAnswer(`C`)} endIcon={answer == `C` ? <Check className={`checkIcon`} /> : undefined} className={`questionButton questionButtonAlt`}>
                                        <strong>Correct{answer == `C` ? `` : `?`}</strong>
                                    </Button>
                                </div>
                                <div className={`formField`}>
                                    <span className={`formFieldText`}>
                                       D)
                                    </span>
                                    <input name={`choiceD`} type={`text`} placeholder={`Choice D`} />
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