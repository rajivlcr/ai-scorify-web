import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminQuestionBank() {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBanks();
  }, []);

  const loadBanks = async () => {
    try {
      const res = await api.get("/admin/question-banks");

      setBanks(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading Question Banks... </div>;
  }

  const totalQuestions = banks.reduce(
    (sum, bank) => sum + bank.totalQuestions,
    0,
  );

  const totalMcqs = banks.reduce((sum, bank) => sum + bank.mcqCount, 0);

  const totalAssertions = banks.reduce(
    (sum, bank) => sum + bank.assertionCount,
    0,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {" "}
      <h1 className="text-4xl font-black text-purple-600 mb-8">
        Question Bank V2{" "}
      </h1>
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h3 className="text-gray-500">Chapters</h3>

          <p className="text-4xl font-black mt-3">{banks.length}</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h3 className="text-gray-500">Total Questions</h3>

          <p className="text-4xl font-black mt-3 text-indigo-600">
            {totalQuestions}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h3 className="text-gray-500">MCQs</h3>

          <p className="text-4xl font-black mt-3 text-purple-600">
            {totalMcqs}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h3 className="text-gray-500">Assertions</h3>

          <p className="text-4xl font-black mt-3 text-green-600">
            {totalAssertions}
          </p>
        </div>
      </div>
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">Generated Question Banks</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Subject</th>
                <th className="p-4 text-left">Chapter</th>
                <th className="p-4 text-left">MCQ</th>
                <th className="p-4 text-left">Assertion</th>
                <th className="p-4 text-left">Total</th>
              </tr>
            </thead>

            <tbody>
              {banks.map((bank) => (
                <tr key={bank._id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-semibold">{bank.subject}</td>

                  <td className="p-4">{bank.chapter}</td>

                  <td className="p-4">{bank.mcqCount}</td>

                  <td className="p-4">{bank.assertionCount}</td>

                  <td className="p-4 font-bold">{bank.totalQuestions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
