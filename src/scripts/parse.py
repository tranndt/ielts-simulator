import errno
from pathlib import Path
import re
import json
import yaml
import argparse
import os


# Parse Arguments
def parse_args():
    parser = argparse.ArgumentParser(description="Parse IELTS Reading Passage & Questions")
    parser.add_argument("--input", type=str, required=True, help="Input file containing task questions")
    parser.add_argument("--output", type=str, required=True, help="Output file to save parsed task questions")
    # Flag to parse single file or multiple files from a directory
    parser.add_argument("--directory", action="store_true", default=False, help="Parse all files in a directory")
    return parser.parse_args()

def mkdir_p(path):
    try:
        os.makedirs(path)
    except OSError as e:
        if e.errno == errno.EEXIST and os.path.isdir(path):
            pass
        else:
            raise

def get_files(directory, ending=""):
    files = []
    for root, dirs, filenames in os.walk(directory):
        for filename in filenames:
            if filename.endswith(ending):
                files.append(os.path.join(root, filename))
    return files

def load_yaml_file(filename):
    with open(filename, 'r') as f:
        return yaml.safe_load(f)


def save_json_file(string, filename):
    mkdir_p(os.path.dirname(filename))
    with open(filename, 'w') as f:
        f.write(string)

def clean_text_single_line(text):
    return re.sub(r'\s+', ' ', text).strip()

def clean_text_multiple_line(text):
    new_text = re.sub(r'\n+', '\n', text)
    # Clean traiiling white space at the end
    new_text = "\n".join([line.strip() for line in new_text.split('\n')])
    return new_text

def clean_floating_linebreaks(text):
    # Pattern to match any \n not preceded by a period OR not followed by an uppercase letter
    pattern = re.compile(r'(?<![A-Z\.\?\!])\n|(?<=\n)(?![A-Z])')
    return pattern.sub('', text)


def list_AZ(start_char,end_char):
    # List the alphabets from start_char to end_char. 
    # Ex: list_AZ('A','C') -> ['A', 'B', 'C']
    start = ord(start_char)
    end = ord(end_char)
    return [chr(i) for i in range(start, end+1)]
    
def list_numbers(start_num, end_num):
    # List the numbers from start_num to end_num
    # Ex: list_numbers(1,3) -> [1, 2, 3]
    return list(range(start_num, end_num+1))

def parse_task_question_number(text):
    # Take into account the unicode for '-'
    # Case 1: "Questions 1-5" or "Questions 1 - 5" (Range). Take into account multiple spaces
    range_pattern = re.compile(r'Questions\s*(\d+)[\-\–\s]+(\d+)')
        # range_pattern = re.compile(r'Questions (\d+)\s*-\s*(\d+)')
    multiple_pattern = re.compile(r'Questions\s*(\d+)\s*and\s*(\d+)')    # Case 2: "Questions 1 and 2" (Multiple)
    single_pattern = re.compile(r'Question\s*(\d+)')    # Case 3: "Question 1" (Single)
    # Return whichever case matches
    if range_pattern.match(text):
        start_num, end_num = range_pattern.match(text).groups()
        return list_numbers(int(start_num), int(end_num))
    elif multiple_pattern.match(text):
        num1, num2 = multiple_pattern.match(text).groups()
        return [int(num1), int(num2)]
    elif single_pattern.match(text):
        return [int(single_pattern.match(text).group(1))]
    else:
        raise Exception(f"Invalid question number format {text}")
    
def populate_metadata(raw_data):
    if raw_data["metadata"]:
        metadata = raw_data["metadata"]
        raw_data["reading_info"]["metadata"] = metadata
        raw_data["passage_content"]["metadata"] = metadata
        for question in raw_data["question_content"]:
            question["metadata"] = metadata

def parse_reading_from_yaml(filename):
    raw_data = load_yaml_file(filename)
    populate_metadata(raw_data)
    reading_info = parse_reading_info(raw_data["reading_info"])
    passage_content = parse_passage_content(raw_data["passage_content"])
    question_content = parse_question_content(raw_data["question_content"])
    return {
        "readingInfo": reading_info,
        "passageContent": passage_content,
        "questionContent": question_content
    }

def parse_reading_info(reading_info_data):
    return {
        "readingTitle": clean_text_single_line(reading_info_data["reading_title"]).strip(),
        "readingSubtitle": clean_text_single_line(reading_info_data["reading_subtitle"]).strip(),
    }

def parse_passage_content(passage_data):
    metadata = passage_data['metadata']
    paragraph_markers = passage_data['paragraph_markers']
    passage_context = clean_text_single_line(passage_data["passage_context"])
    passage_title = clean_text_single_line(passage_data["passage_title"])
    passage_subtitle = clean_text_single_line(passage_data["passage_subtitle"])
    if metadata['contains_floating_breaks']:
        passage_main_text = clean_floating_linebreaks(passage_data["passage_main_text"])
    else:
        passage_main_text = clean_text_multiple_line(passage_data["passage_main_text"])

    if paragraph_markers:
        split_pattern = re.compile(r'\n+(?=[A-Z]\n+[^A-Za-z]?[A-Z])')
        match_pattern = re.compile(r'([A-Z])\n+([^A-Za-z]?[A-Z].*)')
        passsage_paragraphs = re.split(split_pattern, passage_main_text) # ['A\nEaster Island, or ', 'B\nWhen the Europeans', 'C\nThe moai, he think',...]
        passsage_paragraphs = [match_pattern.match(a).groups() for a in passsage_paragraphs]     # For each paragraph, match into header and content groups
    else:
        passsage_paragraphs = re.split(r'\n+(?=[A-Z])', passage_main_text)

    return {
        "hasParagraphMarkers": paragraph_markers,
        "passageContext": passage_context,
        "passageTitle": passage_title,
        "passageSubtitle": passage_subtitle,
        "passageMainText": passage_main_text,
        "passageParagraphs": passsage_paragraphs
    }

