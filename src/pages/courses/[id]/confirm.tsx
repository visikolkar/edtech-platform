import { useRouter } from "next/router";
import styles from "../../../styles/Confirmation.module.css";
import { gql, useQuery } from "@apollo/client";

const GET_COURSE_TITLE = gql`
  query GetCourseTitle($courseId: uuid!) {
    courses_by_pk(id: $courseId) {
      title
    }
  }
`;

export default function EnrollmentConfirmation() {
  const router = useRouter();
  const { courseId } = router.query;
  const { data } = useQuery(GET_COURSE_TITLE, {
    variables: { courseId },
    skip: !courseId,
  });

  return (
    <div className={styles.container}>
      <h1>Enrollment Confirmed!</h1>
      <p>
        You have successfully enrolled in the course:{" "}
        {data?.courses_by_pk?.title || ""}.
      </p>
      <button
        className={styles.button}
        onClick={() => router.push(`/courses/${courseId}`)}
      >
        Back to Course
      </button>
    </div>
  );
}
