//import section
import React from "react";
import { FaArrowUp } from "react-icons/fa6";
import { threadAddMessage } from "../../lib/openai";

//function
async function setupAI() {
    //constants
    const assistant = await openai.beta.assistants.create({
      name: "Math Tutor",
      instructions: "You are a personal math tutor. Write and run code to answer math questions.",
      tools: [{ type: "code_interpreter" }],
      model: "gpt-4o"
    });
}


//function for the chatBot
function AIChatBot() {
    //constants
  React.useEffect(() => {
    await setupAI();

    const thread = await openai.beta.threads.create();
  }, [])

  async function addMessage() {
    const message = await openai.beta.threads.messages.create(
      thread.id,
      {
        role: "user",
        content: "I need to solve the equation `3x + 11 = 14`. Can you help me?"
      }
    );
    await startRun()
  }

  async function startRun() {
    let run = await openai.beta.threads.runs.createAndPoll(
      thread.id,
      {
        assistant_id: assistant.id,
        instructions: "Please address the user as Jane Doe. The user has a premium account."
      }
    );
  }
  return(
    <div>
      <div>
        Talk with Assistant
      </div>
      <div>
      <div className={`w-full h-full overflow-auto scrollbar-thin scrollbar-track-slate-600 scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full p-6 flex flex-col min-h-0 ${messagesList.length == 0 && "justify-center"}`}>
            {
                messagesList.map((el) =>
                    <div key={el.id} className={`w-full flex ${el.type == "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`flex flex-col gap-1 w-full ${el.type == "user" ? "items-end" : "items-start"}`}>
                            <div className="text-slate-400 font-semibold">
                                {
                                    el.type == "user" ?
                                    "User" :
                                    "Assistant"
                                }
                            </div>
                            <div className="border border-slate-700 rounded-md p-2 px-4 bg-slate-800 max-w-[70%]">
                                    {el.message == "" ?
                                        <div>
                                            <div className="animate-spin size-6 border-2 border-current border-t-transparent text-gray-400 rounded-full m-auto relative" role="status" aria-label="loading">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                        :
                                        el.message
                                    }
                            </div>
                        </div>
                    </div>
                )
            }
            {
                messagesList.length == 0 &&
                <div className="text-slate-500 font-bold text-lg text-center">
                    Ask the Assistant something!
                </div>
            }
        </div>
        <div className="w-full flex items-center gap-4 pr-1.5">
            <textarea type="textarea" value={currMessage} onChange={(e) => {setCurrMessage(e.target.value)}} placeholder="Ask something!" rows="2" className="shadow-md shadow-slate-200/25 font-medium bg-slate-950 border border-cyan-200 text-white rounded-lg focus:border-cyan-400 outline-none block p-4 text-lg w-full resize-none"/>
            <button className="text-white bg-sky-600 font-semibold rounded-lg px-6 py-2 shadow-md shadow-purple-500/25 h-fit flex items-center gap-2" onClick={messageAi}>
                <FaArrowUp />
                Enter
            </button>
        </div>
      </div>
    </div>
  )
}

export default AIChatBot
