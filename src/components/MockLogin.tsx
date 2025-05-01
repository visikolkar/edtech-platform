import { useAuthStore } from "../store/auth";
import styles from "../styles/MockLogin.module.css";

export const MockLogin = () => {
  const { login } = useAuthStore();

  const mockUsers = [
    {
      id: "223e206d-cdbf-42e9-bdc2-a2d86e5bc9c4",
      name: "Alice Student",
      email: "alice@example.com",
      globalRole: "student" as const,
    },
    {
      id: "3110c60e-f8f8-4e51-955f-fe40e5059659",
      name: "Bob Professor",
      email: "bob@example.com",
      globalRole: "professor" as const,
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      name: "John Student",
      email: "john@example.com",
      globalRole: "student" as const,
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440001",
      name: "Doe Professor",
      email: "doe@example.com",
      globalRole: "professor" as const,
    },
  ];

  return (
    <div className={styles.loginContainer}>
      <h2>Mock Login</h2>
      <p>Select a user to login:</p>
      <div className={styles.userList}>
        {mockUsers.map((user) => (
          <button
            key={user.id}
            className={`${styles.loginButton} ${
              user.globalRole === "student"
                ? styles.studentButton
                : styles.professorButton
            }`}
            onClick={() => login(user)}
          >
            <span className={styles.userName}>{user.name}</span>
            <span className={styles.userRole}>({user.globalRole})</span>
            <span className={styles.userEmail}>{user.email}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
