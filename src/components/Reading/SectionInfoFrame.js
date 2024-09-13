import { convertNewlinesToDoubleSpace } from "./PassageFrame";

const SectionInfoFrame = ({readingInfo}) => (
    <div className="section-info-frame">
      <h1 class="task-title">{readingInfo.readingTitle}</h1>
      <span class="task-subtitle" style={{fontSize:'1.2em', fontStyle:'normal'}}>{readingInfo.readingSubtitle}</span>
    </div>
  );
  
  export default SectionInfoFrame;