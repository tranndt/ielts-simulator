import { convertNewlinesToDoubleSpace } from "./PassageFrame";

const SectionInfoFrame = ({ taskTitle, taskSubtitle}) => (
    <div className="section-info-frame">
      <h1 class="task-title">{taskTitle}</h1>
      <p class="task-subtitle">{convertNewlinesToDoubleSpace(taskSubtitle)}</p>
    </div>
  );
  
  export default SectionInfoFrame;