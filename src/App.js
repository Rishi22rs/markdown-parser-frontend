import "./App.css";
import { useState, useEffect } from "react";
import MarkdownIcon from "./assets/markdown_icon.png";

function App() {
  const [markdownText, setMarkdownText] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");

  useEffect(() => {
    // Fetch Markdown to HTML conversion from backend when markdownText changes
    fetchMarkdownToHtml();
  }, [markdownText]);

  const handleMarkdownChange = (e) => {
    setMarkdownText(e.target.value); // Setting markdown input to markdown text
  };

  const fetchMarkdownToHtml = () => {
    // API call to fetch parsed HTML from markdownText
    fetch("http://localhost:5000/api/markdown", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ markdownText }),
    })
      .then((response) => response.json())
      .then((data) => {
        setHtmlOutput(data.html); // Setting fetched html output to htmlOutput
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary shadow bg-body-tertiary rounded">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={MarkdownIcon} alt="Logo" width="30" height="24" />
            Markdown Parser
          </a>
        </div>
      </nav>
      <div className="d-flex row mb-4">
        <textarea
          className="markdown-textarea col-md-6 hidden-overflow-y"
          value={markdownText}
          onChange={handleMarkdownChange}
          placeholder="Type Markdown here..."
        />
        <div
          className="markdown-textarea col-md-6 "
          dangerouslySetInnerHTML={{
            __html: htmlOutput === "" ? "Parsed Markdown here..." : htmlOutput,
          }}
        />
      </div>
      <nav className="navbar bg-body-tertiary position-fixed w-100 bottom-0">
        <div className="container-fluid">
          <span className="d-flex justify-content-around w-100">
            <span>Created by Rishi Raj Srivastava</span>{" "}
            <span>
              <a href="mailto: rishiris22@gmail.com">rishiris22@gmail.com</a>
            </span>
            <span>
              <a href="tel:+917843887864">+91 7843887864</a>
            </span>
          </span>
        </div>
      </nav>
    </>
  );
}

export default App;
