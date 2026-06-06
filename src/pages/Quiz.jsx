import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import api from "../services/api";

export default function Quiz() {

  const navigate = useNavigate();

  const location = useLocation();

  // 🚀 QUERY PARAMS
  const params = new URLSearchParams(location.search);

  const className = params.get("className");

  const subject = params.get("subject");

  const chapter = params.get("chapter");

  const type = params.get("type");

  const [loading, setLoading] = useState(true);

  const [questions, setQuestions] = useState([]);

  const [answers, setAnswers] = useState({});

  const [current, setCurrent] = useState(0);

  const [submitting, setSubmitting] = useState(false);

  // 🚀 FETCH QUIZ
  useEffect(() => {

    const fetchQuiz = async () => {

      try {

        const res = await api.post(

          "/quiz/generate",

          {
            className,

            subject,

            chapter,

            type,
          },
        );

        setQuestions(res.data.questions);

      } catch (err) {

        console.log(err);

        alert(

          err?.response?.data?.msg ||

            "Quiz generation failed"
        );

        navigate("/dashboard");

      } finally {

        setLoading(false);
      }
    };

    if (

      !className ||

      !subject ||

      !chapter ||

      !type
    ) {

      navigate("/dashboard");

      return;
    }

    fetchQuiz();

  }, [

    className,

    subject,

    chapter,

    type,

    navigate,
  ]);

  // 🚀 LOADING
  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <div className="text-center">

          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="mt-6 text-gray-600 text-lg">
            Loading Quiz...
          </p>
        </div>
      </div>
    );
  }

  // 🚀 NO QUESTIONS
  if (!questions || questions.length === 0) {

    return (

      <div className="min-h-screen flex items-center justify-center px-4">

        <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-lg">

          <h2 className="text-3xl font-bold text-red-500">
            No Questions Found 😢
          </h2>

          <p className="text-gray-500 mt-4">
            Questions are being prepared.
            Please try again later.
          </p>

          <button

            onClick={() =>
              navigate("/dashboard")
            }

            className="mt-8 bg-purple-600 text-white px-6 py-3 rounded-2xl font-bold hover:scale-105 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const question =
    questions[current];

  // 🚀 SELECT ANSWER
  const selectAnswer =
    (option) => {

      setAnswers({

        ...answers,

        [current]: option,
      });
    };

  // 🚀 NEXT
  const nextQuestion =
    () => {

      if (
        current <
        questions.length - 1
      ) {

        setCurrent(
          current + 1
        );
      }
    };

  // 🚀 PREVIOUS
  const previousQuestion =
    () => {

      if (current > 0) {

        setCurrent(
          current - 1
        );
      }
    };

  // 🚀 SUBMIT QUIZ
  const submitQuiz =
    async () => {

      try {

        setSubmitting(true);

        // 🚀 GET USER
        const stored =
          JSON.parse(

            localStorage.getItem(
              "user"
            )
          );

        const user =
          stored?.user ||
          stored;

        // 🚀 FORMAT ANSWERS
        const formattedAnswers =
          questions.map(

            (_, index) =>

              answers[index] ||
              ""
          );

        // 🚀 SUBMIT
        const res =
          await api.post(

            "/quiz/submit",

            {
              userId:
                user?.id ||
                user?._id,

              subject,

              chapter,

              quiz:
                questions,

              answers:
                formattedAnswers,
            },
          );

        // 🚀 RESULT PAGE
        navigate(

          "/result",

          {
            state: {

              ...res.data,

              quiz:
                questions,

              answers:
                formattedAnswers,
            },
          }
        );

      } catch (err) {

        console.log(err);

        alert(

          err?.response?.data?.msg ||

            "Submit failed"
        );

      } finally {

        setSubmitting(false);
      }
    };

  return (

    <div className="min-h-screen max-w-5xl mx-auto px-4 py-10">

      {/* 🚀 HEADER */}
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>

            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🚀 AI Quiz
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-gray-800">
              {chapter}
            </h1>

            <p className="text-gray-500 mt-2">
              {subject} • {type}
            </p>
          </div>

          {/* 🚀 PROGRESS */}
          <div className="text-center">

            <div className="text-5xl font-black text-purple-600">
              {current + 1}
            </div>

            <p className="text-gray-500 mt-2">
              / {questions.length}
            </p>
          </div>
        </div>

        {/* 🚀 BAR */}
        <div className="w-full bg-gray-200 rounded-full h-3 mt-8 overflow-hidden">

          <div

            className="bg-gradient-to-r from-purple-600 to-indigo-600 h-3 rounded-full transition-all duration-500"

            style={{

              width:
                `${((current + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* 🚀 QUESTION */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mt-10 border border-gray-100">

        <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">
          {question.question}
        </h2>

        {/* 🚀 OPTIONS */}
        <div className="mt-8 space-y-5">

          {question.options.map(

            (
              option,
              index
            ) => (

              <button

                key={index}

                onClick={() =>
                  selectAnswer(
                    option
                  )
                }

                className={`

                  w-full
                  text-left
                  p-5
                  rounded-2xl
                  border-2
                  transition-all
                  font-medium

                  ${
                    answers[current] === option

                      ? "border-purple-600 bg-purple-50 text-purple-700"

                      : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50"
                  }
                `}
              >

                {option}

              </button>
            )
          )}
        </div>

        {/* 🚀 BUTTONS */}
        <div className="flex flex-wrap gap-4 justify-between mt-10">

          <button

            onClick={
              previousQuestion
            }

            disabled={
              current === 0
            }

            className={`

              px-6
              py-3
              rounded-2xl
              font-bold
              transition

              ${
                current === 0

                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"

                  : "bg-gray-100 hover:bg-gray-200"
              }
            `}
          >
            ← Previous
          </button>

          {current ===
          questions.length -
            1 ? (

            <button

              onClick={
                submitQuiz
              }

              disabled={
                submitting
              }

              className={`

                  px-8
                  py-4
                  rounded-2xl
                  font-bold
                  text-white
                  transition-all

                  ${
                    submitting

                      ? "bg-gray-400 cursor-not-allowed"

                      : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105"
                  }
                `}
            >

              {submitting

                ? "Submitting Quiz..."

                : "Submit Quiz 🚀"}

            </button>

          ) : (

            <button

              onClick={
                nextQuestion
              }

              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}