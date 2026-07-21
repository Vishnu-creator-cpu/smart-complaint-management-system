import { useState,useEffect } from "react";
import "./AIChatbot.css";

function AIChatbot() {

    const [isOpen, setIsOpen] = useState(false);

    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Hello! I'm Smart Complaint Assistant. How can I help you?"
        }
    ]);

    const [input, setInput] = useState("");

    const GetBotResponse = (question) => {

        const q = question.toLowerCase();

        if (q.includes("register")) {
            return "Go to Register Complaint page and fill all complaint details.";
        }

        if (q.includes("track")) {
            return "You can track your complaint from Track Complaint page.";
        }

        if (q.includes("assigned")) {
            return "Assigned means your complaint has been assigned to an officer.";
        }

        if (q.includes("resolved")) {
            return "Resolved means your complaint has been completed successfully.";
        }

        if (q.includes("work started")) {
            return "Work Started means the officer has started resolving your complaint.";
        }

        if (q.includes("emergency")) {
            return "Emergency Numbers : Police-100, Ambulance-108, Fire-101.";
        }

        return "Sorry! Please ask complaint related questions.";
    };


    const HandleSend = () => {

        if (!input.trim())
            return;

        const userMessage = {
            sender: "user",
            text: input
        };

        const botMessage = {
            sender: "bot",
            text: GetBotResponse(input)
        };

        setMessages(prev => [...prev, userMessage, botMessage]);

        setInput("");

    };

    return (

        <>

            <button
                className="chatbot-button"
                onClick={() => setIsOpen(!isOpen)}
            >
                💬
            </button>

            {
                isOpen &&

                <div className="chatbot-container">

                    <div className="chatbot-header">

                        Smart Complaint Assistant

                    </div>

                    <div className="chatbot-messages">

                        {
                            messages.map((msg, index) => (

                                <div
                                    key={index}
                                    className={`message ${msg.sender}`}
                                >
                                    {msg.text}
                                </div>

                            ))
                        }

                    </div>

                    <div className="chatbot-input">

                        <input
                            type="text"
                            placeholder="Ask your question..."
                            value={input}
                            onChange={(e) =>
                                setInput(e.target.value)
                            }
                        />

                        <button onClick={HandleSend}>
                            Send
                        </button>

                    </div>

                </div>
            }

        </>

    );

}

export default AIChatbot;