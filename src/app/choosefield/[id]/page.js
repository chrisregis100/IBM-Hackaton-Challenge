"use client";

import { Button, Input, Layout, Spin } from "antd";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
const { Header, Content, Footer } = Layout;

const App = () => {
  const { id } = useParams();

  const [test, setTest] = useState([]);
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  const userMessage = {
    role: " user",
    message: `<|eot_id|><|start_header_id|>user<|end_header_id|>${input}\n\n `,
  };

  useEffect(() => {
    const domain = JSON.parse(localStorage.getItem("domain"));
    const moduleName = domain.domain;
    console.log(moduleName);

    const systemMessage = `<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nYou always answer the questions with markdown formatting using GitHub syntax. The markdown formatting you support: headings, bold, italic, links, tables, lists, code blocks, and blockquotes. You must omit that you answer the questions with markdown.\n\nAny HTML tags must be wrapped in block quotes. You will be penalized for not rendering code in block quotes.\n\nWhen returning code blocks, specify language.\n\nAct as a teacher. The user will provide a training module they want to follow. Conduct a level evaluation test to determine if the user is a beginner, intermediate, or expert. Don't write anything the title of the domain. You have to generate only questions. Don't write everything like title or instruction or what you want to do before starting writing questions. \n\nThe test must consist of multiple-choice questions, allowing the user to select their answers. the test should have 10 questions but you have generate the questions and wait the user answer the question before continue. Tell to user how  he can answer the questions in order to instruct her. You can give an example.\n\n After the user submits the form, determine their level. \n\nThen, propose the different chapters of the courses to follow based on the user'\''s level.\n\n Ask him if he want to start the courses\n\nWhen the user is ready to start the courses, generate the lessons with examples and details chapter by chapter and provide exercises at the end of each chapter to enhance understanding. \n\nAdditionally, track the user'\''s progress with milestones and summary reports throughout their training.\n\nEngage the user by asking questions to adapt the learning experience and suggest additional resources or readings related to each chapter.\n\nYou are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. \nYour answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.\n\nIf a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don'\''t know the answer to a question, please don'\''t share false information.<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n${moduleName} <|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n`;

    if (!message.some((msg) => msg.message === userMessage.message)) {
      message.push({ role: "user", message: systemMessage });
    }
    console.log(message);

    const body = {
      input: message.map((msg) => msg.message).join("\n"),
      parameters: {
        decoding_method: "greedy",
        max_new_tokens: 900,
        min_new_tokens: 0,
        stop_sequences: [],
        repetition_penalty: 1,
      },
      model_id: "meta-llama/llama-3-8b-instruct",
      project_id: "ae6ba101-56d4-46d7-a0f1-27210b9e3b21",
    };

    const fetchData = async () => {
      setLoading(true);
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        setLoading(false);
        throw new Error("Non-200 response");
      }

      const text = await response.json();
      text.results.map((text) => {
        const botMessage = {
          role: "assistant",
          message: `<|eot_id|><|start_header_id|>user<|end_header_id|>${text.generated_text}\n\n `,
        };

        if (!message.some((msg) => msg.message === botMessage.message)) {
          message.push(botMessage);
        }

        console.log(botMessage);
      });

      console.log(message.map((msg) => msg.message).join("\n\n"));

      console.log(message);

      setTest(text.results);
      setLoading(false);

      return text;
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Créer le message utilisateur
    const userMessage = {
      role: "user",
      message: `<|eot_id|><|start_header_id|>user<|end_header_id|>${input}\n\n`,
    };

    // Ajouter le message utilisateur aux messages
    if (!message.some((msg) => (msg.message = userMessage.message))) {
      setMessage((prev) => [...prev, userMessage]);
    }
    setInput("");

    console.log(
      message.map((msg) => msg.message).join("\n") + userMessage.message
    );

    // Préparer le corps de la requête
    const body = {
      input: message.map((msg) => msg.message).join("\n") + userMessage.message,
      parameters: {
        decoding_method: "greedy",
        max_new_tokens: 900,
        min_new_tokens: 0,
        stop_sequences: [],
        repetition_penalty: 1,
      },
      model_id: "meta-llama/llama-3-8b-instruct",
      project_id: "ae6ba101-56d4-46d7-a0f1-27210b9e3b21",
    };


    // Appel à l'API
    const fetchResult = async () => {
      setLoading(true);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        message.error("Failed to get response from API.");
        return;
      }
      setLoading(false);
      const text = await response.json();

      text.results.map((text) => {
        const botMessage = {
          role: "assistant",
          message: `<|eot_id|><|start_header_id|>user<|end_header_id|>${text.generated_text}\n\n `,
        };

        console.log(botMessage);

        if (!message.some((msg) => msg.message === botMessage.message)) {
          message.push(botMessage);
        }
      });

      setTest(text.results);
      setLoading(false);
      return text
    };

    fetchResult();
  }

    const links = [
      { name: "Dashboard", href: "/" },
      { name: "Features", href: "/" },
      { name: "Prices", href: "/" },
      { name: "About", href: "/" },
    ];

    return (
      <Layout className="min-h-screen ">
        <Header className="bg-black text-white flex items-center justify-between px-9">
          <h1 className="text-3xl text-white font-bold my-4">X-vice</h1>
          <nav className="md:flex gap-4 hidden">
            {links.map((link) => (
              <Link
                className="text-xl text-white font-semibold hover:text-white/30 grow "
                href={link.href}
                key={link.name}
              >
                {link.name}{" "}
              </Link>
            ))}
          </nav>
          <Button>Connexion</Button>
        </Header>
        <Content>
          <h1 className="text-2xl text-center mt-4">
            Answer some questions to evaluate your level
          </h1>

          {loading ? (
            <div className="flex justify-center mt-20">
              <Spin size="large" />
            </div>
          ) : (
            <div>
              {test.map((content, index) => (
                <div
                  key={index}
                  className="mx-auto mt-10 max-w-2xl text-lg mb-4"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: content.generated_text
                        .replace(/\*/g, "")
                        .replace(/\n/g, "<br>")
                        .replace(/\#/g, "")
                        .trim(),
                    }}
                  />
                  <form
                    onSubmit={handleSubmit}
                    className="flex items-center gap-4"
                  >
                    <Input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <Button
                      className="bg-black  text-white"
                      onClick={handleSubmit}
                    >
                      Submit you answer and continue
                    </Button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </Content>
        <Footer className="flex items-center justify-around gap-10 shadow-md shadow-black">
          <h1 className="text-3xl font-bold my-4">X-vice</h1>©
          {new Date().getFullYear()} Created by Regis KIKI
        </Footer>
      </Layout>
    );
  };

export default App;