def parse_question_content(question_data):
    questionTasks = []
    for question in question_data:
        questionTasks.append(parse_question_task(question))
    return questionTasks

def parse_question_task(questionTask):
    task_type = questionTask["task_type"].strip()
    parser_functions = {
        "multiple-choice-select-one": parse_multiple_choice_select_one,
        "multiple-choice-select-many": parse_multiple_choice_select_many,
        "diagram-completion": parse_diagram_completion,
        "flow-chart-completion": parse_flow_chart_completion,
        "summary-completion": parse_summary_completion,
        "summary-completion-word-list": parse_summary_completion_word_list,
        "sentence-completion": parse_sentence_completion,
        "table-completion": parse_table_completion,
        "note-completion": parse_note_completion,
        "matching-features": parse_matching_features,
        "matching-headings": parse_matching_headings,
        "matching-sentence-endings": parse_matching_sentence_endings,
        "matching-paragraphs": parse_matching_paragraphs,
        "true-false-notgiven": parse_true_false_notgiven,
        "yes-no-notgiven": parse_yes_no_notgiven
    }
    if task_type not in parser_functions.keys():
        raise Exception(f"{task_type} is an invalid question type")
    return parser_functions[task_type](questionTask)


#  Completion questions
def parse_diagram_completion(questionTask):
    # Task description
    task_type = questionTask['task_type'].strip()
    task_description = questionTask['task_description'].strip()
    task_question_number = questionTask['task_question_number'].strip()

    # Main content
    question_main_title = questionTask['question_main_title'].strip()
    question_main_text = questionTask['question_main_text'].strip()
    question_img_path = questionTask['question_img_path'].strip()  # Most important
    correct_answer = questionTask['correct_answer'].strip()

    # Not applicable but included for consistency
    question_list_title = questionTask['question_list_title'].strip()
    question_list_of_options = questionTask['question_list_of_options'].strip()
    example_answer = questionTask['example_answer'].strip()

    #  Clean text
    task_question_number_list = parse_task_question_number(task_question_number)
    task_description = clean_text_multiple_line(task_description)
    question_main_title = clean_text_single_line(question_main_title)
    question_main_text = clean_text_multiple_line(question_main_text)
    correct_answer = clean_text_multiple_line(correct_answer)

    # matching patterns
    correct_answer_pattern = re.compile(r'(\d+)[^a-zA-Z\d\(\)\-\+:]+(.*)') # Ex: 1. tomatoes 2. urban centres/ centers
    correct_answer_items = re.split(r'\n+', correct_answer)

    # Idea: Correct-answer-bassed question items. Each question item will be created for each correct answer   
    question_items = []
    for answer_item in correct_answer_items:
        answer_item = answer_item.strip()

        # Extract question number and correct answer for each question item
        answer_item_match = correct_answer_pattern.match(answer_item)
        question_number = answer_item_match.group(1).strip()
        correct_answer = answer_item_match.group(2).strip()
        question_items.append({
            "questionNumber": int(question_number),
            "correctAnswer": correct_answer
    })

    return {
        "taskType": task_type,
        "taskQuestionNumberList": task_question_number_list,
        "taskQuestionNumberText": task_question_number,
        "taskDescription": task_description,
        "questionMainTitle": question_main_title,
        "questionMainText": question_main_text,
        "questionImgPath": question_img_path, # Most important
        "questionItems": question_items,
    }

def parse_flow_chart_completion(questionTask):
    return parse_diagram_completion(questionTask)

