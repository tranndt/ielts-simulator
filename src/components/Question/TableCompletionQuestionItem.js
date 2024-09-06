import './QuestionStyles.css';

function TableCompletionQuestionItem({ questionNumber, correctAnswer }) {
    console.log(questionNumber, correctAnswer);

    return (
        <div className="table-completion-question question-item">
            <div>
                <span>{questionNumber}.</span>
                <input type="text" id={`option-${questionNumber}`} name={`mcq-${questionNumber}`} />
            </div>
        </div>
    );
}

export default TableCompletionQuestionItem;