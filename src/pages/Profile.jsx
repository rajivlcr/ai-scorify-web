export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <p>No user</p>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h1 className="text-xl font-bold mb-3">👤 Profile</h1>

      <p>
        <b>Name:</b> {user.name}
      </p>
      <p>
        <b>Email:</b> {user.email}
      </p>
    </div>
  );
}
