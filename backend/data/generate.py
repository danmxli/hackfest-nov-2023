from data.mockdata import mockdata
import os
import cohere
from dotenv import load_dotenv
import time
from data.filter import filter_text, filter_documents
load_dotenv('.env')

cohere_key = os.getenv('COHERE_KEY')
if cohere_key is not None and cohere_key != '':
    co = cohere.Client(cohere_key)
else:
    ...


def base_plan(userPrompt):

    base_details = {}

    # response = co.chat(
    #     model='command-nightly',
    #     message=f"here is my description: {userPrompt}. Generate a numbered list of instructions to achieve my goal.",
    #     temperature=0,
    #     chat_history=[
    #         {
    #             "role": "USER", "message": "I need you to generate a numbered list of instructions to achieve my goal."
    #         },
    #         {
    #             "role": "CHATBOT", "message": "Sure, provide me with your goal, and my task is to create a numbered list of instructions."
    #         }
    #     ],
    # )

    # raw_text = response.text
    # raw_resources = response.documents
    mock = mockdata()
    time.sleep(3)

    base_details["task_list"] = filter_text(mock["raw_text"])
    base_details["resource_list"] = filter_documents(mock["raw_resources"])

    return base_details


def base_chat_generate(prompt):
    # response = co.chat(
    #     model='command-nightly',
    #     message=f"here is my main task: {prompt}. Generate one subtask.",
    #     temperature=0.7,
    #     chat_history=[
    #         {
    #             "role": "USER", "message": "I need you to generate one subtask based on the main task I will provide you with."
    #         },
    #         {
    #             "role": "CHATBOT", "message": "Sure, provide me with your main task, and my job is to generate one subtask based on the main task."
    #         }
    #     ],
    # )
    # raw_response = response.text
    mock = mockdata()
    raw_response = mock["chat_response"]
    time.sleep(3)

    return raw_response