def parse_sentence_completion(questionTask):
    # Task description
    task_type = questionTask['task_type'].strip()
    task_description = questionTask['task_description'].strip()
    task_question_number = questionTask['task_question_number'].strip()

    # Main content
    question_main_title = questionTask['question_main_title'].strip()
    question_main_text = questionTask['question_main_text'].strip()
    correct_answer = questionTask['correct_answer'].strip()

    # Not applicable but included for consistency
    question_img_path = questionTask['question_img_path'].strip()
    question_list_title = questionTask['question_list_title'].strip()
    question_list_of_options = questionTask['question_list_of_options'].strip()
    example_answer = questionTask['example_answer'].strip()
    
    task_question_number_list = parse_task_question_number(task_question_number)
    task_description = clean_text_multiple_line(task_description)
    question_main_title = clean_text_single_line(question_main_title)
    # question_main_text = clean_text_multiple_line(question_main_text)
    correct_answer = clean_text_multiple_line(correct_answer)

    # matching patterns
    correct_answer_pattern = re.compile(r'(\d+)[^a-zA-Z\d\(\)\-\+:]+(.*)') # Ex: 1. tomatoes 2. urban centres/ centers
    correct_answer_items = re.split(r'\n+', correct_answer)
    question_main_text_lines = re.split(r'\n+', question_main_text)

    # Idea: Correct-answer-bassed question items. Each question item will be created for each correct answer   
    question_items = []
    for answer_item in correct_answer_items:
        answer_item = answer_item.strip()

        # Extract question number and correct answer for each question item
        answer_item_match = correct_answer_pattern.match(answer_item)
        question_number = answer_item_match.group(1).strip()
        correct_answer = answer_item_match.group(2).strip()
        question_items.append({
            "questionNumber": int(question_number),
            "correctAnswer": correct_answer
    })

    return {
        "taskType": task_type,
        "taskQuestionNumberList": task_question_number_list,
        "taskQuestionNumberText": task_question_number,
        "taskDescription": task_description,
        "questionMainTitle": question_main_title,
        "questionMainText": question_main_text_lines,
        "questionItems": question_items,
    }

def parse_summary_completion(questionTask):
    return parse_sentence_completion(questionTask)

def parse_note_completion(questionTask):
    return parse_sentence_completion(questionTask)

def parse_summary_completion_word_list(questionTask):
    # Task description
    task_type = questionTask['task_type'].strip()
    task_description = questionTask['task_description'].strip()
    task_question_number = questionTask['task_question_number'].strip()

    # Main content
    question_main_title = questionTask['question_main_title'].strip()
    question_main_text = questionTask['question_main_text'].strip()
    correct_answer = questionTask['correct_answer'].strip()
    question_list_title = questionTask['question_list_title'].strip()
    question_list_of_options = questionTask['question_list_of_options'].strip()

    # Not applicable but included for consistency
    question_img_path = questionTask['question_img_path'].strip()
    example_answer = questionTask['example_answer'].strip()

    #  Clean text
    task_description = clean_text_multiple_line(task_description)
    question_main_title = clean_text_single_line(question_main_title)
    question_main_text = clean_text_multiple_line(question_main_text)
    question_list_title = clean_text_single_line(question_list_title)
    question_list_of_options = clean_text_multiple_line(question_list_of_options)
    task_question_number_list = parse_task_question_number(task_question_number)

    
    # Split items
    question_main_text_lines = re.split(r'\n+', question_main_text)
    correct_answer_lines = re.split(r'\n+', correct_answer)

    # Matching patterns - both questions and correct answers
    correct_answer_pattern = re.compile(r'(\d+)[^a-zA-Z\d\(\)\-\+:]+([A-Z])') 
    question_option_item_pattern = re.compile(r'([A-Z])[^a-zA-Z\d\(\)\-\+:]+(.*)') 
    question_option_items = question_option_item_pattern.findall(question_list_of_options)
    #  Strip items

    # Idea: Each matching question item contains question, list of choices and correct answer
    
    question_items = []
    for answer_line in correct_answer_lines:
        answer_line = answer_line.strip()

        # Extract question number and correct answer for each question item
        answer_item_match = correct_answer_pattern.match(answer_line)
        question_number = answer_item_match.group(1).strip()
        correct_answer = answer_item_match.group(2).strip()
        question_items.append({
            "questionNumber": int(question_number),
            "questionOptions": question_option_items, 
            "correctAnswer": correct_answer
        })

    return {
        "taskType": task_type,
        "taskQuestionNumberList": task_question_number_list,
        "taskQuestionNumberText": task_question_number,
        "taskDescription": task_description,
        "questionMainTitle": question_main_title,
        "questionMainText": question_main_text,
        "questionListTitle": question_list_title,
        "questionListOptions": question_option_items,
        "questionItems": question_items,
    }

def parse_table_completion(questionTask):
    # Task description
    task_type = questionTask['task_type'].strip()
    task_description = questionTask['task_description'].strip()
    task_question_number = questionTask['task_question_number'].strip()

    # Main content
    question_main_title = questionTask['question_main_title'].strip()
    question_main_text = questionTask['question_main_text'].strip()
    correct_answer = questionTask['correct_answer'].strip()
    question_list_title = questionTask['question_list_title'].strip()
    question_list_of_options = questionTask['question_list_of_options'].strip()

    # Not applicable but included for consistency
    question_img_path = questionTask['question_img_path'].strip()
    example_answer = questionTask['example_answer'].strip()

    #  Clean text
    task_question_number_list = parse_task_question_number(task_question_number)
    task_description = clean_text_multiple_line(task_description)
    question_main_title = clean_text_single_line(question_main_title)
    question_main_text = clean_text_multiple_line(question_main_text)
    correct_answer = clean_text_multiple_line(correct_answer)
    question_list_title = clean_text_single_line(question_list_title)

    # Split items
    question_main_text_lines = re.split(r'\n+', question_main_text)
    correct_answer_lines = re.split(r'\n+', correct_answer)

    correct_answer_pattern = re.compile(r'(\d+)[^a-zA-Z\d\(\)\-\+:]+(.*)') # Ex: 8. NOT GIVEN\n\n9. TRUE\n\n
    table_data_rows = [tuple(r.strip() for r in re.split(r'\|',row)) for row in question_main_text_lines]


    # Idea: Each matching question item contains question, list of choices and correct answer
    question_items = []
    for answer_line in correct_answer_lines:
        answer_line = answer_line.strip()

        # Extract question number and correct answer for each question item
        answer_item_match = correct_answer_pattern.match(answer_line)
        question_number = answer_item_match.group(1).strip()
        correct_answer = answer_item_match.group(2).strip()
        question_items.append({
            "questionNumber": int(question_number),
            "correctAnswer": correct_answer
        })

    return {
        "taskType": task_type,
        "taskQuestionNumberList": task_question_number_list,
        "taskQuestionNumberText": task_question_number,
        "taskDescription": task_description,
        "questionMainTitle": question_main_title,
        "questionMainText": table_data_rows,
        "questionItems": question_items,
    }

