import re


def filter_text(text):
    # return list of dicts. each dict contains order, base task description, and empty subtask list
    plans = []
    raw_pattern = r'(\d+)\.\s*(.*?)\s*\n'

    ordered_steps = re.findall(raw_pattern, text, re.MULTILINE | re.VERBOSE)

    for step in ordered_steps:
        plans.append({
            "order": step[0],
            "description": step[1],
            "sub_tasks": [],
            "chat_history": []
        })

    return plans


def filter_documents(docs):
    # return list of dict, each item has title and url of resource 
    doc_list = []
    for doc in docs:
        if doc['title'] is not None and doc['url'] is not None:
            item = {
                'title': doc['title'],
                'url': doc['url']
            }
            if item not in doc_list:
                doc_list.append(item)
    return (doc_list)
