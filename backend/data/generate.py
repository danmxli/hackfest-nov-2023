import os
import cohere
from dotenv import load_dotenv
import time
from data.filter import filter_base
load_dotenv('.env')

co = cohere.Client(os.getenv('COHERE_KEY'))


def base_plan(userPrompt):

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

    raw_text = "Those are the following instructions to bike to Niagara Falls with moderate biking experience: \n\n1. Check the weather conditions for the day you plan to bike and the days after to ensure you have good weather for the trip and possible delays. It is about a two-day trip, so ensure you have checked the weather for both days. Ensure you also check for any updates on wind speeds and rain as these can affect your safety. \n2. Plan your route: Consider the distance and terrain between your starting point and Niagara Falls. You can use a map or a navigation app to find a suitable route that suits your skill level. Look for routes that have bike paths or dedicated lanes, and avoid any busy highways or roads with heavy traffic.\n3. Pack the essentials: Make sure you have all the necessary equipment and supplies for your journey. This includes a working bicycle in good condition, a helmet to ensure safety, a repair kit in case of any flat tires, bike tools, a spare tube, water, snacks, and a first-aid kit. It is also wise to pack accordingly to the weather. If it is during the summer months ensure you have sunscreen and if it is during the winter months ensure you have warm clothing. \n4. Consider stopping points: Along your journey, plan where you will stop to rest and refuel. Ensure you are staying hydrated and eating properly throughout the trip. Consider how far you can reasonably travel in a day based on your fitness level and energy. You can use a mapping app to find restaurants, parks, or other public areas where you can take a break.\n5. Stay on designated trails and bike paths: For your safety and convenience, stick to designated trails and bike paths as much as possible. These routes are typically safer and more suited for biking than busy roads. They will also take you through scenic routes where you can enjoy the nature surrounding the falls. \n\nRemember to stay alert and aware of your surroundings at all times during your journey. Keep an eye out for potential hazards and follow all traffic laws and regulations. \n\nWith these instructions, you should be well-prepared to bike to Niagara Falls with your moderate biking experience. Would you like me to go through more information regarding your bike trip to Niagara Falls?"
    time.sleep(3)
        
    base_plan_list = filter_base(raw_text)

    return base_plan_list