# Matching questions
def parse_matching_features(questionTask):
    # Task description
    task_type = questionTask['task_type'].strip()
    task_description = questionTask['task_description'].strip()
    task_question_number = questionTask['task_question_number'].strip()

    # Main content
    question_main_title = questionTask['question_main_title'].strip()
    question_main_text = questionTask['question_main_text'].strip()
    correct_answer = questionTask['correct_answer'].strip()
    question_list_title = questionTask['question_list_title'].strip()
    question_list_of_options = questionTask['question_list_of_options'].strip()
    example_answer = questionTask['example_answer'].strip()


    # Not applicable but included for consistency
    question_img_path = questionTask['question_img_path'].strip()

    #  Clean text
    task_description = clean_text_multiple_line(task_description)
    question_main_title = clean_text_single_line(question_main_title)
    question_main_text = clean_text_multiple_line(question_main_text)
    correct_answer = clean_text_multiple_line(correct_answer)
    question_list_title = clean_text_single_line(question_list_title)
    task_question_number_list = parse_task_question_number(task_question_number)

    # Split items
    question_main_text_lines = re.split(r'\n+', question_main_text)
    correct_answer_lines = re.split(r'\n+', correct_answer)
    # question_list_of_options_lines = re.split(r'\n+', question_list_of_options)

    # Matching patterns - both questions and correct answers
    correct_answer_pattern = re.compile(r'(\d+)[^a-zA-Z\d\(\)\-\+:]+(.*)') # Ex: 8. NOT GIVEN\n\n9. TRUE\n\n
    question_item_pattern = re.compile(r'(\d+)[^a-zA-Z\d\(\)\-\+:]+(.*)') # Ex: 8. NOT GIVEN\n\n9. TRUE\n\n
    question_option_item_pattern = re.compile(r'([A-Z])[^a-zA-Z\d\(\)\-\+:]+(.*)') # Ex: A    Roger Angel\n\nB    Phil Rasch


    question_option_items = question_option_item_pattern.findall(question_list_of_options)
    # Idea: Each matching question item contains question, list of choices and correct answer
    question_items = []
    for question_line, answer_line in zip(question_main_text_lines, correct_answer_lines):
        question_line, answer_line = question_line.strip(), answer_line.strip()

        # Extract question number and correct answer for each question item
        question_item_match = question_item_pattern.match(question_line)
        answer_item_match = correct_answer_pattern.match(answer_line)
        question_number = question_item_match.group(1).strip()
        question_text = question_item_match.group(2).strip()
        correct_answer = answer_item_match.group(2).strip()
        question_items.append({
            "questionNumber": int(question_number),
            "questionText": question_text,
            "questionOptions": question_option_items, # option is a tuple but correct answer might be a string
            "correctAnswer": correct_answer
        })

    return {
        "taskType": task_type,
        "taskQuestionNumberList": task_question_number_list,
        "taskQuestionNumberText": task_question_number,
        "taskDescription": task_description,
        "questionMainTitle": question_main_title,
        "questionMainText": question_main_text,
        "questionListTitle": question_list_title,
        "questionListOptions": question_option_items,
        "exampleAnswer": example_answer,
        "questionItems": question_items,
    }

