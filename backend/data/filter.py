import re

def filter_base(text):
    # return list of dicts. each dict contains order, base task description, and empty subtask list
    plans = []
    raw_pattern = r'(\d+)\.\s*(.*?)\s*\n'

    ordered_steps = re.findall(raw_pattern, text, re.MULTILINE | re.VERBOSE)

    for step in ordered_steps:
        plans.append({
            "order": step[0],
            "description": step[1],
            "sub_tasks": []
        })

    return plans