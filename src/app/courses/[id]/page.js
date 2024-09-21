"use client";

import { Button, Input, Layout, Spin } from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ProfileProps from "../../components/dashboard/profile";
import Bell from "../../components/icons/bell";
import Search from "../../components/icons/Search";

const { Header, Content } = Layout;

export default function Home() {
  const pathname = usePathname();
  const [test, setTest] = useState([]);
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("yes");
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(false);
  const session = useSession();
  console.log(session);
 
const discussion = JSON.parse(localStorage.getItem('discussion'))
  const handleFollowCourse = async (e) => {
    e.preventDefault();
    const userMessage = {
      role: "user",
      message: `<|eot_id|><|start_header_id|>user<|end_header_id|>${input}\n\n`,
    };

    setInput("");
    const body = {
      input:
        discussion.map((msg) => msg.message).join("\n") + userMessage.message,
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
    setStart(false);
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Failed to get response from API.");
      const text = await response.json();
      const botMessages = text.results.map((text) => ({
        role: "assistant",
        message: `<|eot_id|><|start_header_id|>user<|end_header_id|>${text.generated_text}\n`,
      }));

      setMessage((prevMessages) => [...prevMessages, ...botMessages]);
      localStorage.setItem(
        "discussion",
        JSON.stringify([...discussion, ...botMessages])
      );
      setTest(text.results);
    } catch (error) {
      console.error(error);
      // Vous pouvez ajouter une notification d'erreur ici
    } finally {
      setLoading(false);
      setStart(true);
    }
  };

  const links = [
    { name: "Dashboard", href: "/" },
    { name: "My Courses", href: "/courses" },
    { name: "Quiz and Exercices", href: "/quiz" },
    { name: "Progressions and Statistique", href: "/progession" },
    { name: "Certifications", href: "/certifications" },
    { name: "Feedbacks", href: "/feedbacks" },
    { name: "Settings", href: "/settings" },
    { name: "Support/Help", href: "/support" },
  ];

  return (
    <div>
      <header className="flex items-center justify-between px-10 h-20 border rounded-lg border-white/30">
        <Link href="/" className="text-3xl font-bold mx-4">
          X-vice
        </Link>
        <form className="flex items-center gap-3">
          <input
            className="rounded-xl w-80 bg-black border border-white px-4"
            type="text"
            placeholder="search..."
          />
          <Search />
        </form>
        <div className="flex items-center gap-4">
          <Bell />
          <ProfileProps />
        </div>
      </header>
      <div className="flex bg-black text-white">
        <div className="flex flex-col max-w-[250px] min-h-screen gap-5 justify-between border-r border-white/30">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={pathname === link.href ? "lien" : "link"}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <Content className="text-white">
          {!start && (
            <div>
              <h1 className="text-2xl text-center mt-4 text-blue-500 font-bold">
                Welcome to your Course.
              </h1>
              <div className="flex flex-col bg-slate-300 p-2 rounded-lg text-black items-center justify-center gap-4 mt-4">
                <p className="text-lg font-bold">
                  Press the button to start your lesson
                </p>
                <Button
                  onClick={handleFollowCourse}
                  className="bg-black text-white "
                >
                  Start learning
                </Button>
              </div>
            </div>
          )}

          <div>
            {loading ? (
              <div className="flex justify-center mt-20">
                <Spin size="large" />
              </div>
            ) : (
              <div className="mt-20">
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
                    {message.length < 9 ? (
                      <form
                        onSubmit={handleFollowCourse}
                        className="flex items-center gap-4"
                      >
                        <Input
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                        />
                        <Button className="bg-white text-white" type="submit">
                          Submit your answer and continue
                        </Button>
                      </form>
                    ) : (
                      <div className="flex justify-between w-full">
                        <Button className="bg-black text-white mt-4 border border-black hover:border-black">
                          No, I will start later
                        </Button>
                        <Link
                          href={`/courses/${selectedCourse.id}`}
                          className="bg-black rounded-lg px-4 text-sm text-center py-2 text-white mt-4"
                        >
                          Yes, Go to the course
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Content>
      </div>
    </div>
  );
}