def parse_matching_headings(questionTask):
    # Task description
    task_type = questionTask['task_type'].strip()
    task_description = questionTask['task_description'].strip()
    task_question_number = questionTask['task_question_number'].strip()

    # Main content
    question_main_title = questionTask['question_main_title'].strip()
    question_main_text = questionTask['question_main_text'].strip()
    correct_answer = questionTask['correct_answer'].strip()
    question_list_title = questionTask['question_list_title'].strip()
    question_list_of_options = questionTask['question_list_of_options'].strip()
    example_answer = questionTask['example_answer'].strip()

    # Not applicable but included for consistency
    question_img_path = questionTask['question_img_path'].strip()

    #  Clean text
    task_description = clean_text_multiple_line(task_description)
    question_main_title = clean_text_single_line(question_main_title)
    question_main_text = clean_text_multiple_line(question_main_text)
    question_list_title = clean_text_single_line(question_list_title)
    task_question_number_list = parse_task_question_number(task_question_number)

    # Split items
    question_main_text_lines = re.split(r'\n+', question_main_text)
    correct_answer_lines = re.split(r'\n+', correct_answer)
    # question_list_of_options_lines = re.split(r'\n+', question_list_of_options)

    # Matching patterns - both questions and correct answers
    correct_answer_pattern = re.compile(r'(\d+)[^a-zA-Z\d\(\)\-\+:]+([ixv]+)') # Ex: 8. NOT GIVEN\n\n9. TRUE\n\n
    question_item_pattern = re.compile(r'(\d+)[^a-zA-Z\d\(\)\-\+:]+(.*)') # Ex: 8. NOT GIVEN\n\n9. TRUE\n\n
    question_option_item_pattern = re.compile(r'([ixv]+)[^a-zA-Z\d\(\)\-\+:]+(.*)') # Ex: A    Roger Angel\n\nB    Phil Rasch

    question_option_items = question_option_item_pattern.findall(question_list_of_options)
    # Idea: Each matching question item contains question, list of choices and correct answer
    question_items = []
    for question_line, answer_line in zip(question_main_text_lines, correct_answer_lines):
        question_line, answer_line = question_line.strip(), answer_line.strip()

        # Extract question number and correct answer for each question item
        question_item_match = question_item_pattern.match(question_line)
        answer_item_match = correct_answer_pattern.match(answer_line)
        question_number = question_item_match.group(1).strip()
        question_text = question_item_match.group(2).strip()
        correct_answer = answer_item_match.group(2).strip()
        question_items.append({
            "questionNumber": int(question_number),
            "questionText": question_text,
            "questionOptions": question_option_items, 
            "correctAnswer": correct_answer
        })

    return {
        "taskType": task_type,
        "taskQuestionNumberList": task_question_number_list,
        "taskQuestionNumberText": task_question_number,
        "taskDescription": task_description,
        "questionMainTitle": question_main_title,
        # "questionMainText": question_main_text, # Not needed
        "questionListTitle": question_list_title,
        "questionListOptions": question_option_items,
        "exampleAnswer": example_answer,
        "questionItems": question_items,
    }

def parse_matching_sentence_endings(questionTask):
    # Task description
    task_type = questionTask['task_type'].strip()
    task_description = questionTask['task_description'].strip()
    task_question_number = questionTask['task_question_number'].strip()

    # Main content
    question_main_title = questionTask['question_main_title'].strip()
    question_main_text = questionTask['question_main_text'].strip()
    correct_answer = questionTask['correct_answer'].strip()
    question_list_title = questionTask['question_list_title'].strip()
    question_list_of_options = questionTask['question_list_of_options'].strip()

    # Not applicable but included for consistency
    question_img_path = questionTask['question_img_path'].strip()
    example_answer = questionTask['example_answer'].strip()

    #  Clean text
    task_description = clean_text_multiple_line(task_description)
    question_main_title = clean_text_single_line(question_main_title)
    # question_main_text = clean_floating_linebreaks(question_main_text) # Since it usually doesnt end with a period, this would cause issues
    question_list_title = clean_text_single_line(question_list_title)
    question_list_of_options = clean_text_multiple_line(question_list_of_options)
    task_question_number_list = parse_task_question_number(task_question_number)

    # Split items
    question_main_text_lines = re.split(r'\n+', question_main_text)
    correct_answer_lines = re.split(r'\n+', correct_answer)

    # Matching patterns - both questions and correct answers
    correct_answer_pattern = re.compile(r'(\d+)[^a-zA-Z\d\(\)\-\+:]+([A-Z])') 
    question_option_item_pattern = re.compile(r'([A-Z])[^a-zA-Z\d\(\)\-\+:]+(.*)') 
    question_option_items = question_option_item_pattern.findall(question_list_of_options)
    question_line_pattern = re.compile(r'(\d+)[^a-zA-Z\d\(\)\-\+:]+(.*)')
    #  Strip items

    # Idea: Each matching question item contains question, list of choices and correct answer
    
    question_items = []
    for question_line, answer_line in zip(question_main_text_lines,correct_answer_lines):
        question_line, answer_line = question_line.strip(), answer_line.strip()

        # Extract question number and correct answer for each question item
        answer_item_match = correct_answer_pattern.match(answer_line)
        question_number = answer_item_match.group(1).strip()
        question_text = question_line_pattern.match(question_line).group(2).strip()
        correct_answer = answer_item_match.group(2).strip()
        question_items.append({
            "questionNumber": int(question_number),
            "questionText": question_text,
            "questionOptions": question_option_items, 
            "correctAnswer": correct_answer
        })

    return {
        "taskType": task_type,
        "taskQuestionNumberList": task_question_number_list,
        "taskQuestionNumberText": task_question_number,
        "taskDescription": task_description,
        "questionMainTitle": question_main_title,
        "questionMainText": question_main_text,
        "questionListTitle": question_list_title,
        "questionListOptions": question_option_items,
        "exampleAnswer": example_answer,
        "questionItems": question_items,
    }

