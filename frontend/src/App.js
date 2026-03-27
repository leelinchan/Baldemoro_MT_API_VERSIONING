import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [loginUser, setLoginUser] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const [updateEmail, setUpdateEmail] = useState("");

  const register = async () => {
    if (!username || !email) {
      alert("Please enter username and email");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/api/v2/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      console.log("Registered:", data);
      alert("User Registered Successfully ");

      setUsername("");
      setEmail("");

    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    }
  };

  const login = async () => {
  if (!loginUser) {
    alert("Please enter user ID");
    return;
  }

  try {
    const res = await fetch(`http://127.0.0.1:5000/api/v2/users/${loginUser}`);

    const text = await res.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("Server returned invalid response (not JSON)");
    }

    if (!res.ok || !data.id) {
      throw new Error(data.error || "User not found");
    }

    setCurrentUser(data);
    setUpdateEmail(data.email || "");

  } catch (err) {
    console.error(err);
    alert("Error: " + err.message);
  }
};
  const updateUserEmail = async () => {
    if (!updateEmail) {
      alert("Email cannot be empty");
      return;
    }

    try {
      const res = await fetch(`http://127.0.0.1:5000/api/v2/users/${currentUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email: updateEmail })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Update failed");
      }

      alert("Email Updated");

      setCurrentUser(data);

    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>MERN API Versioning</h1>

      <h2>Register User</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br /><br />
      <input
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />
      <button onClick={register}>Register</button>

      <hr />

      <h2>Login</h2>
      <input
        placeholder="Enter User ID"
        value={loginUser}
        onChange={(e) => setLoginUser(e.target.value)}
      />
      <br /><br />
      <button onClick={login}>Login</button>
      {currentUser && (
        <>
          <hr />
          <h3>Welcome {currentUser.username}</h3>

          <input
            value={updateEmail}
            onChange={(e) => setUpdateEmail(e.target.value)}
          />
          <br /><br />
          <button onClick={updateUserEmail}>Update Email</button>
        </>
      )}
    </div>
  );
}

export default App;