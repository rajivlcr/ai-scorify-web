export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="bg-white rounded-[35px] shadow-2xl p-10">
        <h1 className="text-5xl font-black text-purple-600 mb-8">
          Contact Us 📞
        </h1>

        <div className="space-y-6 text-lg">
          <div className="bg-purple-50 p-6 rounded-2xl">
            <p className="font-bold">📧 Email</p>

            <p className="mt-2 text-gray-600">support@aiscorify.com</p>
          </div>

          <div className="bg-green-50 p-6 rounded-2xl">
            <p className="font-bold">💬 WhatsApp</p>

            <p className="mt-2 text-gray-600">+91 9344082314</p>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl">
            <p className="font-bold">⏰ Support Hours</p>

            <p className="mt-2 text-gray-600">9 AM - 8 PM IST</p>
          </div>
        </div>
      </div>
    </div>
  );
}