def parse_matching_paragraphs(questionTask):
    # Task description
    task_type = questionTask['task_type'].strip()
    task_description = questionTask['task_description'].strip()
    task_question_number = questionTask['task_question_number'].strip()

    # Main content
    question_main_title = questionTask['question_main_title'].strip()
    question_main_text = questionTask['question_main_text'].strip()
    correct_answer = questionTask['correct_answer'].strip()
    question_list_title = questionTask['question_list_title'].strip()
    question_list_of_options = questionTask['question_list_of_options'].strip()

    # Not applicable but included for consistency
    question_img_path = questionTask['question_img_path'].strip()
    example_answer = questionTask['example_answer'].strip()

    #  Clean text
    task_description = clean_text_multiple_line(task_description)
    question_main_title = clean_text_single_line(question_main_title)
    # question_main_text = clean_floating_linebreaks(question_main_text)
    question_list_title = clean_text_single_line(question_list_title)
    question_list_of_options = clean_text_multiple_line(question_list_of_options)
    task_question_number_list = parse_task_question_number(task_question_number)

    # Split items
    question_main_text_lines = re.split(r'\n+', question_main_text)
    correct_answer_lines = re.split(r'\n+', correct_answer)

    # Matching patterns - both questions and correct answers
    correct_answer_pattern = re.compile(r'(\d+)[^a-zA-Z\d\(\)\-\+:]+(.*)')
    question_item_pattern = re.compile(r'(\d+)[^a-zA-Z\d\(\)\-\+:]+(.*)')
    start_char, end_char = re.split('-', question_list_of_options)
    question_option_items = list_AZ(start_char, end_char)
    #  Strip items

    # Idea: Each matching question item contains question, list of choices and correct answer
    
    question_items = []
    for question_line, answer_line in zip(question_main_text_lines, correct_answer_lines):
        question_line, answer_line = question_line.strip(), answer_line.strip()

        # Extract question number and correct answer for each question item
        answer_item_match = correct_answer_pattern.match(answer_line)
        question_item_match = question_item_pattern.match(question_line)
        question_number = question_item_match.group(1).strip()
        question_text = question_item_match.group(2).strip()
        correct_answer = answer_item_match.group(2).strip()
        question_items.append({
            "questionNumber": int(question_number),
            "questionText": question_text,
            "questionOptions": question_option_items, 
            "correctAnswer": correct_answer
        })

    return {
        "taskType": task_type,
        "taskQuestionNumberList": task_question_number_list,
        "taskQuestionNumberText": task_question_number,
        "taskDescription": task_description,
        "questionMainTitle": question_main_title,
        "questionMainText": question_main_text,
        "questionListTitle": question_list_title,
        "questionListOptions": question_option_items,
        "questionItems": question_items,
    }

def parse_true_false_notgiven(questionTask):
    # Task description
    task_type = questionTask['task_type'].strip()
    task_description = questionTask['task_description'].strip()
    task_question_number = questionTask['task_question_number'].strip()

    # Main content
    question_main_title = questionTask['question_main_title'].strip()
    question_main_text = questionTask['question_main_text'].strip()
    correct_answer = questionTask['correct_answer'].strip()

    # Not applicable but included for consistency
    question_img_path = questionTask['question_img_path'].strip()
    question_list_title = questionTask['question_list_title'].strip()
    question_list_of_options = questionTask['question_list_of_options'].strip()
    example_answer = questionTask['example_answer'].strip()

    #  Clean text
    task_description = clean_text_multiple_line(task_description)
    question_main_title = clean_text_single_line(question_main_title)
    question_main_text = clean_text_multiple_line(question_main_text)
    correct_answer = clean_text_multiple_line(correct_answer)
    task_question_number_list = parse_task_question_number(task_question_number)


    # Split items
    question_main_text_lines = re.split(r'\n+', question_main_text)
    correct_answer_lines = re.split(r'\n+', correct_answer)

    # Matching patterns - both questions and correct answers
    correct_answer_pattern = re.compile(r'(\d+)[^a-zA-Z\d\(\)\-\+:]+(.*)') # Ex: 8. NOT GIVEN\n\n9. TRUE\n\n
    question_item_pattern = re.compile(r'(\d+)[^a-zA-Z\d\(\)\-\+:]+(.*)') # Ex: 8. NOT GIVEN\n\n9. TRUE\n\n

    # Idea: Each TFNG question item contains question, list of choices (TFNG) and correct answer
    question_items = []
    for question_line, answer_line in zip(question_main_text_lines, correct_answer_lines):
        question_line, answer_line = question_line.strip(), answer_line.strip()

        # Extract question number and correct answer for each question item
        question_item_match = question_item_pattern.match(question_line)
        answer_item_match = correct_answer_pattern.match(answer_line)
        question_number = question_item_match.group(1).strip()
        question_text = question_item_match.group(2).strip()
        correct_answer = answer_item_match.group(2).strip()
        question_items.append({
            "questionNumber": int(question_number),
            "questionText": question_text,
            "questionOptions": ["TRUE", "FALSE", "NOT GIVEN"], # Always the same
            "correctAnswer": correct_answer
        })

    return {
        "taskType": task_type,
        "taskQuestionNumberList": task_question_number_list,
        "taskQuestionNumberText": task_question_number,
        "taskDescription": task_description,
        "questionMainTitle": question_main_title,
        "questionMainText": question_main_text,
        "questionItems": question_items,
    }

