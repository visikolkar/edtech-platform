import { useQuery, useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthStore } from "../../../store/auth";
import { MockLogin } from "../../../components/MockLogin";
import { FiEdit, FiLogOut, FiUser } from "react-icons/fi";
import styles from "../../../styles/CourseDetails.module.css";

type User = {
  id: string;
  name: string;
};

type Enrollment = {
  user: User;
  role: string;
};

type Course = {
  title: string;
  description: string;
  level: string;
  enrollments: Enrollment[];
};

type CourseData = {
  courses_by_pk: Course;
};

type EnrollmentVariables = {
  courseId: string;
  userId: string;
  role: "student" | "professor";
};

const GET_COURSE_BY_ID = gql`
  query GetCourseWithEnrollments($courseId: uuid!) {
    courses_by_pk(id: $courseId) {
      title
      description
      level
      enrollments {
        user {
          id
          name
        }
        role
      }
    }
  }
`;

const ENROLL_USER = gql`
  mutation EnrollUser($courseId: uuid!, $userId: uuid!, $role: String!) {
    insert_enrollments_one(
      object: { course_id: $courseId, user_id: $userId, role: $role }
    ) {
      id
    }
  }
`;

export default function CourseDetails() {
  const router = useRouter();
  const { id: courseId } = router.query;
  const { user } = useAuthStore();
  const [isEnrolling, setIsEnrolling] = useState(false);

  const { loading, error, data } = useQuery<CourseData>(GET_COURSE_BY_ID, {
    variables: { courseId },
    skip: !courseId,
  });

  const [enrollUser] = useMutation<
    { insert_enrollments_one: { id: string } },
    EnrollmentVariables
  >(ENROLL_USER);

  const isUserEnrolled = data?.courses_by_pk.enrollments.some(
    (enrollment) => enrollment.user.id === user?.id
  );

  const handleEnroll = async (role: "student" | "professor") => {
    if (!user || !courseId) {
      alert("Please login to enroll");
      return;
    }

    try {
      setIsEnrolling(true);
      await enrollUser({
        variables: {
          courseId: courseId as string,
          userId: user.id,
          role: role,
        },
      });

      router.push({
        pathname: `/courses/${courseId}/confirm`,
        query: { courseId },
      });
    } catch (err) {
      console.error("Enrollment error:", err);
      alert(
        `Enrollment failed: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleEditCourse = () => {
    alert("Edit course functionality coming soon!");
  };

  if (loading)
    return <div className={styles.loading}>Loading course details...</div>;
  if (error) return <div className={styles.error}>Error: {error.message}</div>;
  if (!data?.courses_by_pk) return <p>Course not found</p>;

  return (
    <div className={styles.container}>
      {/* Add user profile section at the top */}
      {user && (
        <div className={styles.userProfile}>
          <div className={styles.userInfo}>
            <FiUser className={styles.userIcon} />
            <div>
              <span className={styles.userName}>{user.name}</span>
              <span className={styles.userRole}>{user.globalRole}</span>
            </div>
          </div>
          <button
            className={styles.logoutButton}
            onClick={() => {
              useAuthStore.getState().logout();
              router.push("/");
            }}
          >
            <FiLogOut className={styles.logoutIcon} />
            Logout
          </button>
        </div>
      )}
      {/* Course Header */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{data.courses_by_pk.title}</h1>
          {user?.globalRole === "professor" && (
            <button
              className={styles.editButton}
              onClick={() => handleEditCourse()}
            >
              <FiEdit className={styles.editIcon} />
              Edit Course
            </button>
          )}
        </div>
        <p className={styles.description}>{data.courses_by_pk.description}</p>
        <span className={styles.level}>Level: {data.courses_by_pk.level}</span>
      </div>

      {/* Enrollment Section */}
      {user ? (
        <>
          {!isUserEnrolled ? (
            <div className={styles.enrollmentSection}>
              <h2 className={styles.enrollmentTitle}>Enroll as:</h2>
              <div className={styles.buttonGroup}>
                <button
                  className={`${styles.button} ${styles.studentButton}`}
                  onClick={() => handleEnroll("student")}
                  disabled={isEnrolling || user.globalRole !== "student"}
                >
                  {isEnrolling ? "Processing..." : "Student"}
                </button>
                <button
                  className={`${styles.button} ${styles.professorButton}`}
                  onClick={() => handleEnroll("professor")}
                  disabled={isEnrolling || user.globalRole !== "professor"}
                >
                  {isEnrolling ? "Processing..." : "Professor"}
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.enrollmentSection}>
              <h2 className={styles.enrollmentTitle}>
                You have enrolled for this course!
              </h2>
            </div>
          )}
        </>
      ) : (
        <div className={styles.loginSection}>
          <MockLogin />
          <p className={styles.loginPrompt}>
            Select a user to enroll in this course
          </p>
        </div>
      )}

      {/* Current Enrollments */}
      {data.courses_by_pk.enrollments.length > 0 && (
        <div className={styles.enrollmentsList}>
          <h3 className={styles.enrollmentsTitle}>Current Enrollments:</h3>
          {data.courses_by_pk.enrollments.map((enrollment, index) => (
            <div key={index} className={styles.enrollmentItem}>
              <span>{enrollment.user.name}</span>
              <span>{enrollment.role}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
