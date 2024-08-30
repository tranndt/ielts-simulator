import './QuestionStyles.css';
import { convertNewlinesToDoubleSpace } from './PassageFrame';


function QuestionTaskDescription({ taskDescription }) {
    return (
        <div className="question-task-description">{convertNewlinesToDoubleSpace(taskDescription)}</div>
    );
}

export default QuestionTaskDescription;