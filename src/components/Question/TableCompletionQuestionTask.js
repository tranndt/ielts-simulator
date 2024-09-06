import TableCompletionQuestionItem from "./TableCompletionQuestionItem";
import DataTable from "../Table/DataTable";
import QuestionTaskDescription from "./QuestionTaskDescription";
import './QuestionStyles.css';


function TableCompletionQuestionTask({ questionTask }) {
    console.log(questionTask);

    return (
        <div className="table-completion-question-task">
            <QuestionTaskDescription taskDescription={questionTask.taskDescription}/>
            <DataTable data={questionTask.questionContent}/>
            <b>Your Answers:</b>
            {questionTask.questions.map((question, index) => (
                <TableCompletionQuestionItem key={index} id={index} {...question}/>
            ))}
        </div>
    );
}

export default TableCompletionQuestionTask;