def parse_yes_no_notgiven(questionTask):
    # Task description
    task_type = questionTask['task_type'].strip()
    task_description = questionTask['task_description'].strip()
    task_question_number = questionTask['task_question_number'].strip()

    # Main content
    question_main_title = questionTask['question_main_title'].strip()
    question_main_text = questionTask['question_main_text'].strip()
    correct_answer = questionTask['correct_answer'].strip()

    # Not applicable but included for consistency
    question_img_path = questionTask['question_img_path'].strip()
    question_list_title = questionTask['question_list_title'].strip()
    question_list_of_options = questionTask['question_list_of_options'].strip()
    example_answer = questionTask['example_answer'].strip()

    #  Clean text
    task_description = clean_text_multiple_line(task_description)
    question_main_title = clean_text_single_line(question_main_title)
    question_main_text = clean_floating_linebreaks(question_main_text)
    correct_answer = clean_text_multiple_line(correct_answer)
    task_question_number_list = parse_task_question_number(task_question_number)


    # Split items
    question_main_text_lines = re.split(r'\n+', question_main_text)
    correct_answer_lines = re.split(r'\n+', correct_answer)

    # Matching patterns - both questions and correct answers
    correct_answer_pattern = re.compile(r'(\d+)[^a-zA-Z\d\(\)\-\+:]+(.*)') # Ex: 8. NOT GIVEN\n\n9. TRUE\n\n
    question_item_pattern = re.compile(r'(\d+)[^a-zA-Z\d\(\)\-\+:]+(.*)') # Ex: 8. NOT GIVEN\n\n9. TRUE\n\n

    # Idea: Each TFNG question item contains question, list of choices (TFNG) and correct answer
    question_items = []
    for question_line, answer_line in zip(question_main_text_lines, correct_answer_lines):
        question_line, answer_line = question_line.strip(), answer_line.strip()

        # Extract question number and correct answer for each question item
        question_item_match = question_item_pattern.match(question_line)
        answer_item_match = correct_answer_pattern.match(answer_line)
        question_number = question_item_match.group(1).strip()
        question_text = question_item_match.group(2).strip()
        correct_answer = answer_item_match.group(2).strip()
        question_items.append({
            "questionNumber": int(question_number),
            "questionText": question_text,
            "questionOptions": ["YES", "NO", "NOT GIVEN"], # Always the same
            "correctAnswer": correct_answer
        })

    return {
        "taskType": task_type,
        "taskQuestionNumberList": task_question_number_list,
        "taskQuestionNumberText": task_question_number,
        "taskDescription": task_description,
        "questionMainTitle": question_main_title,
        "questionMainText": question_main_text,
        "questionItems": question_items,
    }

# Choice questions
def parse_multiple_choice_select_one(questionTask):
    task_type = questionTask['task_type'].strip()
    task_description = questionTask['task_description'].strip()
    task_question_number = questionTask['task_question_number'].strip()

    # Main content
    question_main_title = questionTask['question_main_title'].strip()
    question_main_text = questionTask['question_main_text'].strip()
    correct_answer = questionTask['correct_answer'].strip()
    question_list_title = questionTask['question_list_title'].strip()

    # Not applicable but included for consistency
    question_list_of_options = questionTask['question_list_of_options'].strip()
    question_img_path = questionTask['question_img_path'].strip()
    example_answer = questionTask['example_answer'].strip()

    #  Clean text
    task_description = clean_text_multiple_line(task_description)
    question_main_title = clean_text_single_line(question_main_title)
    # question_main_text = clean_floating_linebreaks(question_main_text)
    question_list_title = clean_text_single_line(question_list_title)
    task_question_number_list = parse_task_question_number(task_question_number)

    mcq_question_content_pattern = re.compile(r'(\d+)[^a-zA-Z\d\(\)\-\+:]+(.*)') # Ex: 1. tomatoes 2. urban centres/ centers
    mcq_question_option_pattern = re.compile(r'([A-Z])[^a-zA-Z\d\(\)\-\+:]+(.*)') # Ex: A    Roger Angel\n\nB    Phil Rasch
    # correct_answer_pattern = re.compile(r'(\d+)[^a-zA-Z\d\(\)\-\+:]+(.*)') # Ex: 1. tomatoes 2. urban centres/ centers
    correct_answer_pattern_1 = re.compile(r'\d+[^a-zA-Z\d\(\)\-\+:]+([A-Z])') # 25. B\n26. D\n27. E'
    correct_answer_pattern_2 = re.compile(r'([A-Z])[^a-zA-Z\d\(\)\-\+:]+.*') # 'B ■ They can predict...\nG ■ They are more...'
    # Split items
    multiple_choice_question_item_lines = re.split(r'\n(?=\d+\s)', question_main_text) # ['27    In the secon...\nA   the subject...\nB   the subject...', '28    The author...\nA   the subject...\nB   the subject...']
    correct_answer_lines = re.split(r'\n+', correct_answer) # ['27. A', '28. B']

    question_items = []
    for mcq_question_item_line, answer_line in zip(multiple_choice_question_item_lines, correct_answer_lines):
        mcq_question_item_line, answer_line = mcq_question_item_line.strip(), answer_line.strip()

        # Extract question number and correct answer for each question item
        question_item_match = mcq_question_content_pattern.match(mcq_question_item_line)
        question_option_items = mcq_question_option_pattern.findall(mcq_question_item_line)
        # answer_item_match = correct_answer_pattern.match(answer_line)
        if correct_answer_pattern_1.match(answer_line):
            correct_answer = correct_answer_pattern_1.match(answer_line).group(1)
        elif correct_answer_pattern_2.match(answer_line):
            correct_answer = correct_answer_pattern_2.match(answer_line).group(1)

        question_number = question_item_match.group(1).strip()
        question_text = question_item_match.group(2).strip()
        correct_answer = correct_answer
        question_items.append({
            "questionNumber": int(question_number),
            "questionText": question_text,
            "questionOptions": question_option_items, 
            "correctAnswer": correct_answer
        })

    return {
        "taskType": task_type,
        "taskQuestionNumberList": task_question_number_list,
        "taskQuestionNumberText": task_question_number,
        "taskDescription": task_description,
        "questionItems": question_items,
    }

