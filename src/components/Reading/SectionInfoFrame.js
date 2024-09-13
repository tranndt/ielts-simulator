import { convertNewlinesToDoubleSpace } from "./PassageFrame";

const SectionInfoFrame = ({readingInfo}) => (
    <div className="section-info-frame">
      <h1 class="task-title">{readingInfo.readingTitle}</h1>
      <p class="task-subtitle">{readingInfo.readingSubtitle}</p>
    </div>
  );
  
  export default SectionInfoFrame;