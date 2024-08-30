import TableCompletionQuestion from "./TableCompletionQuestion";
import DataTable from "./DataTable";
import './QuestionStyles.css';
import QuestionTaskDescription from "./QuestionTaskDescription";


function TableCompletionQuestionTask({ questionTask }) {
    console.log(questionTask);

    return (
        <div className="table-completion-question-task">
            <QuestionTaskDescription taskDescription={questionTask.taskDescription}/>
            <DataTable data={questionTask.questionContent}/>
            <b>Your Answers:</b>
            {questionTask.questions.map((question, index) => (
                <TableCompletionQuestion key={index} id={index} {...question}/>
            ))}
        </div>
    );
}

export default TableCompletionQuestionTask;