def parse_multiple_choice_select_many(questionTask):
    # Task description
    task_type = questionTask['task_type'].strip()
    task_description = questionTask['task_description'].strip()
    task_question_number = questionTask['task_question_number'].strip()


    # Main content
    question_main_title = questionTask['question_main_title'].strip()
    question_main_text = questionTask['question_main_text'].strip()
    correct_answer = questionTask['correct_answer'].strip()

    # Not applicable but included for consistency
    question_img_path = questionTask['question_img_path'].strip()
    question_list_title = questionTask['question_list_title'].strip()
    question_list_of_options = questionTask['question_list_of_options'].strip()
    example_answer = questionTask['example_answer'].strip()

    #  Clean text
    task_description = clean_text_multiple_line(task_description)
    question_main_title = clean_text_single_line(question_main_title)
    question_main_text = clean_text_multiple_line(question_main_text)
    task_question_number_list = parse_task_question_number(task_question_number)

    # matching patterns
    correct_answer_pattern_1 = re.compile(r'\d+[^a-zA-Z\d\(\)\-\+:]+([A-Z])') # 25. B\n26. D\n27. E'
    correct_answer_pattern_2 = re.compile(r'([A-Z])[^a-zA-Z\d\(\)\-\+:]+.*') # 'B ■ They can predict...\nG ■ They are more...'
    question_item_pattern = re.compile(r'([A-Z])[^a-zA-Z\d\(\)\-\+:]+(.*)') # Ex: 1. tomatoes 2. urban centres/ centers
    correct_answer_lines = re.split(r'\n+', correct_answer)
    question_list_of_options_lines = re.split(r'\n+', question_list_of_options)


    question_items =  question_item_pattern.findall(question_list_of_options)
    if correct_answer_pattern_1.match(correct_answer):
        correct_answer_items = correct_answer_pattern_1.findall(correct_answer)
    elif correct_answer_pattern_2.match(correct_answer):
        correct_answer_items = correct_answer_pattern_2.findall(correct_answer)
    # correct_answer = correct_answer_pattern.findall(correct_answer)

    return {
    "taskType": task_type,
    "taskQuestionNumberList": task_question_number_list,
    "taskQuestionNumberText": task_question_number,
    "taskDescription": task_description,
    "questionMainTitle": question_main_title,
    "questionMainText": question_main_text,
    "questionItems": question_items,
    "correctAnswer": correct_answer_items
    }

if __name__ == '__main__':
    """
    Usage:
    cd ielts-simulator/src/scripts
    python3 parse.py --input <input_yaml_file> --output <output_json_file>
    python3 parse.py --directory --input <input_yaml_directory> --output <output_json_directory> 

    Example:
    python3 parse.py --input "../components/assets/yaml/cam-11-test-1/cam-11-test-1-1.yaml" --output "../components/assets/json/cam-11-test-1/cam-11-test-1-1.json"
    
    python3 parse.py --directory --input "../components/assets/yaml/cam-11-test-1" --output "../data/reading-tests/cam-11-test-1"
    python3 parse.py --directory --input "../components/assets/yaml/cam-11-test-2" --output "../data/reading-tests/cam-11-test-2"
    python3 parse.py --directory --input "../components/assets/yaml/cam-11-test-3" --output "../data/reading-tests/cam-11-test-3"
    python3 parse.py --directory --input "../components/assets/yaml/cam-13-test-2" --output "../data/reading-tests/cam-13-test-2"

    python3 parse.py --directory --input "../components/assets/yaml/reading-practices" --output "../data/reading-practices"
    """
    args = parse_args()
    if args.directory:
        input_dir = args.input
        output_dir = args.output
        yaml_files = get_files(input_dir, ".yaml")
        for yaml_file in yaml_files:
            parsed_data = parse_reading_from_yaml(yaml_file)
            json_string = json.dumps(parsed_data, indent=2)
            save_json_file(json_string, output_dir + "/" + Path(yaml_file).stem + ".json")
        

    else:
        parsed_data = parse_reading_from_yaml(args.input)
        json_string = json.dumps(parsed_data, indent=2)
        save_json_file(json_string, args.output)

    